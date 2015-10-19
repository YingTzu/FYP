theGame.GameEnd = function(game)
{
    this.buttonManager = null;
    this.soundManager = null;
    
    this.gameEndBG = null;
    this.gameEndPerson = null;
    this.emptyStar = [];
    this.fullStar = null;
    this.fullStar2 = null;
    this.fullStar3 = null;
    
    this.timePicture = null;
    this.timeText = null;
    
    this.tween = null;
    
    this.starNum = 0;
};

theGame.GameEnd.prototype = 
{
    create: function()
    {
        //Screen Background
        this.gameEndBG = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'GameEndBackGround');
        this.gameEndBG.anchor.set(0.5,0.5);
        
        for(i = 0; i < 3; i++)
        {
            this.emptyStar[i] = this.add.sprite(this.world.width *0.38 + 125 *i, this.world.height*0.12, 'StarEmpty');
            this.emptyStar[i].anchor.setTo(0.5,0.5);
            this.emptyStar[i].aplha = 0.5;
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
        
        this.timePicture = this.add.sprite(this.world.width*0.5, this.world.height*0.5, 'TimeTaken');
        this.timePicture.anchor.set(0.5,0.5);
        
        this.timeText= this.add.text(this.world.width*0.38, this.world.height*0.5, "Time Taken: " + theGame.tempTimeMin + ' : ' + theGame.tempTimeSec + 's', {fill: '#ffffff'});
        
        //Button
        this.buttonManager = new ButtonManager(this);
        
        //draw depend on era
        if(theGame.currentLevel == 1)
        {
            this.gameEndPerson = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '70sEnd');
            this.gameEndPerson.anchor.set(0.5,0.5);
            this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'NextParty', this.buttonManager.GoToLevel2);
            
            theGame.level1Secs = theGame.tempTimeSec;
            theGame.level1Mins = theGame.tempTimeMin;
            
            //theGame.lvl1Star = this.starNum;
        }
        else if(theGame.currentLevel == 2)
        {
            this.gameEndPerson = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '80sEnd');
            this.gameEndPerson.anchor.set(0.5,0.5);
            this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'NextParty', this.buttonManager.GoToLevel3);
            
            theGame.level2Secs = theGame.tempTimeSec;
            theGame.level2Mins = theGame.tempTimeMin;
            
            //theGame.lvl2Star = this.starNum;
        }
        else if(theGame.currentLevel == 3)
        {
            if(theGame.theEra == 3)
            {
                this.gameEndPerson = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '90sEnd');
            }
            if(theGame.theEra == 4)
            {
                this.gameEndPerson = this.add.sprite(this.world.width*0.5, this.world.height*0.5, '2000sEnd');
            }
            this.gameEndPerson.anchor.set(0.5,0.5);
            this.buttonManager.createButton(this.world.width*0.5, this.world.height*0.8, 'EndGame', this.buttonManager.GoToEndScreen);
            
            theGame.level3Secs = theGame.tempTimeSec;
            theGame.level3Mins = theGame.tempTimeMin;
            
            //theGame.lvl3Star = this.starNum;
        }
        
        this.soundManager = new SoundManager(this);

        this.showStar();
                
        //Fade in and out
        theGame.FadeScreen = new FadeManager(this);
        theGame.FadeScreen.create();
    }, 
    
    update: function()
    {
        this.updateStar();
        theGame.FadeScreen.update(this.buttonManager.gametype);          
    },
    
    showStar: function()
    {
        this.fullStar.visible = true;
        this.tween = this.game.add.tween(this.fullStar.scale).to( { x: 1.2, y: 1.2}, 1000, Phaser.Easing.Bounce.Out, true);
        this.tween.onComplete.add(this.showStar2, this);
        this.soundManager.createSound('StarSFX');
        
        this.starNum = 1;
    }
    ,
    showStar2: function()
    {
        if(theGame.tempTimeMin <= 1 && theGame.tempTimeSec <= 60)
        {
            this.fullStar2.visible = true;
            this.tween = this.game.add.tween(this.fullStar2.scale).to( { x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.tween.onComplete.add(this.showStar3, this);
            this.soundManager.createSound('StarSFX');
            
            this.starNum = 2;
        }
    },
    
    showStar3: function()
    {
        if(theGame.tempTimeMin <= 0 && theGame.tempTimeSec <= 30)
        {
            this.fullStar3.visible = true;
            this.tween = this.game.add.tween(this.fullStar3.scale).to( { x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Bounce.Out, true);
            this.soundManager.createSound('StarSFX');
            
            this.starNum = 3;
        }
    }, 
    
    updateStar: function()
    {
        if(theGame.currentLevel == 1)
        {
            theGame.lvl1Star = this.starNum;
        }
        else if(theGame.currentLevel == 2)
        {
            theGame.lvl2Star = this.starNum;
        }
        else if(theGame.currentLevel == 3)
        {
            theGame.lvl3Star = this.starNum;
        }

    }
}