function ButtonManager(game)
{
    this.game = game;
    this.theButton = null;
    this.gametype = 0;
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
    
ButtonManager.prototype.StartGame = function()
{   
    this.gametype = 1;
    theGame.FadeScreen.OnEnd = true;
    this.clicked = true;
    console.log("game scence: " + this.gametype);
};

ButtonManager.prototype.GoToTutorial = function()
{
    this.gametype = 2;
    theGame.FadeScreen.OnEnd = true;
    console.log("game scence: " + this.gametype);
};

ButtonManager.prototype.destroyButton = function()
{
    this.theButton.destroy();
};