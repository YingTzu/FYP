//Kinnear Justin Wong
//Nanyang Polytechnic

var fadeScreenSpeed = 500;

ScreenFade = function(spriteName)
{
    var overlay = game.add.sprite(0, 0, spriteName);
    
    // we expand our one pixel black pixel to stretch across the whole screen canvas
    overlay.scale.setTo(game.world.width, game.world.height);
    
    // sets the amount of stars to animate
    ScreenFade.prototype.FadeIn = function(duration)
    {
        var spriteTween = game.add.tween(overlay).to({alpha: 0}, duration, Phaser.Easing.Linear.None).start();
        overlay.visible = true;
    }
    
    // sets the amount of stars to animate
    ScreenFade.prototype.FadeInWithCallback = function(duration, functionCallback)
    {
        var spriteTween = game.add.tween(overlay).to({alpha: 0}, duration, Phaser.Easing.Linear.None).start();
        overlay.visible = true;

        // When the drop has finished the tween we recycle it
        spriteTween.onComplete.add(function (){
            
            functionCallback();
            
        }, this);
    }
    
    // sets the amount of stars to animate
    ScreenFade.prototype.FadeOutWithCallback = function(duration, functionCallback)
    {
        var spriteTween = game.add.tween(overlay).to({alpha: 1}, duration, Phaser.Easing.Linear.None).start();
        overlay.inputEnabled = true;
        overlay.visible = true;

        // When the drop has finished the tween we recycle it
        spriteTween.onComplete.add(function (){
            
            overlay.visible = true;
            functionCallback();
            
        }, this);
    }
};