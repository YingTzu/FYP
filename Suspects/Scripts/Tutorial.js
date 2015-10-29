Suspects.Tutorial = function(game)
{
    this.toturialBackground = null;
    this.uiManager = null;
    this.buttonManager = null;
    this.suspectsManager = null;
    
    this.arrow = null;
    this.correct = null;
    this.wrong = null;
    this.jailRailing = null;
    this.suspectGroup = null;
};

Suspects.Tutorial.prototype = 
{
    create: function()
    {
        console.log("tutorial");
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        this.suspectGroup = this.add.group();
        
        for(i = 0; i < 2; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.4+200*i, this.world.height*0.65, i);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
        //this.arrow = this.add.sprite(this.world.width*0.75, this.world.height*0.6, 'Arrow');
        //var tween = this.add.tween(this.arrow.scale).to( { x: 1.1, y: 1.1 }, 700, Phaser.Easing.Linear.None, true).loop(true);
        
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
        this.suspectCheck();
        Suspects.FadeScreen.update(this.buttonManager.gametype);
    },

    suspectCheck: function()
    { 
        //check clicking of each suspect
        this.suspectGroup.forEach(function(suspects)
        {
            //if suspects is clicked and never click before
            if(suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                //check which suspect is clicked
                if(suspects.name == "person0")
                {
                    this.correctSuspect();
                }
                if(suspects.name == "person1")
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
        var correctTime = this.time.events.add(Phaser.Timer.SECOND* 3, this.correctVisible, this);
        this.suspectsManager.isClicked = true;
    }, 
                                                    
    correctVisible: function()
    {
        this.correct.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailRailing).to({y: this.world.height*0.5 },1000, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDown, this);
    },
    
    wrongSuspect: function()
    {
        this.wrong.visible = true;
        var wrongTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.wrongVisible, this);
    }, 
                                                    
    wrongVisible: function()
    {
        this.wrong.visible = false;
    }, 
    
    whenDown: function()
    {
        this.buttonManager.createButton(this.world.width*0.2, this.world.height*0.9, 'SkipButton', this.buttonManager.StartGame);
    }
}