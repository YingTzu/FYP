//Kinnear Justin Wong
//Nanyang Polytechnic

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser');

game.state.add('GameOver', GameOver, true);
game.state.add('MainMenu', MainMenu, true);
game.state.add('Game', GameScene, true);
game.state.add('InstructionsScreen', InstructionsScreen, true);
game.state.add('QuitGame', QuitGame, true);
game.state.add('Loader', BootLoader, true);