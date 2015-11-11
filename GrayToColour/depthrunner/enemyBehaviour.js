//Kinnear Justin Wong
//Nanyang Polytechnic

// 1) Every 5 seconds the enemy will walk across the screen
// 2) Pick a lane
// 3) As the enemy walks across the screen depending on direction
// 4) (Optional) as iterations pass the timer will reduce the duration within each pass

EnemyBehaviour = function(leftDirection)
{
    this.movingSpeed = 4;
    this.disappearingOffset = 200; // extra offset to position the enemy outside of the screen before disappearing
    this.animationFrameSpeed = 3;
    this.previousLaneNumber = 1;
    this.laneNumber = 1;
    this.walkingFromLeft = leftDirection;

    this.enemy = game.add.sprite(100, 100, 'enemy-0');
    this.enemy.anchor.setTo(0.5,0.5);
    this.enemy.animations.add('enemy');
    this.enemy.animations.play('enemy', this.animationFrameSpeed, true);
    this.enemy.visible = false;
    
    this.enemyAttackTimer = new CountdownTimer(2, 1);
    
    this.paused = false;
    
    this.fallingObjectsArray = []; // stores all of the dropped elements inside
    
    // create our falling objects pool
    for(var i = 0; i < 9; i++)
    {
        this.fallingObjectsArray.push(new FallingObjects());
    }
    
    this.enemyAttackTimer.StartTimer();
    
    EnemyBehaviour.prototype.PrepareToMove = function(positionY, randomLane)
    {
        //pick a lane
        //this.laneNumber = this.previousLaneNumber = RandomiseDifferentNumber(this.previousLaneNumber, 0, 3);
        this.laneNumber = randomLane;
        this.enemy.loadTexture('enemy-' + this.laneNumber.toString());
        
        this.enemy.y = positionY - 300;
        
        // make the enemy walk towards the other side
        this.walkingFromLeft = !this.walkingFromLeft;
        
        this.ScalingOnEnemy();
        
        this.enemy.visible = true;
        this.enemy.animations.play('enemy', this.animationFrameSpeed, true);
    }
    
    // pass in cell positions on the lane the enemy is on
    EnemyBehaviour.prototype.Update = function(grid, player, playerLane, randomLane)
    {
        if(this.enemy.visible)
        {
            // walking in from the left
            if(this.walkingFromLeft && !this.paused)
            {
                this.enemy.x += this.movingSpeed;

                if(this.enemy.x > game.world.width + this.disappearingOffset)
                {
                    // stop moving
                    this.enemy.visible = false;
                    this.enemyAttackTimer.StartTimer();
                    
                    // clear our grid pass
                    for(var i = 0; i < grid[this.laneNumber].length; i ++)
                    {
                        grid[this.laneNumber][i].hasObject = false;
                    }
                        
                    return;
                }
            }
            else if(!this.walkingFromLeft && !this.paused)
            {  
                this.enemy.x -= this.movingSpeed;

                if(this.enemy.x < 0 - this.disappearingOffset)
                {
                    // stop moving
                    this.enemy.visible = false;
                    this.enemyAttackTimer.StartTimer();
                    
                    // clear our grid pass
                    for(var i = 0; i < grid[this.laneNumber].length; i ++)
                    {
                        grid[this.laneNumber][i].hasObject = false;
                    }
                    
                    return;
                }
            }

            // Pick a grid
            for(var i = 0; i < grid[this.laneNumber].length; i++)
            {
                if(this.walkingFromLeft && !this.paused)
                {
                    // for every single grid item inside the grid
                     if(grid[this.laneNumber][i].centerX < this.enemy.x)
                     {
                         // if we have not spawn assigned a falling object onto the grid cell yet
                        if(!grid[this.laneNumber][i].hasObject)
                        {
                            // spawn one item into the grid
                            for(var j = 0; j < this.fallingObjectsArray.length; j++)
                            {
                                if(!this.fallingObjectsArray[j].fallingObjectSprite.exists)
                                {
                                    //console.log('walking left drop');
                                    this.fallingObjectsArray[j].SpawnSprite(this.laneNumber, i, grid[this.laneNumber][i].centerX, this.enemy.y, grid[this.laneNumber][i].centerY);
                                    grid[this.laneNumber][i].hasObject = true;
                                    break;
                                }
                            }
                        }
                     }
                }
                else if(!this.walkingFromLeft && !this.paused)
                {
                    // for every single grid item inside the grid
                     if(grid[this.laneNumber][i].centerX > this.enemy.x)
                     {
                         // if we have not spawn assigned a falling object onto the grid cell yet
                        if(!grid[this.laneNumber][i].hasObject)
                        {
                            // spawn one item into the grid
                            for(var j = 0; j < this.fallingObjectsArray.length; j++)
                            {
                                if(!this.fallingObjectsArray[j].fallingObjectSprite.exists)
                                {
//                                    console.log('walking right drop');
                                    this.fallingObjectsArray[j].SpawnSprite(this.laneNumber, i, grid[this.laneNumber][i].centerX, this.enemy.y, grid[this.laneNumber][i].centerY);
                                    grid[this.laneNumber][i].hasObject = true;
                                    break;
                                }
                            }
                        }
                     }
                }
            }
        }
        else
        {
            this.enemyAttackTimer.UpdateTimer();
            
            if(this.enemyAttackTimer.isCompleted)
            {
                this.PrepareToMove(500 - (this.laneNumber * 20), randomLane);
                this.enemyAttackTimer.StopTimer();
            }
        }
        
        // update projectiles here~!
        for(var i = 0; i < this.fallingObjectsArray.length; i++)
        {
            this.fallingObjectsArray[i].Update(grid, player, playerLane);    
        }
    }
    
    EnemyBehaviour.prototype.ScalingOnEnemy = function ()
    {
        var scalingFactor = LayerScalingFactor(this.laneNumber);
        
        if(this.walkingFromLeft)
        {
            // flip our sprite
            this.enemy.x = -100;
            this.enemy.scale.setTo(-scalingFactor, scalingFactor);  // these values should multiply against our scale factor
        }
        else
        {
            this.enemy.x = game.world.width;
            this.enemy.scale.setTo(scalingFactor, scalingFactor); // these values should multiply against our scale factor
        }
    }
    
    EnemyBehaviour.prototype.PauseAllItems = function ()
    {
        this.enemy.animations.stop();
        this.enemyAttackTimer.PauseTimer();
        
        for(var i = 0; i < this.fallingObjectsArray.length; i++)
        {
            this.fallingObjectsArray[i].disappearTimer.PauseTimer();
            this.fallingObjectsArray[i].paused = true;
        }
        
        this.paused = true;
    }
    
    EnemyBehaviour.prototype.ResumeAllItems = function ()
    {
        this.enemy.animations.play('enemy', this.animationFrameSpeed, true);
        this.enemyAttackTimer.ResumeTimer();
        
        for(var i = 0; i < this.fallingObjectsArray.length; i++)
        {
            this.fallingObjectsArray[i].disappearTimer.ResumeTimer();
            this.fallingObjectsArray[i].paused = false;
        }
        
        this.paused = false;
    }
    
    EnemyBehaviour.prototype.ShutDown = function ()
    {
        this.enemyAttackTimer.StopTimer();
        this.enemy.animations.stop();
    }
};