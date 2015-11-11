var game = new Phaser.Game((825 - 115), (539 - 141), Phaser.WEBGL, 'game');

var submitButton;
var answer;
var answer2;
var background;
var revealButtons;

var red =0;
var green =0;
var blue=0;

var Object;

var gameState = 
{
    preload: function()
    {
       
        game.load.image('background','assets/background.png');
        //preload the colors
        game.load.image('blank','assets/Drive_SURPRISE-DRIVE_CD.png');
        
        game.load.image('Image1','assets/grayToColour/dota2_char1_2.jpg');
        game.load.image('Image2','assets/grayToColour/dota2_char2_2.jpg');
        game.load.image('Image3','assets/grayToColour/dota2_char3_2.jpg');
        game.load.image('Image4','assets/grayToColour/dota2_char4_2.jpg');

        game.load.image('submitNormal','assets/Buttons/Submit-Normal.png');
        
        game.load.image('reveal','assets/grayToColour/REVEAL.png');
        
        game.load.image('revert','assets/grayToColour/revert.png');
        
        game.load.image("grayscale","assets/gray-scale-rect_zpsidjqwcow.png");
        
        game.load.script('gray', 'gray.js');
    },
    create: function ()
    {   
        
        var graphics = game.add.graphics(100, 100);
        graphics.beginFill(0xadd0c8);
        graphics.lineStyle(2, 0xadd0c8, 1);
        graphics.drawRect(-85, -80, 811 - 128, 475 - 159.77);
        
        graphics.endFill();
        window.graphics = graphics;
        
        var graphics2 = game.add.graphics(100, 100);
        graphics2.beginFill(0xFFFFFF);
        graphics2.lineStyle(2, 0xadd0c8, 1);
        //1st box
        graphics2.drawRect(-70, -70, 347 - 138, 388 - 180);
        //2nd box
        graphics2.drawRect(155, -70, 347 - 138, 388 - 180);
        //3rd box
        graphics2.drawRect(380, -70, 347 - 138, 388 - 180);
        graphics2.endFill();
        window.graphics = graphics2;
        
        var textstyle = {
          font: '30px Source Sans Pro',
          fill: '#000000'
        };
        
        this.game.stage.backgroundColor = '#d5e5e2';
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        
        //submit button
        submitButton = game.add.group();
        sprite = submitButton.create(300, 350 , 'submitNormal', 1);
        sprite.inputEnabled = true;

        //picture 1
        //picture that is being displayed
        var picture = game.add.sprite(35, 35, 'Image1');
        picture.scale.setTo(0.15, 0.15);

        answer = new FadeToColourObject(game,0,0, 1, picture,'blank');
        answer.anchor.setTo(0.5, 0.5);
        answer.scale.setTo(0, 0);
        answer.position.x = 0;
        answer.position.y = 0;
        //reveal button
        revealButtons = game.add.group();
        sprite = revealButtons.create(90,275,'revert',1);
        sprite.scale.setTo(0.3, 0.3);
        sprite.inputEnabled=true;
        sprite.events.onInputDown.add(FadeToColour, {sprite2: answer, sprite3:sprite});
        
        
        
        game.add.existing(answer);
        
        
        //end of picture 1
        
        //picture 2
        //picture that is being displayed
        var picture = game.add.sprite(260, 35, 'Image4');
        picture.scale.setTo(0.15, 0.15);
        //pass in image4 to picture
        answer = new FadeToColourObject(game,0,0, 1, picture,'blank');
        answer.anchor.setTo(0.5, 0.5);
        answer.scale.setTo(0, 0);
        answer.position.x = 0;
        answer.position.y = 0;
        //reveal button
        revealButtons = game.add.group();
        sprite = revealButtons.create(315,275,'revert',1);
        sprite.scale.setTo(0.3, 0.3);
        sprite.inputEnabled=true;
        sprite.events.onInputDown.add(FadeToColour, {sprite2: answer, sprite3:sprite});
        
        
        
        game.add.existing(answer);
        
        
        //end of picture 2
        
        //picture 3
        //picture that is being displayed
        var picture = game.add.sprite(485, 35, 'Image3');
        picture.scale.setTo(0.15, 0.15);

        answer = new FadeToColourObject(game,0,0, 1, picture,'blank');
        answer.anchor.setTo(0.5, 0.5);
        answer.scale.setTo(0, 0);
        answer.position.x = 0;
        answer.position.y = 0;
        //reveal button
        revealButtons = game.add.group();
        sprite = revealButtons.create(540,275,'revert',1);
        sprite.scale.setTo(0.3, 0.3);
        sprite.inputEnabled=true;
        sprite.events.onInputDown.add(FadeToColour, {sprite2: answer, sprite3:sprite});
        
        game.add.existing(answer);
        
        
        //end of picture 2
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
       
    },
    
    update: function()
    {  
       
        
    }
    
    
};

game.state.add('GameState', gameState);
game.state.start('GameState');

function FadeToColour()
{
    this.sprite2.grayToColour =!this.sprite2.grayToColour;
    this.sprite2.changeColour=true;
    
    if(!this.sprite2.grayToColour)
    {
        this.sprite3.loadTexture('revert', 0);
    }
    else
    {
        this.sprite3.loadTexture('reveal', 0);
    }
}

FadeToColourObject = function (game,x,y, value, picture, imagesource)
{
    Phaser.Sprite.call(this, game, x, y, imagesource);
    this.changeColour = true;
    this.grayToColour  = false;
    this.gray = game.add.filter('Gray');
    this.gray.gray=this.GrayValue=value;
    picture.filters = [this.gray];
    

};

FadeToColourObject.prototype = Object.create(Phaser.Sprite.prototype);
FadeToColourObject.prototype.constructor = FadeToColourObject;

FadeToColourObject.prototype.update = function() {
    
    if(this.changeColour)
    {
     if(this.grayToColour)
        {
            if(this.GrayValue<1)
            {
            this.gray.gray=this.GrayValue +=0.1;
            }
            else{
              this.gray.gray=this.GrayValue=1;
                this.changeColour=false;
            }
        }
        else if(!this.grayToColour)
        {
            
            if( this.GrayValue>0)
            {
              this.gray.gray=this.GrayValue-=0.1;
            }
           else{
              this.gray.gray=this.GrayValue=0;
                this.changeColour=false;
            }
        }
    }
};


