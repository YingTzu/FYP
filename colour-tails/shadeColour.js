//Kinnear Justin Wong
//Nanyang Polytechnic

ShadeColour = function(posX, posY, sprite2, shade, colourType, scaleX, scaleY)
{
    // original positions
    this.posX = posX;
    this.posY = posY;
    
    Phaser.Sprite.call(this, game, posX, posY, sprite2);

    // sets sprite to the centre
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(scaleX, scaleY);
    this.inputEnabled = true;
    
    this.shade = shade;
    
    this.colourType = colourType;
    
    // Obtains the data colour on the object the player has clicked on
    // Returns a number
    ShadeColour.prototype.ObtainColour = function()
    {
        if(this.colourType == ColorEnum.NONE)
        {
            return 0xFFFFFF;
        }
        else if(this.colourType == ColorEnum.CYAN)
        {
            return 0x00BDFF;
        }
        else if(this.colourType == ColorEnum.MAGENTA)
        {
            return 0xFF0085;
        }
        else if(this.colourType == ColorEnum.YELLOW)
        {
            return 0xFFF500;
        }

        console.log("Error no valid colourType!");
        return 0xFFFFFF;
    }
};

ShadeColour.prototype = Object.create(Phaser.Sprite.prototype);
// Define our constructor
ShadeColour.Constructor = ShadeColour;