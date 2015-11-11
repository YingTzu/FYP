//Kinnear Justin Wong
//Nanyang Polytechnic

FallingObjects = function()
{
    this.fallingObjectSprite = game.add.sprite(0, 0, 'falling-banana-0');
    this.fallingObjectSprite.anchor.setTo(0.5, 0.5);
    
    this.falling = true;
    this.depthNumber = 0;
    this.indexNumber = 0;
    this.typeOfFallingObject = 0;
    this.fallingSpeed = 4;
    
    this.goalPosY = 0;
    
    this.disappearTimer = new CountdownTimer(1, 1);
    
    this.fallingObjectSprite.exists = false;
    
    this.paused = false;
    
    FallingObjects.prototype.SpawnSprite = function(depthNumber, indexNumber, posX, startPosY, goalPosY)
    {
        this.falling = true;
        this.depthNumber = depthNumber;
        this.indexNumber = indexNumber;
        
        this.typeOfFallingObject = game.rnd.between(0, 3);
        // switch to the appropriate sprite
        this.fallingObjectSprite.loadTexture(this.GenerateSpriteName(this.falling, this.typeOfFallingObject, this.depthNumber));
        this.fallingObjectSprite.exists = true;
        
        this.fallingObjectSprite.x = posX;
        this.fallingObjectSprite.y = startPosY;
        
        this.goalPosY = goalPosY;
        this.disappearTimer.StartTimer();
    }
    
    FallingObjects.prototype.Update = function(grid, player, playerLane)
    {
        if(!this.paused)
        {
            // if the object is falling already
            if(this.falling && this.fallingObjectSprite.exists)
            {
                this.fallingObjectSprite.y += this.fallingSpeed;

                if(this.fallingObjectSprite.y > this.goalPosY)
                {
                    this.fallingObjectSprite.y = this.goalPosY;

                    this.falling = false;

                    // switch to the appropriate sprite
                    this.fallingObjectSprite.loadTexture(this.GenerateSpriteName(this.falling, this.typeOfFallingObject, this.depthNumber));
                }
            }
            else if(!this.falling && this.fallingObjectSprite.exists)
            {
                // update 
                this.disappearTimer.UpdateTimer();

                if(this.disappearTimer.isCompleted)
                {
                    this.disappearTimer.StopTimer();
                    // disappear
                    this.fallingObjectSprite.exists = false;
    //                console.log('disappear!');
                }
            }

            // Detect for collision with player
            if(this.fallingObjectSprite.exists)
            {
                if(Phaser.Rectangle.intersects(player.getBounds(), this.fallingObjectSprite.getBounds()))
                {
                    if(playerLane == this.depthNumber)
                    {
    //                    console.log("Collided!");
                        hitPlayer = true;

                        // indicate what object hit the player
                        playerHitByObjectIndex = this.typeOfFallingObject;

                        this.fallingObjectSprite.exists = false;
                        this.disappearTimer.StopTimer();
                    }
                }
            }
        }
    }
    
    FallingObjects.prototype.Render = function()
    {
        game.debug.body(this.fallingObjectSprite);
    }
    
   // generate the name of the sprite key with these parameters
   FallingObjects.prototype.GenerateSpriteName = function(falling, objectType, depthNumber)
   {
        var spriteName = '';
       
        if(falling)
        {
            spriteName += 'falling-';
        }
        else
        {
           spriteName += 'fallen-';
        }
        
        if(objectType == 0)
        {
            spriteName += 'banana-';
        }
        else if(objectType == 1)
        {
            spriteName += 'fishbone-';
        }
        else if(objectType == 2)
        {
            spriteName += 'hammer-';
        }
        else if(objectType == 3)
        {
            spriteName += 'wrench-';
        }
       
        this.fallingObjectSprite.scale.setTo(0.3 * LayerScalingFactor(depthNumber), 0.3 * LayerScalingFactor(depthNumber));
        
        spriteName = spriteName + depthNumber.toString();
        
        return spriteName;
    }
};