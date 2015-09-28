theGame.Game = function(game)
{
    this.music = null;
    this.uiManager = null;
    
    this.gameBackground = null;
    this.person = null;
    this.images =null;
    
    this.tileSize = 128;
    this.theTile = null;
    this.tileType  = 0;
    this.tileArray = [];
    this.tileChangeSpeed = null;
    
    this.level = 1;
    this.score = 0;
    
    this.isTimeChange = true;
    this.counter = 0;
    this.text = 0;
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
        
        //draw time count text
        this.text = this.add.text(this.world.centerX, 500, 'Counter: 0', { font: "64px Arial", fill: "#000000", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
        
        //set the images into different era array
        for(i = 0; i < 4; i++)
        {
            for(j = 0; j < 6; j++)
            {
                if(i == 0)
                {
                    this.seventysArray[j] = 6*i + j;
                    //console.log("70s: " + this.seventysArray[j]);
                }
                else if(i == 1)
                {
                    this.eightysArray[j] = 6*i + j;
                    //console.log("80s: " + this.eightysArray[j]);
                }
                else if(i == 2)
                {
                    this.ninetysArray[j] = 6*i + j;
                    //console.log("90s: " + this.ninetysArray[j]);
                }
                else if(i == 3)
                {
                    this.twoThousandsArray[j] = 6*i + j;
                    //console.log("2000s: " + this.twoThousandsArray[j]);
                }
            }
        }
        
        //level settings
        if(this.level == 0)
        {
            this.tileType  = 12;
            this.tileChangeSpeed = 3;
        }
        else if(this.level == 1)
        {
            this.tileType  = 18;
            this.tileChangeSpeed = 3;
        }
        else if(this.level == 2)
        {
            this.tileChangeSpeed = 3;
            this.tileType  = 24;
        }

       this.randomEraFunc(1, 4);
        
        //time count
        this.time.events.loop(Phaser.Timer.SECOND, this.TimeChange, this);
        
        //draw sprite clicked text
        this.text2 = this.add.text(16, 200, 'Click a sprite', { fill: '#000000' });
    },
    
    /////////////////////////////////////////////////////
    //                    Update                       //
    /////////////////////////////////////////////////////
    update: function()
    {
        this.checkLevel(this.level);
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
    
    drawClothes: function(sprite)
    {
        this.images = this.add.sprite(this.world.width*0.8, this.world.height*0.5, sprite);
        this.images.anchor.set(0.5,0.5);
    },
    
    drawGrids: function(row, column)
    {
        //notcurrentera
        for(i = 0; i < column; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < row; j++)
            {
                this.randomTile = Math.floor(Math.random()* this.tileType);
                this.theTile = this.add.sprite(300+i*this.tileSize, 200+j*this.tileSize, 'tiles');
                //this.theTile.frame = this.randomTile;
                //this.theTile.value = this.randomTile;
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
        this.counter++;
        this.text.setText('Counter: ' + this.counter);

        if(this.counter > this.tileChangeSpeed)
        {
            this.counter = 0;
            this.isTimeChange = true;

            for(i = 0; i < 3; i++)
            {
                for(j = 0; j < 3; j++)
                {
                    this.tileArray[i][j].destroy();
                }
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
        switch(sprite.frame)
        {
            case 0:
                this.drawClothes('70Clothes');
                break;
            case 1:
                this.drawClothes('70Hat');
                break;
            case 2:
                this.drawClothes('70Pants');
                break;
            case 3:
                this.drawClothes('70Watch');
                break;
            case 4:
                this.drawClothes('70Glasses');
                break;
            case 5:
                this.drawClothes('70Shose');
                break;
            
            case 6:
                this.drawClothes('80Clothes');
                break;
            case 7:
                this.drawClothes('80Hat');
                break;
            case 8:
                this.drawClothes('80Pants');
                break;
            case 9:
                this.drawClothes('80Watch');
                break;
            case 10:
                this.drawClothes('80Glasses');
                break;
            case 11:
                this.drawClothes('80Shose');
                break;
            case 12:
                //this.drawClothes('90Hat');
                break;
            case 18:
                //this.drawClothes('2000Hat');
                break;
        }
    },
    
    checkEraImage: function(sprite)
    {
        for(i = 0; i < 6; i++)
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
    },
    
    checkLevel: function(levelSelect)
    {
        if(this.isTimeChange)
        {
             switch(levelSelect)
             {
                 case 0:
                    this.drawGrids(2, 2);
                    break;
                case 1:
                    this.drawGrids(3, 3);
                    break;
                case 2:
                    this.drawGrids(3, 3);
                    break;
            }
        }
    }
}