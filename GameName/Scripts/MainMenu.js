theGame.MainMenu = function(game)
{
    this.mainmenuBackground = null;
    //this.music = null;
    this.uiManager = null;
    this.buttonManager = null;
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
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.5, 'StartGame', 1);
        
//        this.cursor = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Cursor');
//        this.cursor.anchor.set(0.5,0.5);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
//        this.cursor.x = this.game.input.mousePointer.x;
//        this.cursor.y = this.game.input.mousePointer.y;
        theGame.FadeScreen.update(this.buttonManager.gametype);
    }, 
};