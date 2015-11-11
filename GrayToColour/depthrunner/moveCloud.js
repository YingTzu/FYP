//Kinnear Justin Wong
//Nanyang Polytechnic

MoveCloud = function(posX, posY, speed)
{
    this.cloud = game.add.sprite(posX, posY, 'clouds');
    this.speed = speed;
    
    this.cloud.anchor.setTo(0, 0.5);
    
    MoveCloud.prototype.Update = function()
    {
        this.cloud.x -= speed;
        
         if(this.cloud.x + this.cloud.width < 0)
         {
            this.cloud.x = game.world.width;
         }
    }
};