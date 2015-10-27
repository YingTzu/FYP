function SuspectsManager(game)
{
    this.game = game;
    this.theSuspects = null;
    this.correct = null;
    this.isClicked = false;
    this.stopTime = false;
}

SuspectsManager.prototype.create = function(posx, posy, suspects)
{
    switch(suspects)
    {
        case 0:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect1');
            }
            break;
        case 1:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect2');
            }
            break;
        case 2:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect3');
            }
            break;
        case 3:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect3');
            }
            break;
    }
    //this set the id to a string "person" plus the number
    this.theSuspects.name = "person" + suspects;
    this.theSuspects.clicked = false;
    this.theSuspects.anchor.set(0.5,0.5);
    this.theSuspects.scale.setTo(0.2,0.2);
    this.theSuspects.inputEnabled = true;
    this.theSuspects.events.onInputDown.add(this.click, this);
    this.theSuspects.clicked = false;
    //HHHHHHHHHHHHHHHHSSSSSSSSSSSSSSSSLLLLLLLLLLLLLLLLL
//    var bmd = this.game.add.bitmapData(100, 200);
//    var Rect = new Phaser.Rectangle(100, 300, 100, 200);
//    bmd.copyRect('Suspect1', Rect, 111, 333);
//    bmd.update();
//    this.MySprite = this.game.add.sprite(500, 500, bmd);
//    this.MySprite._bitmap = bmd;
//    this.MySprite._name = 'Suspect1';
};
SuspectsManager.prototype.checkname = function()
{
    var tempName = this.theSuspects.name;
    return tempName;
};
SuspectsManager.prototype.click = function()
{
    if(this.theSuspects.clicked == false)
    {
        this.theSuspects.clicked = true;
    }
};
SuspectsManager.prototype.disableInput = function()
{
    this.theSuspects.inputEnabled = false;
};