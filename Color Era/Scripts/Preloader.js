theGame.Preloader = function(game)
{
    this.background = null;
    
    this.preloadBarEmpty = null;
    this.preloadBar = null;
    
    this.tempTimeSec = 0;
    this.tempTimeMin = 0;
    this.currentLevel = 0;
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
        this.load.image('GameEndBackGround', 'Assets/images/gameEnd.png');
        
        //ThemeHint
        this.load.image('1970s', 'Assets/images/1970s.png');
        this.load.image('1980s', 'Assets/images/1980s.png');
        this.load.image('1990s', 'Assets/images/1990s.png');
        this.load.image('2000s', 'Assets/images/2000s.png');
        
        //Person & Clothes
        this.load.spritesheet('CharacterSprite', 'Assets/images/characterSprite.png', 960, 640);
        this.load.spritesheet('CharacterSprite2', 'Assets/images/characterSprite2.png', 960, 640);
        this.load.spritesheet('CharacterSprite3', 'Assets/images/characterSprite3.png', 960, 640);
        
        this.load.image('70Accessories', 'Assets/images/70s/70s_accessories.png');
        this.load.image('70Shirt', 'Assets/images/70s/70s_shirt.png');
        this.load.image('70Skirt', 'Assets/images/70s/70s_skirt.png');
        this.load.image('70Shoes', 'Assets/images/70s/70s_shoes.png');
        
        this.load.image('80Accessories', 'Assets/images/80s/80s_accessories.png');
        this.load.image('80Shirt', 'Assets/images/80s/80s_shirt.png');
        this.load.image('80Skirt', 'Assets/images/80s/80s_skirt.png');
        this.load.image('80Shoes', 'Assets/images/80s/80s_shoes.png');
        
        this.load.image('90Accessories', 'Assets/images/90s/90s_accessories.png');
        this.load.image('90Shirt', 'Assets/images/90s/90s_shirt.png');
        this.load.image('90Skirt', 'Assets/images/90s/90s_skirt.png');
        this.load.image('90Shoes', 'Assets/images/90s/90s_shoes.png');
        
        this.load.image('2000Accessories', 'Assets/images/2000s/2000s_accessories.png');
        this.load.image('2000Shirt', 'Assets/images/2000s/2000s_shirt.png');
        this.load.image('2000Skirt', 'Assets/images/2000s/2000s_skirt.png');
        this.load.image('2000Shoes', 'Assets/images/2000s/2000s_shoes.png');
        
        //UI button
        this.load.spritesheet('PlayGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('StartGameButton', 'Assets/images/startGame.png');
        this.load.image('GoParty', 'Assets/images/goParty.png');
        
        //Object button
        this.load.spritesheet('ClothesButton', 'Assets/images/clothesButtons.png', 50, 51);
        this.load.spritesheet('SkirtButton', 'Assets/images/skirtsButtons.png', 50, 54);
        this.load.spritesheet('ShoseButton', 'Assets/images/shoseButtons.png', 50, 52);
        this.load.spritesheet('SpecsButton', 'Assets/images/specsButtons.png', 50, 53);
        
        //Objects
        this.load.spritesheet('ClothesTiles', 'Assets/images/clothesIcon.png', 128, 128);
        this.load.spritesheet('SkirtTiles', 'Assets/images/skirtsIcon.png', 128, 128);
        this.load.spritesheet('GlassesTiles', 'Assets/images/glassesIcon.png', 128, 128);
        this.load.spritesheet('ShoseTiles', 'Assets/images/shoseIcon.png', 128, 128);
        
        //time bar
        this.load.image('TimeBar', 'Assets/images/timeBar.png');
        
        //Fade In/Out
        this.load.image('FadeInOut', 'Assets/images/Fade.png');
        
        //Wrong feedback
        this.load.image('ClickWrong', 'Assets/images/wrong.png');
        
        //star
        this.load.image('StarEmpty', 'Assets/images/starEmpty.png');
        this.load.image('StarFull', 'Assets/images/starFull.png');
        
        //Music
        this.load.audio('MenuMusic', 'Assets/audio/menuMusic.mp3');
        
        //SFX
        this.load.audio('CorrectSFX', 'Assets/audio/Correct_SFX.mp3');
        this.load.audio('WrongSFX', 'Assets/audio/Wrong_SFX.mp3');
        this.load.audio('ClickSFX', 'Assets/audio/IconClick_SFX.mp3');
        this.load.audio('StarSFX', 'Assets/audio/Star_SFX.mp3');
        this.load.audio('ButtonClickSFX', 'Assets/audio/ButtonClick_SFX.mp3');
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