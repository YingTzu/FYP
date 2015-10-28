theGame.Tutorial = function(game)
{
    this.toturialBackground = null;
    this.uiManager = null;
    this.buttonManager = null;
};

theGame.Tutorial.prototype = 
{
    create: function()
    {
        console.log("tutorial");
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.5, 'SkipButton', this.buttonManager.StartGame);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        theGame.FadeScreen.update(this.buttonManager.gametype);
    }
}