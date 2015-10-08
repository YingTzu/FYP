function SoundManager(game)
{
    this.game = game;
    this.gameSound = null;
    this.menuSound = null;
    this.gameEnd = null;
    this.clickSound = null;
    this.correctSound = null;
    this.wrongSound = null;
}

SoundManager.prototype.createCorrect = function(key)
{
    this.correctSound = this.game.add.audio(key);
};
SoundManager.prototype.createWrong = function(key)
{
    this.wrongSound = this.game.add.audio(key);
};
SoundManager.prototype.createClickSound = function(key)
{
    this.clickSound = this.game.add.audio(key);
};

SoundManager.prototype.playCorrect = function()
{
    this.correctSound.play();
};

SoundManager.prototype.playWrong = function()
{
    this.wrongSound.play();
}

SoundManager.prototype.playClickSound = function()
{
    this.clickSound.play();
}