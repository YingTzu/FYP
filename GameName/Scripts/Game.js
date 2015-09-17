theGame.Game = function(game)
{
    this.gameBackground = null;
    this.music = null;
    this.uiManager = null;  
};

theGame.Game.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameBackground.anchor.set(0.5,0.5);
        
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.5, 'StartButton');
    }, 
    
    update: function()
    {
        
    }
}