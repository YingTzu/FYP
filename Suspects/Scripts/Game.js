Suspects.Game = function(game)
{
    this.timeManager = null;
    this.suspectsManager = null;
    this.buttonManager = null;
    
    this.gameBackground = null;
    this.reference = null;
    
    this.pause = null;
    this.correct = null;
    this.wrong = null;
    this.jailRailing = null;
    this.caseClosed = null;
    this.faceTest = null;
    this.gray = null;
    
    this.noOfSuspect = 2;
    this.gameScene = 0;
    
    this.starEmpty = [];
    this.starFull = null;
    
    this.suspectGroup = null;
};

Suspects.Game.prototype = 
{
    create: function()
    {
        console.log("game");
        
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimeBar(25, 507, 'Timer', 60);
        console.log(this.timeManager.isPuase);
        
        this.suspectGroup = this.add.group();
        
        for(i = 0; i < this.noOfSuspect; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.4+200*i, this.world.height*0.777, i+2);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        
        this.reference = this.add.sprite(this.world.width*0.815, this.world.height*0.435, 'Lvl1Reference');
        this.reference.anchor.set(0.5,0.5);
        var tween = this.add.tween(this.reference.scale).to( { x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Linear.None, true);
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(this.world.width*0.417 + 41*i, this.world.height*0.191, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
        }
        
        this.starFull = this.game.add.sprite(this.starEmpty[0].x, this.starEmpty[0].y, 'StarFull');
        this.starFull.anchor.set(0.5,0.5);
        this.starFull.visible = false;
        
        this.pause = this.game.add.sprite(this.world.width*0.9, this.world.height*0.1, 'Pause');
        this.pause.anchor.set(0.5,0.5);
        this.pause.inputEnabled = true;
        this.pause.events.onInputDown.add(this.pauseClick, this);
        
        this.correct = this.add.sprite(this.world.width*0.5, this.world.height*0.6, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.scale.setTo(0.5, 0.5);
        this.correct.visible = false;
        
        this.wrong = this.add.sprite(this.world.width*0.5, this.world.height*0.65, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.scale.setTo(0.5, 0.5);
        this.wrong.visible = false;
        
        this.faceTest = this.add.sprite(this.world.width*0.5, this.world.height*0.7, 'Lv1Suspect_2');
        this.faceTest.scale.setTo(1, 0.9);
        this.faceTest.anchor.set(0.5,0.5);
        this.faceTest.visible = false;
        
        this.jailRailing = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailRailing');
        this.jailRailing.anchor.set(0.5,0.5);
        
        this.caseClosed = this.add.sprite(this.world.width*0.5, this.world.height*0.45, 'CaseClosed');
        this.caseClosed.anchor.set(0.5,0.5);
        this.caseClosed.visible = false;
        
        this.gray = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Lvl1Gray');
        this.gray.anchor.set(0.5,0.5);
        this.gray.visible = false;
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        //console.log(this.timeManager.isPause);
        if(!this.timeManager.isPuase)
        {
            this.suspectCheck();
        }
        else
        {//game paused
        }
        
        //Suspects.FadeScreen.update(this.gameScene);
        Suspects.FadeScreen.update(this.buttonManager.gametype);
    },
    
    pauseClick: function()
    {
        if(this.timeManager.isPuase == false)
        {
            this.timeManager.timePause();
            //this.suspectsManager.theSuspects.inputEnabled = false;
        }
        else if(this.timeManager.isPuase == true)
        {
            this.timeManager.timeResume();
            this.timeManager.isPuase = false;
        }
    },
    
    suspectCheck: function()
    { 
        //check clicking of each suspect
        this.suspectGroup.forEach(function(suspects)
        {
            //if suspects is clicked and never click before
            if(suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                //this.suspectsManager.isClicked = true;
                //check which suspect is clicked
                if(suspects.name == "person2")
                {
                    this.wrongSuspect();
                }
                if(suspects.name == "person3")
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
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 3, this.correctAppear, this);  
    }, 
                                                                                          
    correctAppear: function()
    {
        this.gray.visible = false;
        this.correct.visible = true;
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.correctDisappear, this);
    },
    
    correctDisappear: function()
    {
        this.starFull.visible = true;
        tween = this.add.tween(this.starFull.scale).to( { x: 1.01, y: 1.01 }, 1000, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add(this.starAppear, this); //do function after star appear
        Suspects.firstStar = true;
        this.correct.visible = false;
    },
    
    starAppear: function()
    {
        this.faceTest.visible = true;
        this.destroyItems();
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDown, this);
        this.timeManager.timeStop();
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
        //start fade and go to next level
        //this.gameScene = 3;
        //Suspects.FadeScreen.OnEnd = true;
        
        this.buttonManager.createButton(this.world.width*0.8, this.world.height*0.85, 'NextLevel', this.buttonManager.GoToLevel2);
    }, 
    
    whenDown: function()
    {
        //start fade and go to next level
        //this.gameScene = 3;
        //Suspects.FadeScreen.OnEnd = true;
        var caseOutTime = this.time.events.add(Phaser.Timer.SECOND* 0.5, this.caseOut, this);
    }, 
    
    caseOut: function()
    {
        this.caseClosed.visible = true;
        var tween = this.add.tween(this.caseClosed.scale).to( { x: 0.6, y: 0.6 }, 500, Phaser.Easing.Linear.None, true);
        this.buttonManager.createButton(this.world.width*0.8, this.world.height*0.9, 'NextLevel', this.buttonManager.GoToLevel2);
    },
    
    destroyItems: function()
    {
        this.suspectGroup.destroy();
        this.gameBackground.destroy();
        this.reference.destroy();
        this.timeManager.timeBar.destroy();
        this.pause.destroy();
    }
}