//Kinnear Justin Wong
//Nanyang Polytechnic

function InstructionsScreen(game)
{
    var playGameButton;
    var screenFade;
    var instructionsScreens = [];
    var screenNumber = 0;
    
    InstructionsScreen.prototype.preload = function() 
    {
    }

    InstructionsScreen.prototype.create = function()
    {
        instructionsScreens.push(game.add.sprite(game.world.width / 2, game.world.height / 2, 'instructions-screen-1'));
        instructionsScreens.push(game.add.sprite(game.world.width / 2, game.world.height / 2, 'instructions-screen-2'));
        instructionsScreens.push(game.add.sprite(game.world.width / 2, game.world.height / 2, 'instructions-screen-3'));
        
        // made all screens invisible
        for(var i = 0; i < instructionsScreens.length; i++)
        {
            instructionsScreens[i].visible = false;
            instructionsScreens[i].inputEnabled = true;
            instructionsScreens[i].anchor.setTo(0.5, 0.5);
            instructionsScreens[i].events.onInputDown.add(ClickedInstructionScreen, this);
        }
        
        // animate the first screen
        AnimateNextScreen(screenNumber);
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    InstructionsScreen.prototype.update = function()
    {
    }
     
    function ClickedInstructionScreen()
    {
        screenNumber++;
        
        if(screenNumber == instructionsScreens.length)
        {
            ChangeState();
        }
        else
        {
            instructionsScreens[screenNumber - 1].visible = false;
            AnimateNextScreen(screenNumber);
        }
    }
    
    function AnimateNextScreen(indexNumber)
    {
        // if the first element exists in the array
        if(instructionsScreens[indexNumber] != null)
        {
            instructionsScreens[indexNumber].visible = true;
            
            instructionsScreens[indexNumber].alpha = 0;
            var spriteTweenScale = game.add.tween(instructionsScreens[indexNumber]);
            spriteTweenScale.to({alpha: 1}, 500, Phaser.Easing.Exponential.InOut, true, 0, 0, false);
        }
    }
    
    function ChangeState()
    {
        screenFade.FadeOutWithCallback(1000, function(){ game.state.start("Game"); });
    }
}