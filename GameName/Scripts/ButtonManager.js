function ButtonManager(game)
{
    this.game = game;
    this.theButton = null;
//    this.tutorialButton = null;
//    this.muteButton = null;
//    this.pauseButton = null;
//    this.exitButton = null;
    this.gametype = 0;
    this.clicked = false;
}
//ButtonManager.prototype.createButton = function(posx, posy, key)
//{
//    this.theButton = this.game.add.button(posx, posy, key, this.actionOnClick, this,  1, 0, 2);
//    this.theButton.anchor.set(0.5,0.5);
//    new Image(Phaser.Game, posx, posy, key, 0);
//    this.theButton.inputEnbled = true;
//},
//    
//ButtonManager.prototype.actionOnClick = function()
//{
//    var startbtn = this.game.cache.getImage('StartGame');
//   // var clicked = this.game.input.activePointer.isDown
//    if(startbtn.input.pointerOver())
//    {
//        this.gametype = 1;
//	   theGame.FadeScreen.OnEnd = true;
//    }
//};

//ButtonManager.prototype.createButton = function(posx, posy, key, func)
//{
//    this.theButton = this.game.add.button(posx, posy, key, func, this,  1, 0, 2);
//    this.theButton.anchor.set(0.5,0.5);
//    new Image(Phaser.Game, posx, posy, key, 0);
//    this.theButton.inputEnbled = true;
//    console.log(this.gametype);
//}
//    
//ButtonManager.prototype.StartGame = function()
//{
//    //var startbtn = this.game.cache.getImage('StartGame');
//    
//    this.gametype = 1;
//    theGame.FadeScreen.OnEnd = true;
//    console.log(this.gametype);
//};
//
//ButtonManager.prototype.GoToTutorial = function()
//{
//    this.gametype = 2;
//    theGame.FadeScreen.OnEnd = true;
//    console.log(this.gametype);
//};

ButtonManager.prototype.createButton = function(posx, posy, key, value)
{
    this.theButton = this.game.add.sprite(posx, posy, key);
    this.theButton.anchor.set(0.5,0.5);
    this.theButton.inputEnabled = true;
    this.theButton.events.onInputDown.add(function(){this.GoToScene(value)}, this);
}

ButtonManager.prototype.GoToScene = function(gameScene)
{
    this.gametype = gameScene;
    theGame.FadeScreen.OnEnd = true;
};