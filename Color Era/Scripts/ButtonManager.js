function ButtonManager(game)
{
    this.game = game;
    this.theButton = null;
    this.gametype = 0; //the game scene
    this.clicked = false;
}

ButtonManager.prototype.createButton = function(posx, posy, key, func)
{
    this.theButton = this.game.add.button(posx, posy, key, func, this,  1, 0, 2);
    this.theButton.anchor.set(0.5,0.5);
    new Image(Phaser.Game, posx, posy, key, 0);
    this.theButton.inputEnbled = true;
};

ButtonManager.prototype.scale = function(x, y)
{
    this.theButton.scale.set(x,y);
};

ButtonManager.prototype.GoToMenu = function()
{   
    this.gametype = 0;
    theGame.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.StartGame = function()
{   
    this.gametype = 1;
    theGame.FadeScreen.OnEnd = true;
    this.clicked = true;
};

ButtonManager.prototype.GoToTutorial = function()
{
    this.clicked = true;
    this.gametype = 2;
    theGame.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.GoToGameEnd = function()
{
    this.gametype = 3;
    theGame.FadeScreen.OnEnd = true;
    this.clicked = true;
};

ButtonManager.prototype.destroyButton = function()
{
    this.theButton.destroy();
    this.clicked = false;
};