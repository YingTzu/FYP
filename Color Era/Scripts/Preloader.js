theGame.Preloader = function(game)
{
    this.background = null;
    this.preloadBar = null;
    this.PreloadBarempty = null;
    this.preloadCover = null;
    this.ready = false;
};

theGame.Preloader.prototype = 
{
    preload: function()
    {
        //sound mute
        theGame.Game_Mute = false;
        
        //Loading Screen Background
        this.preloadCover = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'LoadingScreenBackGround');
        this.preloadCover.anchor.set(0.5,0.5);
        
        //Empty Loading bar
        
        //Loading bar
        
        //this.load.setPreloadSprite(this.preloadBar); //use this.preloadbar as a sprite for loadingbar
        
        //Imagae Assets preload here
        //Background
        this.load.image('MainMenuBackGround', 'Assets/images/mainmenu.png');
        this.load.image('GameBackGround', 'Assets/images/game.png');
        this.load.image('ToturialBackGround', 'Assets/images/tutorial.png');
        
        //button
        this.load.spritesheet('StartGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('SkipButton', 'Assets/images/skipButton.png');
        
        //Objects
        this.load.spritesheet('tiles', 'assets/images/phaser_tiles.png', 64, 64);
        
        //Tiles
       // this.load.tilemap('map', 'assets/tilemaps/level1.csv', null, Phaser.Tilemap.CSV);
        
        //Fade In/Out
        this.load.image('FadeInOut', 'Assets/images/Fade.png');
    }, 
    
    create: function()
    {
        this.state.start('MainMenu');
    },
    
    update: function()
    {
        
    }
};