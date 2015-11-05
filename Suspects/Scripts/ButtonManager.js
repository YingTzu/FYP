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
    this.theButton.inputEnbled = true;
}

ButtonManager.prototype.GoToMenu = function()
{
    this.clicked = true;
    this.gametype = 0;
    Suspects.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.GoToTutorial = function()
{
    this.clicked = true;
    this.gametype = 1;
    Suspects.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.StartGame = function()
{    
    this.clicked = true;
    this.gametype = 2;
    Suspects.FadeScreen.OnEnd = true;
};

ButtonManager.prototype.DestroyButton = function()
{    
    this.theButton.destroy();
};
//
//ButtonManager.prototype.GoToLevel2 = function()
//{    
//    this.clicked = true;
//    this.gametype = 3;
//    Suspects.FadeScreen.OnEnd = true;
//};
//
//ButtonManager.prototype.GoToLevel3 = function()
//{   
//    this.clicked = true;
//    this.gametype = 4;
//    Suspects.FadeScreen.OnEnd = true;
//};
//
//ButtonManager.prototype.GoToLevel4 = function()
//{   
//    this.clicked = true;
//    this.gametype = 5;
//    Suspects.FadeScreen.OnEnd = true;
//};
//ButtonManager.prototype.GoToLevel5 = function()
//{   
//    this.clicked = true;
//    this.gametype = 6;
//    Suspects.FadeScreen.OnEnd = true;
//};