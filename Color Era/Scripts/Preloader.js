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
//        this.load.image('Person', 'Assets/images/people.png');
//        this.load.image('PersonSad', 'Assets/images/sad_character.png');
        this.load.spritesheet('CharacterSprite', 'Assets/images/characterSprite.png', 250, 533);
        
        this.load.image('70Specs', 'Assets/images/70s_specs.png');
        this.load.image('70Shirt', 'Assets/images/70s_shirt.png');
        this.load.image('70Pants', 'Assets/images/70s_pants.png');
        this.load.image('70Shose', 'Assets/images/70s_shoes.png');
        
        //this.load.image('80Specs', 'Assets/images/80s_specs.png');
        this.load.image('80Shirt', 'Assets/images/80s_shirt.png');
        this.load.image('80Pants', 'Assets/images/80s_pants.png');
        //this.load.image('80Shose', 'Assets/images/80s_shoes.png');
        
        this.load.image('90Shirt', 'Assets/images/90s_shirt.png');
        
        this.load.image('2000Shirt', 'Assets/images/2000s_shirt.png');
        
        //UI button
        this.load.spritesheet('StartGame', 'Assets/images/Play_button.png', 196, 132);
        this.load.image('SkipButton', 'Assets/images/skipButton.png');
        
        //Object button
        this.load.spritesheet('ClothesButton', 'Assets/images/clothesButtons.png', 49, 49);
        this.load.spritesheet('PantsButton', 'Assets/images/pantsButtons.png', 49, 49);
        this.load.spritesheet('ShoseButton', 'Assets/images/shoseButtons.png', 49, 49);
        this.load.spritesheet('SpecsButton', 'Assets/images/specsButtons.png', 49, 49);
        
        //Objects
        this.load.spritesheet('ClothesTiles', 'Assets/images/clothesIcon.png', 128, 128);
        this.load.spritesheet('PantsTiles', 'Assets/images/pantsIcon.png', 128, 128);
        this.load.spritesheet('GlassesTiles', 'Assets/images/glassesIcon.png', 128, 128);
        this.load.spritesheet('ShoseTiles', 'Assets/images/shoseIcon.png', 128, 128);
        
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