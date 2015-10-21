theGame.Preloader = function(game)
{
    this.background = null;
    
    this.preloadBarEmpty = null;
    this.preloadBar = null;
    
    this.tempTimeSec = 0;
    this.tempTimeMin = 0;
    this.currentLevel = 0;
    
    this.level1Secs = 0;
    this.level1Mins = 0;
    this.level2Secs = 0;
    this.level2Mins = 0;
    this.level3Secs = 0;
    this.level3Mins = 0;
    
    this.lvl1Star = 0;
    this.lvl2Star = 0;
    this.lvl3Star = 0;
    
    this.theEra = 0;
};

theGame.Preloader.prototype = 
{
    preload: function()
    {
        //Loading Screen Background
        this.background = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'LoadingScreenBackGround');
        this.background.anchor.set(0.5,0.5);
        
        //Draw Loading bar
        this.preloadBarEmpty = this.add.sprite(this.world.width*0.2, this.world.height*0.6, 'LoadingBar');
        this.preloadBar = this.add.sprite(this.world.width*0.2, this.world.height*0.6, 'LoadingBarCover'); 

        //use this.loadingBar as a sprite for loadingbar
        this.load.setPreloadSprite(this.preloadBar); 
        
        //Imagae Assets preload here
        //Background
        this.load.image('MainMenuBackGround', 'Assets/images/mainmenu.png');
        this.load.spritesheet('CurtainSprite', 'Assets/images/curtainSprite.png', 960, 640);
        this.load.spritesheet('TitleSprite', 'Assets/images/titleSprite.png', 960, 640);
        
        this.load.image('GameBackGround', 'Assets/images/game.png');
        this.load.image('Toturial1', 'Assets/images/tutorial_1.png');
        this.load.image('Toturial2', 'Assets/images/tutorial_2.png');
        this.load.image('Toturial3', 'Assets/images/tutorial_3.png');
        this.load.image('1970sHint', 'Assets/images/1970s/1970sHint.png');
        this.load.image('1980sHint', 'Assets/images/1980s/1980sHint.png');
        this.load.image('1990sHint', 'Assets/images/1990s/1990sHint.png');
        this.load.image('2000sHint', 'Assets/images/2000s/2000sHint.png');
        this.load.image('GameEndBackGround', 'Assets/images/gameEnd.png');
        this.load.image('EndSceneBackGround', 'Assets/images/endScene.png');
        
        //End Background
        this.load.image('70sEnd', 'Assets/images/1970s/70sEnd.png');
        this.load.image('80sEnd', 'Assets/images/1980s/80sEnd.png');
        this.load.image('90sEnd', 'Assets/images/1990s/90sEnd.png');
        this.load.image('2000sEnd', 'Assets/images/2000s/2000sEnd.png');
        
        //ThemeHint
        this.load.image('1970s', 'Assets/images/1970s/1970s.png');
        this.load.image('1980s', 'Assets/images/1980s/1980s.png');
        this.load.image('1990s', 'Assets/images/1990s/1990s.png');
        this.load.image('2000s', 'Assets/images/2000s/2000s.png');
        
        //Person & Clothes
        this.load.spritesheet('CharacterSprite', 'Assets/images/characterSprite.png', 960, 640);
        this.load.spritesheet('CharacterSprite2', 'Assets/images/characterSprite2.png', 960, 640);
        this.load.spritesheet('CharacterSprite3', 'Assets/images/characterSprite3.png', 960, 640);
        
        this.load.image('70Accessories', 'Assets/images/1970s/70s_accessories.png');
        this.load.image('70Shirt', 'Assets/images/1970s/70s_shirt.png');
        this.load.image('70Skirt', 'Assets/images/1970s/70s_skirt.png');
        this.load.image('70Shoes', 'Assets/images/1970s/70s_shoes.png');
        
        this.load.image('80Accessories', 'Assets/images/1980s/80s_accessories.png');
        this.load.image('80Shirt', 'Assets/images/1980s/80s_shirt.png');
        this.load.image('80Skirt', 'Assets/images/1980s/80s_skirt.png');
        this.load.image('80Shoes', 'Assets/images/1980s/80s_shoes.png');
        
        this.load.image('90Accessories', 'Assets/images/1990s/90s_accessories.png');
        this.load.image('90Shirt', 'Assets/images/1990s/90s_shirt.png');
        this.load.image('90Skirt', 'Assets/images/1990s/90s_skirt.png');
        this.load.image('90Shoes', 'Assets/images/1990s/90s_shoes.png');
        
        this.load.image('2000Accessories', 'Assets/images/2000s/2000s_accessories.png');
        this.load.image('2000Shirt', 'Assets/images/2000s/2000s_shirt.png');
        this.load.image('2000Skirt', 'Assets/images/2000s/2000s_skirt.png');
        this.load.image('2000Shoes', 'Assets/images/2000s/2000s_shoes.png');
        
        //UI button
        this.load.spritesheet('PlayGame', 'Assets/images/Play_button.png', 171, 66);
        this.load.spritesheet('StartGameButton', 'Assets/images/startGame.png');
        this.load.image('GoParty', 'Assets/images/goParty.png');
        this.load.image('NextParty', 'Assets/images/nextParty.png');
        this.load.image('EndGame', 'Assets/images/endGame.png');
        
        //Object button
        this.load.spritesheet('ClothesButton', 'Assets/images/clothesButtons.png', 50, 51);
        this.load.spritesheet('SkirtButton', 'Assets/images/skirtsButtons.png', 50, 54);
        this.load.spritesheet('ShoseButton', 'Assets/images/shoseButtons.png', 50, 52);
        this.load.spritesheet('SpecsButton', 'Assets/images/specsButtons.png', 50, 53);
        
        //Tiles 1970s - 2000s
        this.load.spritesheet('70ClothesTiles', 'Assets/images/1970s/70s_ShirtIcon.png', 128, 128);
        this.load.spritesheet('70SkirtTiles', 'Assets/images/1970s/70s_skirtIcon.png', 128, 128);
        this.load.spritesheet('70ShoseTiles', 'Assets/images/1970s/70s_shoesIcon.png', 128, 128);
        this.load.spritesheet('70AccessoriesTiles', 'Assets/images/1970s/70s_accessoriesIcon.png', 128, 128);
        
        this.load.spritesheet('80ClothesTiles', 'Assets/images/1980s/80s_ShirtIcon.png', 128, 128);
        this.load.spritesheet('80SkirtTiles', 'Assets/images/1980s/80s_skirtIcon.png', 128, 128);
        this.load.spritesheet('80ShoseTiles', 'Assets/images/1980s/80s_shoesIcon.png', 128, 128);
        this.load.spritesheet('80AccessoriesTiles', 'Assets/images/1980s/80s_accessoriesIcon.png', 128, 128);
        
        this.load.spritesheet('90ClothesTiles', 'Assets/images/1990s/90s_ShirtIcon.png', 128, 128);
        this.load.spritesheet('90SkirtTiles', 'Assets/images/1990s/90s_skirtIcon.png', 128, 128);
        this.load.spritesheet('90ShoseTiles', 'Assets/images/1990s/90s_shoesIcon.png', 128, 128);
        this.load.spritesheet('90AccessoriesTiles', 'Assets/images/1990s/90s_accessoriesIcon.png', 128, 128);
        
        this.load.spritesheet('ClothesTiles', 'Assets/images/2000s/2000s_shirtIcon.png', 128, 128);
        this.load.spritesheet('SkirtTiles', 'Assets/images/2000s/2000s_skirtIcon.png', 128, 128);
        this.load.spritesheet('ShoseTiles', 'Assets/images/2000s/2000s_shoesIcon.png', 128, 128);
        this.load.spritesheet('AccessoriesTiles', 'Assets/images/2000s/2000s_accessoriesIcon.png', 128, 128);
        
        //Fade In/Out
        this.load.image('FadeInOut', 'Assets/images/Fade.png');
        
        //Feedback
        this.load.image('ClickWrong', 'Assets/images/wrong.png');
        this.load.image('ClickCorrect', 'Assets/images/correct.png');
        this.load.image('CorrectSpeech', 'Assets/images/speech_right.png');
        this.load.image('WrongSpeech', 'Assets/images/Speech_wrong.png');
        this.load.image('GlowingTutorial', 'Assets/images/glowing.png');
        this.load.image('Glowinglevel1', 'Assets/images/glowingLevel1.png');
        
        //star
        this.load.image('StarEmpty', 'Assets/images/starEmpty.png');
        this.load.image('StarFull', 'Assets/images/starFull.png');
        
        //Music
        this.load.audio('MenuMusic', 'Assets/audio/menuMusic.mp3');
        this.load.audio('GameMusic', 'Assets/audio/gameMusic.mp3');
        
        //Time
        this.load.image('TimeTaken', 'Assets/images/TimeTaken.png');
        
        //SFX
        this.load.audio('CorrectSFX', 'Assets/audio/Correct_SFX.mp3');
        this.load.audio('WrongSFX', 'Assets/audio/Wrong_SFX.mp3');
        this.load.audio('ClickSFX', 'Assets/audio/IconClick_SFX.mp3');
        this.load.audio('StarSFX', 'Assets/audio/Star_SFX.mp3');
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