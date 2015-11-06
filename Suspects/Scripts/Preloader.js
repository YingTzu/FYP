Suspects.Preloader = function(game)
{
    this.background = null;
    this.preloadBar = null;
    this.PreloadBarempty = null;
    
    this.firstStar = false;
    this.secondStar = false;
    this.thirdStar = false;
    this.fourthStar = false;
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
        this.preloadBarEmpty = this.add.sprite(this.world.width*0.2, this.world.height*0.4, 'LoadingBar');
        this.preloadBar = this.add.sprite(this.world.width*0.2, this.world.height*0.4, 'LoadingBarCover');
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
        this.load.image('EndScene', 'Assets/images/endScene.png');
        
        //Gray
        this.load.image('TutorialGary', 'Assets/images/tutorialGary.png');
        this.load.image('Lvl1Gray', 'Assets/images/lvl1Gray.png');
        this.load.image('Lvl2Gray', 'Assets/images/lvl2Gray.png');
        this.load.image('Lvl3Gray', 'Assets/images/lvl3Gray.png');
        this.load.image('Lvl4Gray', 'Assets/images/lvl4Gray.png');
        this.load.image('Lvl5Gray', 'Assets/images/lvl5Gray.png');
      
        //button
        this.load.spritesheet('Play', 'Assets/images/Play_button.png', 320, 382);
        this.load.spritesheet('StartGame', 'Assets/images/startButton.png', 267, 79);
        
        //Suspects
        this.load.spritesheet('Suspect1', 'Assets/images/suspects/suspect_1.png', 521, 1083);
        this.load.spritesheet('Suspect2', 'Assets/images/suspects/suspect_2.png', 521, 1083);
        
        this.load.spritesheet('Lv1Suspect_1', 'Assets/images/suspects/lvl1Suspect_1.png', 521, 1083);
        this.load.spritesheet('Lv1Suspect_2', 'Assets/images/suspects/lvl1Suspect_2.png', 521, 1083);
        
        this.load.spritesheet('Lv2Suspect_1', 'Assets/images/suspects/lvl2Suspect_1.png', 521, 1083);
        this.load.spritesheet('Lv2Suspect_2', 'Assets/images/suspects/lvl2Suspect_2.png', 521, 1205);
        
        this.load.spritesheet('Lv3Suspect_1', 'Assets/images/suspects/lvl3Suspect_1.png', 521, 1083);
        this.load.spritesheet('Lv3Suspect_2', 'Assets/images/suspects/lvl3Suspect_2.png', 521, 1083);
        this.load.spritesheet('Lv3Suspect_3', 'Assets/images/suspects/lvl3Suspect_3.png', 521, 1083);
        
        this.load.spritesheet('Lv4Suspect_1', 'Assets/images/suspects/lvl4Suspect_1.png', 521, 1052);
        this.load.spritesheet('Lv4Suspect_2', 'Assets/images/suspects/lvl4Suspect_2.png', 521, 1049);
        this.load.spritesheet('Lv4Suspect_3', 'Assets/images/suspects/lvl4Suspect_3.png', 521, 1083);
        
        this.load.spritesheet('Lv5Suspect_1', 'Assets/images/suspects/lvl5Suspect_1.png', 521, 1023);
        this.load.spritesheet('Lv5Suspect_2', 'Assets/images/suspects/lvl5Suspect_2.png', 521, 1001);
        this.load.spritesheet('Lv5Suspect_3', 'Assets/images/suspects/lvl5Suspect_3.png', 521, 1003);
        this.load.spritesheet('Lv5Suspect_4', 'Assets/images/suspects/lvl5Suspect_4.png', 521, 964);
        
        //Images
        this.load.image('Correct', 'Assets/images/correct.png');
        this.load.image('Wrong', 'Assets/images/wrong.png');
        this.load.image('JailRailing', 'Assets/images/jail.png');
        this.load.image('CaseClosed', 'Assets/images/caseClosed.png');
        this.load.image('CaseFailed', 'Assets/images/caseFailed.png');
        this.load.image('GamePaused', 'Assets/images/gamePause.png');
        
        //Time Bar
        this.load.image('Timer', 'Assets/images/timeBar.png');
        
        //UI
        this.load.image('Pause', 'Assets/images/pause.png');
        this.load.image('StarEmpty', 'Assets/images/starEmpty.png');
        this.load.image('StarFull', 'Assets/images/starFull.png');
        
        //Objects
        this.load.image('TutorialReference', 'Assets/images/reference/tutorialReference.png');
        this.load.image('Lvl1Reference', 'Assets/images/reference/lvl1Reference.png');
        this.load.image('Lvl2Reference', 'Assets/images/reference/lvl2Reference.png');
        this.load.image('Lvl3Reference', 'Assets/images/reference/lvl3Reference.png');
        this.load.image('Lvl4Reference', 'Assets/images/reference/lvl4Reference.png');
        this.load.image('Lvl5Reference', 'Assets/images/reference/lvl5Reference.png');
        
         //Music
        this.load.audio('MenuMusic', 'Assets/audio/menuMusic.mp3');
        this.load.audio('GameMusic', 'Assets/audio/gameMusic.mp3');
        
        //SFX
        this.load.audio('ChopSFX', 'Assets/audio/Chop_SFX.mp3');
        
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