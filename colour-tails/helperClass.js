//Kinnear Justin Wong
//Nanyang Polytechnic

// returns a hex colour with desaturation
function shadeColor2(color, percent)
{   
    var f = 16777215 & color, t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return 16777215 & (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B));
}

function ShadeColourIntegerWrapper(color, integer)
{
    if(integer > 10)
    {
       integer = 10;
    }
    else if (integer < -10)
    {
        integer = -10;
    }

    return shadeColor2(color, integer/10);
}

// including both the min and max nunbers
function RandomiseDifferentNumber(previousNumber, min, max)
{
    var temp;

    do
    {
        temp = game.rnd.between(min, max);

    }while(previousNumber == temp);
    return temp;
}

function SpriteBounce(sprite, scaleXTo, scaleYTo, originalScaleX, originalScaleY, duration)
{
    sprite.scale.setTo(originalScaleX, originalScaleY);
    var spriteTweenScale = game.add.tween(sprite.scale);
    spriteTweenScale.to({ x : scaleXTo, y : scaleYTo}, duration, Phaser.Easing.Bounce.Out, true, 0, 0, true);
}

function SpriteBounceWithOnCompleteCallback(sprite, scaleXTo, scaleYTo, originalScaleX, originalScaleY, duration, callbackFunction)
{
    sprite.scale.setTo(originalScaleX, originalScaleY);
    var spriteTweenScale = game.add.tween(sprite.scale);
    spriteTweenScale.to({ x : scaleXTo, y : scaleYTo}, duration, Phaser.Easing.Bounce.Out, true, 0, 0, true);

    spriteTweenScale.onComplete.add(function(){        
        callbackFunction();
    }, this);
}

function SpriteEasing(sprite, scaleXTo, scaleYTo, originalScaleX, originalScaleY, duration)
{
    sprite.scale.setTo(originalScaleX, originalScaleY);
    var spriteTweenScale = game.add.tween(sprite.scale);
    spriteTweenScale.to({ x : scaleXTo, y : scaleYTo}, duration, Phaser.Easing.Quadratic.In, true, 0, 0, true);
}

function SpriteEasingWithOnCompleteCallback(sprite, scaleXTo, scaleYTo, originalScaleX, originalScaleY, duration, callbackFunction)
{
    sprite.scale.setTo(originalScaleX, originalScaleY);
    var spriteTweenScale = game.add.tween(sprite.scale);
    spriteTweenScale.to({ x : scaleXTo, y : scaleYTo}, duration, Phaser.Easing.Quadratic.In, true, 0, 0, true);

    spriteTweenScale.onComplete.add(function(){        
        callbackFunction();
    }, this);
}

function ConvertToMinutes(totalAmountOfSeconds)
{
    var minutes = 0;
    var seconds = 0;
    
    seconds = totalAmountOfSeconds;
    
    // if we have more seconds to make up a minute
    if(seconds > 60)
    {
        do{
            seconds -= 60;
            minutes++;
            
        }while(seconds >= 60);
    }
    
    if(seconds < 10)
    {
        seconds = '0' + seconds;
    }
    
    if(seconds == 0 || seconds == 60)
    {
        seconds = '00';
    }
    
    return {'minutes' : minutes, 'seconds' : seconds};
}