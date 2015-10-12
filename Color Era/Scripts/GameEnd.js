theGame.GameEnd = function(game)
{
    this.timeManager = null;
    this.buttonManager = null;
    this.soundManager = null;
    
    this.toturialBackground = null;
    this.emptyStar = [];
    this.fullStar = null;
    this.fullStar2 = null;
    this.fullStar3 = null;
    
    this.timeText = null;
    
    this.tween = null;
};

theGame.GameEnd.prototype = 
{
    create: function()
    {
        //Screen Background
        this.toturialBackground = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameEndBackGround');
        this.toturialBackground.anchor.set(0.5,0.5);
        
        for(i = 0; i < 3; i++)
        {
            this.emptyStar[i] = this.add.sprite(this.world.width *0.3 + 100 *i, this.world.height*0.2, 'StarEmpty');
            this.emptyStar[i].anchor.setTo(0.5,0.5);
        }
        this.fullStar = this.add.sprite(this.emptyStar[0].x, this.emptyStar[0].y, 'StarFull');
        this.fullStar.anchor.setTo(0.5,0.5);
        this.fullStar.visible = false;
        
        this.fullStar2 = this.add.sprite(this.emptyStar[1].x, this.emptyStar[1].y, 'StarFull');
        this.fullStar2.anchor.setTo(0.5,0.5);
        this.fullStar2.visible = false;
        
        this.fullStar3 = this.add.sprite(this.emptyStar[2].x, this.emptyStar[2].y, 'StarFull');
        this.fullStar3.anchor.setTo(0.5,0.5);
        this.fullStar3.visible = false;
        
        //Button
        this.buttonManager = new ButtonManager(this);
        this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.7, 'GoParty', this.buttonManager.GoToLevel2);
        
        this.timeText= this.add.text(this.world.width*0.3, this.world.height*0.08, 'Time taken: ' + theGame.tempTimeMin + ':' + theGame.tempTimeSec + 's', { fill: '#000000' });
        
        this.soundManager = new SoundManager(this);

        this.showStar();
                
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        theGame.FadeScreen.update(this.buttonManager.gametype);          
    },
    
    showStar: function()
    {
        this.fullStar.visible = true;
        this.tween = this.game.add.tween(this.fullStar.scale).to( { x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true);
        this.tween.onComplete.add(this.showStar2, this);
        this.soundManager.createSound('StarSFX');
    }
    ,
    showStar2: function()
    {
        if(theGame.tempTimeMin <= 1 && theGame.tempTimeSec <= 60)
        {
            this.fullStar2.visible = true;
            this.tween = this.game.add.tween(this.fullStar2.scale).to( { x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.tween.onComplete.add(this.showStar3, this);
            this.soundManager.createSound('StarSFX');
        }
    },
    
    showStar3: function()
    {
        if(theGame.tempTimeMin <= 0 && theGame.tempTimeSec <= 30)
        {
            this.fullStar3.visible = true;
            this.tween = this.game.add.tween(this.fullStar3.scale).to( { x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.soundManager.createSound('StarSFX');
        }
    }
}