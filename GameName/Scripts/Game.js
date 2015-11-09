theGame.Game = function(game)
{
    this.gameBackground = null;
    this.music = null;
    this.uiManager = null;
    
    this.cursor = null;
};

theGame.Game.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
//        this.cursor = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'Cursor');
//        this.cursor.anchor.set(0.5,0.5);
    }, 
    
    update: function()
    {
//        this.cursor.x = this.game.input.mousePointer.x;
//        this.cursor.y = this.game.input.mousePointer.y;
    }
}