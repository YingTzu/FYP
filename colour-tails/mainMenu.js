//Kinnear Justin Wong
//Nanyang Polytechnic

function MainMenu(game)
{
    var playGameButton;
    var leftDoor;
    var rightDoor;
    var doorTweenLeft;
    var doorTweenRight;
    
    var leftDoorFinished = false;
    var rightDoorFinished = false;
    
    var doorGlow;
    
    var screenFade;
    
    MainMenu.prototype.preload = function() 
    {
    }

    MainMenu.prototype.create = function()
    {
//        barAudio = game.add.audio('bar-crowd', 0.3, true);
//        barAudio.play();
        soundManager.PlaySound('bar-crowd');
        
        var doorBackground = game.add.sprite(185, 330, 'door-background');
        doorBackground.scale.setTo(1, 0.95);
        
        leftDoor = game.add.sprite(351, 497, 'door');
        leftDoor.anchor.setTo(0.5, 0.5);
        
        rightDoor = game.add.sprite(608, 497, 'door');
        rightDoor.anchor.setTo(0.5, 0.5);
        rightDoor.scale.x *= -1;
        
        game.add.sprite(0, 0, 'main-menu-background');
        
        doorGlow =  game.add.sprite(480, 490, 'door-glow');
        doorGlow.anchor.setTo(0.5, 0.5);
        doorGlow.scale.setTo(0.95, 1);
        doorGlow.visible = false;
        
        playGameButton = game.add.sprite(480, 480, 'main-menu-play-button');
        playGameButton.anchor.setTo(0.5,0.5);
        playGameButton.inputEnabled = true;
        
        playGameButton.events.onInputDown.add(PlayGameButton, this);
        playGameButton.events.onInputOut.add(function(){
            playGameButton.loadTexture('main-menu-play-button');
        }, this);
        
        playGameButton.events.onInputOver.add(function(){
            playGameButton.loadTexture('main-menu-play-button-mouseover');
        }, this);
        
        doorTweenLeft = game.add.tween(leftDoor);
        doorTweenLeft.to({ x : 200}, 500, Phaser.Easing.Quadratic.In, false, 0, 0, false);
        
        doorTweenLeft.onComplete.add(function() {leftDoorFinished = true;}, this);
        
        doorTweenRight = game.add.tween(rightDoor);
        doorTweenRight.to({ x : 759}, 500, Phaser.Easing.Quadratic.In, false, 0, 0, false);
        
        doorTweenRight.onComplete.add(function() {rightDoorFinished = true;}, this);
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    MainMenu.prototype.update = function()
    {
        if(leftDoorFinished && rightDoorFinished)
        {
            ChangeState();
            leftDoorFinished = rightDoorFinished = false;
        }
    }
    
    function PlayGameButton()
    {
        playGameButton.visible = false;
        doorGlow.visible = true;
        doorTweenLeft.start();
        doorTweenRight.start();
    }
    
    function ChangeState()
    {
        screenFade.FadeOutWithCallback(1000, function(){
            
        soundManager.StopSound('bar-crowd');
        game.state.start("InstructionsScreen");});
    }
}