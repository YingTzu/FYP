function TimeManager(game)
{
    this.game = game;
    this.startTime = 0;
    this.timerInterval = 0;
    this.pausedInterval = 0;
    
    this.timeBar = null;
    this.timeBarCover = null;
    this.timeWidth = null;
    
    this.isPaused = false;
    this.isCompleted = false;
    this.isCountingDown = false;
}

TimeManager.prototype.createTimer = function(posx, posy, time, interval)
{
    this.timeBar = this.game.add.sprite(posx,posy,'TimeBar');
    this.timeBar.anchor.set(0.5,0.5);
    
    
    this.startTime = time;
    this.timerInterval = interval;
    this.game.time.events.add(Phaser.Timer.SECOND, this.startTimer, this);
};

TimeManager.prototype.startTimer = function()
{
    this.isCountingDown = true;
    
    if(!this.isPaused)
    {
        if(this.startTime > 0)
        {
            this.startTime --;
            console.log("time down: " + this.startTime);
        }
    }
    
//    if(!this.isPaused && this.isCompleted)
//    {
//        if(this.time.elapsedSecondsSince(this.startTime) > this.timerInterval)
//        {
//            this.startTime = this.game.time.time;
//            
//            if(this.startTime > 0)
//            {
//                this.startTime --;
//                console.log(this.startTime);
//            }
//            else
//            {
//                this.isCompleted = true;
//            }
//        }
//    }
},

TimeManager.prototype.pauseTime = function()
{
    this.isPaused = true;
    this.pausedInterval = this.time.elapsedSecondsSince(this.startTime);
},

TimeManager.prototype.resumeTime = function()
{
    if(this.isPaused == true)
    {
         this.startTime = this.time.time + this.pausedInterval;
    }
    
    this.isPaused = false;
},

TimeManager.prototype.restartTime = function()
{
    this.isCompleted = false;
    this.pausedInterval = this.time.elapsedSecondsSince(this.startTime);
};


