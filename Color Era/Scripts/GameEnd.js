theGame.GameEnd = function(game)
{
    this.toturialBackground = null;
    this.timeManager = null;
    this.buttonManager = null;
    
    this.timeText = null;
};

theGame.GameEnd.prototype = 
{
    create: function()
    {
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameEndBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.7, 'StartGame', this.buttonManager.GoToMenu);
        
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
        
        this.timeText= this.add.text(this.world.width*0.3, this.world.height*0.08, 'Time taken: ' + theGame.tempTimeMin + ':' + theGame.tempTimeSec + 's', { fill: '#000000' });
    }, 
    
    update: function()
    {
      theGame.FadeScreen.update(this.buttonManager.gametype);          
    }
}