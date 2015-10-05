//Kinnear Justin Wong
//Nanyang Polytechnic
// create a new instance of the sound manager to handle all sounds in the game
var soundManager = new SoundManager();

function BootLoader(game)
{
    var isFinishedLoading = false;
    var debugText;
    var percentageText;
    
    var dotOne;
    var dotTwo;
    var dotThree;
    
    // Resizing of the screen
    function ScaleToAspectRatio(game)
    {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = false;
        game.scale.pageAlignVertically = false;
        game.scale.setScreenSize( true );
    }
    
    var loadingBar;
    var completedEventListener;
    
    var animatedDotsSpeed = 150;
    
    BootLoader.prototype.preload = function() 
    {
        ScaleToAspectRatio(game);

        // loading bar
        game.load.image('loading-bar', 'assets/loading-bar.png');
    }

    BootLoader.prototype.create = function()
    {
        game.stage.backgroundColor = '#32065b';
        
        game.load.onLoadStart.add(LoadStart, this);
        game.load.onFileComplete.add(FileComplete, this);
        completedEventListener = game.load.onLoadComplete.add(FinishedLoading, this);
        
        var backLoadingBar = game.add.sprite((game.world.width / 2) - 200, game.world.height / 2, 'loading-bar');
        backLoadingBar.alpha = 0.5;
        
        loadingBar = game.add.sprite(0, 0, 'loading-bar');
        loadingBar.x = (game.world.width / 2) - (loadingBar.width / 2);
        loadingBar.y = game.world.height / 2;
        
        game.load.setPreloadSprite(loadingBar);
        
        // our debug text
        debugText  = game.add.text(game.world.width / 2, (game.world.height / 2) - 70, '', { font:" 45px Beon", fill: "#a4bfff", align:"center" });
        debugText.anchor.setTo(0.5, 0.5);
        
        
        percentageText  = game.add.text(game.world.width / 2, (game.world.height / 2) + 25, "0%", { font:" 35px Beon", fill: "#fed554", align:"center" });
        percentageText.anchor.setTo(0.5, 0.5);
        
        
        dotOne = game.add.text(715, (game.world.height / 2) - 70, ".", { font:" 60px Beon", fill: "#a4bfff", align:"center" });
        dotOne.anchor.setTo(0.5, 0.5);
        
        dotTwo = game.add.text(735, (game.world.height / 2) - 70, ".", { font:" 60px Beon", fill: "#a4bfff", align:"center" });
        dotTwo.anchor.setTo(0.5, 0.5);
        
        dotThree = game.add.text(755, (game.world.height / 2) - 70, ".", { font:" 60px Beon", fill: "#a4bfff", align:"center" });
        dotThree.anchor.setTo(0.5, 0.5);
        
        var dotOneTween = game.add.tween(dotOne);
        
        dotOneTween.to({y : dotOne.y - 30}, animatedDotsSpeed, Phaser.Easing.Bounce.InOut, false, 0, 0, true);
        dotOneTween.onComplete.add(function(){
            
            this.game.tweens.remove(dotOneTween);
            AnimateDotTwo();
        }, this);


        //****** Image Sheets ******
        
        game.load.image('fade-out', 'assets/fade-out.png');
        
        game.load.image('layout', 'assets/layout.png');
        game.load.image('background', 'assets/background.png');
        
        // timer icon
        game.load.image('timer-icon', 'assets/timer-icon.png');
        
        // pause icon
        game.load.image('pause-icon', 'assets/pause-icon.png');
        
        // pause icon
        game.load.image('highscore-icon', 'assets/highscore-icon.png');
        
        // mix drinks here sign
        game.load.image('mix-drinks-sign', 'assets/mix-drinks-sign.png');
        
        // order board
        game.load.image('order-list', 'assets/order-list.png');
        
        // Image droplets
        game.load.image('black-drop', 'assets/drops/black-drop.png');
        game.load.image('white-drop', 'assets/drops/white-drop.png');
        
        game.load.image('magenta-drop', 'assets/drops/magenta-drop.png');
        game.load.image('cyan-drop', 'assets/drops/cyan-drop.png');
        game.load.image('yellow-drop', 'assets/drops/yellow-drop.png');
        
        // Stars filled empty
        game.load.image('starEmpty', 'assets/empty.png');
        game.load.image('starFull', 'assets/starFull.png');
        
        // black and white bottles
        game.load.image('black-bottle', 'assets/bottles/black-bottle.png');
        game.load.image('white-bottle', 'assets/bottles/white-bottle.png');
        
        // coloured bottles
        game.load.image('magenta-bottle', 'assets/bottles/magenta-bottle.png');
        game.load.image('cyan-bottle', 'assets/bottles/cyan-bottle.png');
        game.load.image('yellow-bottle', 'assets/bottles/yellow-bottle.png');
        
        // Load our cups and liquid images into memory
        game.load.image('cup1', 'assets/cups_liquids/oval_cup.png');
        game.load.image('liquid1', 'assets/cups_liquids/oval_inner.png');
        
        game.load.image('cup2', 'assets/cups_liquids/straight_cup.png');
        game.load.image('liquid2', 'assets/cups_liquids/straight_inner.png');
        
        game.load.image('cup3', 'assets/cups_liquids/round_cup.png');
        game.load.image('liquid3', 'assets/cups_liquids/round_inner.png');
        
        game.load.image('cup4', 'assets/cups_liquids/triangle_cup.png');
        game.load.image('liquid4', 'assets/cups_liquids/triangle_inner.png');
        

        
        game.load.image('paused-screen', 'assets/pause-menu/paused-screen.png');

        game.load.image('resume', 'assets/pause-menu/resume.png');
        game.load.image('resume-mouseover', 'assets/pause-menu/resume-mouseover.png');

        game.load.image('exit', 'assets/pause-menu/exit.png');
        game.load.image('exit-mouseover', 'assets/pause-menu/exit-mouseover.png');

        game.load.image('sfx-on', 'assets/pause-menu/sound-on.png');
        game.load.image('sfx-on-mouseover', 'assets/pause-menu/sound-on-mouseover.png');

        game.load.image('sfx-off', 'assets/pause-menu/sound-off.png');
        game.load.image('sfx-off-mouseover', 'assets/pause-menu/sound-off-mouseover.png');

        game.load.image('music-on', 'assets/pause-menu/music-on.png');
        game.load.image('music-on-mouseover', 'assets/pause-menu/music-on-mouseover.png');

        game.load.image('music-off', 'assets/pause-menu/music-off.png');
        game.load.image('music-off-mouseover', 'assets/pause-menu/music-off-mouseover.png');

        game.load.image('paused-layout', 'assets/pause-menu/layout.png');
        
        game.load.image('cross-icon', 'assets/cross-icon.png');
        game.load.image('cup-icon', 'assets/cup-icon.png');
        
        
        game.load.image('end-screen-background', 'assets/end-screen/end-screen-background.png');
        game.load.image('end-screen-layout', 'assets/end-screen/end-screen-layout.png');
        game.load.image('exit-button', 'assets/end-screen/exit-button.png');
        game.load.image('exit-button-mouseover', 'assets/end-screen/exit-button-mouseover.png');
        game.load.image('replay-button', 'assets/end-screen/replay-button.png');
        game.load.image('replay-button-mouseover', 'assets/end-screen/replay-button-mouseover.png');
        
        game.load.image('main-menu-background', 'assets/main-menu/main-menu-background.png');
        game.load.image('main-menu-layout', 'assets/main-menu/main-menu-layout.png');
        game.load.image('main-menu-play-button', 'assets/main-menu/main-menu-play-button.png');
        game.load.image('main-menu-play-button-mouseover', 'assets/main-menu/main-menu-play-button-mouseover.png');
        game.load.image('door', 'assets/main-menu/door.png');
        game.load.image('door-background', 'assets/main-menu/door-background.png');
        game.load.image('door-glow', 'assets/main-menu/door-glow.png');
        
        game.load.image('instructions-screen-1', 'assets/instructions-screen/instructions-screen-1.png');
        game.load.image('instructions-screen-2', 'assets/instructions-screen/instructions-screen-2.png');
        game.load.image('instructions-screen-3', 'assets/instructions-screen/instructions-screen-3.png');
                        
        //***************************
        
        //****** Audio Sheets ******
        soundManager.AddAudioFile(new SoundData('bgMusic', 'assets/audio/bg_01.mp3', SOUND_TYPE.BG, 0.5, true));
        soundManager.AddAudioFile(new SoundData('bellMusic', 'assets/audio/bell.mp3', SOUND_TYPE.SFX, 0.1, false));
        soundManager.AddAudioFile(new SoundData('starMusic', 'assets/audio/star.mp3', SOUND_TYPE.SFX, 0.2, false));
        soundManager.AddAudioFile(new SoundData('timerMusic', 'assets/audio/timer.mp3', SOUND_TYPE.SFX, 0.4, false));
        soundManager.AddAudioFile(new SoundData('waterDropMusic', 'assets/audio/water-drop.mp3', SOUND_TYPE.SFX, 0.1, false));
        soundManager.AddAudioFile(new SoundData('wrongMusic', 'assets/audio/wrong.mp3', SOUND_TYPE.SFX, 1, false));
        
        soundManager.AddAudioFile(new SoundData('cha-ching', 'assets/audio/cha-ching.mp3', SOUND_TYPE.SFX, 1, false));
        soundManager.AddAudioFile(new SoundData('bar-crowd', 'assets/audio/bar-crowd.mp3', SOUND_TYPE.BG, 0.3, true));
        soundManager.AddAudioFile(new SoundData('coin', 'assets/audio/coin.mp3', SOUND_TYPE.SFX, 0.2, false));
        //***************************
        
        //****** Sprite Sheets ******
        game.load.spritesheet('serveBtn', 'assets/bell-spritesheet.png', 115, 119);
        //***************************
        
        game.load.start();
        dotOneTween.start();
    }

    BootLoader.prototype.update = function()
    {
        debugText.setText("Mixing in progress");

        if(isFinishedLoading && soundManager.CheckIfDecoded())
        {
            // Move to game screen
            game.state.start("MainMenu");
        }
    }
    
    LoadStart = function()
    {
       // console.log("Started Loading..");
    }
    
    FileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles)
    {
        percentageText.setText(progress + "%");
    }
    
    FinishedLoading = function()
    {
        // delete the event listener
        game.load.onLoadComplete.remove(FinishedLoading, this);
        isFinishedLoading = true;
    }
    //One Down
    AnimateDotOne = function()
    { 
        var dotOneTween = game.add.tween(dotOne);

        dotOneTween.to({y : dotOne.y - 30}, animatedDotsSpeed, Phaser.Easing.Bounce.Out, false, 0, 0, true);

        dotOneTween.onComplete.add(function(){
        
            this.game.tweens.remove(dotOneTween);
            AnimateDotTwo();
        }, this);
        
        dotOneTween.start();
    }
    //Two Up
    AnimateDotTwo = function()  
    { 
        var dotTwoTween = game.add.tween(dotTwo);
        
        dotTwoTween.to({y : dotTwo.y - 30}, animatedDotsSpeed, Phaser.Easing.Bounce.Out, false, 0, 0, true);

        dotTwoTween.onComplete.add(function(){
        
            this.game.tweens.remove(dotTwoTween);
            AnimateDotThree();
        }, this);
        
        dotTwoTween.start();
    }
    //Two Down
    AnimateDotThree = function()
    {
        var dotThreeTween = game.add.tween(dotThree);
        
        dotThreeTween.to({y : dotThree.y - 30}, animatedDotsSpeed, Phaser.Easing.Bounce.Out, false, 0, 0, true);

        dotThreeTween.onComplete.add(function(){
        
            this.game.tweens.remove(dotThreeTween);
            AnimateDotOne();
        }, this);

        dotThreeTween.start();
    }
}