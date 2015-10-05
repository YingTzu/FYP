//Kinnear Justin Wong
//Nanyang Polytechnic

function QuitGame(game)
{
    QuitGame.prototype.preload = function()
    {
    }

    QuitGame.prototype.create = function()
    {

        var firstText = game.add.text(game.world.centerX, 300, 'Hope you have learnt something useful on colours!', { font:" 30px beon", fill: "#a4bfff", align:"center" });
        firstText.anchor.setTo(0.5, 0.5);
        
        var secondText = game.add.text(game.world.width / 2, 350, 'Thank you for playing, that will be the end of this topic!', { font:" 30px beon", fill: "#a4bfff", align:"center" });
        secondText.anchor.setTo(0.5, 0.5);
        
        var screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    QuitGame.prototype.update = function()
    {
    }
}