Suspects.GameOver = function(game)
{
    this.buttonManager = null;
    this.soundManager = null;
    
    this.gameOverBG = null;
};

Suspects.GameOver.prototype = 
{
    create: function()
    {
        console.log("gameOVer");
        //Screen Background
        this.gameEndBG = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.gameEndBG.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.9, 'Restart', this.buttonManager.GoToMenu);
        
        //Fade in and out
        Suspects.FadeScreen = new FadeManager(this);
        Suspects.FadeScreen.create();
    }, 
    
    update: function()
    {
        Suspects.FadeScreen.update(this.buttonManager.gametype);          
    },
}