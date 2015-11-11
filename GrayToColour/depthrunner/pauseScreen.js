//Kinnear Justin Wong
//Nanyang Polytechnic

var bgMusicOn = true;
var sfxMusicOn = true;

PauseScreen = function()
{
    // Pause screen 
    this.pauseBG;
    this.exitButton;
    this.resumeButton;
//    this.sfxButton;
//    this.bgMusicButton;

    this.pausedScreenGroup;
    
    this.isPaused = false;
    this.exit = false;
    
    this.isResumed = false;

    PauseScreen.prototype.CreatePauseScreenVariables = function(game)
    {
        this.pausedScreenGroup = game.add.group();

//        this.pauseBG = game.add.sprite(0, 0, 'pause-screen-layout');
        this.pauseBG = game.add.sprite(0, 0, 'pause-screen-background');
        this.pauseBG.inputEnabled = true;
        
//        // BG Music Button
//        if(bgMusicOn)
//        {
//            this.bgMusicButton = game.add.sprite(355, 255, 'music-on');
//        }
//        else
//        {
//            this.bgMusicButton = game.add.sprite(355, 255, 'music-off');
//        }
//        
//        this.bgMusicButton.inputEnabled = true;
//        
//        this.bgMusicButton.events.onInputOver.add(function(){
//            
//            if(bgMusicOn)
//            {
//                this.bgMusicButton.loadTexture('music-on-mouseover');
//            }
//            else
//            {
//                this.bgMusicButton.loadTexture('music-off-mouseover');
//            }
//            
//        }, this);
//        
//        this.bgMusicButton.events.onInputOut.add(function(){
//            
//            if(bgMusicOn)
//            {
//                this.bgMusicButton.loadTexture('music-on');
//            }
//            else
//            {
//                this.bgMusicButton.loadTexture('music-off');
//            }
//            
//        }, this);
//        
//        this.bgMusicButton.events.onInputDown.add(function(){
//            
//            bgMusicOn = !bgMusicOn;
//            
//            if(bgMusicOn)
//            {
//                this.bgMusicButton.loadTexture('music-on');
//                soundManager.SwitchOnBGMusic();
//            }
//            else
//            {                
//                this.bgMusicButton.loadTexture('music-off');
//                soundManager.SwitchOffBGMusic();
//            }
//        }, this);
//        
//        
//        // Sfx button
//        if(sfxMusicOn)
//        {
//            this.sfxButton = game.add.sprite(470, 255, 'sfx-on');
//        }
//        else
//        {
//            this.sfxButton = game.add.sprite(470, 255, 'sfx-off');
//        }
//        this.sfxButton.inputEnabled = true;
//        
//        this.sfxButton.events.onInputOver.add(function(){
//            
//            if(sfxMusicOn)
//            {
//                this.sfxButton.loadTexture('sfx-on-mouseover');
//            }
//            else
//            {
//                this.sfxButton.loadTexture('sfx-off-mouseover');
//            }
//            
//        }, this);
//        
//        this.sfxButton.events.onInputOut.add(function(){
//            
//            if(sfxMusicOn)
//            {
//                this.sfxButton.loadTexture('sfx-on');
//            }
//            else
//            {
//                this.sfxButton.loadTexture('sfx-off');
//            }
//            
//        }, this);
//        
//        this.sfxButton.events.onInputDown.add(function(){
//            
//            sfxMusicOn = !sfxMusicOn;
//            
//            if(sfxMusicOn)
//            {
//                this.sfxButton.loadTexture('sfx-on');
//                soundManager.SwitchOnSFXMusic();
//            }
//            else
//            {
//                this.sfxButton.loadTexture('sfx-off');
//                soundManager.SwitchOffSFXMusic();
//            }
//        }, this);
        
        
        // Resume Button
        this.resumeButton = game.add.sprite(237, 305, 'pause-screen-play-button');
        this.resumeButton.inputEnabled = true;
        
        this.resumeButton.events.onInputOver.add(function(){
            
                this.resumeButton.loadTexture('pause-screen-play-button-mouseover');
            
        }, this);
        
        this.resumeButton.events.onInputOut.add(function(){

                this.resumeButton.loadTexture('pause-screen-play-button');
            
        }, this);
        
        this.resumeButton.events.onInputDown.add(function(){

                this.ClosePauseMenu();      
            
        }, this);
        
        
        // Exit Button
        this.exitButton = game.add.sprite(237, 250, 'pause-screen-exit-button');
        this.exitButton.inputEnabled = true;
        
        this.exitButton.events.onInputOver.add(function(){
            
                this.exitButton.loadTexture('pause-screen-exit-button-mouseover');
            
        }, this);
        
        this.exitButton.events.onInputOut.add(function(){

            this.exitButton.loadTexture('pause-screen-exit-button');
            
        }, this);
        
        this.exitButton.events.onInputDown.add(function(){

            // call the shutdown and change state
            this.exit = true;

        }, this);
        
        this.pausedScreenGroup.add(this.pauseBG);   
        this.pausedScreenGroup.add(this.exitButton);
        this.pausedScreenGroup.add(this.resumeButton);
//        this.pausedScreenGroup.add(this.sfxButton);
//        this.pausedScreenGroup.add(this.bgMusicButton);
        
        // disable the entire group
        this.ClosePauseMenu();
        this.isResumed = false;
    }
    
    PauseScreen.prototype.OpenPauseMenu = function()
    {
        this.isPaused = true;
        
        // for every single object inside the pauseScreenGroup
        this.pausedScreenGroup.forEach(function(obj){
            
            obj.exists = true;
        });
    }
    
    PauseScreen.prototype.ClosePauseMenu = function()
    {
        this.isPaused = false;
        this.isResumed = true;
        
        this.pausedScreenGroup.forEach(function(obj){
            
            obj.exists = false;
        });
    }
    
    PauseScreen.prototype.IsResumed = function()
    {
        if(this.isResumed)
        {
            this.isResumed = false;
            return true;
        }
        
        return false;
    }
    
    PauseScreen.prototype.IsExit = function()
    {
        if(this.exit)
        {
            this.exit = false;
            return true;
        }
        
        return false;
    }
}