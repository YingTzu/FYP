theGame.Preloader = function(game)
{
    this.background = null;
    
    this.preloadBarEmpty = null;
    this.preloadBar = null;
};

theGame.Preloader.prototype = 
{
    preload: function()
    {
        //sound mute
        theGame.Game_Mute = false;
        
        //Loading Screen Background
        this.background = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'LoadingScreenBackGround');
        this.background.anchor.set(0.5,0.5);
        
        //Draw Loading bar
        this.preloadBarEmpty = this.add.sprite(this.world.width*0.2, this.world.height*0.8, 'LoadingBar'); 
        this.preloadBar = this.add.sprite(this.world.width*0.2, this.world.height*0.8, 'LoadingBarCover'); 

        //use this.loadingBar as a sprite for loadingbar
        this.load.setPreloadSprite(this.preloadBar); 
        
        //Imagae Assets preload here
        //Background
        this.load.image('MainMenuBackGround', 'Assets/images/mainmenu.png');
        this.load.image('GameBackGround', 'Assets/images/game.png');
        this.load.image('ToturialBackGround', 'Assets/images/tutorial.png');
        
        //Person & Clothes
        this.load.image('Person', 'Assets/images/people.png');
        
        this.load.image('70Hat', 'Assets/images/hat.png');
        this.load.image('70Clothes', 'Assets/images/clothes.png');
        this.load.image('70Pants', 'Assets/images/pants.png');
        
        this.load.image('80Hat', 'Assets/images/hat2.png');
        this.load.image('80Clothes', 'Assets/images/clothes2.png');
        this.load.image('80Pants', 'Assets/images/pants2.png');
        
        //button
        this.load.spritesheet('StartGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('SkipButton', 'Assets/images/skipButton.png');
        
        //Objects
        this.load.spritesheet('tiles', 'Assets/images/phaser_tiles.png', 64, 64);
        //time bar
        this.load.image('TimeBar', 'Assets/images/timeBar.png');
        
        //Fade In/Out
        this.load.image('FadeInOut', 'Assets/images/Fade.png');
    }, 
    
    create: function()
    {
        this.preloadBar.cropEnabled = false;
        this.state.start('MainMenu');
    },
    
    update: function()
    {
        
    }
};