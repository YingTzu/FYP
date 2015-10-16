theGame.EndScene = function(game)
{
    this.buttonManager = null;
    this.soundManager = null;
    
    this.endScene = null;
    
    this.totalSec = 0;
    this.totalMin = 0;
    
    this.totalStars = 0;
    
    this.timeText = null;
    this.starText = null;
};

theGame.EndScene.prototype = 
{
    create: function()
    {
        console.log("end scene");
        console.log("1: " + theGame.lvl1Star);
        console.log(theGame.lvl2Star);
        console.log(theGame.lvl3Star);
        //Screen Background
        this.endScene = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'EndSceneBackGround');
        this.endScene.anchor.set(0.5,0.5);
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        this.soundManager = new SoundManager(this);
        
        this.totalSec = theGame.level1Secs + theGame.level2Secs + theGame.level3Secs;
        this.totalMin = theGame.level1Mins + theGame.level2Mins + theGame.level3Mins;
        
        if(this.totalSec >= 60)
        {
            this.totalMin +=1;
            this.totalSec -= 60;
        }
        
        //this.timeText= this.add.text(this.world.width*0.3, this.world.height*0.08, 'Total Time taken: ' + this.totalMin + ':' + this.totalSec + 's', { fill: '#ffffff' });
        
        this.totalStars = theGame.lvl1Star + theGame.lvl2Star + theGame.lvl3Star;
        //this.starText= this.add.text(this.world.width*0.3, this.world.height*0.2, 'Total Stars: ' + this.totalStars, { fill: '#ffffff' });
        
        //Fade in and out
//        theGame.FadeScreen = new FadeManager(this);
//        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        //theGame.FadeScreen.update(this.buttonManager.gametype);          
    },
}