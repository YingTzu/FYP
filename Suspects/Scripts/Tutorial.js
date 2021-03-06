Suspects.Tutorial = function(game)
{
    this.uiManager = null;
    this.buttonManager = null;
    this.suspectsManager = null;
    this.soundManager = null;
    
    this.toturialBackground = null;
    this.tutorial1 = null;
    this.tutorial2 = null;
    this.tutorial3 = null;
    this.tutorial4 = null;
    
    this.gray = null;
    this.reference = null;
    this.correct = null;
    this.wrong = null;
    this.jailBar = null;
    this.glowing = null;
    
    this.suspectGroup = null;
};

Suspects.Tutorial.prototype = 
{
    create: function()
    {
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        this.glowing = this.add.sprite(this.world.width*0.4, this.world.height*0.81, 'Glowing');
        this.glowing.anchor.set(0.5,0.5);
        this.glowing.scale.setTo(0.3,0.28);
        this.glowing.visible = false;
        
        this.suspectGroup = this.add.group();
        
        for(i = 0; i < 2; i++)
        {
            this.suspectsManager = new SuspectsManager(this);
            this.suspectsManager.create(this.world.width*0.4+200*i, this.world.height*0.777, i);
            this.suspectGroup.add(this.suspectsManager.theSuspects);
        }
  
        this.correct = this.add.sprite(this.world.width*0.41, this.world.height*0.4, 'Correct');
        this.correct.anchor.set(0.5,0.5);
        this.correct.scale.setTo(0.4, 0.4);
        this.correct.visible = false;
        
        this.wrong = this.add.sprite(this.world.width*0.61, this.world.height*0.4, 'Wrong');
        this.wrong.anchor.set(0.5,0.5);
        this.wrong.scale.setTo(0.5, 0.5);
        this.wrong.visible = false;
        
        this.tutorial3 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial3');
        this.tutorial3.anchor.set(0.5,0.5);
        this.tutorial3.visible = false;
        this.tutorial3.inputEnabled = true;
        this.tutorial3.events.onInputDown.add(this.tutor3Click, this);
        
        this.tutorial2 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial2');
        this.tutorial2.anchor.set(0.5,0.5);
        this.tutorial2.visible = false;
        this.tutorial2.inputEnabled = true;
        this.tutorial2.events.onInputDown.add(this.tutor2Click, this);
        
        this.reference = this.add.sprite(this.world.width*0.815, this.world.height*0.435, 'TutorialReference');
        this.reference.anchor.set(0.5,0.5);
        this.reference.visible = false;
        
        this.tutorial1 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial1');
        this.tutorial1.anchor.set(0.5,0.5);
        this.tutorial1.inputEnabled = true;
        this.tutorial1.events.onInputDown.add(this.tutor1Click, this);
        
        this.gray = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'TutorialGary');
        this.gray.anchor.set(0.5,0.5);
        this.gray.visible = false;
        
        this.jailBar = this.add.sprite(this.world.width*0.5, -this.world.height*0.5, 'JailBar');
        this.jailBar.anchor.set(0.5,0.5);
        
        this.soundManager = new SoundManager(this);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        this.suspectCheck();
        
        Suspects.FadeScreen.update(this.buttonManager.gametype);
        
        if(this.buttonManager.clicked == true)
        {
            this.buttonManager.DestroyButton();
        }
    },
    
    tutor1Click: function()
    {
        this.tutorial1.destroy();
        this.tutorial2.visible = true;
        this.reference.visible = true;
        var tween = this.add.tween(this.reference.scale).to( { x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Linear.None, true);
    },
    
    tutor2Click: function()
    {
        this.tutorial2.destroy();
    },
    
    tutor3Click: function()
    {
        this.tutorial3.inputEnabled = false;
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.9, 'StartGame', this.buttonManager.StartGame);
    },

    suspectCheck: function()
    { 
        //check clicking of each suspect
        this.suspectGroup.forEach(function(suspects)
        {
            //if suspects is clicked and never click before
            if(suspects.clicked == true && this.suspectsManager.isClicked == false)
            {   
                this.soundManager.createSound('ChooseSFX');
                suspects.clicked == false;
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
        this.gray.visible = true;
        this.correct.visible = true;
        this.glowing.visible = true;
        var garyTime = this.time.events.add(Phaser.Timer.SECOND* 2, this.correctDisappear, this);
        this.suspectsManager.isClicked = true;
    }, 
    
    correctDisappear: function()
    {
        this.gray.visible = false;
        this.correct.visible = false;
        this.glowing.visible = false;
        var tween = null;
        tween = this.add.tween(this.jailBar).to({y: this.world.height*0.5 },800, Phaser.Easing.linear, true);
        tween.onComplete.add(this.whenDown, this);
    },
    
    wrongSuspect: function()
    {
        this.wrong.visible = true;
        var wrongTime = this.time.events.add(Phaser.Timer.SECOND* 1, this.wrongVisible, this);
    }, 
                                                    
    wrongVisible: function()
    {
        this.wrong.visible = false;
    }, 
    
    whenDown: function()
    {
        this.reference.destroy();
        this.jailBar.destroy();
        this.suspectGroup.destroy();
        this.tutorial3.visible = true;
    }
}