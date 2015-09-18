theGame.Game = function(game)
{
    this.gameBackground = null;
    this.music = null;
    this.uiManager = null;
    
    this.tileSize = 64;
    
    this.tileArray = [];
    this.tileType  = 6;
    this.theTile = null;
    this.level = 0;
   // this.startList = new Array();
    //this.squareList = new Array();
    
   // this.map; //The tilemap
   // this.layer; //A layer within a tileset
    
//    this.marker;
//    this.currentTile;
//    this.cuttentTilePosition;
};

theGame.Game.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        for(i = 0; i < 2; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < 2; j++)
            {
                this.randomTile = Math.floor(Math.random()* this.tileType);
                this.theTile = this.add.sprite(i*this.tileSize, j*this.tileSize, 'tiles');
                this.theTile.frame = this.randomTile;
                this.theTile.value = this.randomTile;
                this.tileArray[i][j] = this.theTile;
            }
        }
        
//        this.map = this.add.tilemap('map', 64, 64);  
//        this.map.addTilesetImage('tiles');
//        
//        this.layer = this.map.createLayer(0);
    }, 
    
    update: function()
    {
         for(i = 0; i < 2; i++)
        {
            this.tileArray[i] = [];
            for(j = 0; j < 2; j++)
            {
                this.randomTile = Math.floor(Math.random()* this.tileType);
                this.theTile = this.add.sprite(i*this.tileSize, j*this.tileSize, 'tiles');
                this.theTile.frame = this.randomTile;
                this.theTile.value = this.randomTile;
                this.tileArray[i][j] = this.theTile;
            }
        }
    }
    
//    checkLevel: function(level)
//    {
//        switch(level)
//        {
//            case 1:
//                break;
//            case 2:
//                break;
//            case 3:
//                break;
//        }
//    }
}