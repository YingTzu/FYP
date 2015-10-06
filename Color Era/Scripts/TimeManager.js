function TimeManager(game)
{
    this.game = game;
    this.totalTime = 0;
    this.timeDown = 0;
    this.durationTime = 0;
    this.timeUp = 0;
    this.minutes = 0;
    
    this.timeBar = null;
    this.timeBarComplete = null;
    
    this.timer = null;
    this.countDownTimer = null;
    
    this.doSomething = false;
}
////////////////       Time Bar       ////////////////////
TimeManager.prototype.createTimeBar = function(posx, posy, key, time)
{
    this.timeBar = this.game.add.sprite(posx, posy, key);
    this.timeBar.anchor.set(0, 1);
    this.timeBarComplete = this.timeBar.height;

    this.totalTime = time;
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.timeBarCountDown, this);
    this.timer.start();
}
TimeManager.prototype.timeBarCountDown = function()
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

/////////////      Count Down Timer      /////////////
TimeManager.prototype.createTimerDown = function(time)
{
    this.timeDown = time;
    this.countDownTimer = this.game.time.create(false);
    this.countDownTimer.loop(100, this.timeCountDown, this);
    this.countDownTimer.start();
}
TimeManager.prototype.timeCountDown = function()
{
    console.log("this should be false: " + this.doSomething);
    if(this.timeDown > 0)
    {
        this.timeDown --;
    }
    if(this.timeDown <= 0)
    {
        this.doSomething = true;
        console.log("when 0 :" + this.doSomething);
    }
    
    console.log("secc: " + this.timeDown);
};
TimeManager.prototype.stopDownTime = function()
{
    this.countDownTimer.stop();
    this.doSomething = false;
}

/////////////      Count Up Timer      /////////////
TimeManager.prototype.createTimerUp = function()
{
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.timeCountUp, this);
    this.timer.start();
}
TimeManager.prototype.timeCountUp = function()
{
    this.timeUp++;
    if(this.timeUp >= 60)
    {
        this.timeUp = 0;
        this.minutes += 1;
    }
    //console.log("min: " + this.minutes + ", sec: " + this.timeUp);
};
TimeManager.prototype.stopUpTime = function()
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


