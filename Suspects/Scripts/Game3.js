Suspects.Game3 = function(game)
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
    this.starFull2 = null;
    this.starFull3 = null;
    
    this.noOfSuspect = 3;
    this.gray = null;
    
    this.suspectGroup = null;
    this.gameScene = 0;
};

Suspects.Game3.prototype = 
{
    create: function()
    {
        console.log("level3");
    
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimeBar(25, 507, 'Timer', 100);
        
        this.suspectGroup = this.add.group();
        this.suspectGroup2 = this.add.group();
        
        for(i = 0; i < this.noOfSuspect; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.26+200*i, this.world.height*0.777, i+6);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        
        for(i = 0; i < 5; i++)
        {
            this.starEmpty[i]= this.game.add.sprite(this.world.width*0.417 + 41*i, this.world.height*0.191, 'StarEmpty');
            this.starEmpty[i].anchor.set(0.5,0.5);
        }
        
        this.checkStar();
        
        this.starFull3 = this.game.add.sprite(this.starEmpty[2].x, this.starEmpty[2].y, 'StarFull');
        this.starFull3.anchor.set(0.5,0.5);
        this.starFull3.visible = false;
        
        this.pause = this.game.add.sprite(this.world.width*0.9, this.world.height*0.1, 'Pause');
        this.pause.anchor.set(0.5,0.5);
        this.pause.inputEnabled = true;
        this.pause.events.onInputDown.add(this.pauseClick, this);
        
        this.correct = this.add.sprite(this.world.width*0.5, this.world.height*0.63, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.scale.setTo(0.5, 0.5);
        this.correct.visible = false;
        
        this.wrong = this.add.sprite(this.world.width*0.5, this.world.height*0.63, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.scale.setTo(0.5, 0.5);
        this.wrong.visible = false;
        
        this.jailRailing = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailRailing');
        this.jailRailing.anchor.set(0.5,0.5);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
    }, 
    
    update: function()
    {
        //console.log(this.timeManager.timeBar.height);
        if(!this.timeManager.isPuase)
        {
            this.suspectCheck();
        }
        else
        {//game paused
        }
    },
    
    pauseClick: function()
    {
        this.timeManager.timePause();
    },
    
    checkStar: function()
    {
        if(Suspects.firstStar == true)
        {
            this.starFull = this.game.add.sprite(this.starEmpty[0].x, this.starEmpty[0].y, 'StarFull');
            this.starFull.anchor.set(0.5,0.5);
            this.starFull.visible = true;
        }
        if(Suspects.secondStar == true)
        {
            this.starFull2 = this.game.add.sprite(this.starEmpty[1].x, this.starEmpty[1].y, 'StarFull');
            this.starFull2.anchor.set(0.5,0.5);
            this.starFull2.visible = true;
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
                this.suspectsManager.isClicked = true;
                //check which suspect is clicked
                if(suspects.name == "person7")
                {
                    this.correctSuspect();
                }
                if(suspects.name == "person8")
                {
                    this.wrongSuspect();
                }
                if(suspects.name == "person9")
                {
                    this.wrongSuspect();
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
        this.starFull2.visible = true;
        Suspects.secondStar = true;
        this.tween = this.add.tween(this.starFull2.scale).to( { x: 1.01, y: 1.01 }, 1000, Phaser.Easing.Bounce.Out, true);
        this.correct.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.stopTime, this);
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
        this.timeManager.timeStop();                                                                                                                                         
        //start fade and go to next level
//        this.gameScene = 4;
//        Suspects.FadeScreen.OnEnd = true;
    }, 
    
    stopTime: function()
    {
        //start fade and go to next level
//        this.gameScene = 4;
//        Suspects.FadeScreen.OnEnd = true;
        
        this.timeManager.timeStop();
    }
}