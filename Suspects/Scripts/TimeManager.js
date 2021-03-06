function TimeManager(game)
{
    this.game = game;
    this.totalTime = 0;
    this.currentTime = 0;
    this.timeSet = 0;
    this.timeDown = 0;
    this.durationTime = 0;
    this.timeUp = 0;
    this.minutes = 0;
    
    this.timeText = null;
    
    this.timeBar = null;
    this.timeBarComplete = null;
    
    this.timer = null;
    this.countDownTimer = null;
    
    this.isPuase = false;
    this.gameOver = false;
}
////////////////       Time Bar       ////////////////////
TimeManager.prototype.createTimeBar = function(posx, posy, key, time)
{
    this.timeBar = this.game.add.sprite(posx, posy, key);
    this.timeBar.anchor.set(0, 1);
    this.timeBarComplete = this.timeBar.height;

    this.timeSet = time;
    this.totalTime = this.timeSet;
    this.timer = this.game.time.create(false);
    this.timer.loop(Phaser.Timer.SECOND, this.timeBarCountDown, this);
    this.timer.start();
}
TimeManager.prototype.timeBarCountDown = function()
{
    if(this.timeSet > 0)
    {   
        this.timeSet --;
        this.currentTime = this.timeSet;
        this.timeBar.cropEnabled = true;
        this.timeBar.height = (this.currentTime/this.totalTime)* this.timeBarComplete;
    }
    if(this.currentTime <= 0)
    {
        this.gameOver = true;
    }
};

/////////////      Count Down Timer      /////////////
TimeManager.prototype.createTimerDown = function(posx, posy,time)
{
    this.timeText = this.game.add.text(posx, posy, '',  {font: "bold 35px Digital", fill: "#ff0000"});
    this.timeDown = time;
    this.countDownTimer = this.game.time.create(false);
    this.countDownTimer.loop(Phaser.Timer.SECOND, this.timeCountDown, this);
    this.countDownTimer.start();
}
TimeManager.prototype.timeCountDown = function()
{
    if(this.timeDown > 0)
    {
        this.timeDown --;
    }
    this.timeText.setText('00:' + this.timeDown);
    if(this.timeDown < 10)
    {
        this.timeText.setText('00:0' + this.timeDown);
    }
    if(this.timeDown <= 0)
    {
        this.gameOver = true;
    }
};
TimeManager.prototype.stopDownTime = function()
{
    this.countDownTimer.stop();
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
}

/////////Time Pause / Resume / Stop ///////////////
TimeManager.prototype.timePause = function()
{
    this.isPuase = true;
    this.timer.pause();
}

TimeManager.prototype.timeResume = function()
{
    this.isPuase = false;
    this.timer.resume();
}

TimeManager.prototype.timeStop = function()
{
    this.countDownTimer.stop();
}

TimeManager.prototype.timeReset = function()
{
    this.timeSet = this.totalTime;
}
