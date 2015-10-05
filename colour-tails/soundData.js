//Kinnear Justin Wong
//Nanyang Polytechnic

SOUND_TYPE = 
{
    BG : 0,
    SFX : 1
}

SoundData = function(soundKey, soundURL, soundType, volume, repeat)
{
    this.soundKey = soundKey;
    this.soundURL = soundURL;
    this.soundType = soundType;
    this.volume = volume;
    this.repeat = repeat;
    
    // stores the sound file of the object
    game.load.audio(this.soundKey, this.soundURL);
    
    this.soundFile = game.add.audio(this.soundKey, this.volume, this.repeat);

    SoundData.prototype.PlaySound = function(muted)
    {
        if(muted)
        {
            this.soundFile.volume = 0;
            this.soundFile.play();
        }
        else
        {
            this.soundFile.volume = this.volume;
            this.soundFile.play();
        }
    }
    
    SoundData.prototype.ModifyVolume = function(moderatedVolume)
    {
        this.soundFile.volume = moderatedVolume * this.volume;
    }
};