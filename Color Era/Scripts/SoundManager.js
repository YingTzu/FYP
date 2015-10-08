function SoundManager(game)
{
    this.game = game;
    
    this.gameSound = null;
    this.menuSound = null;
    this.gameEnd = null;
    
    this.soundSFX = null;
}
//////////////////create sound////////////////////////
SoundManager.prototype.createSound = function(key)
{
    this.soundSFX = this.game.add.audio(key);
    this.soundSFX.play();
};

SoundManager.prototype.createMusic = function(key)
{
    this.menuSound = this.game.add.audio(key);
    this.menuSound.play();
};

SoundManager.prototype.stopMusic = function()
{
    this.menuSound.stop();
};

