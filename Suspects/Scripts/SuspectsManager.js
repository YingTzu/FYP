function SuspectsManager(game)
{
    this.game = game;
    this.theSuspects = null;
    this.suspectsNo = null;
    this.lvlOneCorrect = false;
}

SuspectsManager.prototype.create = function(posx, posy, suspects)
{
    switch(suspects)
    {
        case 0:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect1');
                //this.suspectsNo = 1;
            }
            break;
        case 1:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect2');
                //this.suspectsNo = 2;
            }
            break;
        case 2:
            {
                this.theSuspects = this.game.add.sprite(posx, posy, 'Suspect3');
                //this.suspectsNo = 3;
            }
            break; 
    }
    this.theSuspects.anchor.set(0.5,0.5);
    this.theSuspects.scale.setTo(0.2,0.2);
    this.theSuspects.inputEnabled = true;
    this.theSuspects.events.onInputDown.add(this.click, this);
    
    //HHHHHHHHHHHHHHHHSSSSSSSSSSSSSSSSLLLLLLLLLLLLLLLLL
//    var bmd = this.game.add.bitmapData(100, 200);
//    var Rect = new Phaser.Rectangle(100, 300, 100, 200);
//    bmd.copyRect('Suspect1', Rect, 111, 333);
//    bmd.update();
//    this.MySprite = this.game.add.sprite(500, 500, bmd);
//    this.MySprite._bitmap = bmd;
//    this.MySprite._name = 'Suspect1';
}

SuspectsManager.prototype.click = function()
{
    //if(this.theSuspects.get)
    //{
        //console.log("left suspect");
        this.lvlOneCorrect = true;
    //}
    
//    if(this.suspectsNo == 2)
//    {
//        console.log("middle suspect");
//    }
//    
//    if(this.suspectsNo == 3)
//    {
//        console.log("right suspect");
//    }
}