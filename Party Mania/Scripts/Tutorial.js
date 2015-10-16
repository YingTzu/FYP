theGame.Tutorial = function(game)
{
    this.spriteManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    this.gameBG = null;
    
    this.tutorial1 = null;
    this.tutorial2 = null;
    this.tutorial3 = null;
    this.tutorial4 = null;
    
    this.tween = null;
    
    this.person = null;
    this.shirtImage =null;
    
    this.tileSize = 128;
    this.theTile = null;
    this.tileType  = 4;
    this.tileArray = [];
    this.tempArray = [];
    
    this.seventysTheme = true;
    this.eightysTheme = false;
    this.ninetysTheme = false;
    this.twoThousandsTheme = false;
    
    this.seventysArray = [];    //1970s
    this.eightysArray = [];     //1980s
    this.ninetysArray = [];     //199s
    this.twoThousandsArray =[]; //2000s
    
    this.clothesOpened = false;
    
    this.selectedCorrect = false;
};

theGame.Tutorial.prototype = 
{
    create: function()
    {
        console.log("Tutorial");
        //Screen Background
        this.gameBG = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBG.anchor.set(0.5,0.5);
     
        this.tutorial3 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial3');
        this.tutorial3.anchor.set(0.5,0.5);
        
        this.tutorial2 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial2');
        this.tutorial2.anchor.set(0.5,0.5);
        
        this.tutorial1 = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Toturial1');
        this.tutorial1.anchor.set(0.5,0.5);
        
        //character
        this.person = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'CharacterSprite3');
        this.person.anchor.set(0.5,0.5);
        
        //the icons
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.221, this.world.height*0.373, 'ClothesButton');
        this.spriteManager.createSkirts(this.world.width*0.221, this.world.height*0.46, 'SkirtButton');
        this.spriteManager.createShose(this.world.width*0.221, this.world.height*0.547, 'ShoseButton');
        this.spriteManager.createSpecs(this.world.width*0.221, this.world.height*0.633, 'SpecsButton');
     
        this.spriteManager.skirtInputDisable();
        this.spriteManager.shoseInputDisable();
        this.spriteManager.specsInputDisable();
        
        //set the images into different era array
        for(i = 0; i < 2; i++)
        {
            this.tempArray[i] = [];
            for(j = 0; j < 2; j++)
            {
                if(i == 0 && j == 0)
                {
                    this.seventysArray[j] = 2*i + j;
                }
                else if(i == 0 && j == 1)
                {
                    this.eightysArray[j] = 2*i + j;
                }
                else if(i == 1 && j == 0)
                {
                    this.ninetysArray[j] = 2*i + j;
                }
                else if(i == 1 && j == 1)
                {
                    this.twoThousandsArray[j] = 2*i + j;
                }
            }
        }
        
        //Button
        this.buttonManager = new ButtonManager(this);
         
        this.soundManager = new SoundManager(this);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create(); 
    }, 
    
    update: function()
    {
        this.checkOpen();
        this.whenTrue();
        theGame.FadeScreen.update(this.buttonManager.gametype);
    },
    
    checkOpen: function()
    {
        if(this.spriteManager.onClothes == true)
        {
            this.drawGrids('70ClothesTiles');
            this.spriteManager.onClothes = false;
            
            this.clothesOpened = true;
            this.tween = this.game.add.tween(this.tutorial1).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
        }
    },
    
    drawClothes: function(shirtSprite)
    {
        var tempShirt = null;
        
        //delete previous selected image
        if(this.tempShirt != null)
            this.tempShirt.destroy();
        
        this.shirtImage = this.add.sprite(this.world.width*0.5, this.world.height*0.5, shirtSprite);
        this.shirtImage.anchor.set(0.5,0.5);
        this.tempShirt = this.shirtImage;
        
    },
    
    drawGrids: function(key)
    {
        var newArray = [-1,-1,-1,-1];
        var newTile;
        
        for(i = 0; i < 2; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < 2; j++)
            {    
                if(this.tempArray[i][j] != null) //destroy the previous grid
                {
                    this.tempArray[i][j].destroy();
                }
                
                this.newTile = Math.floor(Math.random() * this.tileType);
                for(k = 0; k < 4; k++)
                {
                    while(newArray[k] ==  this.newTile) //check if random is repeat of k
                    {
                        this.newTile = Math.floor(Math.random() * this.tileType); //random again
                        
                        for(l = 0; l < 4; l++)
                        { 
                            if(newArray[l] ==  this.newTile) //if repeated, reset for loop
                                k = 0;
                        }
                    }
                }

                for(l = 0; l < 4; l++)
                {
                    if(newArray[l] == -1)
                    {
                        newArray[l] =  this.newTile; //set value into the array
                        break;
                    }
                }
                
                this.randomTile = this.newTile;
                this.theTile = this.add.sprite(315+i*this.tileSize*1.1, 250+j*this.tileSize*1.15, key);
                this.tween = this.game.add.tween(this.theTile.scale).to( { x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Bounce.Out, true);
                this.theTile.frame = this.randomTile;
                this.tileArray[i][j] = this.theTile;
                
                this.tempArray[i][j] = this.tileArray[i][j];
                
                this.theTile.anchor.setTo(0.5, 0.5);
                this.theTile.inputEnabled = true;
                this.theTile.events.onInputDown.add(this.clicked, this);
            }
        }
    },
    
    clicked: function(sprite, pointer) //check the clicking of the images
    {
        this.wearClothes(sprite);
        this.checkEraImage(sprite);
    },
    
    wearClothes: function(sprite)
    {
        if(this.clothesOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawClothes('70Shirt');
                    break;
                case 1:
                    this.drawClothes('80Shirt');
                    break;
                case 2:
                    this.drawClothes('90Shirt');
                    break;
                case 3:
                    this.drawClothes('2000Shirt');
                    break;
            }
        }
    },
    
    checkEraImage: function(sprite)
    {
        for(i = 0; i < 4; i++)
        {
            if(sprite.frame == this.seventysArray[i])
            {
                if(this.seventysTheme == true)
                {
                    this.person.frame = 2;
                    this.selectedCorrect = true;
                    this.spriteManager.shirtInputDisable();
                    this.tween = this.game.add.tween(this.tutorial2).to( { alpha: 0 }, 1000, "Linear", true, 0, 0);
                }
            }
            else if(sprite.frame == this.eightysArray[i] || 
                    sprite.frame == this.ninetysArray[i] ||
                    sprite.frame == this.twoThousandsArray[i])
            {
                this.person.frame = 1;
            }
        }
    },
    
    whenTrue: function()
    {
        //When player select the correct shirt
        if(this.selectedCorrect == true)
        {
            this.buttonManager.createButton(this.world.width*0.4, this.world.height*0.85, 'StartGameButton', this.buttonManager.StartGame);
            this.selectedCorrect = false;
            
            for(i = 0; i < 2; i++)
            {
                for(j = 0; j < 2; j++)
                {
                    this.tileArray[i][j].destroy();
                }
            }
        }
        
        if(this.buttonManager.clicked == true) 
        {
            //destroy everything except background
            this.selectedCorrect = false;
            this.shirtImage.destroy();
            this.person.destroy();
            this.spriteManager.destroySprite();
            this.buttonManager.destroyButton();
            this.buttonManager.clicked = false;
        }
    }
}