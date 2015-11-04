function FadeManager(game)
{
    this.game = game;
    this.BlackScreen = null;
    this.OnStart;
    this.OnEnd;
    this.screenAlpha;
    this.fadeSpeed;
    this.CanStart = false;
}

FadeManager.prototype.create = function()
{
    this.BlackScreen = this.game.add.sprite(0,0,'FadeInOut');
    this.BlackScreen.scale.set(this.game.world.width,this.game.world.height);
    this.OnStart = true;
    this.OnEnd = false;
    this.screenAlpha = 1;
    this.fadeSpeed = 0.02;
},
FadeManager.prototype.update = function(statename)
{
    //fade in fade out
    this.BlackScreen.alpha = this.screenAlpha;
	this.fadeIn();
	this.fadeOut(statename);
},
FadeManager.prototype.fadeIn = function()
{
	//every start of a new state
	if(this.OnStart && !this.OnEnd)
	{
		this.screenAlpha -=this.fadeSpeed;
		if(this.screenAlpha <=0)
		{
			this.screenAlpha=0;
			this.CanStart = false;
			this.OnStart = false;
		}
	}
},
FadeManager.prototype.fadeOut = function(FadeToStateNum)
{
	if(this.OnEnd)
	{
	    this.screenAlpha +=this.fadeSpeed;
	    if(this.screenAlpha >1)
		{
		    this.OnEnd = false;
		    this.CanStart = true;

		    switch(FadeToStateNum)
			{
			    case 0:
			    {
			    	this.OnStart = true;
			        this.game.state.start('MainMenu');
			    }break;
			    case 1:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Tutorial');
			    }break;
			    case 2:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Game');
			    }break;
                case 3:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Game2');
			    }break;
                case 4:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Game3');
			    }break;
                case 5:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Game4');
			    }break;
                case 6:
			    {
			    	this.OnStart = true;
			        this.game.state.start('Game5');
			    }break;
			}
		}
	}
};
