theGame.Tutorial = function(game)
{
    this.spriteManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    
    this.toturialBackground = null;
    this.person = null;
    this.shirtImage =null;
    this.wrongImage = null;
    
    this.tileSize = 128;
    this.theTile = null;
    this.tileType  = 4;
    this.tileArray = [];
    this.tempArray = [];
    
    this.seventysTheme = true;
    
    this.seventysArray = [];    //1970s
    this.eightysArray = [];     //1980s
    this.ninetysArray = [];     //199s
    this.twoThousandsArray =[]; //2000s
    
    this.clothesOpened = false;
    this.selectedCorrect = false;
    this.clickWrong = false;
};

theGame.Tutorial.prototype = 
{
    create: function()
    {
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        //character
        this.person = this.add.sprite(this.world.width*0.83, this.world.height*0.59, 'CharacterTutorial');
        this.person.anchor.set(0.5,0.5);
        
        //Wrong effect
        this.wrongImage = this.add.sprite(this.world.width*0.401, this.world.height*0.51, 'ClickWrong');
        this.wrongImage.anchor.set(0.5,0.5);
        this.wrongImage.alpha = 0.0;
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        //the shirt icon
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.22, this.world.height*0.375, 'ClothesButton');
        
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
        
        this.soundManager = new SoundManager(this);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create(); 
    }, 
    
    update: function()
    {
        this.checkOpen();
        this.whenTrue();
        this.showWrong();
        
        theGame.FadeScreen.update(this.buttonManager.gametype);
    },
    
    checkOpen: function()
    {
        if(this.spriteManager.onClothes == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('ClothesTiles');
            this.spriteManager.onClothes = false;
            
            this.clothesOpened = true;
        }
    },
    
    drawClothes: function(shirtSprite)
    {
        var tempShirt = null;
        
        //delete previous selected image
        if(this.tempShirt != null)
            this.tempShirt.destroy();
        
        this.shirtImage = this.add.sprite(this.world.width*0.83, this.world.height*0.6, shirtSprite);
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
                if(this.tempArray[i][j] != null)
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
                this.theTile.frame = this.randomTile;
                this.tileArray[i][j] = this.theTile;

                this.tempArray[i][j] = this.tileArray[i][j];
                
                this.theTile.anchor.setTo(0.5, 0.5);
                if(this.selectedCorrect == false)
                {
                    this.theTile.inputEnabled=true;
                    this.theTile.events.onInputDown.add(this.clicked, this);
                }
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
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.spriteManager.shirtInputDisable();
                    this.person.frame = 2;
                    this.selectedCorrect = true;
                    this.clickWrong = false;
                }
            }
            else if(sprite.frame == this.eightysArray[i] || 
                    sprite.frame == this.ninetysArray[i] ||
                    sprite.frame == this.twoThousandsArray[i])
            {
                //check wrong
                this.soundManager.createSound('WrongSFX');
                this.clickWrong = true;
                this.person.frame = 1;
            }
        }
    },
    
    showWrong: function()
    {
        if(this.clickWrong == true)
        {
            this.wrongImage.alphain = this.game.add.tween(this.wrongImage).to({alpha:1},50, Phaser.Easing.linear, true);
            if(this.wrongImage.alpha >= 0.8)
            {
                this.clickWrong = false;
            }
        }
        if(this.clickWrong == false)
        {
            this.wrongImage.alphain = this.game.add.tween(this.wrongImage).to({alpha:0},50, Phaser.Easing.linear, true);
        }
    },
    
    whenTrue: function()
    {
        //When player select the correct shirt
        if(this.selectedCorrect == true)
        {
            this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'SkipButton', this.buttonManager.StartGame);
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
            this.selectedCorrect = false;
            this.shirtImage.destroy();
            this.person.destroy();
            this.spriteManager.destroySprite();
            this.buttonManager.destroyButton();
        }
    }
}