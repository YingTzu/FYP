Suspects.GameEnd = function(game)
{
    this.buttonManager = null;
    this.soundManager = null;
    
    this.gameOverBG = null;
};

Suspects.GameEnd.prototype = 
{
    create: function()
    {
        console.log("End Scene");
        //Screen Background
        this.gameEndBG = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'EndScene');
        this.gameEndBG.anchor.set(0.5,0.5);
        
        Suspects.gameMusic.stopMusic();
    }, 
    
    update: function()
    {        
    },
}