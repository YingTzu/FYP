function SpriteManager(game)
{
    this.game = game;
    this.theClothesImage = null;
    this.theSkirtImage = null;
    this.theSpecsImage = null;
    this.theShoseImage = null;
    
    this.onClothes = false;
    this.onSkirt= false;
    this.onAccessories = false;
    this.onShoes = false;
    
    theGame.soundManager = new SoundManager(this);
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
SpriteManager.prototype.createSkirts = function(posx, posy, key)
{
    this.theSkirtImage = this.game.add.sprite(posx, posy, key);
    this.theSkirtImage.anchor.set(0.5,0.5);
    this.theSkirtImage.inputEnabled = true;
    this.theSkirtImage.events.onInputDown.add(this.checkSkirtDown, this);
    this.theSkirtImage.events.onInputOver.add(this.overSkirt, this);
    this.theSkirtImage.events.onInputOut.add(this.outSkirt, this);
};
SpriteManager.prototype.createSpecs = function(posx, posy, key)
{
    this.theSpecsImage = this.game.add.sprite(posx, posy, key);
    this.theSpecsImage.anchor.set(0.5,0.5);
    this.theSpecsImage.inputEnabled = true;
    this.theSpecsImage.events.onInputDown.add(this.checkSpecsDown, this);
    this.theSpecsImage.events.onInputOver.add(this.overSpecs, this);
    this.theSpecsImage.events.onInputOut.add(this.outSpecs, this);
};
SpriteManager.prototype.createShose = function(posx, posy, key)
{
    this.theShoseImage = this.game.add.sprite(posx, posy, key);
    this.theShoseImage.anchor.set(0.5,0.5);
    this.theShoseImage.inputEnabled = true;
    this.theShoseImage.events.onInputDown.add(this.checkShoseDown, this);
    this.theShoseImage.events.onInputOver.add(this.overShose, this);
    this.theShoseImage.events.onInputOut.add(this.outShose, this);
};

////////      check button down          ///////////
SpriteManager.prototype.checkClotheDown = function()
{
    this.theClothesImage.frame = 2;
    this.onClothes = true;
    this.onSkirt= false;
    this.onAccessories = false;
    this.onShoes = false;
};
SpriteManager.prototype.checkSkirtDown = function()
{
    this.theSkirtImage.frame = 2;
    this.onClothes = false;
    this.onSkirt= true;
    this.onAccessories = false;
    this.onShoes = false;
};
SpriteManager.prototype.checkSpecsDown = function()
{
    this.theSpecsImage.frame = 2;
    this.onClothes = false;
    this.onSkirt= false;
    this.onAccessories = true;
    this.onShoes = false;
};
SpriteManager.prototype.checkShoseDown = function()
{
    this.theShoseImage.frame = 2;
    this.onClothes = false;
    this.onSkirt= false;
    this.onAccessories = false;
    this.onShoes = true;
};
/////////////////////////////////////////////////////

////////      check mouse over          /////////
SpriteManager.prototype.overClothes = function()
{
    this.theClothesImage.frame = 1;
};
SpriteManager.prototype.overSkirt = function()
{
    this.theSkirtImage.frame = 1;
};
SpriteManager.prototype.overSpecs = function()
{
    this.theSpecsImage.frame = 1;
};
SpriteManager.prototype.overShose = function()
{
    this.theShoseImage.frame = 1;
};
////////////////////////////////////////////////

////////      check mouse out          /////////
SpriteManager.prototype.outClothes = function()
{   
    this.theClothesImage.frame = 0;
};
SpriteManager.prototype.outSkirt = function()
{   
    this.theSkirtImage.frame = 0;
};
SpriteManager.prototype.outSpecs = function()
{   
    this.theSpecsImage.frame = 0;
};
SpriteManager.prototype.outShose = function()
{   
    this.theShoseImage.frame = 0;
};
////////////////////////////////////////////////

//////////      Input Disable         //////////
SpriteManager.prototype.shirtInputDisable = function()
{   
    this.theClothesImage.inputEnabled = false;
    this.theClothesImage.frame = 2;
};
SpriteManager.prototype.skirtInputDisable = function()
{   
    this.theSkirtImage.inputEnabled = false;
    this.theSkirtImage.frame = 2;
};
SpriteManager.prototype.specsInputDisable = function()
{   
    this.theSpecsImage.inputEnabled = false;
    this.theSpecsImage.frame = 2;
};
SpriteManager.prototype.shoseInputDisable = function()
{   
    this.theShoseImage.inputEnabled = false;
    this.theShoseImage.frame = 2;
};
////////////////////////////////////////////////

SpriteManager.prototype.destroySprite = function()
{   
    this.theClothesImage.destroy();
};