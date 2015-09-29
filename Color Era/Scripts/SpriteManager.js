function SpriteManager(game)
{
    this.game = game;
    this.theClothesImage = null;
    this.thePantsImage = null;
}

SpriteManager.prototype.createClothes = function(posx, posy, key)
{
    this.theClothesImage = this.game.add.sprite(posx, posy, key);
    this.theClothesImage.anchor.set(0.5,0.5);
    this.theClothesImage.inputEnabled = true;
    this.theClothesImage.events.onInputDown.add(this.checkClotheDown, this);
    this.theClothesImage.events.onInputOver.add(this.overClothes, this);
    this.theClothesImage.events.onInputOut.add(this.outClothes, this);
};
SpriteManager.prototype.createPants = function(posx, posy, key)
{
    this.thePantsImage = this.game.add.sprite(posx, posy, key);
    this.thePantsImage.anchor.set(0.5,0.5);
    this.thePantsImage.inputEnabled = true;
    this.thePantsImage.events.onInputDown.add(this.checkPantsDown, this);
    this.thePantsImage.events.onInputOver.add(this.overPants, this);
    this.thePantsImage.events.onInputOut.add(this.outPants, this);
};

SpriteManager.prototype.checkClotheDown = function()
{
    this.theClothesImage.frame = 2;
    theGame.Game.clothesOpen = true;
    console.log(theGame.Game.clothesOpen);
};
SpriteManager.prototype.checkPantsDown = function()
{
    this.thePantsImage.frame = 2;
};

SpriteManager.prototype.overClothes = function()
{
    this.theClothesImage.frame = 1;
};
SpriteManager.prototype.overPants = function()
{
    this.thePantsImage.frame = 1;
};

SpriteManager.prototype.outClothes = function()
{   
    this.theClothesImage.frame = 0;
};
SpriteManager.prototype.outPants = function()
{   
    this.thePantsImage.frame = 0;
};