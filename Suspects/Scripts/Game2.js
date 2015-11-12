Suspects.Game2 = function(game)
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
    
    this.gameScene = 0;
    this.noOfSuspect = 2;
    
    this.starEmpty = [];
    this.starFull = null;
    this.starFull2 = null;
    
    this.suspectGroup = null;
    
    this.caseOutSound = false;
};

Suspects.Game2.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimerDown(this.world.width*0.775, this.world.height*0.23, 60);
        
        this.suspectGroup = this.add.group();
        
        for(i = 0; i < this.noOfSuspect; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.4+200*i, this.world.height*0.777, i+4);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        
        this.reference = this.add.sprite(this.world.width*0.815, this.world.height*0.435, 'Lvl2Reference');
        this.reference.anchor.set(0.5,0.5);
        var tween = this.add.tween(this.reference.scale).to( { x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Linear.None, true);
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(this.world.width*0.417 + 41*i, this.world.height*0.191, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
        }
        
        this.checkStar();
        
        this.correct = this.add.sprite(this.world.width*0.5, this.world.height*0.6, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.scale.setTo(0.5, 0.5);
        this.correct.visible = false;
        
        this.wrong = this.add.sprite(this.world.width*0.5, this.world.height*0.65, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.scale.setTo(0.5, 0.5);
        this.wrong.visible = false;
        
        this.guiltyFace = this.add.sprite(this.world.width*0.5, this.world.height*0.7, 'Lv2Suspect_1');
        this.guiltyFace.scale.setTo(1, 0.9);
        this.guiltyFace.animations.add('guilty', [3]);
        this.guiltyFace.anchor.set(0.5,0.5);
        this.guiltyFace.visible = false;
        
        this.jailBar = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailBar');
        this.jailBar.anchor.set(0.5,0.5);
        
        this.caseClosed = this.add.sprite(this.world.width*0.5, this.world.height*0.45, 'CaseClosed');
        this.caseClosed.anchor.set(0.5,0.5);
        this.caseClosed.visible = false;
        
        this.caseFailed = this.add.sprite(this.world.width*0.5, this.world.height*0.45, 'CaseFailed');
        this.caseFailed.anchor.set(0.5,0.5);
        this.caseFailed.visible = false;
        
        this.gray = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Lvl2Gray');
        this.gray.anchor.set(0.5,0.5);
        this.gray.visible = false;
        
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
        
        this.starFull2 = this.game.add.sprite(this.starEmpty[1].x, this.starEmpty[1].y, 'StarFull');
        this.starFull2.anchor.set(0.5,0.5);
        this.starFull2.visible = false;
    },
    
    suspectCheck: function()
    { 
        this.suspectGroup.forEach(function(suspects)
        {
            if(suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                this.soundManager.createSound('ChooseSFX');

                if(suspects.name == "person4")
                {
                    this.correctSuspect();
                }
                if(suspects.name == "person5")
                {
                    this.wrongSuspect();
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
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.correctAppear, this);  
    }, 
                                                                                          
    correctAppear: function()
    {
        this.gray.visible = false;
        this.correct.visible = true;
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 1, this.correctDisappear, this);
    },
    
    correctDisappear: function()
    {
        this.starFull2.visible = true;
        tween = this.add.tween(this.starFull2.scale).to( { x: 1.01, y: 1.01 }, 1000, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(this.starAppear, this);
        Suspects.secondStar = true;
        this.correct.visible = false;
    },
    
    starAppear: function()
    {
        this.guiltyFace.visible = true;
        this.destroyItems();
        this.guiltyFace.animations.play('guilty',4, false);
        var tween = null;
        tween = this.add.tween(this.jailBar).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
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
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 3, this.wrongAppear, this);
    },
    
    wrongAppear: function()
    {
        this.gray.visible = false;
        this.wrong.visible = true;
        var wrongTime = this.time.events.add(Phaser.Timer.SECOND* 1, this.wrongDisappear, this);
    },
                                                    
    wrongDisappear: function()
    {
        this.wrong.visible = false;
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
        this.gameScene = 4;
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