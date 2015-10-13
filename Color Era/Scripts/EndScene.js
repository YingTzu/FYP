theGame.EndScene = function(game)
{
    this.buttonManager = null;
    this.soundManager = null;
    
    this.endScene = null;
};

theGame.EndScene.prototype = 
{
    create: function()
    {
        console.log("end scene");
        //Screen Background
        this.endScene = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameEndBackGround');
        this.endScene.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        this.soundManager = new SoundManager(this);
                
        //Fade in and out
//        theGame.FadeScreen = new FadeManager(this);
//        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        //theGame.FadeScreen.update(this.buttonManager.gametype);          
    },
}