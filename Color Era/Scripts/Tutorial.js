theGame.Tutorial = function(game)
{
    this.spriteManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    this.gameBG = null;
    
    this.tutorial1 = null;
    this.tutorial2 = null;
    this.tutorial3 = null;
    this.tutorial4 = null;
    
    this.tween = null;
    
    this.theGroup = null;
};

theGame.Tutorial.prototype = 
{
    create: function()
    {
        this.theGroup = this.add.group();
        
        //Screen Background
        this.gameBG = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBG.anchor.set(0.5,0.5);
        
        this.tutorial4 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial4');
        this.tutorial4.anchor.set(0.5,0.5);
        this.tutorial4.inputEnabled = true;
        this.tutorial4.events.onInputDown.add(this.tutor4, this);
        
        this.tutorial3 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial3');
        this.tutorial3.anchor.set(0.5,0.5);
        this.tutorial3.inputEnabled = true;
        this.tutorial3.events.onInputDown.add(this.tutor3, this);
        
        this.tutorial2 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial2');
        this.tutorial2.anchor.set(0.5,0.5);
        this.tutorial2.inputEnabled = true;
        this.tutorial2.events.onInputDown.add(this.tutor2, this);
        
        this.tutorial1 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial1');
        this.tutorial1.anchor.set(0.5,0.5);
        this.tutorial1.inputEnabled = true;
        this.tutorial1.events.onInputDown.add(this.tutor1, this);
        
        //Button
        this.buttonManager = new ButtonManager(this);
         
        this.soundManager = new SoundManager(this);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create(); 
    }, 
    
    update: function()
    {
        this.destroyFunc();
        theGame.FadeScreen.update(this.buttonManager.gametype);
    },
    
    tutor1: function()
    {
        this.tween = this.game.add.tween(this.tutorial1).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.tutorial1.inputEnabled = false;
    },
    
    tutor2: function()
    {
        this.tween = this.game.add.tween(this.tutorial2).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.tutorial2.inputEnabled = false;
    },

    tutor3: function()
    {
        this.tween = this.game.add.tween(this.tutorial3).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.tutorial3.inputEnabled = false;
    },

    tutor4: function()
    {
        this.tween = this.game.add.tween(this.tutorial4).to( { alpha: 0 }, 500, "Linear", true, 0, 0);
        this.tutorial4.inputEnabled = false;
        this.buttonManager.createButton(this.world.width*0.4, this.world.height*0.85, 'StartGameButton', this.buttonManager.StartGame);
    }, 
    
    destroyFunc: function()
    {
        if(this.buttonManager.clicked == true)
        {
            this.buttonManager.destroyButton();
            this.buttonManager.clicked = false;
        }
    }
}