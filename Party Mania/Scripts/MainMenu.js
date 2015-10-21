theGame.MainMenu = function(game)
{
    this.mainmenuBackground = null;
    this.open = null;
    this.titleSprite = null;
    
    this.uiManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    this.btnSFX = false;
};

theGame.MainMenu.prototype = 
{
    create: function()
    {
        //Screen Background
        this.open = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'CurtainSprite');
        this.open.anchor.set(0.5,0.5);
        this.open.animations.add('open', [1, 2, 3]);
        
        this.mainmenuBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'MainMenuBackGround');
        this.mainmenuBackground.anchor.set(0.5,0.5);
        
        this.titleSprite = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'TitleSprite');
        this.titleSprite.anchor.set(0.5,0.5);
        this.titleSprite.animations.add('light', [0, 1, 2]);
        this.titleSprite.animations.play('light', 3, true);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.7, 'PlayGame', this.buttonManager.GoToTutorial);
        this.buttonManager.clicked = false;
        
        this.soundManager = new SoundManager(this);
        this.soundManager.createMusic('MenuMusic');
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        theGame.FadeScreen.update(this.buttonManager.gametype);
        if(this.buttonManager.clicked == true)
        {
            this.open.animations.play('open', 4, false);
            if(this.btnSFX == false)
            {
                this.soundManager.createSound('ClickSFX');
                this.btnSFX = true;
            }
            this.soundManager.stopMusic();
        }
    }
};