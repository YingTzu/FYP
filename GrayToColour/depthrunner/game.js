//Kinnear Justin Wong
//Nanyang Polytechnic

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Global variables - Start (These variables exist through all states)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var playerStunned = false;
var hitPlayer = false;
var playerHitByObjectIndex = 0;
var score = 0;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Global Variables - End
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function GameScene(game)
{
    // pause screen
    var pauseScreen;
    
    // our fading screen
    var screenFade;
    
    var player;
    
    var grids = [];
    
    var downArrow;
    var upArrow;
    var leftArrow;
    var rightArrow;
    
    var sKey;
    var aKey;
    var wKey;
    var dKey;
    
    // intial lane that the player is on
    var playerPositionX;
    var playerPositionY;
    
    var enemy1 = null;
    var enemy2 = null;
    var enemyGroup;
    
    var levelProgressionTimer = new CountdownTimer(60, 1);
    
    var previousEnemyLane1 = 0;
    var enemyLane1 = 0;
    var enemyLane2 = 0;
    
    var spawnedSecondEnemy = false;
    
    var playerUnableToMove = new CountdownTimer(1, 0.5);
    
    var pauseButton;
    
    // the hearts shown on the UI
    var hearts = [];
    
    var distanceRanTimer = new CountdownTimer(1, 0.2);
    var distanceRanText;
    
    var livesLeft;
    
    var cloud1;
    
    var grass;
    
    var paused = false;
    
    var handlePointerDown;
    
    var playedGameOnce = false;
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Preload
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.preload = function()
    {
        playerPositionX = 1;
        playerPositionY = 0;
        
        game.add.sprite(0, 0, 'background');
//        game.add.sprite(0, 0, 'game-layout');
        
        // create our cloud
        cloud1 = new MoveCloud(50, 100, 1);
        
        var mountains = game.add.sprite(game.world.width / 2, 195, 'mountains');
        mountains.anchor.setTo(0.5, 0.5);
        //mountains.scale.setTo(1, 0.5);
        
        grass = game.add.sprite(game.world.width / 2, 360, 'grass');
        grass.anchor.setTo(0.5,0.5);
        grass.animations.add('grass-move');
        grass.animations.play('grass-move', 6, true);
                
        player = game.add.sprite(200, 200, 'player-easy-3');
        player.anchor.setTo(0.5,0.5);
        player.scale.setTo(0.8,0.8);
        player.animations.add('player-run');
        player.animations.play('player-run', 6, true);
        
        game.add.sprite(10, 10, 'game-score-board');
        
        // create our hearts
        for(var i = 0; i < 3; i++)
        {
            hearts[i] = game.add.sprite(34 + (i * 30), 62, 'game-heart');
        }
        
        pauseButton = game.add.sprite(586, 10, 'game-pause-button');
        pauseButton.events.onInputOver.add(function(){pauseButton.loadTexture('game-pause-button-mouseover');}, this);
        pauseButton.events.onInputOut.add(function(){pauseButton.loadTexture('game-pause-button');}, this);
        pauseButton.events.onInputDown.add(PressedPauseButton, this);
        pauseButton.inputEnabled = true;
        
        distanceRanText = game.add.text(56, 30, '', { font:" 40px RattyTatty", fill: "#422c0e", align:"left" });
        distanceRanText.anchor.setTo(0.5, 0.5);
        
        livesLeft = 3;
        
        // create our pause screen
        pauseScreen = new PauseScreen();
        
        distanceRanTimer.StartTimer();
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Create
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.create = function()
    {  
        if(!playedGameOnce)
        {
            // create our grid cells
            CreateGridRow(240, 410, 250, 300);
            CreateGridRow(200, 450, 290, 320);
            CreateGridRow(140, 510, 330, 380);
            CreateGridRow(80, 570, 385, 465);
            playedGameOnce = true;
        }
        
        game.input.onDown.add(handlePointerDown);
        
        leftArrow = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightArrow = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        upArrow = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downArrow = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
        leftArrow.onDown.add(PlayerMoveLeft, this);
        rightArrow.onDown.add(PlayerMoveRight, this);
        upArrow.onDown.add(PlayerMoveUp, this);
        downArrow.onDown.add(PlayerMoveDown, this);
        aKey.onDown.add(PlayerMoveLeft, this);
        dKey.onDown.add(PlayerMoveRight, this);
        wKey.onDown.add(PlayerMoveUp, this);
        sKey.onDown.add(PlayerMoveDown, this);
        
        // make the player start at a position
        player.x = grids[playerPositionY][playerPositionX].centerX;
        player.y = grids[playerPositionY][playerPositionX].centerY;
        
        ChangePlayerSpriteToRelativeDepth();
        
        enemyGroup = game.add.group();
        
        // change the direction and NEVER THE SAME LANE when we spawn two chickens
        enemy1 = new EnemyBehaviour(false);

        enemyGroup.add(enemy1.enemy);
        for(var i = 0; i < enemy1.fallingObjectsArray.length; i++)
        {
            enemyGroup.add(enemy1.fallingObjectsArray[i].fallingObjectSprite);
        }
        
        levelProgressionTimer.StartTimer();
        
        // create our pause menu
        pauseScreen.CreatePauseScreenVariables(game);
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Update
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.update = function()
    {
        cloud1.Update();
        
        playerUnableToMove.UpdateTimer();
        
        // determine when the second enemy appears
        levelProgressionTimer.UpdateTimer();
        
        // to calculate our distance
        distanceRanTimer.UpdateTimer();
        
        // make the player start at a position
        player.x = grids[playerPositionY][playerPositionX].centerX;
        player.y = grids[playerPositionY][playerPositionX].centerY;
        
        enemyLane1 = previousEnemyLane1 = RandomiseDifferentNumber(previousEnemyLane1, 0, 3);
        enemy1.Update(grids, player, playerPositionY, enemyLane1);
        
        // if we have not spawned the second enemy we do not update it
        if(enemy2 != null)
        {
            // try not to use the same lane as the previous enemy
            enemyLane2 = RandomiseDifferentNumber(enemyLane1, 0, 3);
            enemy2.Update(grids, player, playerPositionY, enemyLane2);
        }
        
        if(levelProgressionTimer.counter <= 55 && !spawnedSecondEnemy)
        {
            // Spawn a new chicken
            enemy2 = new EnemyBehaviour(true);
            enemyGroup.add(enemy2.enemy);
            
            for(var i = 0; i < enemy2.fallingObjectsArray.length; i++)
            {
                enemyGroup.add(enemy2.fallingObjectsArray[i].fallingObjectSprite);
            }
            
            spawnedSecondEnemy = true;
        }
        
        // start our timer when the player is stunned!
        if(hitPlayer)
        {
            hitPlayer = false;

            var playerHitSpriteName = 'player-hit-';
            
            if(playerHitByObjectIndex == 0)
            {
                playerHitSpriteName += 'banana-';
            }
            else if(playerHitByObjectIndex == 1)
            {
                playerHitSpriteName += 'fish-';
            }
            else if(playerHitByObjectIndex == 2)
            {
                playerHitSpriteName += 'hammer-';
            }
            else if(playerHitByObjectIndex == 3)
            {
                playerHitSpriteName += 'wrench-';
            }
            
            playerHitSpriteName = playerHitSpriteName + playerPositionY.toString();
            // change the player sprite to the hit sprite
            player.loadTexture(playerHitSpriteName);
            player.scale.setTo(0.3 * LayerScalingFactor(playerPositionY), 0.3 * LayerScalingFactor(playerPositionY));
            
            
            playerUnableToMove.StopTimer();
            playerUnableToMove.StartTimer();
            playerStunned = true;
            
            // minus a life!
            if(livesLeft > 0)
            {
                livesLeft--;
            }
            
            hearts[livesLeft].visible = false;
        }
        
        // unfreeze the player
        if(playerUnableToMove.isCompleted)
        {
            playerStunned = false;
            playerUnableToMove.StopTimer();
            ChangePlayerSpriteToRelativeDepth();
        }
        
        // reset our timer
        if(distanceRanTimer.isCompleted)
        {
            score ++;
            distanceRanTimer.StopTimer();
            distanceRanTimer.StartTimer();
        }
        
        distanceRanText.setText(score);
        
        // game over
        if((livesLeft == 0 || pauseScreen.IsExit()) || score >= 999)
        {
            ShutDown();
            screenFade.FadeOutWithCallback(fadeScreenSpeed, function(){game.state.start("GameOver");});
        }
        
        if(pauseScreen.IsResumed())
        {
            ResumeGame();
        }
    }
    
    //handle a touch/click
    function handlePointerDown(pointer)
    {
        if(!paused && !playerStunned)
        {
            for(var i = 0; i < grids.length; i++)
            {
                for(var j = 0; j < grids[0].length; j++)
                {
                    var rect = new Phaser.Rectangle(grids[i][j].leftX, grids[i][j].topY, grids[i][j].rightX - grids[i][j].leftX, grids[i][j].bottomY - grids[i][j].topY);

                    if(rect.contains(pointer.x,pointer.y))
                    {
                        playerPositionX = j;
                        playerPositionY = i;
                        ChangePlayerSpriteToRelativeDepth();
                    }
                }
            }
        }
    }
    
    function PlayerMoveLeft()
    {
        if(!paused && !playerStunned)
        {
            if(playerPositionX > 0)
            {
                playerPositionX--;
            }
        }
    }
    
    function PlayerMoveRight()
    {
        if(!paused && !playerStunned)
        {
            if(playerPositionX < 2)
            {
                playerPositionX++;
            }
        }
    }

    function PlayerMoveUp()
    {
        if(!paused && !playerStunned)
        {
            if(playerPositionY > 0)
            {
                playerPositionY--;
                ChangePlayerSpriteToRelativeDepth();
            }
        }
    }
    
    function PlayerMoveDown()
    {
        if(!paused && !playerStunned)
        {
            if(playerPositionY < 3)
            {
                playerPositionY++;
                ChangePlayerSpriteToRelativeDepth();
            }
        }
    }
    
    function ChangePlayerSpriteToRelativeDepth()
    {
        player.loadTexture('player-easy-' + playerPositionY.toString());
        player.animations.play('player-run', 6, true);
        player.scale.setTo(LayerScalingFactor(playerPositionY), LayerScalingFactor(playerPositionY));
    }
    
    function CreateGridRow(leftSide, rightSide, topSide, bottomSide)
    {
        //create our cells starting from the top to the bottom of the screen
        // define our row
        grids.push([]);
        
        // separate our row into 3 parts
        var columnAmount = 3;
        
        var cellDistance = (rightSide - leftSide) / columnAmount;
        
        var alternateColour = true;
        var rectangleColour;
        
        if(grids.length % 2)
        {
            alternateColour = false;
        }
    
        for(var j = 0; j < columnAmount; j++)
        {
            if(alternateColour)
            {
                rectangleColour = '#FF0000';   
            }
            else
            {
                rectangleColour = '#0FFFFF';
            }
            
            var gridCell = new GridCell(leftSide + (cellDistance * j), leftSide + (cellDistance * (j + 1)), topSide, bottomSide, rectangleColour);
            
            // pur our cell into the last parent element
            grids[grids.length - 1].push(gridCell);
            
            // flip our colour
            alternateColour = !alternateColour;
        }
    }
    
    function PressedPauseButton()
    {
        // pause our other animations and various timers first
        player.animations.stop();
        grass.animations.stop();
        enemy1.PauseAllItems();
        
        if(enemy2 != null)
        {
            enemy2.PauseAllItems();
        }
        
        distanceRanTimer.PauseTimer();
        playerUnableToMove.PauseTimer();
        levelProgressionTimer.PauseTimer();
        
        paused = true;
        
        pauseScreen.OpenPauseMenu();
    }
    
    function ResumeGame()
    {
        // pause our other animations and various timers first
        player.animations.play('player-run', 6, true);
        grass.animations.play('grass-move', 6, true);
        enemy1.ResumeAllItems();
        
        if(enemy2 != null)
        {
            enemy2.ResumeAllItems();
        }
        
        distanceRanTimer.ResumeTimer();
        playerUnableToMove.ResumeTimer();
        levelProgressionTimer.ResumeTimer();
        
        paused = false;
    }

    GameScene.prototype.render = function()
    {
//        // print out our grids
//        for(var i = 0; i < grids.length; i++)
//        {
//            for(var j = 0; j < grids[i].length; j++)
//            {
//                 var rect = new Phaser.Rectangle(grids[i][j].leftX, grids[i][j].topY, grids[i][j].rightX - grids[i][j].leftX, grids[i][j].bottomY - grids[i][j].topY);
//                 game.debug.geom(rect, grids[i][j].debugRectangleColour);
//            }
//        }
        
//        for(var i = 0; i < enemy1.fallingObjectsArray.length; i++)
//        {
//            enemy1.fallingObjectsArray[i].Render();
//        }
//        
//        if(enemy2 != null)
//        {
//            for(var i = 0; i < enemy2.fallingObjectsArray.length; i++)
//            {
//                enemy2.fallingObjectsArray[i].Render();
//            }
//        }
//        
//        game.debug.body(player);
    }

     // Resets all of our variables as state changing does not reset our variables.
    function ShutDown()
    {
        player.animations.stop();
        grass.animations.stop();
        
        enemy1.ShutDown();
        
        if(enemy2 != null)
        {
            enemy2.ShutDown();
        }
        
        playerStunned = hitPlayer = paused = false;
    }
}