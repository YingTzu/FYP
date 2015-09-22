theGame.Game = function(game)
{
    this.gameBackground = null;
    this.music = null;
    this.uiManager = null;
    
    this.tileSize = 64;
    
    this.tileArray = [];
    this.tileType  = 24;
    this.theTile = null;
    this.level = 0;
    
    this.isTimeChange = true;
    this.counter = 0;
    this.text = 0;
    this.text2 = 0;
    
    this.seventysArray = [];
    this.eightysArray = [];
    this.ninetysArray = [];
    this.twoThousandsArray =[];
    this.hatArray = [];
};

//if(era[sprite.frame == 1970)
theGame.Game.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.text = this.add.text(this.world.centerX, this.world.centerY, 'Counter: 0', { font: "64px Arial", fill: "#000000", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
        
        for(i = 0; i < 4; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < 6; j++)
            {
                this.theTile = this.add.sprite(this.world.centerX+j*this.tileSize, this.world.centerY+i*this.tileSize, 'tiles');
                this.tileArray[i][j] = this.theTile;
                this.theTile.anchor.setTo(0.5, 0.5);
                this.isTimeChange = true;
                this.theTile.alpha = 0;
                this.theTile.inputEnabled=true;
                this.theTile.events.onInputDown.add(this.clicked, this);
                
                if(i == 0)
                {
                    this.seventysArray[j] = 6*i + j;
                    console.log("70s: " + this.seventysArray[j]);
                }
                else if(i == 1)
                {
                    this.eightysArray[j] = 6*i + j;
                    console.log("80s: " + this.eightysArray[j]);
                }
                else if(i == 2)
                {
                    this.ninetysArray[j] = 6*i + j;
                    console.log("90s: " + this.ninetysArray[j]);
                }
                else if(i == 3)
                {
                    this.twoThousandsArray[j] = 6*i + j;
                    console.log("2000s: " + this.twoThousandsArray[j]);
                }
                if(j==0)
                {
                    this.hatArray[i] = 4*j + i;
                }
            }
        }
        
        this.time.events.loop(Phaser.Timer.SECOND, this.TimesUP, this);
        
        this.text2 = this.add.text(16, 200, 'Click a sprite', { fill: '#000000' });
    }, 
    
    update: function()
    {
       this.checkLevel(2);
    }, 
    
    TimesUP: function() 
    {
        this.counter++;
        this.text.setText('Counter: ' + this.counter);
        
        if(this.counter >= 3)
        {
            this.counter = 0;
            this.isTimeChange = true;
        }
    },
    
    drawGrids: function(row, column)
    {
        //notcurrentera
        for(i = 0; i < column; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < row; j++)
            {
                //if(this is not currentera de item)
                //notcurrentera++;
                //if(notcurrentera > 4)
                //force it to be currentera
                this.randomTile = Math.floor(Math.random()* this.tileType);
                this.theTile = this.add.sprite(this.world.centerX+i*this.tileSize, this.world.centerY+j*this.tileSize, 'tiles');
                this.theTile.frame = this.randomTile;
                this.theTile.value = this.randomTile;
                this.tileArray[i][j] = this.theTile;
                this.theTile.anchor.setTo(0.5, 0.5);
                this.isTimeChange = false;
                
                this.theTile.inputEnabled=true;
                this.theTile.events.onInputDown.add(this.clicked, this);
            }
        }
    },
    
    clicked: function(sprite, pointer)
    {
        //this.text2.text = "clicked" + sprite.frame;
        console.log("Clicked  at: " + pointer.position);
        
        this.wearClothes(sprite);
        this.checkEraImage(sprite);
        //console.log("sprite pos: (x="+sprite.x+" / y="+sprite.y+")" )
        //console.log("sprite id: x=" +sprite.frame);
    },
    
    wearClothes: function(sprite)
    {
        //clicked 70s clothes, man wear 70s clothes
        //
        for(i = 0; i < 4; i++)
        {
            if(sprite.frame == this.hatArray[i])
            {
                //this.hatWorn = true;
                //wear hat
            }
        }
    },
    
    checkEraImage: function(sprite)
    {
        for(i = 0; i < 6; i++)
        {
            if(sprite.frame == this.seventysArray[i])
            {
                //sucessCounter+=25;
                this.text2.text = "1970s " + sprite.frame;
            }
            else if(sprite.frame == this.eightysArray[i])
            {
                //sucessCounter+=25;
                this.text2.text = "1980s " + sprite.frame;
            }
            else if(sprite.frame == this.ninetysArray[i])
            {
                //sucessCounter+=25;
                this.text2.text = "1990s " + sprite.frame;
            }
            else if(sprite.frame == this.twoThousandsArray[i])
            {
                //sucessCounter+=25;
                this.text2.text = "2000s " + sprite.frame;
            }
        }
    },
    
    checkLevel: function(level)
    {
        if(this.isTimeChange)
        {
             switch(level)
             {
                case 1:
                    this.drawGrids(2, 2);
                    break;
                case 2:
                    this.drawGrids(3, 3);
                    break;
                case 3:
                    this.drawGrids(3, 3);
                    break;
            }
        }
    }
}