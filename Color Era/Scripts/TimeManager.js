function TimeManager(game)
{
    this.game = game;
    this.totalTime = 0;
    this.timeUp = 0;
    this.minutes = 0;
    
    this.timeBar = null;
    this.timeBarComplete = null;
    
    this.timer = null;
}

TimeManager.prototype.createTimeBar = function(posx, posy, key, time)
{
    this.timeBar = this.game.add.sprite(posx, posy, key);
    this.timeBar.anchor.set(0, 1);
    this.timeBarComplete = this.timeBar.height;

    this.totalTime = time;
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.timeCountDown, this);
    this.timer.start();
}

TimeManager.prototype.createTimerUp = function()
{
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.timeCountUp, this);
    this.timer.start();
}

TimeManager.prototype.timeCountDown = function()
{
    if(this.totalTime > 0)
    {
        this.totalTime --;

        this.timeBar.height -= (0.05/this.totalTime * this.timeBarComplete);
        var cropRect = new Phaser.Rectangle(0, 0, this.timeBar.width, this.timeBar.height);
        this.timeBar.crop(cropRect);
        this.timeBar.updateCrop();

        console.log("time down: " + this.totalTime);
        console.log(this.timeBar.width, this.timeBar.height);
    }
};

TimeManager.prototype.timeCountUp = function()
{
    this.timeUp++;
    if(this.timeUp >= 60)
    {
        this.timeUp = 0;
        this.minutes += 1;
    }
    console.log("min: " + this.minutes + ", sec: " + this.timeUp);
};

TimeManager.prototype.stopTime = function()
{
    this.timer.stop();
    theGame.tempTimeSec = this.timeUp;
    theGame.tempTimeMin = this.minutes;
}

TimeManager.prototype.timeReset = function()
{
    this.timeUp = 0;
    this.minutes = 0;
}


