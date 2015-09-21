var theGame = {};

theGame.Boot = function(game)
{
    Game_Mute: false;
    Game_Pause: false;
    Game_Quit: false;
    ScreenFader:null;
    Popup:null;
};

theGame.Boot.prototype = 
{  
    init: function ()
    {
        this.input.maxPointers = 1;

        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = false;

        if (this.game.device.desktop)
        {
            //specific settings for the screen size
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = false;
            this.game.scale.setScreenSize = true;
        }
    },
    
    preload: function ()
    {
        //Loading screen assets
        this.load.image('LoadingScreenBackGround', 'Assets/images/loading.png');
    },

    create: function ()
    {
        //Go to preloader to load assets
        this.state.start('Preloader');
    }  
};