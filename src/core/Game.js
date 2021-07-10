import { Display } from 'rot-js';
import Keyboard from './Keyboard';
import TileMap from './TileMap';

// const player = '\u263B';
// const rune = '\u16AB';

class Game {
  constructor() {
    this.keyboard = new Keyboard();
    this.map = new TileMap();
    this.display = new Display({
      fontSize: 24
    });
    document.body.appendChild(this.display.getContainer());
  }

  start() {
    // this.display.draw(10, 10, player);
    // this.display.draw(20, 20, rune);
    // setInterval(() => {
    //   console.log(this.keyboard.keys);
    // }, 1000);
  }
}

export default Game;
