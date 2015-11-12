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
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv1Suspect_1');
            }
            break;
        case 3:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv1Suspect_2');
            }
            break;
        case 4:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv2Suspect_1');
            }
            break;
        case 5:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv2Suspect_2');
                this.theSuspects.position.y -= 18;
            }
            break;
        case 6:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv3Suspect_1');
            }
            break;
        case 7:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv3Suspect_2');
            }
            break;
        case 8:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv3Suspect_3');
            }
            break;
        case 9:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv4Suspect_1');
                this.theSuspects.position.y += 5;
            }
            break;
        case 10:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv4Suspect_2');
                this.theSuspects.position.y += 5;
            }
            break;
        case 11:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv4Suspect_3');
            }
            break;
        case 12:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv5Suspect_1');
                this.theSuspects.position.y -= 6;
            }
            break;
        case 13:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv5Suspect_2');
                this.theSuspects.position.y -= 3;
            }
            break;
        case 14:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv5Suspect_3');
                this.theSuspects.position.y -= 2;
            }
            break;
        case 15:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Lv5Suspect_4');
                this.theSuspects.position.y += 5;
            }
            break;
    }
    //this set the id to a string "person" plus the number
    this.theSuspects.name = "person" + suspects;
    this.theSuspects.clicked = false;
    this.theSuspects.anchor.set(0.5,0.5);
    this.theSuspects.scale.setTo(0.3,0.3);
    this.theSuspects.animations.add('idle', [0, 1, 2]);
    this.theSuspects.animations.play('idle', 3, true);
    //delay the animation by secon(1000 = 1s), to let each suspect's aniamtion play by random speed.
    this.theSuspects.animations.getAnimation('idle').delay = this.game.rnd.integerInRange(1000, 1500);
    this.theSuspects.inputEnabled = true;
    this.theSuspects.events.onInputDown.add(this.click, this);
    this.theSuspects.clicked = false;
    //Pixel perfect check
    //This will check the pixel every time the mouse moves, which is really expensive!
    this.theSuspects.input.pixelPerfectOver = true;
    this.theSuspects.input.useHandCursor = true;
};
SuspectsManager.prototype.checkname = function()
{
    var tempName = this.theSuspects.name;
    return tempName;
};
SuspectsManager.prototype.click = function()
{
    if(this.theSuspects.clicked == false)// && Suspects.timeManager.isPuase == false)
    {
        this.theSuspects.clicked = true;
    }
};
SuspectsManager.prototype.disableInput = function()
{
    this.theSuspects.inputEnabled = false;
};