//Kinnear Justin Wong
//Nanyang Polytechnic

function MainMenu(game)
{
    var screenFade;
    
    var playButton;
    
    MainMenu.prototype.preload = function() 
    {
    }

    MainMenu.prototype.create = function()
    {
//        game.add.sprite(0, 0, 'main-menu-layout');
        game.add.sprite(0, 0, 'main-menu-background');
        
        playButton = game.add.sprite(296, 342, 'main-menu-play-animation');
        playButton.animations.add('play-button');
        playButton.animations.play('play-button', 3, true);
        playButton.inputEnabled = true;
        
        
        playButton.events.onInputDown.add(ClickedPlay, this);
        playButton.events.onInputOver.add(HoverPlay, this);
        playButton.events.onInputOut.add(OutPlay, this);
        
        screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    MainMenu.prototype.update = function()
    {
    }
    
    function ClickedPlay()
    {
        playButton.animations.stop();
        screenFade.FadeOutWithCallback(1000, function(){ game.state.start("InstructionsScreen");});
    }
    
    function HoverPlay()
    {
        playButton.animations.stop();
        playButton.loadTexture('main-menu-button-mouseover');
        playButton.y += 10;
        playButton.x -= 10;
    }
    
    function OutPlay()
    {
        playButton.loadTexture('main-menu-play-animation');
        playButton.animations.play('play-button', 3, true);
        playButton.y -= 10;
        playButton.x += 10;
    }
}