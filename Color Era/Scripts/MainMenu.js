theGame.MainMenu = function(game)
{
    this.mainmenuBackground = null;
    this.open = null;
    
    this.uiManager = null;
    this.buttonManager = null;
    this.soundManager = null;
};

theGame.MainMenu.prototype = 
{
    create: function()
    {
        //Screen Background
        this.open = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'test');
        this.open.anchor.set(0.5,0.5);
        this.open.animations.add('open', [1, 2, 3]);
        
        this.mainmenuBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'MainMenuBackGround');
        this.mainmenuBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'PlayGame', this.buttonManager.GoToTutorial);
        this.buttonManager.clicked = false;
        
        this.soundManager = new SoundManager(this);
        this.soundManager.createMusic('MenuMusic');
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        theGame.FadeScreen.update(this.buttonManager.gametype);
        if(this.buttonManager.clicked == true)
        {
            this.open.animations.play('open', 4, false);
            this.soundManager.stopMusic();
        }
    }
};