theGame.Game3 = function(game)
{
    this.music = null;
    this.uiManager = null;
    this.spriteManager = null;
    this.timeManager = null;
    this.soundManager = null;
    
    this.gameBackground = null;
    this.person = null;
    this.shirtImage = null;
    this.skirtImage = null;
    this.shoesImage = null;
    this.accessoriesImage = null;
    this.wrongImage = null;
    this.correctImage = null;
    
    this.tileSize = 128;
    this.theTile = null;
    this.tileType  = 4;
    this.tileArray = [];
    this.tempArray = [];

    this.eraText = null;
    
    this.Era = 0;  //1: 1970s,  2: 1980s,  3: 1990s, 4: 2000s,
    this.seventysTheme = null;
    this.eightysTheme = null;
    this.ninetysTheme = null;
    this.twoThousandsTheme = null;
    
    this.seventysArray = [];    //1970s
    this.eightysArray = [];     //1980s
    this.ninetysArray = [];     //199s
    this.twoThousandsArray =[]; //2000s
    
    //check grid draw
    this.shirtOpened = false;
    this.skirtOpened = false;
    this.shoesOpened = false;
    this.accessoriesOpened = false;
    
    //check clothes wear
    this.shirtWear70 = false;
    this.skirtWear70 = false;
    this.shoesWear70 = false;
    this.accessoriesWear70 = false;
    
    this.shirtWear80 = false;
    this.skirtWear80 = false;
    this.shoesWear80 = false;
    this.accessoriesWear80 = false;
    
    this.shirtWear90 = false;
    this.skirtWear90 = false;
    this.shoesWear90 = false;
    this.accessoriesWear90 = false;
    
    this.shirtWear = false; //2000s
    this.skirtWear = false;
    this.shoesWear = false;
    this.accessoriesWear = false;
    
    //check wear correct theme of clothes
    this.shirtCorrect = false;
    this.skirtCorrect = false;
    this.specsCorrect = false;
    this.shoseCorrect = false;
    
    this.clickWrong = false;
    this.clickCorrect  = false;
    this.rightSpeech = null;
    this.wrongSpeech = null;
};

theGame.Game3.prototype = 
{
    /////////////////////////////////////////////////////
    //                    Create                       //
    /////////////////////////////////////////////////////
    create: function()
    {   
        console.log("level3");
        this.shirtWear70 = false;
        this.skirtWear70 = false;
        this.shoesWear70 = false;
        this.accessoriesWear70 = false;

        this.shirtWear80 = false;
        this.skirtWear80 = false;
        this.shoesWear80 = false;
        this.accessoriesWear80 = false;

        this.shirtWear90 = false;
        this.skirtWear90 = false;
        this.shoesWear90 = false;
        this.accessoriesWear90 = false;

        this.shirtWear = false;
        this.skirtWear = false;
        this.shoesWear = false;
        this.accessoriesWear = false;

        this.shirtCorrect = false;
        this.skirtCorrect = false;
        this.specsCorrect = false;
        this.shoseCorrect = false;

        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        //Draw character
        this.person = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'CharacterSprite3');
        this.person.anchor.set(0.5,0.5);
        
        this.wrongImage = this.add.sprite(this.world.width*0.401, this.world.height*0.51, 'ClickWrong');
        this.wrongImage.anchor.set(0.5,0.5);
        this.wrongImage.alpha = 0.0;
        
        this.correctImage = this.add.sprite(this.world.width*0.401, this.world.height*0.51, 'ClickCorrect');
        this.correctImage.anchor.set(0.5,0.5);
        this.correctImage.alpha = 0.0;
        
        //Speech
        this.rightSpeech = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'CorrectSpeech');
        this.rightSpeech.anchor.set(0.5,0.5);
        this.rightSpeech.visible = false;
     
        this.wrongSpeech = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'WrongSpeech');
        this.wrongSpeech.anchor.set(0.5,0.5);
        this.wrongSpeech.visible = false;
        
        this.buttonManager = new ButtonManager(this);
        
        //the clothes icons
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.221, this.world.height*0.373, 'ClothesButton');
        this.spriteManager.createSkirts(this.world.width*0.221, this.world.height*0.46, 'SkirtButton');
        this.spriteManager.createShose(this.world.width*0.221, this.world.height*0.547, 'ShoseButton');
        this.spriteManager.createSpecs(this.world.width*0.221, this.world.height*0.633, 'SpecsButton');
        
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
        this.randomEraFunc(3, 4);
        
        this.eraSwitch();
        
        this.timeManager = new TimeManager(this);
        this.timeManager.createTimerUp();
        
        this.soundManager = new SoundManager(this);
    },
    
    /////////////////////////////////////////////////////
    //                    Update                       //
    /////////////////////////////////////////////////////
    update: function()
    {
        this.checkOpen();
        this.destroyTheGrid();
        this.gameEndSetting();
        this.stopTiming();
        this.showWrong();
        this.showCorrect();
        theGame.FadeScreen.update(this.buttonManager.gametype);
    },
    
    randomEraFunc: function(min, max) //random a Era theme
    {
        this.Era =           this.game.rnd.integerInRange(min, max);
    },
    
    eraSwitch:  function() //check era theme
    {
        switch(this.Era)
        {
            case 3:
                this.ninetysTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '1990s');
                this.ninetysTheme.anchor.set(0.5,0.5);
                this.ninetysTheme.inputEnabled = true;
                var themeTime = this.time.events.add(Phaser.Timer.SECOND * 1, this.disableTheme, this);
                break;
            case 4:
                this.twoThousandsTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '2000s');
                this.twoThousandsTheme.anchor.set(0.5,0.5);
                this.twoThousandsTheme.inputEnabled = true;
                var themeTime = this.time.events.add(Phaser.Timer.SECOND * 1, this.disableTheme, this);
                break;
        }
    },
    
    disableTheme: function()
    {
        if(this.Era == 3)
        {
            this.ninetysTheme.inputEnabled = false;
            this.ninetysTheme.visible = false; 
        }
        if(this.Era == 4)
        {
            this.twoThousandsTheme.inputEnabled = false;
            this.twoThousandsTheme.visible = false; 
        }
    },
    
    //check the Icons are open and close
    checkOpen: function()
    {
        if(this.spriteManager.onClothes == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('ClothesTiles');
            this.spriteManager.onClothes = false;
            
            this.shirtOpened = true;
            this.skirtOpened = false;
            this.shoesOpened = false;
            this.accessoriesOpened = false;
        }
       else if(this.spriteManager.onSkirt == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('SkirtTiles');
            this.spriteManager.onSkirt = false;
            
            this.shirtOpened = false;
            this.skirtOpened = true;
            this.shoesOpened = false;
            this.accessoriesOpened = false;
        }
        else if(this.spriteManager.onAccessories == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('GlassesTiles');
            this.spriteManager.onAccessories = false;
            
            this.shirtOpened = false;
            this.skirtOpened = false;
            this.shoesOpened = false;
            this.accessoriesOpened = true;
        }
        else if(this.spriteManager.onShoes == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('ShoseTiles');
            this.spriteManager.onShoes = false;
            
            this.shirtOpened = false;
            this.skirtOpened = false;
            this.shoesOpened = true;
            this.accessoriesOpened = false;
        }
    },
    
    //check each shirt / pants / specs / shose not draw again
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
    drawPants: function(pantsSprite)
    {
        var tempPants = null;
        
        if(this.tempPants != null)
            this.tempPants.destroy();
        
        this.skirtImage = this.add.sprite(this.world.width*0.5, this.world.height*0.5, pantsSprite);
        this.skirtImage.anchor.set(0.5,0.5);
        this.tempPants = this.skirtImage;
    },
    drawSpecs: function(sprite)
    {
        var tempSpecs = null;
        
        if(this.tempSpecs != null)
            this.tempSpecs.destroy();
        
        this.accessoriesImage = this.add.sprite(this.world.width*0.5, this.world.height*0.5, sprite);
        this.accessoriesImage.anchor.set(0.5,0.5);
        this.tempSpecs = this.accessoriesImage;  
    },
    drawShose: function(sprite)
    {
        var tempShose = null;
        
        if(this.tempShose != null)
            this.tempShose.destroy();
        
        this.shoesImage = this.add.sprite(this.world.width*0.5, this.world.height*0.5, sprite);
        this.shoesImage.anchor.set(0.5,0.5);
        this.tempShose = this.shoesImage;
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
        if(this.skirtOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawPants('70Skirt');
                    this.skirtWear70 = true;
                    break;
                case 1:
                    this.drawPants('80Skirt');
                    this.skirtWear80 = true;
                    break;
                case 2:
                    this.drawPants('90Skirt');
                    this.skirtWear90 = true;
                    break;
                case 3:
                    this.drawPants('2000Skirt');
                    this.skirtWear = true;
                    break;
            }
        }
        
        if(this.shirtOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawClothes('70Shirt');
                    this.shirtWear70 = true;
                    break;
                case 1:
                    this.drawClothes('80Shirt');
                    this.shirtWear80 = true;
                    break;
                case 2:
                    this.drawClothes('90Shirt');
                    this.shirtWear90 = true;
                    break;
                case 3:
                    this.drawClothes('2000Shirt');
                    this.shirtWear = true;
                    break;
            }
        }
        if(this.accessoriesOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawSpecs('70Accessories');
                    this.accessoriesWear70 = true;
                    break;
                case 1:
                    this.drawSpecs('80Accessories');
                    this.accessoriesWear80 = true;
                    break;
                case 2:
                    this.drawSpecs('90Accessories');
                    this.accessoriesWear90 = true;
                    break;
                case 3:
                    this.drawSpecs('2000Accessories');
                    this.accessoriesWear = true;
                    break;
            }
        }
        if(this.shoesOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawShose('70Shoes');
                    this.shoesWear70 = true;
                    break;
                case 1:
                    this.drawShose('80Shoes');
                    this.shoesWear80 = true;
                    break;
                case 2:
                    this.drawShose('90Shoes');
                    this.shoesWear90 = true;
                    break;
                case 3:
                    this.drawShose('2000Shoes');
                    this.shoesWear = true;
                    break;
            } 
        }
    },
    
    checkEraImage: function(sprite)
    {
        for(i = 0; i < 4; i++)
        {
            if(sprite.frame == this.seventysArray[i]) //if clicked on 70s clothes
            {
                if(this.Era == 1) //if the era is 70s
                {
                    if(this.shirtWear70 == true) //if shirt wear
                    {
                        this.spriteManager.shirtInputDisable(); //Disable clicking of shirt sprite
                        this.shirtCorrect = true;
                    }
                    if(this.skirtWear70 == true)
                    {
                        this.spriteManager.skirtInputDisable();
                        this.skirtCorrect = true;
                    }
                     if(this.accessoriesWear70 == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                     }
                    if(this.shoesWear70 == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                    }
                    
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.rightSpeech.visible = true;
                    this.wrongSpeech.visible = false;
                }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                    this.rightSpeech.visible = false;
                    this.wrongSpeech.visible = true;
                }
                //console.log( "1970s " + sprite.frame);
            }
            else if(sprite.frame == this.eightysArray[i]) //if clicked on 80s clothes
            {
                if(this.Era == 2)
                {
                    if(this.shirtWear80 == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                    }
                    if(this.skirtWear80 == true)
                    {
                        this.spriteManager.skirtInputDisable();
                        this.skirtCorrect = true;
                    }
                     if(this.accessoriesWear80 == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                     }
                    if(this.shoesWear80 == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                    }
                    
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.rightSpeech.visible = true;
                    this.wrongSpeech.visible = false;
                }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                    this.rightSpeech.visible = false;
                    this.wrongSpeech.visible = true;
                }
            }
            else if(sprite.frame == this.ninetysArray[i]) //if clicked on 90s clothes
            {
                  if(this.Era == 3)
                  {
                    if(this.shirtWear90 == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                    }
                    if(this.skirtWear90 == true)
                    {
                        this.spriteManager.skirtInputDisable();
                        this.skirtCorrect = true;
                    }
                     if(this.accessoriesWear90 == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                     }
                    if(this.shoesWear90 == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                    }
                      
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.rightSpeech.visible = true;
                    this.wrongSpeech.visible = false;
                    this.clickCorrect = true;
                  }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                    this.rightSpeech.visible = false;
                    this.wrongSpeech.visible = true;
                }
            }
            else if(sprite.frame == this.twoThousandsArray[i]) //if clicked on 2000s clothes
            {
                 if(this.Era == 4)
                 {
                    if(this.shirtWear == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                    }
                    if(this.skirtWear == true)
                    {
                        this.spriteManager.skirtInputDisable();
                        this.skirtCorrect = true;
                    }
                     if(this.accessoriesWear == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                     }
                    if(this.shoesWear == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                    }
                     
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.rightSpeech.visible = true;
                    this.wrongSpeech.visible = false;
                    this.clickCorrect = true;
                 }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                    this.rightSpeech.visible = false;
                    this.wrongSpeech.visible = true;
                }
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
    
    showCorrect: function()
    {
        if(this.clickCorrect == true)
        {
            this.correctImage.alphain = this.game.add.tween(this.correctImage).to({alpha:1},80, Phaser.Easing.linear, true);
            if(this.correctImage.alpha >= 0.8)
            {
                this.clickCorrect = false;
            }
        }
        if(this.clickCorrect == false)
        {
            this.correctImage.alphain = this.game.add.tween(this.correctImage).to({alpha:0},80, Phaser.Easing.linear, true);
        }
    },
    
    destroyTheGrid: function()
    {
        //when shirt / pants / specs / shose is correct disable the clothes button.
        if(this.shirtCorrect == true || this.skirtCorrect == true || this.specsCorrect == true || this.shoseCorrect == true)
        {
            for(i = 0; i < 2; i++)
            {
                for(j = 0; j < 2; j++)
                {
                    this.tileArray[i][j].destroy();
                    this.shirtCorrect = false;
                    this.skirtCorrect = false;
                    this.specsCorrect = false;
                    this.shoseCorrect = false;
                }
            }
        }
    }, 
    
    stopTiming: function() //stop timing when all clothes wear
    {
        if(this.shirtWear90 == true && this.skirtWear90 == true && this.shoesWear90 == true && this.accessoriesWear90 == true
           || this.shirtWear == true && this.skirtWear == true && this.shoesWear == true && this.accessoriesWear == true)
        {
            this.timeManager.stopUpTime();
            this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'GoParty', this.buttonManager.GoToGameEnd);
        }
    },
    
    gameEndSetting: function()
    {
        if(this.buttonManager.clicked == true) 
        {
            this.buttonManager.destroyButton();
            theGame.currentLevel = 3;
        }
    }
}