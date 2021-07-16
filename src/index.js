import Game from 'core/Game';

const game = new Game();
game.run();

// setTimeout(() => {
//   game.scheduler.stop();
//   console.log('!!!STOP!!!')
// }, 5000);

window.game = game;
