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
    
    this.ColorEnum = 
    {
        TEST1: 0, 
        TEST2: 1,   
    };
};


theGame.Game.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.text = this.add.text(this.world.centerX, this.world.centerY, 'Counter: 0', { font: "64px Arial", fill: "#000000", align: "center" });
        this.text.anchor.setTo(0.5, 0.5);
        
         this.time.events.loop(Phaser.Timer.SECOND, this.TimesUP, this);
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
        for(i = 0; i < column; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < row; j++)
            {
                this.randomTile = Math.floor(Math.random()* this.tileType);
                this.theTile = this.add.sprite(this.world.centerX+i*this.tileSize, this.world.centerY+j*this.tileSize, 'tiles');
                this.theTile.frame = this.randomTile;
                this.theTile.value = this.randomTile;
                this.tileArray[i][j] = this.theTile;
                this.theTile.anchor.setTo(0.5, 0.5);
                this.isTimeChange = false;
                this.tileArray[i][j].inputEnabled = true;
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
    },
    
    checkClickedImage: function()
    {
        
    }
}