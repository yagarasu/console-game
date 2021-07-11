import { Display } from 'rot-js';
import Scheduler from './Scheduler';
import Keyboard from './Keyboard';
import TileMap from './TileMap';
import TileMapViewport from './TileMapViewport';
import Player from 'entities/Player';

const player = '\u263B';
// const rune = '\u16AB';

class Game {
  constructor() {
    this.player = new Player(10, 10);
    this.scheduler = new Scheduler();
    this.scheduler.addJob(this.render.bind(this));
    this.scheduler.addJob(this.update.bind(this));

    this.keyboard = new Keyboard();

    this.map = new TileMap();
    this.map.setTile(5,5,1);
    this.viewport = new TileMapViewport(this.map);

    this.display = new Display({
      fontSize: 24
    });
    document.body.appendChild(this.display.getContainer());
  }

  start() {
    this.scheduler.start();
  }

  update(delta) {
    this.movePlayer();
    this.player.move(delta);
  }

  movePlayer() {
    if (this.keyboard.isKeyPressed('ArrowUp')) {
      this.player.accelerate(0, -0.1);
    } else if (this.keyboard.isKeyPressed('ArrowDown')) {
      this.player.accelerate(0, 0.1);
    } else {
      this.player.vy = 0;
    }
    if (this.keyboard.isKeyPressed('ArrowLeft')) {
      this.player.accelerate(-0.1, 0);
    } else if (this.keyboard.isKeyPressed('ArrowRight')) {
      this.player.accelerate(0.1, 0);
    } else {
      this.player.vx = 0;
    }
  }

  render(delta) {
    this.display.clear();
    this.drawTileMap();
    this.drawPlayer();
    this.display.drawText(0,24,`(${this.player.x}, ${this.player.y}) -> ${this.player.vx}, ${this.player.vy} || delta ${Math.round((1000/60) / delta)}`);
  }

  drawPlayer() {
    this.display.draw(this.player.x, this.player.y, player);
  }

  drawTileMap() {
    this.viewport.forEach((lx, ly, gx, gy, tile) => {
      if (!tile) return;
      const { fg, bg, char } = tile;
      this.display.draw(lx, ly, char, fg, bg);
    });
  }
}

export default Game;
