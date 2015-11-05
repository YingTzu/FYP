function SoundManager(game)
{
    this.game = game;
    
    this.theSound = null;
   // this.menuSound = null;
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
    this.theSound = this.game.add.audio(key);
    this.theSound.play(null, 0, 1, true);
};

SoundManager.prototype.stopMusic = function()
{
    this.theSound.stop();
};

