Suspects.Preloader = function(game)
{
    this.background = null;
    this.preloadBar = null;
    this.PreloadBarempty = null;
    
    this.firstStar = false;
    this.secondStar = false;
};

Suspects.Preloader.prototype = 
{
    preload: function()
    {
        //sound mute
        Suspects.Game_Mute = false;
        
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
        this.load.image('GameBackGround', 'Assets/images/gameBackground.png');
        this.load.image('Toturial1', 'Assets/images/tutorial1.png');
        this.load.image('Toturial2', 'Assets/images/tutorial2.png');
        this.load.image('Toturial3', 'Assets/images/tutorial3.png');
        this.load.image('Toturial4', 'Assets/images/tutorial4.png');
        
        //button
        this.load.spritesheet('Play', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('StartGame', 'Assets/images/skipButton.png');
        this.load.image('NextLevel', 'Assets/images/nextLevel.png');
        
        //Suspects
        this.load.image('Suspect1', 'Assets/images/suspects/suspect_1.png');
        this.load.image('Suspect2', 'Assets/images/suspects/suspect_2.png');
        this.load.image('Suspect3', 'Assets/images/suspects/suspect_3.png');
        this.load.image('Lv1Suspect_1', 'Assets/images/suspects/lvl1Suspect_1.png');
        this.load.image('Lv1Suspect_2', 'Assets/images/suspects/lvl1Suspect_2.png');
        this.load.image('Lv2Suspect_1', 'Assets/images/suspects/lvl2Suspect_1.png');
        this.load.image('Lv2Suspect_2', 'Assets/images/suspects/lvl2Suspect_2.png');
        
        //Images
        this.load.image('Correct', 'Assets/images/correct.png');
        this.load.image('Wrong', 'Assets/images/wrong.png')
        this.load.image('JailRailing', 'Assets/images/jail.png');
        
        //Time Bar
        this.load.image('Timer', 'Assets/images/timeBar.png');
        
        //UI
        this.load.image('Pause', 'Assets/images/pause.png');
        this.load.image('StarEmpty', 'Assets/images/starEmpty.png');
        this.load.image('StarFull', 'Assets/images/starFull.png');
        
        //Objects
        this.load.image('TutorialReference', 'Assets/images/reference/tutorialReference2.png');
        this.load.image('Lvl1Reference', 'Assets/images/reference/lvl1Reference.png');
        
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