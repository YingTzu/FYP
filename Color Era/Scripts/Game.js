theGame.Game = function(game)
{
    this.input;
    this.music = null;
    this.uiManager = null;
    this.spriteManager = null;
    
    this.gameBackground = null;
    this.person = null;
    this.images =null;
    
    this.tileSize = 128;
    this.theTile = null;
    this.tileType  = 4;
    this.tileArray = [];
    this.tileChangeSpeed = null;
    
    this.level = 1;

    this.eraText = null;
    this.speach = null;
    
    this.Era = 1;  //1: 1970s,  2: 1980s,  3: 1990s, 4: 2000s,
    
    this.seventysTheme = false;
    this.eightysTheme = false;
    this.ninetysTheme = false;
    this.twoThousandsTheme = false;
    
    this.seventysArray = [];    //1970s
    this.eightysArray = [];     //1980s
    this.ninetysArray = [];     //199s
    this.twoThousandsArray =[]; //2000s
    this.hatArray = [];
    
    this.clothesOpened = false;
    this.pantsOpened = false;
    this.specsOpened = false;
    this.shoseOpened = false;
};

theGame.Game.prototype = 
{
    /////////////////////////////////////////////////////
    //                    Create                       //
    /////////////////////////////////////////////////////
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        //Draw character
        this.person = this.add.sprite(this.world.width*0.83, this.world.height*0.6, 'Person');
        this.person.anchor.set(0.5,0.5);
        
        //the clothes icons
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.6, this.world.height*0.25, 'ClothesButton');
        this.spriteManager.createPants(this.world.width*0.6, this.world.height*0.41, 'PantsButton');
        this.spriteManager.createSpecs(this.world.width*0.6, this.world.height*0.57, 'SpecsButton');
        this.spriteManager.createShose(this.world.width*0.6, this.world.height*0.72, 'ShoseButton');
        
        //set the images into different era array
        for(i = 0; i < 2; i++)
        {
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
        
        this.eraSwitch();
        this.speach = this.add.text(this.world.width*0.8, this.world.height*0.1, 'Hello', { fill: '#000000' });
    },
    
    /////////////////////////////////////////////////////
    //                    Update                       //
    /////////////////////////////////////////////////////
    update: function()
    {
        this.checkOpen();
    },
    
    //random a Era theme
    randomEraFunc: function(min, max)
    {
        this.Era = this.game.rnd.integerInRange(min, max);
    },
    
    //check era theme
    eraSwitch:  function()
    {
        switch(this.Era)
        {
            case 1:
                this.seventysTheme = true;
                this.eightysTheme = false;
                this.ninetysTheme = false;
                this.twoThousandsTheme = false;
                this.eraText= this.add.text(this.world.width*0.4, this.world.height*0.1, '1970s', { fill: '#000000' });
                break;
            case 2:
                this.seventysTheme = false;
                this.eightysTheme = true;
                this.ninetysTheme = false;
                this.twoThousandsTheme = false;
                this.eraText= this.add.text(this.world.width*0.4, this.world.height*0.1, '1980s', { fill: '#000000' });
                break;
            case 3:
                this.seventysTheme = false;
                this.eightysTheme = false;
                this.ninetysTheme = true;
                this.twoThousandsTheme = false;
                this.eraText= this.add.text(this.world.width*0.4, this.world.height*0.1, '1990s', { fill: '#000000' });
                break;
            case 4:
                this.seventysTheme = false;
                this.eightysTheme = false;
                this.ninetysTheme = false;
                this.twoThousandsTheme = true;
                this.eraText= this.add.text(this.world.width*0.4, this.world.height*0.1, '2000s', { fill: '#000000' });
                break;
        }
    },
    
    //check the Icons are open and close
    checkOpen: function()
    {
        if(this.spriteManager.onClothes == true)
        {
            this.drawGrids('ClothesTiles');
            this.spriteManager.onClothes = false;
            
            this.clothesOpened = true;
            this.pantsOpened = false;
            this.specsOpened = false;
            this.shoseOpened = false;
        }
       else if(this.spriteManager.onPants == true)
        {
            this.drawGrids('PantsTiles');
            this.spriteManager.onPants = false;
            
            this.clothesOpened = false;
            this.pantsOpened = true;
            this.specsOpened = false;
            this.shoseOpened = false;
        }
        else if(this.spriteManager.onSpecs == true)
        {
            this.drawGrids('GlassesTiles');
            this.spriteManager.onSpecs = false;
            
            this.clothesOpened = false;
            this.pantsOpened = false;
            this.specsOpened = true;
            this.shoseOpened = false;
        }
        else if(this.spriteManager.onShose == true)
        {
            this.drawGrids('ShoseTiles');
            this.spriteManager.onShose = false;
            
            this.clothesOpened = false;
            this.pantsOpened = false;
            this.specsOpened = false;
            this.shoseOpened = true;
        }
    },
    //check each shirt/pants/specs/shose not draw again
    drawClothes: function(sprite)
    {
        var tempShirt = null;
        
        //delete previous selected image
        if(this.tempShirt != null)
            this.tempShirt.destroy();
        
        this.images = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.images.anchor.set(0.5,0.5);
        this.tempShirt = this.images;
    },
    drawPants: function(sprite)
    {
        var tempPants = null;
        
        if(this.tempPants != null)
            this.tempPants.destroy();
        
        this.images = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.images.anchor.set(0.5,0.5);
        this.tempPants = this.images;
    },
    drawSpecs: function(sprite)
    {
        var tempSpecs = null;
        
        if(this.tempSpecs != null)
            this.tempSpecs.destroy();
        
        this.images = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.images.anchor.set(0.5,0.5);
        this.tempSpecs = this.images;
    },
    drawShose: function(sprite)
    {
        var tempShose = null;
        
        if(this.tempShose != null)
            this.tempShose.destroy();
        
        this.images = this.add.sprite(this.world.width*0.83, this.world.height*0.6, sprite);
        this.images.anchor.set(0.5,0.5);
        this.tempShose = this.images;
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
                this.theTile = this.add.sprite(200+i*this.tileSize, 200+j*this.tileSize, key);
                this.theTile.frame = this.randomTile;
                this.tileArray[i][j] = this.theTile;
                
                this.theTile.anchor.setTo(0.5, 0.5);
                this.theTile.inputEnabled=true;
                this.theTile.events.onInputDown.add(this.clicked, this);
            }
        }
    },
    
    clicked: function(sprite, pointer) //check the clicking of the images
    {
        //console.log("Clicked  at: " + pointer.position);
        
        this.wearClothes(sprite);
        this.checkEraImage(sprite);
        //console.log("sprite pos: (x="+sprite.x+" / y="+sprite.y+")" )
    },
    
    wearClothes: function(sprite)
    {
        if(this.clothesOpened == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawClothes('70Clothes');
                    break;
                case 1:
                    this.drawClothes('80Clothes');
                    break;
                case 2:
                    //this.drawClothes('90Clothes');
                    break;
                case 3:
                    //this.drawClothes('2000Clothes');
                    break;
            }
        }
        
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
                   // this.drawClothes('70Glasses');
                    break;
                case 3:
                    //this.drawClothes('70Shose');
                    break;
            }
        }
        
//        if(this.specsOpened == true)
//        {
//            switch(sprite.frame)
//            {
//                case 0:
//                    this.drawClothes('70Clothes');
//                    break;
//                case 1:
//                    this.drawClothes('70Pants');
//                    break;
//                case 2:
//                    this.drawClothes('70Glasses');
//                    break;
//                case 3:
//                    this.drawClothes('70Shose');
//                    break;
//            }
//        }
//        
//        if(this.shoseOpened == true)
//        {
//            switch(sprite.frame)
//            {
//                case 0:
//                    this.drawClothes('70Clothes');
//                    break;
//                case 1:
//                    this.drawClothes('70Pants');
//                    break;
//                case 2:
//                    this.drawClothes('70Glasses');
//                    break;
//                case 3:
//                    this.drawClothes('70Shose');
//                    break;
//            }
//        }
    },
    
    checkEraImage: function(sprite)
    {
        for(i = 0; i < 4; i++)
        {
            if(sprite.frame == this.seventysArray[i])
            {
                if(this.seventysTheme == true)
                {
                    this.speach.text = "you are right";
                }
                else
                    this.speach.text = "try another";
                
                console.log( "1970s " + sprite.frame);
            }
            else if(sprite.frame == this.eightysArray[i])
            {
                if(this.eightysTheme == true)
                    this.speach.text = "you are right";
                else
                    this.speach.text = "try another";
                
                console.log( "1980s " + sprite.frame);
            }
            else if(sprite.frame == this.ninetysArray[i])
            {
                  if(this.ninetysTheme == true)
                    this.speach.text = "you are right";
                else
                    this.speach.text = "try another";
                
                console.log( "1990s " + sprite.frame);
            }
            else if(sprite.frame == this.twoThousandsArray[i])
            {
                 if(this.twoThousandsTheme == true)
                    this.speach.text = "you are right";
                else
                    this.speach.text = "try another";
                
                console.log( "2000s " + sprite.frame);
            }
        }
    }
}