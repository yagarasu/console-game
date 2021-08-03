import Game from 'core/Game';
import NameGenerator from './core/NameGenerator';

for (let index = 0; index < 50; index++) {
  console.log('>', NameGenerator.generateMobName());
}

const game = new Game();
game.run();

// setTimeout(() => {
//   game.scheduler.stop();
//   console.log('!!!STOP!!!')
// }, 5000);

window.game = game;
