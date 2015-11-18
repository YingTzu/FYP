Suspects.Game4 = function(game)
{
    this.timeManager = null;
    this.suspectsManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    
    this.gameBackground = null;
    this.reference = null;
    
    this.correct = null;
    this.wrong = null;
    this.jailBar = null;
    this.caseClosed = null;
    this.caseFailed = null;
    this.guiltyFace = null;
    this.gray = null;
    this.glowing = null;
    
    this.gameScene = 0;
    this.noOfSuspect = 3;
    
    this.starEmpty = [];
    this.starFull = null;
    this.starFull2 = null;
    this.starFull3 = null;
    this.starFull4 = null;
    
    this.suspectGroup = null;
    
    this.caseOutSound = false;
};

Suspects.Game4.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimerDown(this.world.width*0.772, this.world.height*0.23, 50);
        
        this.glowing = this.add.sprite(this.world.width*0.678, this.world.height*0.82, 'Glowing');
        this.glowing.anchor.set(0.5,0.5);
        this.glowing.scale.setTo(0.35,0.37);
        this.glowing.visible = false;
        
        this.suspectGroup = this.add.group();
        
        for(i = 0; i < this.noOfSuspect; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.26+200*i, this.world.height*0.777, i+9);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        
        this.reference = this.add.sprite(this.world.width*0.815, this.world.height*0.435, 'Lvl4Reference');
        this.reference.anchor.set(0.5,0.5);
        var tween = this.add.tween(this.reference.scale).to( { x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Linear.None, true);
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(this.world.width*0.417 + 41*i, this.world.height*0.191, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
        }
        
        this.checkStar();
        
        this.correct = this.add.sprite(this.world.width*0.68, this.world.height*0.4, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.scale.setTo(0.4, 0.4);
        this.correct.visible = false;
        
        this.guiltyFace = this.add.sprite(this.world.width*0.5, this.world.height*0.7, 'Lv4Suspect_3');
        this.guiltyFace.scale.setTo(1, 0.9);
        this.guiltyFace.animations.add('guilty', [3]);
        this.guiltyFace.anchor.set(0.5,0.5);
        this.guiltyFace.visible = false;
        
        this.gray = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Lvl4Gray');
        this.gray.anchor.set(0.5,0.5);
        this.gray.visible = false;
        
        this.jailBar = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailBar');
        this.jailBar.anchor.set(0.5,0.5);
        
        this.caseClosed = this.add.sprite(this.world.width*0.5, this.world.height*0.45, 'CaseClosed');
        this.caseClosed.anchor.set(0.5,0.5);
        this.caseClosed.visible = false;
        
        this.caseFailed = this.add.sprite(this.world.width*0.5, this.world.height*0.45, 'CaseFailed');
        this.caseFailed.anchor.set(0.5,0.5);
        this.caseFailed.visible = false;
        
        this.soundManager = new SoundManager(this);
        this.soundManager.createMusic('GameMusic');
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        this.suspectCheck();
        this.suspectGroup.forEach(function(suspects)
        {
            suspects.animations.play('idle', 3, true);
            suspects.animations.getAnimation('idle').delay = this.game.rnd.integerInRange(1000, 1500);
        },this);
        if(this.timeManager.gameOver == true && this.caseOutSound == false)
        {
            this.caseFailedOut();
            this.caseOutSound = true;
        }
        
        Suspects.FadeScreen.update(this.gameScene);
    },
    
    checkStar: function()
    {
        if(Suspects.firstStar == true)
        {
            this.starFull = this.game.add.sprite(this.starEmpty[0].x, this.starEmpty[0].y, 'StarFull');
            this.starFull.anchor.set(0.5,0.5);
        }
        if(Suspects.secondStar == true)
        {
            this.starFull2 = this.game.add.sprite(this.starEmpty[1].x, this.starEmpty[1].y, 'StarFull');
            this.starFull2.anchor.set(0.5,0.5);
        }
        
        if(Suspects.thirdStar == true)
        {
            this.starFull3 = this.game.add.sprite(this.starEmpty[2].x, this.starEmpty[2].y, 'StarFull');
            this.starFull3.anchor.set(0.5,0.5);
        }
        
        this.starFull4 = this.game.add.sprite(this.starEmpty[3].x, this.starEmpty[3].y, 'StarFull');
        this.starFull4.anchor.set(0.5,0.5);
        this.starFull4.visible = false;
    }, 
    
    renderWrong: function(posX, posY)
    {
        this.wrong = this.add.sprite(posX, posY, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.scale.setTo(0.5, 0.5);
    },
    
    suspectCheck: function()
    { 
        this.suspectGroup.forEach(function(suspects)
        {
            if(suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                this.soundManager.createSound('ChooseSFX');

                if(suspects.name == "person9")
                {
                    this.wrongSuspect();
                    this.renderWrong(this.world.width*0.26, this.world.height*0.4);
                }
                if(suspects.name == "person10")
                {
                    this.wrongSuspect();
                    this.renderWrong(this.world.width*0.47, this.world.height*0.4);
                }
                if(suspects.name == "person11")
                {
                    this.correctSuspect();
                }
                suspects.clicked = false;
            }
        },this);
    },
    
    correctSuspect: function()
    {
        this.timeManager.timeStop();
        this.suspectsManager.isClicked = true;
        this.gray.visible = true;
        this.correct.visible = true;
        this.glowing.visible = true;
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.correctDisappear, this);  
    }, 
    
    correctDisappear: function()
    {
        this.starFull4.visible = true;
        tween = this.add.tween(this.starFull4.scale).to( { x: 1.01, y: 1.01 }, 1000, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(this.starAppear, this);
        Suspects.fourthStar = true;
        this.gray.visible = false;
        this.correct.visible = false;
        this.glowing.visible = false;
    },
    
    starAppear: function()
    {
        this.guiltyFace.visible = true;
        this.destroyItems();
        this.guiltyFace.animations.play('guilty',4, false);
        var tween = null;
        tween = this.add.tween(this.jailBar).to({y: this.world.height*0.5 },800, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDown, this);
        this.timeManager.timeStop();
    },
    
    whenDown: function()
    {
        var caseOutTime = this.time.events.add(Phaser.Timer.SECOND* 0.5, this.caseOut, this);
    }, 
    
    caseOut: function()
    {
        this.caseClosed.visible = true;
        this.soundManager.createSound('ChopSFX');
        var tween = this.add.tween(this.caseClosed.scale).to( { x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
        var outTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.goNextLevel, this);
    },
    
    wrongSuspect: function()
    {
        this.suspectsManager.isClicked = true;
        this.timeManager.timeStop();
        this.gray.visible = true;
        this.glowing.visible = true;
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.wrongDisappear, this);
    },
                                                    
    wrongDisappear: function()
    {
        this.gray.visible = false;
        this.wrong.visible = false;
        this.glowing.visible = false;
        var caseOutTime = this.time.events.add(Phaser.Timer.SECOND* 0.5, this.caseFailedOut, this);
    },
    
    caseFailedOut: function()
    {
        this.wrong = true;
        this.caseFailed.visible = true;
        this.soundManager.createSound('ChopSFX');
        var tween = this.add.tween(this.caseFailed.scale).to( { x: 0.7, y: 0.7 }, 500, Phaser.Easing.Linear.None, true);
        var outTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.goNextLevel, this);
    },
    
    goNextLevel: function()
    {
        this.soundManager.stopMusic();
        this.gameScene = 6;
        Suspects.FadeScreen.OnEnd = true;
    },
    
    destroyItems: function()
    {
        this.suspectGroup.destroy();
        this.gameBackground.destroy();
        this.reference.destroy();
        this.timeManager.timeText.destroy();
    }
}