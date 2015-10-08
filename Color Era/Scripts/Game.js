theGame.Game = function(game)
{
    this.music = null;
    this.uiManager = null;
    this.spriteManager = null;
    this.timeManager = null;
    this.soundManager = null;
    
    this.gameBackground = null;
    this.person = null;
    this.shirtImage = null;
    this.pantsImage = null;
    this.specsImage = null;
    this.shoseImage = null;
    this.wrongImage = null;
    
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
    this.hatArray = [];
    
    //check grid draw
    this.clothesOpened = false;
    this.pantsOpened = false;
    this.specsOpened = false;
    this.shoseOpened = false;
    
    //check clothes wear
    this.shirtWear = false;
    this.pantsWear = false;
    this.specsWear = false;
    this.shoseWear = false;
    
    //check wear correct theme of clothes
    this.shirtCorrect = false;
    this.pantsCorrect = false;
    this.specsCorrect = false;
    this.shoseCorrect = false;
    
    this.correctShirtTheme = false;
    this.correctPantsTheme = false;
    this.correctSpecsTheme = false;
    this.correctShoseTheme = false;
    
    this.clickWrong = false;
};

theGame.Game.prototype = 
{
    /////////////////////////////////////////////////////
    //                    Create                       //
    /////////////////////////////////////////////////////
    create: function()
    {   
        this.shirtWear = false;
        this.pantsWear = false;
        this.specsWear = false;
        this.shoseWear = false;

        this.shirtCorrect = false;
        this.pantsCorrect = false;
        this.specsCorrect = false;
        this.shoseCorrect = false;

        this.correctShirtTheme = false;
        this.correctPantsTheme = false;
        this.correctSpecsTheme = false;
        this.correctShoseTheme = false;
        
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        //Draw character
        this.person = this.add.sprite(this.world.width*0.83, this.world.height*0.59, 'CharacterSprite');
        this.person.anchor.set(0.5,0.5);
        
        this.wrongImage = this.add.sprite(this.world.width*0.401, this.world.height*0.51, 'ClickWrong');
        this.wrongImage.anchor.set(0.5,0.5);
        this.wrongImage.alpha = 0.0;
        
        this.buttonManager = new ButtonManager(this);
        
        
        //the clothes icons
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.22, this.world.height*0.375, 'ClothesButton');
        this.spriteManager.createPants(this.world.width*0.22, this.world.height*0.46, 'PantsButton');
        this.spriteManager.createSpecs(this.world.width*0.22, this.world.height*0.55, 'SpecsButton');
        this.spriteManager.createShose(this.world.width*0.22, this.world.height*0.63, 'ShoseButton');
        
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
        this.randomEraFunc(1, 4);
        
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
        theGame.FadeScreen.update(this.buttonManager.gametype);
    },
    
    randomEraFunc: function(min, max) //random a Era theme
    {
        this.Era = this.game.rnd.integerInRange(min, max);
    },
    
    eraSwitch:  function() //check era theme
    {
        switch(this.Era)
        {
            case 1:
                this.seventysTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '1970s');
                this.seventysTheme.anchor.set(0.5,0.5);
                //Create tween. This will fade the sprite to alpha 0 over the duration of 3 seconds
                var tween = this.game.add.tween(this.seventysTheme).to( { alpha: 0 }, 4000, "Linear", true, 0, 0);
                break;
            case 2:
                this.eightysTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '1980s');
                this.eightysTheme.anchor.set(0.5,0.5);
                var tween = this.game.add.tween(this.eightysTheme).to( { alpha: 0 }, 4000, "Linear", true, 0, 0);
                break;
            case 3:
                this.ninetysTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '1990s');
                this.ninetysTheme.anchor.set(0.5,0.5);
                var tween = this.game.add.tween(this.ninetysTheme).to( { alpha: 0 }, 4000, "Linear", true, 0, 0);
                break;
            case 4:
                this.twoThousandsTheme = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '2000s');
                this.twoThousandsTheme.anchor.set(0.5,0.5);
                var tween = this.game.add.tween(this.twoThousandsTheme).to( { alpha: 0 }, 4000, "Linear", true, 0, 0);
                break;
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
            
            this.clothesOpened = true;
            this.pantsOpened = false;
            this.specsOpened = false;
            this.shoseOpened = false;
        }
       else if(this.spriteManager.onPants == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('PantsTiles');
            this.spriteManager.onPants = false;
            
            this.clothesOpened = false;
            this.pantsOpened = true;
            this.specsOpened = false;
            this.shoseOpened = false;
        }
        else if(this.spriteManager.onSpecs == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('GlassesTiles');
            this.spriteManager.onSpecs = false;
            
            this.clothesOpened = false;
            this.pantsOpened = false;
            this.specsOpened = true;
            this.shoseOpened = false;
        }
        else if(this.spriteManager.onShose == true)
        {
            this.soundManager.createSound('ClickSFX');
            this.drawGrids('ShoseTiles');
            this.spriteManager.onShose = false;
            
            this.clothesOpened = false;
            this.pantsOpened = false;
            this.specsOpened = false;
            this.shoseOpened = true;
        }
    },
    
    //check each shirt / pants / specs / shose not draw again
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
    drawPants: function(pantsSprite)
    {
        var tempPants = null;
        
        if(this.tempPants != null)
            this.tempPants.destroy();
        
        this.pantsImage = this.add.sprite(this.world.width*0.83, this.world.height*0.6, pantsSprite);
        this.pantsImage.anchor.set(0.5,0.5);
        this.tempPants = this.pantsImage;
    },
    drawSpecs: function(sprite)
    {
        var tempSpecs = null;
        
        if(this.tempSpecs != null)
            this.tempSpecs.destroy();
        
        this.specsImage = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.specsImage.anchor.set(0.5,0.5);
        this.tempSpecs = this.specsImage;  
    },
    drawShose: function(sprite)
    {
        var tempShose = null;
        
        if(this.tempShose != null)
            this.tempShose.destroy();
        
        this.shoseImage = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.shoseImage.anchor.set(0.5,0.5);
        this.tempShose = this.shoseImage;
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
        if(this.pantsOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawPants('70Pants');
                    break;
                case 1:
                    this.drawPants('80Pants');
                    break;
                case 2:
                   // this.drawPants('90Pants');
                    break;
                case 3:
                    //this.drawPants('2000Pants');
                    break;
            }
            this.pantsWear = true;
        }
        
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
            this.shirtWear = true;
        }
        if(this.specsOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawSpecs('70Specs');
                    break;
//                case 1:
//                    this.drawSpecs('80Specs');
//                    break;
//                case 2:
//                    this.drawSpecs('90Specs');
//                    break;
//                case 3:
//                    this.drawSpecs('2000Specs');
//                    break;
            }
            this.specsWear = true;
        }
        
        if(this.shoseOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawShose('70Shose');
                    break;
                case 1:
//                    this.drawShose('80Shose');
//                    break;
//                case 2:
//                    this.drawShose('90Shose');
//                    break;
//                case 3:
//                    this.drawShose('2000Shose');
//                    break;
            }
            this.shoseWear = true;
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
                    if(this.shirtWear == true) //if shirt wear
                    {
                        this.spriteManager.shirtInputDisable(); //Disable clicking of shirt sprite
                        this.shirtCorrect = true;
                        this.correctShirtTheme = true;
                    }
                    if(this.pantsWear == true)
                    {
                        this.spriteManager.pantsInputDisable();
                        this.pantsCorrect = true;
                        this.correctPantsTheme = true;
                    }
                     if(this.specsWear == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                        this.correctSpecsTheme = true;
                     }
                    if(this.shoseWear == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                        this.correctShoseTheme = true;
                    }
                    
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.clickWrong = false;
                }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                }
                
                console.log( "1970s " + sprite.frame);
            }
            else if(sprite.frame == this.eightysArray[i]) //if clicked on 80s clothes
            {
                if(this.Era == 2)
                {
                    if(this.shirtWear == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                        this.correctShirtTheme = true;
                    }
                    if(this.pantsWear == true)
                    {
                        this.spriteManager.pantsInputDisable();
                        this.pantsCorrect = true;
                        this.correctPantsTheme = true;
                    }
                     if(this.specsWear == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                         this.correctSpecsTheme = true;
                     }
                    if(this.shoseWear == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                        this.correctShoseTheme = true;
                    }
                    
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.clickWrong = false;
                }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                }
                
                console.log( "1980s " + sprite.frame);
            }
            else if(sprite.frame == this.ninetysArray[i]) //if clicked on 90s clothes
            {
                  if(this.Era == 3)
                  {
                    if(this.shirtWear == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                        this.correctShirtTheme = true;
                    }
                    if(this.pantsWear == true)
                    {
                        this.spriteManager.pantsInputDisable();
                        this.pantsCorrect = true;
                        this.correctPantsTheme = true;
                    }
                     if(this.specsWear == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                         this.correctSpecsTheme = true;
                     }
                    if(this.shoseWear == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                        this.correctShoseTheme = true;
                    }
                      
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.clickWrong = false;
                  }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                }
                
                console.log( "1990s " + sprite.frame);
            }
            else if(sprite.frame == this.twoThousandsArray[i]) //if clicked on 2000s clothes
            {
                 if(this.Era == 4)
                 {
                    if(this.shirtWear == true)
                    {
                        this.spriteManager.shirtInputDisable();
                        this.shirtCorrect = true;
                        this.correctShirtTheme = true;
                    }
                    if(this.pantsWear == true)
                    {
                        this.spriteManager.pantsInputDisable();
                        this.pantsCorrect = true;
                        this.correctPantsTheme = true;
                    }
                     if(this.specsWear == true)
                     {
                        this.spriteManager.specsInputDisable();
                        this.specsCorrect = true;
                         this.correctSpecsTheme = true;
                     }
                    if(this.shoseWear == true)
                    {
                        this.spriteManager.shoseInputDisable();
                        this.shoseCorrect = true;
                        this.correctShoseTheme = true;
                    }
                     
                    //check correct
                    this.soundManager.createSound('CorrectSFX');
                    this.person.frame = 0;
                    this.clickWrong = false;
                 }
                else
                {
                    //check wrong
                    this.soundManager.createSound('WrongSFX');
                    this.person.frame = 1;
                    this.clickWrong = true;
                }
                console.log( "2000s " + sprite.frame);
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
    
    destroyTheGrid: function()
    {
        //when shirt / pants / specs / shose is correct disable the clothes button.
        if(this.shirtCorrect == true || this.pantsCorrect == true || this.specsCorrect == true || this.shoseCorrect == true)
        {
            for(i = 0; i < 2; i++)
            {
                for(j = 0; j < 2; j++)
                {
                    this.tileArray[i][j].destroy();
                    this.shirtCorrect = false;
                    this.pantsCorrect = false;
                    this.specsCorrect = false;
                    this.shoseCorrect = false;
                }
            }
        }
    }, 
    
    stopTiming: function() //stop timing when all clothes wear
    {
        //if(this.shirtWear == true && this.pantsWear == true && this.specsWear == true && this.shoseWear == true)
        if(this.correctShirtTheme == true && this.correctPantsTheme == true && this.correctSpecsTheme == true && this.correctShoseTheme == true)
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
        }
    }
}