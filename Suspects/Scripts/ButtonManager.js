function ButtonManager(game)
{
    this.game = game;
    this.theButton = null;
    this.gametype = 0;
}

ButtonManager.prototype.createButton = function(posx, posy, key, func)
{
    this.theButton = this.game.add.button(posx, posy, key, func, this,  1, 0, 2);
    this.theButton.anchor.set(0.5,0.5);
    this.theButton.inputEnbled = true;
}

ButtonManager.prototype.GoToTutorial = function()
{
    this.gametype = 1;
    Suspects.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.StartGame = function()
{    
    this.gametype = 2;
    Suspects.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.GoToLevel2 = function()
{    
    this.gametype = 3;
    Suspects.FadeScreen.OnEnd = true;
    
    console.log(this.gametype);
};