Suspects.MainMenu = function(game)
{
    this.mainmenuBackground = null;
    this.uiManager = null;
    this.buttonManager = null;
    this.soundManager = null;
};

Suspects.MainMenu.prototype = 
{
    create: function()
    {
        //Screen Background
        this.mainmenuBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'MainMenuBackGround');
        this.mainmenuBackground.anchor.set(0.5,0.5);
        
        this.soundManager = new SoundManager(this);
        this.soundManager.createMusic('MenuMusic');
        
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.513, this.world.height*0.7, 'Play', this.buttonManager.StartGame);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        Suspects.FadeScreen.update(this.buttonManager.gametype);
        
        if(this.buttonManager.clicked == true)
        {
            this.soundManager.stopMusic();
        }
    }
};