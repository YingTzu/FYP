//Kinnear Justin Wong
//Nanyang Polytechnic
// create a new instance of the sound manager to handle all sounds in the game
var soundManager = new SoundManager();

function BootLoader(game)
{
    var isFinishedLoading = false;
    var debugText;
    var percentageText;
    
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
    
    BootLoader.prototype.preload = function() 
    {
        ScaleToAspectRatio(game);

        // loading bar
        game.load.image('loading-bar', 'depthrunner/assets/loading-bar.png');
    }

    BootLoader.prototype.create = function()
    {
        game.stage.backgroundColor = '#adeaf9';
        
        game.load.onFileComplete.add(FileComplete, this);
        completedEventListener = game.load.onLoadComplete.add(FinishedLoading, this);
        
        var backLoadingBar = game.add.sprite((game.world.width / 2) - 200, game.world.height / 2, 'loading-bar');
        backLoadingBar.alpha = 0.5;
        
        loadingBar = game.add.sprite(0, 0, 'loading-bar');
        loadingBar.x = (game.world.width / 2) - (loadingBar.width / 2);
        loadingBar.y = game.world.height / 2;
        loadingBar.alpha = 0.6;
        
        game.load.setPreloadSprite(loadingBar);
        
        // our debug text
        debugText  = game.add.text(game.world.width / 2, (game.world.height / 2) - 50, '', { font:" 60px RattyTatty", fill: "#439cb3", align:"center" });
        debugText.anchor.setTo(0.5, 0.5);
        
        
        percentageText  = game.add.text(game.world.width / 2, (game.world.height / 2) + 25, "0%", { font:" 35px RattyTatty", fill: "#ffface", align:"center" });
        percentageText.anchor.setTo(0.5, 0.5);
        
        //****** Image Sheets ******
        
        // Main Menu Items
        game.load.spritesheet('main-menu-play-animation', 'depthrunner/assets/gui/main-menu/main-menu-play-button-animated.png', 144, 114);
        game.load.image('main-menu-layout', 'depthrunner/assets/gui/main-menu/main-menu-layout.png');
        game.load.image('main-menu-background', 'depthrunner/assets/gui/main-menu/main-menu-background.png');
        game.load.image('main-menu-button-mouseover', 'depthrunner/assets/gui/main-menu/main-menu-play-button-mouseover.png');
        
        
        // End Menu Items
        game.load.image('endscreen-background', 'depthrunner/assets/gui/end-screen/endscreen-background.png');
        game.load.image('endscreen-background-max', 'depthrunner/assets/gui/end-screen/endscreen-background-max.png');
        game.load.image('endscreen-layout', 'depthrunner/assets/gui/end-screen/endscreen-layout.png');
        game.load.image('endscreen-exit-button', 'depthrunner/assets/gui/end-screen/endscreen-background-exit-button.png');
        game.load.image('endscreen-exit-button-mouseover', 'depthrunner/assets/gui/end-screen/endscreen-background-exit-button-mouseover.png');
        game.load.image('endscreen-replay-button', 'depthrunner/assets/gui/end-screen/endscreen-background-replay-button.png');
        game.load.image('endscreen-replay-button-mouseover', 'depthrunner/assets/gui/end-screen/endscreen-background-replay-button-mouseover.png');
        
        
        // pause screen
        game.load.image('pause-screen-background', 'depthrunner/assets/gui/pause-screen/pause-screen-background.png');
        game.load.image('pause-screen-layout', 'depthrunner/assets/gui/pause-screen/pause-screen-layout.png');
        game.load.image('pause-screen-exit-button', 'depthrunner/assets/gui/pause-screen/pause-screen-exit-button.png');
        game.load.image('pause-screen-exit-button-mouseover', 'depthrunner/assets/gui/pause-screen/pause-screen-exit-button-mouseover.png');
        game.load.image('pause-screen-play-button', 'depthrunner/assets/gui/pause-screen/pause-screen-play-button.png');
        game.load.image('pause-screen-play-button-mouseover', 'depthrunner/assets/gui/pause-screen/pause-screen-play-button-mouseover.png');
        
        // instruction screens
        game.load.image('instructions-screen-1', 'depthrunner/assets/gui/instruction-screen/instructions-screen-1.png');
        game.load.image('instructions-screen-2', 'depthrunner/assets/gui/instruction-screen/instructions-screen-2.png');
        game.load.image('instructions-screen-3', 'depthrunner/assets/gui/instruction-screen/instructions-screen-3.png');
        
        game.load.image('instructions-screen-2-layout', 'depthrunner/assets/gui/instruction-screen/instructions-screen-2-layout.png');
        
        game.load.spritesheet('instructions-screen-2-arrows', 'depthrunner/assets/gui/instruction-screen/instructions-screen-2-arrows.png', 197, 125);
        game.load.spritesheet('instructions-screen-2-wasd', 'depthrunner/assets/gui/instruction-screen/instructions-screen-2-wasd.png', 197, 125);
                        
        //***************************
        
        //****** Audio Sheets ******
//        soundManager.AddAudioFile(new SoundData('bgMusic', 'depthrunner/assets/audio/bg_01.mp3', SOUND_TYPE.BG, 0.5, true));
//        soundManager.AddAudioFile(new SoundData('bellMusic', 'depthrunner/assets/audio/bell.mp3', SOUND_TYPE.SFX, 0.1, false));
//        soundManager.AddAudioFile(new SoundData('starMusic', 'depthrunner/assets/audio/star.mp3', SOUND_TYPE.SFX, 0.2, false));
//        soundManager.AddAudioFile(new SoundData('timerMusic', 'depthrunner/assets/audio/timer.mp3', SOUND_TYPE.SFX, 0.4, false));
//        soundManager.AddAudioFile(new SoundData('waterDropMusic', 'depthrunner/assets/audio/water-drop.mp3', SOUND_TYPE.SFX, 0.1, false));
//        soundManager.AddAudioFile(new SoundData('wrongMusic', 'depthrunner/assets/audio/wrong.mp3', SOUND_TYPE.SFX, 1, false));
//        
//        soundManager.AddAudioFile(new SoundData('cha-ching', 'depthrunner/assets/audio/cha-ching.mp3', SOUND_TYPE.SFX, 1, false));
//        soundManager.AddAudioFile(new SoundData('bar-crowd', 'depthrunner/assets/audio/bar-crowd.mp3', SOUND_TYPE.BG, 0.3, true));
//        soundManager.AddAudioFile(new SoundData('coin', 'depthrunner/assets/audio/coin.mp3', SOUND_TYPE.SFX, 0.2, false));
        //***************************
        
        //****** Sprite Sheets ******
        game.load.spritesheet('grass', 'depthrunner/assets/background-items/BG_spritesheet.png', 640, 240);

        //Backgrounds
        game.load.image('fade-out', 'depthrunner/assets/fade-out.png');
        game.load.image('background', 'depthrunner/assets/background-items/background.png');
        game.load.image('clouds', 'depthrunner/assets/background-items/clouds.png');
        game.load.image('mountains', 'depthrunner/assets/background-items/mountains.png');
        game.load.image('game-layout', 'depthrunner/assets/background-items/game-layout.png');
        
        game.load.image('game-heart', 'depthrunner/assets/background-items/game-heart.png');
        game.load.image('game-score-board', 'depthrunner/assets/background-items/game-score-board.png');
        game.load.image('game-pause-button', 'depthrunner/assets/background-items/game-pause-button.png');
        game.load.image('game-pause-button-mouseover', 'depthrunner/assets/background-items/game-pause-button-mouseover.png');
        
        // Player Sprites
        game.load.spritesheet('player-easy-3', 'depthrunner/assets/characters/player/easy.png', 162.5, 120);
        game.load.spritesheet('player-easy-2', 'depthrunner/assets/characters/player/easy15.png', 162.5, 120);
        game.load.spritesheet('player-easy-1', 'depthrunner/assets/characters/player/easy30.png', 162.5, 120);
        game.load.spritesheet('player-easy-0', 'depthrunner/assets/characters/player/easy45.png', 162.5, 120);
        
        // Player Hit Sprites
        game.load.image('player-hit-banana-3', 'depthrunner/assets/characters/player-hit/hit-banana00.png');
        game.load.image('player-hit-banana-2', 'depthrunner/assets/characters/player-hit/hit-banana15.png');
        game.load.image('player-hit-banana-1', 'depthrunner/assets/characters/player-hit/hit-banana30.png');
        game.load.image('player-hit-banana-0', 'depthrunner/assets/characters/player-hit/hit-banana45.png');
        
        game.load.image('player-hit-fish-3', 'depthrunner/assets/characters/player-hit/hit-fish00.png');
        game.load.image('player-hit-fish-2', 'depthrunner/assets/characters/player-hit/hit-fish15.png');
        game.load.image('player-hit-fish-1', 'depthrunner/assets/characters/player-hit/hit-fish30.png');
        game.load.image('player-hit-fish-0', 'depthrunner/assets/characters/player-hit/hit-fish45.png');
        
        game.load.image('player-hit-hammer-3', 'depthrunner/assets/characters/player-hit/hit-hammer00.png');
        game.load.image('player-hit-hammer-2', 'depthrunner/assets/characters/player-hit/hit-hammer15.png');
        game.load.image('player-hit-hammer-1', 'depthrunner/assets/characters/player-hit/hit-hammer30.png');
        game.load.image('player-hit-hammer-0', 'depthrunner/assets/characters/player-hit/hit-hammer45.png');
        
        game.load.image('player-hit-wrench-3', 'depthrunner/assets/characters/player-hit/hit-wrench00.png');
        game.load.image('player-hit-wrench-2', 'depthrunner/assets/characters/player-hit/hit-wrench15.png');
        game.load.image('player-hit-wrench-1', 'depthrunner/assets/characters/player-hit/hit-wrench30.png');
        game.load.image('player-hit-wrench-0', 'depthrunner/assets/characters/player-hit/hit-wrench45.png');
        
        // Alternate Player Sprites
//        game.load.spritesheet('player-normal', 'depthrunner/assets/characters/player/normal.png', 162.5, 120);
//        game.load.spritesheet('player-hard', 'depthrunner/assets/characters/player/hard.png', 162.5, 120);
//        game.load.spritesheet('player-veryhard', 'depthrunner/assets/characters/player/veryhard.png', 162.5, 120);
        
        // Enemy sprites
        game.load.spritesheet('enemy-3', 'depthrunner/assets/characters/enemy/enemy.png', 133.3, 120);
        game.load.spritesheet('enemy-2', 'depthrunner/assets/characters/enemy/enemy1.png', 133.3, 120);
        game.load.spritesheet('enemy-1', 'depthrunner/assets/characters/enemy/enemy2.png', 133.3, 120);
        game.load.spritesheet('enemy-0', 'depthrunner/assets/characters/enemy/enemy3.png', 133.3, 120);
        
        
        // Falling objects Sprites
        game.load.image('falling-banana-3', 'depthrunner/assets/items/Projectile_Banana_Falling_Depth_1.png');
        game.load.image('falling-banana-2', 'depthrunner/assets/items/Projectile_Banana_Falling_Depth_2.png');
        game.load.image('falling-banana-1', 'depthrunner/assets/items/Projectile_Banana_Falling_Depth_3.png');
        game.load.image('falling-banana-0', 'depthrunner/assets/items/Projectile_Banana_Falling_Depth_4.png');
        
        game.load.image('fallen-banana-3', 'depthrunner/assets/items/Projectile_Banana_Fall_Depth_1.png');
        game.load.image('fallen-banana-2', 'depthrunner/assets/items/Projectile_Banana_Fall_Depth_2.png');
        game.load.image('fallen-banana-1', 'depthrunner/assets/items/Projectile_Banana_Fall_Depth_3.png');
        game.load.image('fallen-banana-0', 'depthrunner/assets/items/Projectile_Banana_Fall_Depth_4.png');
        
        
        
        game.load.image('falling-fishbone-3', 'depthrunner/assets/items/Projectile_FishBone_Falling_Depth_1.png');
        game.load.image('falling-fishbone-2', 'depthrunner/assets/items/Projectile_FishBone_Falling_Depth_2.png');
        game.load.image('falling-fishbone-1', 'depthrunner/assets/items/Projectile_FishBone_Falling_Depth_3.png');
        game.load.image('falling-fishbone-0', 'depthrunner/assets/items/Projectile_FishBone_Falling_Depth_4.png');
        
        game.load.image('fallen-fishbone-3', 'depthrunner/assets/items/Projectile_FishBone_Fall_Depth_1.png');
        game.load.image('fallen-fishbone-2', 'depthrunner/assets/items/Projectile_FishBone_Fall_Depth_2.png');
        game.load.image('fallen-fishbone-1', 'depthrunner/assets/items/Projectile_FishBone_Fall_Depth_3.png');
        game.load.image('fallen-fishbone-0', 'depthrunner/assets/items/Projectile_FishBone_Fall_Depth_4.png');
        
        
        
        game.load.image('falling-hammer-3', 'depthrunner/assets/items/Projectile_Hammer_Falling_Depth_1.png');
        game.load.image('falling-hammer-2', 'depthrunner/assets/items/Projectile_Hammer_Falling_Depth_2.png');
        game.load.image('falling-hammer-1', 'depthrunner/assets/items/Projectile_Hammer_Falling_Depth_3.png');
        game.load.image('falling-hammer-0', 'depthrunner/assets/items/Projectile_Hammer_Falling_Depth_4.png');
        
        game.load.image('fallen-hammer-3', 'depthrunner/assets/items/Projectile_Hammer_Fall_Depth_1.png');
        game.load.image('fallen-hammer-2', 'depthrunner/assets/items/Projectile_Hammer_Fall_Depth_2.png');
        game.load.image('fallen-hammer-1', 'depthrunner/assets/items/Projectile_Hammer_Fall_Depth_3.png');
        game.load.image('fallen-hammer-0', 'depthrunner/assets/items/Projectile_Hammer_Fall_Depth_4.png');
        
        
        
        game.load.image('falling-wrench-3', 'depthrunner/assets/items/Projectile_Wrench_Falling_Depth_1.png');
        game.load.image('falling-wrench-2', 'depthrunner/assets/items/Projectile_Wrench_Falling_Depth_2.png');
        game.load.image('falling-wrench-1', 'depthrunner/assets/items/Projectile_Wrench_Falling_Depth_3.png');
        game.load.image('falling-wrench-0', 'depthrunner/assets/items/Projectile_Wrench_Falling_Depth_4.png');
        
        game.load.image('fallen-wrench-3', 'depthrunner/assets/items/Projectile_Wrench_Fall_Depth_1.png');
        game.load.image('fallen-wrench-2', 'depthrunner/assets/items/Projectile_Wrench_Fall_Depth_2.png');
        game.load.image('fallen-wrench-1', 'depthrunner/assets/items/Projectile_Wrench_Fall_Depth_3.png');
        game.load.image('fallen-wrench-0', 'depthrunner/assets/items/Projectile_Wrench_Fall_Depth_4.png');
        //***************************
        
        game.load.start();
    }

    BootLoader.prototype.update = function()
    {
        if(isFinishedLoading && soundManager.CheckIfDecoded())
        {
            // Move to game screen
            game.state.start("MainMenu");
//            game.state.start("GameOver");
        }
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
        debugText.setText("Running in progress");
    }
}