//Kinnear Justin Wong
//Nanyang Polytechnic

function GameOver(game)
{
//    score = 50;
    
    // Score text variables
    var hundredsText;
    var tensText;
    var onesText;
    
    var hundreds = 0;
    var tens = 0;
    var ones = 0;
    
    var modulusScore = 0;
    
    var tempScore = 0;
    
    var replayButton;
    var exitButton;
    
    var firstIncrementTimer;
    var firstIncrementTimerSpeed;
    var incrementBy;
    
    var increaseSpeedTimer = new CountdownTimer(1, 1);
    
    var screenFade;
    
    GameOver.prototype.preload = function()
    {
    }

    GameOver.prototype.create = function()
    {
        firstIncrementTimerSpeed = 100;
        incrementBy = 1;
        
        // just in case we set the score to the maximum possible score
        if(score > 999)
        {
            score = 999;
        }
        
        tempScore = modulusScore = hundreds = tens = ones = 0;
        
        // if the score is the maximum score
        if(score == 999)
        {
            game.add.sprite(0, 0, 'endscreen-background-max');
        }
        else
        {
            game.add.sprite(0, 0, 'endscreen-background');
        }
//        game.add.sprite(0, 0, 'endscreen-layout');
        
        hundredsText  = game.add.text(140, 210, hundreds.toString(), { font:" 120px PopWarner", fill: "#2e1f0d", align:"left" });
        tensText  = game.add.text(285, 210, tens.toString(), { font:" 120px PopWarner", fill: "#2e1f0d", align:"left" });
        onesText  = game.add.text(430, 210, ones.toString(), { font:" 120px PopWarner", fill: "#2e1f0d", align:"left" });
        
        exitButton = game.add.sprite(593, 40, 'endscreen-exit-button');
        exitButton.anchor.setTo(0.5, 0.5);
        exitButton.inputEnabled = true;
        
        replayButton = game.add.sprite(48, 38, 'endscreen-replay-button');
        replayButton.anchor.setTo(0.5, 0.5);
        replayButton.inputEnabled = true;

        replayButton.events.onInputDown.add(ReplayButton, this);
        exitButton.events.onInputDown.add(ExitButton, this);
        
        replayButton.events.onInputOver.add(function(){
            replayButton.loadTexture('endscreen-replay-button-mouseover');
        }, this);
        
        replayButton.events.onInputOut.add(function(){
            replayButton.loadTexture('endscreen-replay-button');
        }, this);
        
        exitButton.events.onInputOver.add(function(){
            exitButton.loadTexture('endscreen-exit-button-mouseover');
        }, this);
        
        exitButton.events.onInputOut.add(function(){
            exitButton.loadTexture('endscreen-exit-button');
        }, this);
        
        // create our timer
        firstIncrementTimer = game.time.create(false);
        
        firstIncrementTimer.loop(firstIncrementTimerSpeed, function(){
        
            if(tempScore < score)
            {
                tempScore += incrementBy;
            }
            
            //soundManager.PlaySound('coin');
            
            if(tempScore >= score)
            {
                // calculate our total score to be shown
                tempScore = score;
                
//               SpriteBounce(replayButton, 1.2, 1.2, 1, 1, 350);   
//               SpriteBounce(exitButton, 1.2, 1.2, 1, 1, 350);
//               soundManager.PlaySound('cha-ching');
                
                // remove event listener
                firstIncrementTimer.stop();
            }

            // break down our score here into 4 digits
            modulusScore = tempScore;
            
            hundreds = Math.floor(modulusScore / 100);
            modulusScore = modulusScore % 100;
            
            tens = Math.floor(modulusScore / 10);
            modulusScore = modulusScore % 10;
            
            ones = Math.floor(modulusScore);
            
            hundredsText.setText(hundreds);
            tensText.setText(tens);
            onesText.setText(ones);

        }, this);
        
        firstIncrementTimer.start();
        increaseSpeedTimer.StartTimer();
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    GameOver.prototype.update = function()
    {
        increaseSpeedTimer.UpdateTimer();
        
        if(increaseSpeedTimer.isCompleted)
        {
            incrementBy *= 5;
            firstIncrementTimerSpeed -= 10;
            
            if(firstIncrementTimerSpeed < 1)
            {
                firstIncrementTimerSpeed = 1;
            }
            
            increaseSpeedTimer.StopTimer();
            increaseSpeedTimer.StartTimer();
        }
    }
    
    function ReplayButton(sprite, pointer)
    {
        ResetVariables();
        screenFade.FadeOutWithCallback(fadeScreenSpeed, function(){game.state.start("Game");});
    }
    
    function ExitButton(sprite, pointer)
    { 
        ResetVariables();
        screenFade.FadeOutWithCallback(fadeScreenSpeed, function(){game.state.start("QuitGame");});
    }
    
    function ResetVariables()
    {
        score = 0;
        tempScore = 0;
//        soundManager.StopSound('cha-ching');
//        soundManager.StopSound('coin');
    }
}