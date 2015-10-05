//Kinnear Justin Wong
//Nanyang Polytechnic

ShadeDroplet = function(blackSpriteName, whiteSpriteName, magentaSpriteName, cyanSpriteName, yellowSpriteName)
{
    ShadeDroplet.prototype.DropletIntialiser = function(dropletType)
    {
        var droplet;
        
        if(dropletType == this.DropletType.BLACK_DROPLET)
        {
            droplet = game.add.sprite(0, 0, this.blackSpriteName);
        }
        else if(dropletType == this.DropletType.WHITE_DROPLET)
        {
            droplet = game.add.sprite(0, 0, this.whiteSpriteName);
        }
        else if(dropletType == this.DropletType.MAGENTA_DROPLET)
        {
            droplet = game.add.sprite(0, 0, this.magentaSpriteName);
        }
        else if(dropletType == this.DropletType.CYAN_DROPLET)
        {
            droplet = game.add.sprite(0, 0, this.cyanSpriteName);
        }
        else if(dropletType == this.DropletType.YELLOW_DROPLET)
        {
            droplet = game.add.sprite(0, 0, this.yellowSpriteName);
        }
        return droplet;
    }
    
    this.allDroplets = [];
    
    this.blackSpriteName = blackSpriteName;
    this.whiteSpriteName = whiteSpriteName;
    
    this.magentaSpriteName = magentaSpriteName;
    this.cyanSpriteName = cyanSpriteName;
    this.yellowSpriteName = yellowSpriteName;
    
    // enum
    this.DropletType = {
        BLACK_DROPLET : 0,
        WHITE_DROPLET : 1,
        MAGENTA_DROPLET : 2,
        CYAN_DROPLET : 3,
        YELLOW_DROPLET : 4
    }
    
    this.amountOfObjToPoolPerElement = 20;
    
    // create our stars
    for(var i = 0; i < Object.keys(this.DropletType).length; i++)
    {
        this.allDroplets[i] = [];
        
        for(var j = 0; j < this.amountOfObjToPoolPerElement; j++)
        {
            var droplet;
            droplet = this.DropletIntialiser(i);
            
            // Spawn both black and white droplets
            droplet.anchor.setTo(0.5, 0.5);
            droplet.visible = false;
            this.allDroplets[i].push(droplet);
        }
    }
    
    // sets the amount of stars to animate
    ShadeDroplet.prototype.SpawnColour = function(dropletType, startX, startY, moveToX, moveToY, duration)
    {        
        var index = 0;
        
        for(var i = 0; i < this.allDroplets[dropletType].length; i++)
        {
            if(!this.allDroplets[dropletType][i].visible)
            {
                // found an unused sprite, time to initialise it!
                index = i;
                break;   
            }
            
            // if we currently do not have a free item
            if(i == this.allDroplets[dropletType].length - 1)
            {
                // Spawn both black and white droplets
                var droplet;
                
                droplet = this.DropletIntialiser(i);
                
                droplet.anchor.setTo(0.5, 0.5);
                droplet.visible = false;
                this.allDroplets[dropletType].push(droplet);
                index = i;
                break;
            }
        }
        
        this.allDroplets[dropletType][index].visible = true;
        this.allDroplets[dropletType][index].x = startX;
        this.allDroplets[dropletType][index].y = startY - (this.allDroplets[dropletType][index].height / 2); // offset the sprite's height so we can hide the sprite away from the world stage before animating it into the world

        var spriteTween = game.add.tween(this.allDroplets[dropletType][index]).to({x: moveToX, y: moveToY, alpha: 0}, duration, Phaser.Easing.Linear.None).start();

        // When the drop has finished the tween we recycle it
        spriteTween.onComplete.add(function (){
            
                this.allDroplets[dropletType][index].visible = false;
                this.allDroplets[dropletType][index].alpha = 1;
        }, this);
    }
};