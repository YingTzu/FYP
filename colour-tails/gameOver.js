//Kinnear Justin Wong
//Nanyang Polytechnic

function GameOver(game)
{
//    score = 50;
//    amountOfCupsFinished = 20;
    
    // Score text variable
    var scoreText;
    var cupsFinishedText;
    var totalScoreText;
    
    var tempScoreText = 0;
    var tempCupText = 0;
    
    var totalScore = 0;
    var tempTotalScore = 0;
    
    var replayButton;
    var exitButton;
    
    var finishedAnimatingCupAndScore = false;
    
    var firstIncrementTimer;
    var secondIncrementTimer;
    
    var screenFade;
    
    GameOver.prototype.preload = function()
    {
    }

    GameOver.prototype.create = function()
    {
        game.add.sprite(0, 0, 'end-screen-background');
//        game.add.sprite(0, 0, 'end-screen-layout');
        
        cupsFinishedText = game.add.text(485, 200, '' + tempCupText, { font:" 50px beon", fill: "#717dd4", align:"left" });
        
        scoreText  = game.add.text(485, 305, '' + tempScoreText, { font:" 50px beon", fill: "#717dd4", align:"left" });
        
        totalScoreText  = game.add.text(485, 400, '' + totalScore, { font:" 50px beon", fill: "#717dd4", align:"left" });
        
        
        exitButton = game.add.sprite(390, 520, 'exit-button');
        exitButton.anchor.setTo(0.5, 0.5);
        exitButton.inputEnabled = true;
        exitButton.visible = false;
        
        replayButton = game.add.sprite(555, 520, 'replay-button');
        replayButton.anchor.setTo(0.5, 0.5);
        replayButton.inputEnabled = true;
        replayButton.visible = false;
        
        replayButton.events.onInputDown.add(ReplayButton, this);
        exitButton.events.onInputDown.add(ExitButton, this);
        
        replayButton.events.onInputOver.add(function(){
            replayButton.loadTexture('replay-button-mouseover');
        }, this);
        
        replayButton.events.onInputOut.add(function(){
            replayButton.loadTexture('replay-button');
        }, this);
        
        exitButton.events.onInputOver.add(function(){
            exitButton.loadTexture('exit-button-mouseover');
        }, this);
        
        exitButton.events.onInputOut.add(function(){
            exitButton.loadTexture('exit-button');
        }, this);
        
        firstIncrementTimer = game.time.create(false);
        
        firstIncrementTimer.loop(15, function(){
        
            if(tempScoreText < score)
            {
                tempScoreText++;
            }

            if(tempCupText < amountOfCupsFinished)
            {
                tempCupText++;
            }
            
            soundManager.PlaySound('coin');
            
            if(tempCupText == amountOfCupsFinished && tempScoreText == score)
            {
                // calculate our total score to be shown
                totalScore = score * amountOfCupsFinished;
                
                // animate our bottom final score in
                secondIncrementTimer.start();
                
                // remove event listener
                firstIncrementTimer.stop();
            }

            scoreText.setText(tempScoreText);
            cupsFinishedText.setText(tempCupText);
        
        }, this);
        
        secondIncrementTimer = game.time.create(false);
        
        secondIncrementTimer.loop(25, function(){
            
            if(tempTotalScore < totalScore)
            {
                tempTotalScore += 10;
            }
            
            soundManager.PlaySound('coin');

            if(tempTotalScore >= totalScore)
            {
                tempTotalScore = totalScore;
                
                exitButton.visible = true;
                replayButton.visible = true;
                SpriteBounce(replayButton, 1.2, 1.2, 1, 1, 350);   
                SpriteBounce(exitButton, 1.2, 1.2, 1, 1, 350);
                
                soundManager.PlaySound('cha-ching');
                
                secondIncrementTimer.stop();
            }
            
            totalScoreText.setText(tempTotalScore);
            
        }, this);
        
        firstIncrementTimer.start();
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    GameOver.prototype.update = function()
    {
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
        amountOfCupsFinished = 0;
        totalScore = 0;
        tempTotalScore = 0;
        tempScoreText = 0;
        tempCupText = 0;
        
        soundManager.StopSound('cha-ching');
        soundManager.StopSound('coin');
    }
}