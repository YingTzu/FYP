//Kinnear Justin Wong
//Nanyang Polytechnic

function QuitGame(game)
{
    QuitGame.prototype.preload = function()
    {
    }

    QuitGame.prototype.create = function()
    {
        var firstText = game.add.text(game.world.centerX, 210, 'Hope you have learnt something useful about colours!', { font:" 26px RattyTatty", fill: "#345093", align:"center" });
        firstText.anchor.setTo(0.5, 0.5);
        
        var secondText = game.add.text(game.world.width / 2, 260, 'Thank you for playing, that will be the end of this topic!', { font:" 26px RattyTatty", fill: "#345093", align:"center" });
        secondText.anchor.setTo(0.5, 0.5);
        
		var thirdText = game.add.text(game.world.width / 2, 310, 'Thank you for playing, that will be the end of this topic!', { font:" 26px RattyTatty", fill: "#345093", align:"center" });
        thirdText.anchor.setTo(0.5, 0.5);
		
        var screenFade = new ScreenFade('fade-out');
        screenFade.FadeIn(fadeScreenSpeed);
    }

    QuitGame.prototype.update = function()
    {
    }
}