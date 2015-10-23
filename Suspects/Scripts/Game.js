theGame.Game = function(game)
{
    this.timeManager = null;
    this.suspectsManager = null;
    
    this.gameBackground = null;
    this.pause = null;
    this.correct = null;
    this.jailRailing = null;
    
    this.suspect1 = 0;
    this.suspect2 = 1;
    this.suspect3 = 2;
    
    this.gray = null;
};

theGame.Game.prototype = 
{
    create: function()
    {
        console.log("game");
        
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimeBar(40, 600, 'Timer', 50);
        
        this.suspectsManager = new SuspectsManager(this);
        this.suspectsManager.create(this.world.width*0.3, this.world.height*0.65, this.suspect1);
        
        this.suspectsManager = new SuspectsManager(this);
        this.suspectsManager.create(this.world.width*0.5, this.world.height*0.65, this.suspect2);
        
        this.suspectsManager = new SuspectsManager(this);   
        this.suspectsManager.create(this.world.width*0.7, this.world.height*0.65, this.suspect3);
        
        this.pause = this.game.add.sprite(this.world.width*0.9, this.world.height*0.1, 'Pause');
        this.pause.anchor.set(0.5,0.5);
        this.pause.inputEnabled = true;
        this.pause.events.onInputDown.add(this.pauseClick, this);
        
        this.correct = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.visible = false;
        
        this.jailRailing = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailRailing');
        this.jailRailing.anchor.set(0.5,0.5);
    }, 
    
    update: function()
    {
        this.suspectCheck();
        console.log(this.suspectsManager.lvlOneCorrect);
    },
    
    pauseClick: function()
    {
        this.timeManager.timePause();
    },
    
    suspectCheck: function()
    { 
        if(this.suspectsManager.lvlOneCorrect == true)
        {
            this.correctSuspect();
        }
        else
        {
        }
    }, 
    
    correctSuspect: function()
    {
        //star +1
        this.suspectsManager.lvlOneCorrect = false;
        this.correct.visible = true;
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 3, this.correctVisible, this);
    }, 
                                                    
    correctVisible: function()
    {
        this.correct.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDwon, this);
    }, 
    
    whenDwon: function()
    {
        this.timeManager.timeStop();
    }
}