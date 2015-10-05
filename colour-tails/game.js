//Kinnear Justin Wong
//Nanyang Polytechnic

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Global variables - Start (These variables exist through all states)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var score = 0;
var amountOfCupsFinished = 0;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Global Variables - End
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function GameScene(game)
{
    // trigger to lock the score to ensure that we can't multi click the serve bell to gain a multiplier on score
    var goNextRound = true;
    
    // Sprite variables for reference
    var blackCup;
    var whiteCup;
    
    // Our three groups
    var groupCorrectCup;
    var groupCombinedCup;
    var groupBottles;
    
    // Variables to hold the correct cup and also the player combined cup sprite object and shade values
    var combinedLiquid;
    var correctLiquid;

    // contains out previous cup colour and shade so we never ever repeat them
    var previousCorrectCupColour = 0;
    var previousCorrectCupShade = 0;

    // Various sprites for our cups
    var cyanCup;
    var magentaCup;
    var yellowCup;
    
    // serve button
    var serveButton;
    
    // Image variables
    var backCombinedCupImage;
    var backCorrectCupImage;

    // value to checks if the colour has finished interpolating
    var previousInterpolatedColour;
    
    var levelProgression = 0;
    
    // Highscore icon
    var highscoreIcon;
    var cupIcon;
    
    // cross icon
    var crossIcon;

    // Variables to store our text
    var scoreText;
    var timerText;
    var amountOfCupsFinishedText;

    // The limit to allow the player to still add to score
    var allowedShadeDifference = 3;
    
    // Countdown timer for our game
    var timer = new CountdownTimer(120, 1);
    var timerConverter = ConvertToMinutes(timer.counter);

    // Modfy these values to make the system limit our shade values
    var darkestShadeValue = -7;
    var lightestShadeValue = 7;
    
    // Temporary score variable so that the star finishes up its animation before adding to the score
    var addToScore;
    
    // Stores our star system
    var starSystem;
    
    // stores all of our different types of cup's information
    var typesOfCups = [];
    
    // index array of the first cup type
    var typeOfCupIndex = 0;
    
    // our shade droplet class
    var shadeDroplet;
    
    // reference to our pause button
    var pauseButton;
    
    // for our timer to tween whenever the counter value changes
    var timerPreviousCounter;
    
    // pause screen
    var pauseScreen;
    
    // our fading screen
    var screenFade;
    
    //Load our glasses via an array
    TypesOfCups = function(cupSprite, liquidSprite, offsetX, offsetY, centerOfCupOffsetX)
    {
        this.cupSprite = cupSprite;
        this.liquidSprite = liquidSprite;
        
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        
        this.centerOfCupOffsetX = centerOfCupOffsetX;
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Preload
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.preload = function()
    {
        // Load our cups & liquids
        typesOfCups.push( new TypesOfCups("cup1", "liquid1", 15, 0, -20));
        typesOfCups.push( new TypesOfCups("cup2", "liquid2", 0, 0, 0));
        typesOfCups.push( new TypesOfCups("cup3", "liquid3", -30, -10, 20));
        typesOfCups.push( new TypesOfCups("cup4", "liquid4", 0, 0, -14));
        
        // create our pause screen
        pauseScreen = new PauseScreen();
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Create
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.create = function()
    {  
        soundManager.PlaySound('bgMusic');
        
        //  A simple background for our game
        game.add.sprite(0, 0, 'background');
//        game.add.sprite(0, 0, 'layout');
        
        // Load our shadeDroplets
        shadeDroplet = new ShadeDroplet('black-drop', 'white-drop', 'magenta-drop', 'cyan-drop', 'yellow-drop');
        
        game.add.sprite(740, 110, 'order-list');
        
        var mixingSign = game.add.sprite(45, 90, 'mix-drinks-sign');
        mixingSign.scale.setTo(1.05, 1);
        
        // our two groups to store our correct and combined cup and liquid sprites
        groupCorrectCup = game.add.group();
        groupCombinedCup = game.add.group();
        groupBottles = game.add.group();
        
        //position the group
        groupCombinedCup.x = 590;
        groupCombinedCup.y = 410;
        groupCombinedCup.scale.setTo(0.8, 0.8);
        
        //position the group
        groupCorrectCup.x = 845;
        groupCorrectCup.y = 250;
        
        backCombinedCupImage = groupCombinedCup.create(0, 0, 'cup1');
        backCombinedCupImage.anchor.setTo(0.5,0.5);
        
        backCorrectCupImage = groupCorrectCup.create(0, 0, 'cup1');
        backCorrectCupImage.anchor.setTo(0.5,0.5);
        

        serveButton = game.add.sprite(840, 520, 'serveBtn');
        serveButton.anchor.setTo(0.5,0.5);
        serveButton.animations.add('ring');
        serveButton.inputEnabled = true;
        game.add.existing(serveButton);

        // various cup classes for encapsulation
        // Add the combined liquid and the correct liquid into a groups
        combinedLiquid = new ShadeColour(0, 0, 'liquid1', 0, ColorEnum.NONE, 1, 1);
        groupCombinedCup.add(combinedLiquid)
        
        correctLiquid = new ShadeColour(0, 0, 'liquid1', 0, ColorEnum.NONE, 1, 1);
        groupCorrectCup.add(correctLiquid);

        cyanCup = new ShadeColour(75, 475, 'cyan-bottle', 0, ColorEnum.CYAN, 1, 1);
        game.add.existing(cyanCup);
        
        magentaCup = new ShadeColour(150, 475, 'magenta-bottle', 0, ColorEnum.MAGENTA, 1, 1);
        game.add.existing(magentaCup);
        
        yellowCup = new ShadeColour(225, 475, 'yellow-bottle', 0, ColorEnum.YELLOW, 1, 1);
        game.add.existing(yellowCup);
        
        //black bottle
        blackCup = game.add.sprite(300, 515, 'black-bottle');
        blackCup.anchor.setTo(0.5,0.5);
        blackCup.scale.setTo(1, 1);
        blackCup.inputEnabled = true;
        game.add.existing(blackCup);

        //white bottle
        whiteCup = game.add.sprite(385, 515, 'white-bottle');
        whiteCup.anchor.setTo(0.5,0.5);
        whiteCup.scale.setTo(1, 1);
        whiteCup.inputEnabled = true;
        game.add.existing(whiteCup);
        
        groupBottles.add(magentaCup);
        groupBottles.add(cyanCup);
        groupBottles.add(yellowCup);
        groupBottles.add(whiteCup);
        groupBottles.add(blackCup);
        
        groupBottles.scale.setTo(0.95, 0.95);
        
        groupBottles.y = 20;
        groupBottles.x = 0;

        // Pause button, highscore and also timer icons
        pauseButton = game.add.sprite(903, 14, 'pause-icon');
       // pauseButton.scale.setTo(0.9, 0.9);
        pauseButton.inputEnabled = true;
        
        highscoreIcon = game.add.sprite(520, 32, 'highscore-icon');
        highscoreIcon.anchor.setTo(0.5, 0.5);
        highscoreIcon.scale.setTo(0.8, 0.8);
        
        game.add.sprite(25, 9, 'timer-icon');
        
        cupIcon = game.add.sprite(400, 10, 'cup-icon');
        
        //Load the star system into memory
        starSystem = new StarSystem('starEmpty', 'starFull', 790, 358, 50);
        
        crossIcon = game.add.sprite(700, 350, 'cross-icon');
        crossIcon.anchor.setTo(0.5, 0.5);
        crossIcon.visible = false;
        
        // Mouse events for all clickable objects
        blackCup.events.onInputDown.add(AddBlack, this);
        whiteCup.events.onInputDown.add(AddWhite, this);
        cyanCup.events.onInputDown.add(AddCyanColour, this);
        magentaCup.events.onInputDown.add(AddMagentaColour, this);
        yellowCup.events.onInputDown.add(AddYellowColour, this);
        pauseButton.events.onInputDown.add(function(){
            pauseScreen.OpenPauseMenu(timer);
        } , this);

        // button event handler
        serveButton.events.onInputDown.add(ServeButton, this);
        
        serveButton.events.onAnimationComplete.add(ServeAnimationComplete, this);

        scoreText = game.add.text(570, 35, score, { font:" 45px Beon", fill: "#a4bfff", align:"left" });
        scoreText.anchor.setTo(0.5, 0.5);
        
        timerText = game.add.text(120, 35, timerConverter.minutes + ' : ' + timerConverter.seconds, { font:" 45px Beon", fill: "#a4bfff", align:"center" });
        timerText.anchor.setTo(0.5, 0.5);
        
        amountOfCupsFinishedText = game.add.text(450, 35, amountOfCupsFinished, { font:" 45px Beon", fill: "#a4bfff", align:"left" });
        amountOfCupsFinishedText.anchor.setTo(0.5, 0.5);

        // Generate a colour the player has to match
        //start of the state so we generate a correct cup shade and colour
        RandomiseCorrectCup();

        timer.StartTimer();
        
        // assign the current counter to the temp counter for timer number tweening
        timerPreviousCounter = timer.counter;
        
        // create our pause menu
        pauseScreen.CreatePauseScreenVariables(game);
        
        screenFade = new ScreenFade("fade-out");
        screenFade.FadeIn(fadeScreenSpeed);
    }

    function AddWhite(sprite, pointer)
    {
        if(!goNextRound)
        {
            if(combinedLiquid.shade < lightestShadeValue)
            {
                combinedLiquid.shade += 1;
            }

            shadeDroplet.SpawnColour(shadeDroplet.DropletType.WHITE_DROPLET, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, 130, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, combinedLiquid.world.y - (combinedLiquid.height / 2) + 70 , 600);

            SpriteBounce(sprite, 1.2, 1.2, 1, 1, 100);

            soundManager.PlaySound('waterDropMusic');
        }
    }

    function AddBlack(sprite, pointer)
    {
        if(!goNextRound)
        {
            if(combinedLiquid.shade > darkestShadeValue)
            {
                combinedLiquid.shade -= 1;
            }

            shadeDroplet.SpawnColour(shadeDroplet.DropletType.BLACK_DROPLET, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, 130, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, combinedLiquid.world.y - (combinedLiquid.height / 2) + 70 , 600);

            SpriteBounce(sprite, 1.2, 1.2, 1, 1, 100);

            soundManager.PlaySound('waterDropMusic');
        }
    }

    function AddMagentaColour(sprite, pointer)
    {
        AddColourToCup(sprite, shadeDroplet.DropletType.MAGENTA_DROPLET);
    }
    
    function AddCyanColour(sprite, pointer)
    {
        AddColourToCup(sprite, shadeDroplet.DropletType.CYAN_DROPLET);
    }
    
    function AddYellowColour(sprite, pointer)
    {
        AddColourToCup(sprite, shadeDroplet.DropletType.YELLOW_DROPLET);
    }
    
    function AddColourToCup(sprite, dropletType)
    {
        if(!goNextRound)
        {
            SetPlayerCup(sprite);
            SpriteBounce(sprite, 1.2, 1.2, 1, 1, 100);
            shadeDroplet.SpawnColour(dropletType, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, 120, combinedLiquid.world.x + typesOfCups[typeOfCupIndex].centerOfCupOffsetX, combinedLiquid.world.y - (combinedLiquid.height / 2) + 70, 600);

            soundManager.PlaySound('waterDropMusic');
        }
    }
    
    function SetPlayerCup(sprite)
    {
        combinedLiquid.shade = 0;
        combinedLiquid.colourType = sprite.colourType;
        combinedLiquid.tint = combinedLiquid.ObtainColour();
    }

    function ServeButton(sprite)
    {        
        if(!goNextRound)
        {
            goNextRound = true;

            // play our serve button 'ring' animation
            serveButton.animations.play('ring', 25, false);
            soundManager.PlaySound('bellMusic');
        }
    }
    
    function ServeAnimationComplete()
    {
        // only when we complete our animation do we add our score and render a new cup
        var shadeDifference = Math.abs(combinedLiquid.shade - correctLiquid.shade);

        // reset and validate
        if(correctLiquid.colourType == combinedLiquid.colourType)
        {
            var temporaryScore = allowedShadeDifference;

            if(shadeDifference <= allowedShadeDifference)
            {
                for(var i = 0; i < shadeDifference; i++)
                {
                   temporaryScore--;
                }

                if(Math.abs(temporaryScore) > allowedShadeDifference)
                {
                    temporaryScore = 0;
                }

                addToScore = Math.abs(temporaryScore);

                starSystem.AnimateStars(temporaryScore, 3, 3, 250, highscoreIcon.world.x, highscoreIcon.world.y);
            }
            else
            {
                crossIcon.visible = true;
                soundManager.PlaySound('wrongMusic');
                SpriteBounceWithOnCompleteCallback(crossIcon, 3, 3, 0, 0, 350, GenerateNextLevel);
            }
        }
        else
        {
            crossIcon.visible = true;
            soundManager.PlaySound('wrongMusic');
            SpriteBounceWithOnCompleteCallback(crossIcon, 3, 3, 0, 0, 350, GenerateNextLevel);
        }
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Update
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GameScene.prototype.update = function()
    {
        previousInterpolatedColour = combinedLiquid.tint;

        // interpolate colour
        combinedLiquid.tint = Phaser.Color.interpolateColor(combinedLiquid.tint,  ShadeColourIntegerWrapper(combinedLiquid.ObtainColour(), combinedLiquid.shade), 100, 10, 0);

        // when tween is finished
        if(previousInterpolatedColour == combinedLiquid.tint)
        {
            combinedLiquid.tint = ShadeColourIntegerWrapper(combinedLiquid.ObtainColour(), combinedLiquid.shade);
        }
        
        scoreText.setText(score);
        
        amountOfCupsFinishedText.setText(amountOfCupsFinished);

        if(timer.counter < 21)
        {
            if(timerPreviousCounter > timer.counter)
            {
                timerPreviousCounter = timer.counter;
                // run our tweening animation
                SpriteBounce(timerText, 1.1, 1.1, 1, 1,  350);
                soundManager.PlaySound('timerMusic');
            }
        }
        
        timer.UpdateTimer();
        
        // timer has finished
        if(timer.isCompleted && !goNextRound || pauseScreen.IsExit())
        {
            ShutDown();
            screenFade.FadeOutWithCallback(fadeScreenSpeed,function (){game.state.start("GameOver");});
        }
        
        
        if(starSystem.IsFinished())
        {
            // animate sprite score bounce
            SpriteBounce(scoreText, 1.5, 1.5, 1, 1,  350);
            SpriteBounce(highscoreIcon, 1.5, 1.5, 1, 1,  350);
            score += addToScore;
            addToScore = 0;
            amountOfCupsFinished ++;
            
            GenerateNextLevel();
        }
        
        timerConverter = ConvertToMinutes(timer.counter);
        timerText.setText(timerConverter.minutes + ' : ' + timerConverter.seconds);
        
        if(pauseScreen.isPaused)
        {
            timer.PauseTimer();    
        }
        else
        {
            timer.ResumeTimer();
        }
    }

    function RandomiseCorrectCup()
    {
        //Randomise a different cup every single time
        typeOfCupIndex = RandomiseDifferentNumber(typeOfCupIndex, 0, typesOfCups.length - 1);
        
        correctLiquid.loadTexture(typesOfCups[typeOfCupIndex].liquidSprite);
        
        // For level progression
        if(levelProgression < 5)
        {
            if(levelProgression == 0)
            {
                correctLiquid.colourType = ColorEnum.CYAN;
                correctLiquid.shade = 0;
            }
            else if(levelProgression == 1)
            {
                correctLiquid.colourType = ColorEnum.MAGENTA;
                correctLiquid.shade = 0;
            }
            else if(levelProgression == 2)
            {
                correctLiquid.colourType = ColorEnum.YELLOW;
                correctLiquid.shade = 0;
            }
            else if(levelProgression == 3)
            {
                correctLiquid.colourType = RandomiseDifferentNumber(previousCorrectCupColour, 1, 3);
                correctLiquid.shade = -3;
            }
            else if(levelProgression == 4)
            {
                correctLiquid.colourType = RandomiseDifferentNumber(previousCorrectCupColour, 1, 3);
                correctLiquid.shade = 3;
            }
            
            levelProgression ++;
        }
        else
        {
            correctLiquid.colourType = RandomiseDifferentNumber(previousCorrectCupColour, 1, 3);
            correctLiquid.shade = RandomiseDifferentNumber(previousCorrectCupShade, darkestShadeValue, lightestShadeValue);
        }
        
        correctLiquid.tint = ShadeColourIntegerWrapper(correctLiquid.ObtainColour(), correctLiquid.shade);
        
        backCorrectCupImage.loadTexture(typesOfCups[typeOfCupIndex].cupSprite);
        
        correctLiquid.x = typesOfCups[typeOfCupIndex].offsetX;
        correctLiquid.y = typesOfCups[typeOfCupIndex].offsetY;
        
        backCorrectCupImage.x = typesOfCups[typeOfCupIndex].offsetX;
        backCorrectCupImage.y = typesOfCups[typeOfCupIndex].offsetY;
        
        //Animate a bounce here
            SpriteBounceWithOnCompleteCallback(groupCorrectCup, 0.4, 0.4, 0.35, 0.35, 350, ResetCombinedCup);
    }

    function ResetCombinedCup()
    {
        combinedLiquid.loadTexture(typesOfCups[typeOfCupIndex].liquidSprite);
        backCombinedCupImage.loadTexture(typesOfCups[typeOfCupIndex].cupSprite);
        
        combinedLiquid.x = typesOfCups[typeOfCupIndex].offsetX;
        combinedLiquid.y = typesOfCups[typeOfCupIndex].offsetY;
        
        backCombinedCupImage.x = typesOfCups[typeOfCupIndex].offsetX;
        backCombinedCupImage.y = typesOfCups[typeOfCupIndex].offsetY;
        
        combinedLiquid.shade = 0;
        combinedLiquid.colourType = ColorEnum.NONE;
        combinedLiquid.tint = 0xFFFFFF;
        
            SpriteBounceWithOnCompleteCallback(groupCombinedCup, 1, 1, 0.8, 0.8, 200, GoToNextLevel);
    }
    
    function GoToNextLevel()
    {
        goNextRound = false;
    }
    
    function GenerateNextLevel()
    {
        previousCorrectCupColour = correctLiquid.colourType;
        previousCorrectCupShade = correctLiquid.shade;

        RandomiseCorrectCup();
    }
    
     // Resets all of our variables as state changing does not reset our variables.
    function ShutDown()
    {
        //reset our timer here
        timer.StopTimer();
        goNextRound = false;
        
        // Remove our music variables here
        soundManager.StopSound('bgMusic');
        soundManager.StopSound('bellMusic');
        soundManager.StopSound('starMusic');
        soundManager.StopSound('timerMusic');
        soundManager.StopSound('waterDropMusic');
        soundManager.StopSound('wrongMusic');
    }
}