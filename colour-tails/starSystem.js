//Kinnear Justin Wong
//Nanyang Polytechnic

StarSystem = function(spriteEmpty, spriteFull, posX, posY, spacing)
{
    game.load.image('starEmpty', 'assets/empty.png');
    game.load.image('starFull', 'assets/starFull.png');
    
    this.stars = [];
    
    this.posX = posX;
    this.posY = posY;
    this.spacing = spacing;
    
    this.spriteEmpty = spriteEmpty;
    this.spriteFull = spriteFull;
    
    this.tweenList = [];
    
    this.isFinished = false;
    
    // Store our stars previous positions so that we can
    
    // create our stars
    for(var i = 0; i < 3; i++)
    {
        var temp = game.add.sprite(posX + (i * spacing), posY, this.spriteEmpty);
        temp.anchor.setTo(0.5, 0.5);
        this.stars.push(temp);
    }
    
    // sets the amount of stars to animate
    StarSystem.prototype.AnimateStars = function(starAmount, scaleXTo, scaleYTo, duration, moveToX, moveToY)
    {
        for(var i = 0; i < this.stars.length; i++)
        {
            this.stars[i].scale.setTo(1, 1);
        }
        
        this.RemoveTweenCache();
        
        var countUp = 0;
        
        this.ResetSpriteToEmpty();
        
        try
        {
            this.RecursiveTween(starAmount, countUp, scaleXTo, scaleYTo, duration, moveToX, moveToY);
        }
        catch(error)
        {
            console.log('Star system has an error somewhere!');   
        }
    }
    
    StarSystem.prototype.RecursiveTween = function(starsToAnimate, starsIndex, scaleXTo, scaleYTo, duration, moveToX, moveToY)
    {
        soundManager.PlaySound('starMusic');
        
        //change our sprite's texture to full
        this.stars[starsIndex].loadTexture(this.spriteFull);
        
        var spriteTweenScale = game.add.tween(this.stars[starsIndex].scale);
            this.tweenList.push(spriteTweenScale);
            spriteTweenScale.to({ x : scaleXTo, y : scaleYTo}, duration, Phaser.Easing.Bounce.Out, true, 0, 0, true);
        
            spriteTweenScale.onComplete.add(function() {
                
                soundManager.PlaySound('starMusic');
                
                if(starsIndex == starsToAnimate - 1)
                {
                    this.RemoveTweenCache();
                    
                    this.MoveTweenStars(starsToAnimate, 0 , moveToX, moveToY, 200);
                    return;
                }

                ++starsIndex;
                
                this.RecursiveTween(starsToAnimate, starsIndex, scaleXTo, scaleYTo, duration, moveToX, moveToY);
        }, this);
    }
    
    StarSystem.prototype.MoveTweenStars = function(starsToAnimate, starsIndex, moveToX, moveToY, duration)
    {
         // Tween stars to the icon
         var spriteTweenScale = game.add.tween(this.stars[starsIndex]);
            this.tweenList.push(spriteTweenScale);
            spriteTweenScale.to({ x : moveToX, y : moveToY}, duration, Phaser.Easing.Quadratic.In, true, 0, 0, false);
        
            spriteTweenScale.onComplete.add(function() {
                
                this.stars[starsIndex].visible = false;
                
                if(starsIndex == starsToAnimate - 1)
                {
                    this.RemoveTweenCache();
                    
                    // Finished animation
                    this.isFinished = true;
                    
                    for(var i = 0; i < 3; i++)
                    {
                        this.stars[i].visible = true;
                        
                        this.stars[i].x = this.posX + (i * this.spacing);
                        this.stars[i].y = this.posY;
                    }
                    
                    this.ResetSpriteToEmpty();
                    return;
                }
                
                soundManager.PlaySound('starMusic');
                

                ++starsIndex;
                
                this.MoveTweenStars(starsToAnimate, starsIndex, moveToX, moveToY, duration);
        }, this);
    }
    
    StarSystem.prototype.ResetSpriteToEmpty = function()
    {
        for(var i = 0; i < this.stars.length; i++)
        {
            this.stars[i].loadTexture(this.spriteEmpty);
        }
    }
    
    StarSystem.prototype.IsFinished = function()
    {
        if(this.isFinished)
        {
            this.isFinished = false;
            return true;
        }

        return false;
    }
    
    StarSystem.prototype.RemoveTweenCache = function()
    {
        for(var i = 0; i < this.tweenList.length; i++)
        {
            game.tweens.remove(this.tweenList[i]);
        }
    }
};