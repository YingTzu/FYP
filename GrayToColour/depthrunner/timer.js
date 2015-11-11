//Kinnear Justin Wong
//Nanyang Polytechnic

function CountdownTimer(countdownTime, timerInterval) 
{
    this.originalCounter = countdownTime;
    this.counter = countdownTime;

    //Timer variables
    this.startTime = 0;

    //IN SECONDS!
    this.TIMER_INTERVAL = timerInterval;
    this.isPaused = false;
    this.pausedInterval = 0;
    this.isCompleted = false;
    this.isCountingDown = false;
};

CountdownTimer.prototype.StartTimer = function ()
{
    //starting timer time
    this.startTime = game.time.time;
    this.counter = this.originalCounter;
    this.isCountingDown = true;
}

CountdownTimer.prototype.UpdateTimer = function ()
{
    if(!this.isPaused && this.isCountingDown)
    {
        if(game.time.elapsedSecondsSince(this.startTime) > this.TIMER_INTERVAL)   
        {
            this.startTime = game.time.time;
            this.UpdateTimerCounter();
        }
    }
}

// Callback Function
CountdownTimer.prototype.UpdateTimerCounter = function ()
{
    // Counter has finished counting down!
    if(this.counter > 0)
    {
        this.counter --;   
    }
    else
    {
        // The timer has ended
        this.isCompleted = true;
    }
}

//Pause our timer
CountdownTimer.prototype.PauseTimer = function ()
{
    this.isPaused = true;   
    this.pausedInterval = game.time.elapsedSecondsSince(this.startTime);
}

//Resume our timer
CountdownTimer.prototype.ResumeTimer = function ()
{
    if(this.isPaused)
    {
        this.startTime = game.time.time + this.pausedInterval;
    }
    
    this.isPaused = false;
}

//Restart our timer
CountdownTimer.prototype.StopTimer = function ()
{
    this.isCompleted = false;
    this.isCountingDown = false;
}