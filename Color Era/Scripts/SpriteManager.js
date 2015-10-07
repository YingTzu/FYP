function SpriteManager(game)
{
    this.game = game;
    this.theClothesImage = null;
    this.thePantsImage = null;
    this.theSpecsImage = null;
    this.theShoseImage = null;
    
    this.onClothes = false;
    this.onPants= false;
    this.onSpecs = false;
    this.onShose = false;
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
    this.onPants= false;
    this.onSpecs = false;
    this.onShose = false;
    //console.log(this.onClothes);
};
SpriteManager.prototype.checkPantsDown = function()
{
    this.thePantsImage.frame = 2;
    this.onClothes = false;
    this.onPants= true;
    this.onSpecs = false;
    this.onShose = false;
};
SpriteManager.prototype.checkSpecsDown = function()
{
    this.theSpecsImage.frame = 2;
    this.onClothes = false;
    this.onPants= false;
    this.onSpecs = true;
    this.onShose = false;
};
SpriteManager.prototype.checkShoseDown = function()
{
    this.theShoseImage.frame = 2;
    this.onClothes = false;
    this.onPants= false;
    this.onSpecs = false;
    this.onShose = true;
};
/////////////////////////////////////////////////////

////////      check mouse over          /////////
SpriteManager.prototype.overClothes = function()
{
    this.theClothesImage.frame = 1;
};
SpriteManager.prototype.overPants = function()
{
    this.thePantsImage.frame = 1;
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
SpriteManager.prototype.outPants = function()
{   
    this.thePantsImage.frame = 0;
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
SpriteManager.prototype.pantsInputDisable = function()
{   
    this.thePantsImage.inputEnabled = false;
    this.thePantsImage.frame = 2;
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

//SpriteManager.prototype.shirtInputDisable = function()
//{   
//    this.theClothesImage.inputEnabled = false;
//    this.theClothesImage.frame = 2;
//};

SpriteManager.prototype.destroySprite = function()
{   
    this.theClothesImage.destroy();
};