//Kinnear Justin Wong
//Nanyang Polytechnic

SoundManager = function()
{
    // original positions
    var bgMusicMuted = false;
    var sfxMusicMuted = false;
    
    var bgMusicVol = 1.0;
    var sfxMusicVol = 1.0;
    
    // array to store all audio data files
    var soundDataFiles = [];
    
    SoundManager.prototype.SwitchOffBGMusic = function()
    {
        bgMusicMuted = true;
        
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.BG)
            {
                soundDataFiles[i].soundFile.volume = 0;
            }
        }
    }
    
    SoundManager.prototype.SwitchOnBGMusic = function()
    {
        bgMusicMuted = false;
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.BG)
            {
                soundDataFiles[i].soundFile.volume = soundDataFiles[i].volume;
            }
        }
    }
    
    SoundManager.prototype.SwitchOffSFXMusic = function()
    {
        sfxMusicMuted = true;
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.SFX)
            {
                soundDataFiles[i].soundFile.volume = 0;
            }
        }
    }
    
    SoundManager.prototype.SwitchOnSFXMusic = function()
    {
        sfxMusicMuted = false;
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.SFX)
            {
                soundDataFiles[i].soundFile.volume = soundDataFiles[i].volume;
            }
        }
    }
    
    SoundManager.prototype.GetBGMusicStatus = function()
    {
        return bgMusic;
    }
    
    SoundManager.prototype.GetSFXMusicStatus = function()
    {
        return sfxMusic; 
    }
    
    SoundManager.prototype.GeneralBGVolume = function(vol)
    {
        var tempVolume = volume;
        if(tempVolume > 1.0)
        {
            tempVolume = 1.0;
        }
        else if(tempVolume < 0.0)
        {
            tempVolume = 0.0;
        }
        
        bgMusicVol = tempVolume;
        
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.BG)
            {
                soundDataFiles[i].ModifyVolume(bgMusicVol);
            }
        }
    }
    
    SoundManager.prototype.GeneralSFXVolume = function(vol)
    {
        var tempVolume = volume;
        if(tempVolume > 1.0)
        {
            tempVolume = 1.0;
        }
        else if(tempVolume < 0.0)
        {
            tempVolume = 0.0;
        }
        
        sfxMusicVol = tempVolume;
        
        for(var i = 0 ; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundType == SOUND_TYPE.SFX)
            {
                soundDataFiles[i].ModifyVolume(sfxMusicVol);
            }
        }
    }
    
    SoundManager.prototype.AddAudioFile = function(soundData)
    {
        soundDataFiles.push(soundData);
    }
    
    SoundManager.prototype.PlaySound = function(key)
    {
        for(var i = 0; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundKey == key)
            {
                if(soundDataFiles[i].soundType == SOUND_TYPE.BG)
                {
                    if(bgMusicMuted)
                    {
                        return;    
                    }
                }
                else if(soundDataFiles[i].soundType == SOUND_TYPE.SFX)
                {
                    if(sfxMusicMuted)
                    {
                        return;
                    }
                }
                
                if(soundDataFiles[i].soundType == SOUND_TYPE.BG)
                {
                    soundDataFiles[i].PlaySound(bgMusicMuted);
                }
                else if(soundDataFiles[i].soundType == SOUND_TYPE.SFX)
                {
                    soundDataFiles[i].PlaySound(sfxMusicMuted);
                }
                
                return;
            }
        }
        
        console.log('Could not find a sound with the key: ' + key + ' .');
    }
    
    SoundManager.prototype.StopSound = function(key)
    {
        for(var i = 0; i < soundDataFiles.length; i++)
        {
            if(soundDataFiles[i].soundKey == key)
            {
                soundDataFiles[i].soundFile.stop();
                return;
            }
        }
    }
    
    SoundManager.prototype.StopAllSound = function(key)
    {
        // stops all sounds that are playing
        for(var i = 0; i < soundDataFiles.length; i++)
        {
            soundDataFiles[i].stop();
        }
    }
    
    SoundManager.prototype.CheckIfDecoded = function()
    {
      // stops all sounds that are playing
        for(var i = 0; i < soundDataFiles.length; i++)
        {
            if(!game.cache.isSoundDecoded(soundDataFiles[i].soundKey))
            {
                return false;
            }
        }
        return true;
    }
};