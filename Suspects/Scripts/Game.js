Suspects.Game = function(game)
{
    this.timeManager = null;
    this.suspectsManager = null;
    
    this.gameBackground = null;
    this.pause = null;
    this.correct = null;
    this.wrong = null;
    this.jailRailing = null;
    
    this.noOfSuspect = 2;
    this.gray = null;
    
    this.starEmpty = [];
    this.starFull = null;
    this.suspectGroup = null;
    
    this.gameScene = 0;
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
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(this.world.width*0.35 + 50*i, this.world.height*0.15, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
            //this.starEmpty[i].visible = false;
        }
        
        this.starFull = this.game.add.sprite(this.starEmpty[0].x, this.starEmpty[0].y, 'StarFull');
        this.starFull.anchor.set(0.5,0.5);
        this.starFull.visible = false;
        
        this.pause = this.game.add.sprite(this.world.width*0.9, this.world.height*0.1, 'Pause');
        this.pause.anchor.set(0.5,0.5);
        this.pause.inputEnabled = true;
        this.pause.events.onInputDown.add(this.pauseClick, this);
        
        this.correct = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.visible = false;
        
        this.wrong = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.visible = false;
        
        this.jailRailing = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailRailing');
        this.jailRailing.anchor.set(0.5,0.5);
        
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
        
        Suspects.FadeScreen.update(this.gameScene);
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
        this.correct.visible = true;
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.correctVisible, this);
        this.suspectsManager.isClicked = true;
    }, 
                                                    
    correctVisible: function()
    {
        this.starFull.visible = true;
        Suspects.firstStar = true;
        this.tween = this.add.tween(this.starFull.scale).to( { x: 1.01, y: 1.01 }, 1000, Phaser.Easing.Bounce.Out, true);
        this.correct.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDown, this);
    },
    
    wrongSuspect: function()
    {
        this.wrong.visible = true;
        var wrongTime = this.time.events.add(Phaser.Timer.SECOND* 1, this.wrongVisible, this);
        this.suspectsManager.isClicked = true;
    }, 
                                                    
    wrongVisible: function()
    {
        this.wrong.visible = false;
        
        //start fade and go to next level
        this.gameScene = 3;
        Suspects.FadeScreen.OnEnd = true;
    }, 
    
    whenDown: function()
    {
        //start fade and go to next level
        this.gameScene = 3;
        Suspects.FadeScreen.OnEnd = true;
        
        //this.suspectGroup.destroy();
        this.timeManager.timeStop();
    }
}