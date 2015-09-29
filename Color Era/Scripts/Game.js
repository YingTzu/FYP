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
    this.score = 0;

    this.text2 = 0;
    
    this.seventysTheme = false;
    this.eightysTheme = false;
    this.ninetysTheme = false;
    this.twoThousandsTheme = false;
    
    this.seventysArray = [];    //1970s
    this.eightysArray = [];     //1980s
    this.ninetysArray = [];     //199s
    this.twoThousandsArray =[]; //2000s
    this.hatArray = [];
    
    this.clothesOpen = true; //clothes grid will draw when this is true
    this.pantsOpen = true;
    this.shoesOpen = true;
    this.specsOpen = true;
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
        this.person = this.add.sprite(this.world.width*0.8, this.world.height*0.5, 'Person');
        this.person.anchor.set(0.5,0.5);
        
        this.spriteManager = new SpriteManager(this);
        this.spriteManager.createClothes(this.world.width*0.3, this.world.height*0.8, 'ClothesButton');
        this.spriteManager.createPants(this.world.width*0.4, this.world.height*0.8, 'PantsButton');
        
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
        
        this.randomEraFunc(1, 4);
        
        //this.drawGrids('ClothesTiles');
        //this.drawGrids('PantsTiles');
        this.drawGrids('GlassesIcon');
        //this.drawGrids('ShoseIcon');
        //draw sprite clicked text
        this.text2 = this.add.text(16, 200, 'Click a sprite', { fill: '#000000' });
    },
    
    /////////////////////////////////////////////////////
    //                    Update                       //
    /////////////////////////////////////////////////////
    update: function()
    {
       // console.log(this.clothesOpen);
//        if(this.clothesOpen == true)
//        {
//            this.drawGrids('ClothesTiles');
//            this.clothesOpen = false;
//        }
    },
    
    //when game start, random a Era theme
    randomEraFunc: function(min, max)
    {
        // 1: 1970s,  2: 1980s,  3: 1990s, 4: 2000s,
        var randomEra = this.game.rnd.integerInRange(min, max);
        
        switch(randomEra)
        {
            case 1:
                this.seventysTheme = true;
                this.eightysTheme = false;
                this.ninetysTheme = false;
                this.twoThousandsTheme = false;
                break;
            case 2:
                this.seventysTheme = false;
                this.eightysTheme = true;
                this.ninetysTheme = false;
                this.twoThousandsTheme = false;
                break;
            case 3:
                this.seventysTheme = false;
                this.eightysTheme = false;
                this.ninetysTheme = true;
                this.twoThousandsTheme = false;
                break;
            case 4:
                this.seventysTheme = false;
                this.eightysTheme = false;
                this.ninetysTheme = false;
                this.twoThousandsTheme = true;
                break;
        }
        
        console.log("the era " + randomEra);
    },
    
    checkOpen: function()
    {
        //this.drawGrids('PantsTiles');
        //this.drawGrids('GlassesIcon');
        //this.drawGrids('ShoseIcon');
    },
    
    drawClothes: function(sprite)
    {
        var tempImages = null;
        
        //delete previous selected image
        if(this.tempImages != null)
            this.tempImages.destroy();
        
        this.images = this.add.sprite(this.world.width*0.8, this.world.height*0.5, sprite);
        this.images.anchor.set(0.5,0.5);
        this.tempImages = this.images;
        
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
                this.theTile = this.add.sprite(350+i*this.tileSize, 250+j*this.tileSize, key);
                this.theTile.frame = this.randomTile;
                this.tileArray[i][j] = this.theTile;
                
                this.theTile.anchor.setTo(0.5, 0.5);
                this.isTimeChange = false;
                this.theTile.inputEnabled=true;
                this.theTile.events.onInputDown.add(this.clicked, this);
            }
        }
    },
    
     //the reaches time, change the images in the gird
    TimeChange: function() 
    {
        for(i = 0; i < 2; i++)
        {
            for(j = 0; j < 2; j++)
            {
                this.tileArray[i][j].destroy();
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
        if(this.clothesOpen == true)
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
        
        if(this.pantsOpen == true)
        {
            switch(sprite.frame)
            {
                case 0:
                    this.drawClothes('70Pants');
                    break;
                case 1:
                    this.drawClothes('80Pants');
                    break;
                case 2:
                   // this.drawClothes('70Glasses');
                    break;
                case 3:
                    //this.drawClothes('70Shose');
                    break;
            }
        }
        
//        if(this.shoesOpen == true)
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
//        if(this.specsOpen == true)
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
                    this.score += 20;  
                
                this.text2.text = "1970s " + sprite.frame;
                console.log(this.score);
            }
            else if(sprite.frame == this.eightysArray[i])
            {
                if(this.eightysTheme == true)
                    this.score += 20;

                this.text2.text = "1980s " + sprite.frame;
                console.log(this.score);
            }
            else if(sprite.frame == this.ninetysArray[i])
            {
                 if(this.ninetysTheme == true)
                    this.score += 20;
                
                this.text2.text = "1990s " + sprite.frame;
                console.log(this.score);
            }
            else if(sprite.frame == this.twoThousandsArray[i])
            {
                 if(this.twoThousandsTheme == true)
                    this.score += 20;
                
                this.text2.text = "2000s " + sprite.frame;
                console.log(this.score);
            }
        }
    }
}