theGame.Preloader = function(game)
{
    this.background = null;
    this.preloadBar = null;
    this.PreloadBarempty = null;
    this.preloadBar = null;
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
        
        //Draw Loading bar
        this.preloadBarEmpty = this.add.sprite(this.world.width*0.2, this.world.height*0.6, 'LoadingBar');
        this.preloadBar = this.add.sprite(this.world.width*0.2, this.world.height*0.6, 'LoadingBarCover');
        //use this.preloadbar as a sprite for loadingbar
        this.load.setPreloadSprite(this.preloadBar);
        
        //Imagae Assets preload here
        //Background
        this.load.image('MainMenuBackGround', 'Assets/images/mainmenu.png');
        this.load.image('GameBackGround', 'Assets/images/game.png');
        this.load.image('ToturialBackGround', 'Assets/images/tutorial.png');
        
        //button
        this.load.spritesheet('StartGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.spritesheet('StartButton', 'Assets/images/Start_button.png', 455, 188);
        this.load.image('SkipButton', 'Assets/images/skipButton.png');
        
        //Suspects
        this.load.image('Suspect1', 'Assets/images/suspects/suspect_1.png');
        this.load.image('Suspect2', 'Assets/images/suspects/suspect_2.png');
        this.load.image('Suspect3', 'Assets/images/suspects/suspect_3.png');
        
        //Images
        this.load.image('Correct', 'Assets/images/correct.png');
        this.load.image('Wrong', 'Assets/images/wrong.png')
        this.load.image('JailRailing', 'Assets/images/jail.png');
        
        //Time Bar
        this.load.image('Timer', 'Assets/images/timer.png');
        
        //UI
        this.load.image('Pause', 'Assets/images/pause.png');
        
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