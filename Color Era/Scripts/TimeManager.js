function TimeManager(game)
{
    this.game = game;
    this.totalTime = 0;
    this.timerInterval = 0;
    this.pausedInterval = 0;
    
    this.timeBar = null;
    this.timeBarWidth = null;
    this.timeBarComplete = null;
    
    this.isPaused = false;
    this.isCompleted = false;
    this.isCountingDown = false;
    
    this.timer = null;
}

TimeManager.prototype.createTimer = function(posx, posy, key, time)
{
    this.timeBar = this.game.add.sprite(posx, posy, key);
    this.timeBar.anchor.set(0, 1);
    this.timeBarComplete = this.timeBar.height;
//    var cropRect = new Phaser.Rectangle(0, 0, this.timeBar.width, this.timeBar.height);
//    this.timeBar.crop(cropRect);
//    this.timeBar.updateCrop();
    this.totalTime = time;
    //this.game.time.events.add(Phaser.Timer.SECOND, this.startTimer, this);
    
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.startTimer, this);
    this.timer.start();
}

TimeManager.prototype.startTimer = function()
{
//    this.isCountingDown = true;
//    
//    if(!this.isPaused)
//    {
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
//    }
    
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
};

//TimeManager.prototype.pauseTime = function()
//{
//    this.timer.pause();
//    //this.pausedInterval = this.time.elapsedSecondsSince(this.startTime);
//},
//
//TimeManager.prototype.resumeTime = function()
//{
//    if(this.isPaused == true)
//    {
//         this.startTime = this.time.time + this.pausedInterval;
//    }
//    
//    this.isPaused = false;
//},
//
//TimeManager.prototype.restartTime = function()
//{
//    this.isCompleted = false;
//    this.pausedInterval = this.time.elapsedSecondsSince(this.startTime);
//};


