theGame.Tutorial = function(game)
{
    this.spriteManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    this.gameBG = null;
    
    this.toturial1 = null;
    this.toturial2 = null;
    this.toturial3 = null;
    this.toturial4 = null;
    
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
        
        this.toturial4 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial4');
        this.toturial4.anchor.set(0.5,0.5);
        this.toturial4.inputEnabled = true;
        this.toturial4.events.onInputDown.add(this.tutor4, this);
        
        this.toturial3 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial3');
        this.toturial3.anchor.set(0.5,0.5);
        this.toturial3.inputEnabled = true;
        this.toturial3.events.onInputDown.add(this.tutor3, this);
        
        this.toturial2 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial2');
        this.toturial2.anchor.set(0.5,0.5);
        this.toturial2.inputEnabled = true;
        this.toturial2.events.onInputDown.add(this.tutor2, this);
        
        this.toturial1 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial1');
        this.toturial1.anchor.set(0.5,0.5);
        this.toturial1.inputEnabled = true;
        this.toturial1.events.onInputDown.add(this.tutor1, this);
        
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
        this.tween = this.game.add.tween(this.toturial1).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.toturial1.inputEnabled = false;
    },
    
    tutor2: function()
    {
        this.tween = this.game.add.tween(this.toturial2).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.toturial2.inputEnabled = false;
    },

    tutor3: function()
    {
        this.tween = this.game.add.tween(this.toturial3).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.toturial3.inputEnabled = false;
    },

    tutor4: function()
    {
        this.tween = this.game.add.tween(this.toturial4).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        this.toturial4.inputEnabled = false;
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