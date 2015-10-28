theGame.Game = function(game)
{
    this.timeManager = null;
    this.suspectsManager = null;
    
    this.gameBackground = null;
    this.pause = null;
    this.correct = null;
    this.wrong = null;
    this.jailRailing = null;
    this.starEmpty = [];
    this.starFull = null;
    
    this.noOfSuspect = 0;
    this.gray = null;
    
    this.suspectGroup = null;
    
    this.level = 1;
};

theGame.Game.prototype = 
{
    create: function()
    {
        console.log("game");
        
        this.switchLevel(this.level);
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimeBar(40, 600, 'Timer', 100);
        
        this.suspectGroup = this.add.group();
        this.suspectGroup2 = this.add.group();
        
        for(i = 0; i < this.noOfSuspect; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(250+this.world.width*0.2 * i, this.world.height*0.65, i);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(250+this.world.width*0.1 * i, this.world.height*0.2, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
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
        theGame.FadeScreen = new FadeManager(this);
    }, 
    
    update: function()
    {
        //console.log(this.timeManager.timeBar.height);
        if(!this.timeManager.isPuase)
        {
            this.levelOneSuspectCheck();
            this.switchLevel(this.level);
        }
        else
        {//game paused
        }
    },
    
    pauseClick: function()
    {
        this.timeManager.timePause();
    },
    
    switchLevel: function(level)
    {
        switch(level)
        {
            case 1:
                {
                    this.noOfSuspect = 3;
                }
                break;
            case 2:
                {
                    this.noOfSuspect = 4;
                    for(i = 0; i < this.noOfSuspect; i++)
                    {
                        this.suspectsManager = new SuspectsManager(this);
                        this.suspectsManager.create(200+this.world.width*0.2 * i, this.world.height*0.65, i);
                        this.suspectGroup2.add(this.suspectsManager.theSuspects);
                    }
                }
                break;
        }
    },
    
    levelOneSuspectCheck: function()
    { 
        //check clicking of each suspect
        this.suspectGroup.forEach(function(Suspects)
        {
            //if suspects is clicked and never click before
            if(Suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                this.suspectsManager.isClicked = true;
                //check which suspect is clicked
                if(Suspects.name == "person0")
                {
                    this.correctSuspect();
                }
                if(Suspects.name == "person1")
                {
                    this.wrongSuspect();
                }
                if(Suspects.name == "person2")
                {
                    this.wrongSuspect();
                }
                Suspects.clicked = false;
            }
        },this);
    },
    
//    createLvlTwoSuspects: function()
//    {
//        if(this.level == 2)
//        {
//            
//        }
//    },
    
    correctSuspect: function()
    {
        //star +1
        this.correct.visible = true;
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 3, this.correctVisible, this);
        this.suspectsManager.isClicked = true;
    }, 
                                                    
    correctVisible: function()
    {
        this.starFull.visible = true;
        this.tween = this.add.tween(this.starFull.scale).to( { x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Bounce.Out, true);
        this.correct.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.stopTime, this);
    },
    
    wrongSuspect: function()
    {
        this.wrong.visible = true;
        var wrongTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.wrongVisible, this);
        this.suspectsManager.isClicked = true;
    }, 
                                                    
    wrongVisible: function()
    {
        this.suspectGroup.destroy();
        this.wrong.visible = false;
        this.level = 2;
    }, 
    
    stopTime: function()
    {
        this.suspectGroup.destroy();
        this.timeManager.timeStop();
        this.level = 2;
        this.jailRailing.position.y = -this.world.height*0.5;
    }
}