theGame.MainMenu = function(game)
{
    this.mainmenuBackground = null;

    this.uiManager = null;
    this.buttonManager = null;
    this.soundManager = null;
};

theGame.MainMenu.prototype = 
{
    create: function()
    {
        //Screen Background
        this.mainmenuBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'MainMenuBackGround');
        this.mainmenuBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.5, 'StartGame', this.buttonManager.GoToTutorial);
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
            this.soundManager.stopMusic();
    }
};