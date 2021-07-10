import { Display } from 'rot-js';
import Keyboard from './Keyboard';
import TileMap from './TileMap';
import TileMapViewport from './TileMapViewport';

// const player = '\u263B';
// const rune = '\u16AB';

class Game {
  constructor() {
    this.keyboard = new Keyboard();
    this.map = new TileMap();
    this.map.setTile(5,5,1);
    this.viewport = new TileMapViewport(this.map);
    this.display = new Display({
      fontSize: 24
    });
    document.body.appendChild(this.display.getContainer());
  }

  drawTileMap() {
    this.viewport.forEach((lx, ly, gx, gy, tile) => {
      if (!tile) return;
      const { fg, bg, char } = tile;
      this.display.draw(lx, ly, char, fg, bg);
    });
  }

  start() {
    this.drawTileMap();
    // this.display.draw(10, 10, player);
    // this.display.draw(20, 20, rune);
    // setInterval(() => {
    //   console.log(this.keyboard.keys);
    // }, 1000);
  }
}

export default Game;
