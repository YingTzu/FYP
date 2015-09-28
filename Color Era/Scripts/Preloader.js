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
        
        this.load.image('70Hat', 'Assets/images/70hat.png');
        this.load.image('70Glasses', 'Assets/images/70glasses.png');
        this.load.image('70Clothes', 'Assets/images/70clothes.png');
        this.load.image('70Watch', 'Assets/images/70watch.png');
        this.load.image('70Pants', 'Assets/images/70pants.png');
        this.load.image('70Shose', 'Assets/images/70shose.png');
        
        this.load.image('80Hat', 'Assets/images/80hat.png');
        this.load.image('80Glasses', 'Assets/images/80glasses.png');
        this.load.image('80Clothes', 'Assets/images/80clothes.png');
        this.load.image('80Watch', 'Assets/images/80watch.png');
        this.load.image('80Pants', 'Assets/images/80pants.png');
        this.load.image('80Shose', 'Assets/images/80shose.png');
        
        //button
        this.load.spritesheet('StartGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('SkipButton', 'Assets/images/skipButton.png');
        
        //Objects
        this.load.spritesheet('tiles', 'Assets/images/clothesIcon.png', 128, 128);
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