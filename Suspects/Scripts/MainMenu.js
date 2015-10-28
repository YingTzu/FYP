Suspects.MainMenu = function(game)
{
    this.mainmenuBackground = null;
    this.uiManager = null;
    this.buttonManager = null;
};

Suspects.MainMenu.prototype = 
{
    create: function()
    {
        //Screen Background
        this.mainmenuBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'MainMenuBackGround');
        this.mainmenuBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.5, 'StartGame', this.buttonManager.GoToTutorial);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        Suspects.FadeScreen.update(this.buttonManager.gametype);
    }
};