import { Display } from 'rot-js';
import Scheduler from './Scheduler';
import Keyboard from './Keyboard';
import TileMap from './TileMap';
import TileMapViewport from './TileMapViewport';
import Player from 'entities/Player';
import DungeonGenerator from 'core/DungeonGenerator';

const FPS = 30;

const player = '\u263B';
// const rune = '\u16AB';

class Game {
  constructor() {
    this.player = new Player(10, 10);
    this.scheduler = new Scheduler({ fps: FPS });
    this.scheduler.addJob(this.render.bind(this));
    this.scheduler.addJob(this.update.bind(this));

    this.keyboard = new Keyboard();

    this.map = new TileMap();
    DungeonGenerator.digger(this.map);
    this.viewport = new TileMapViewport(this.map);

    this.display = new Display({
      fontSize: 24
    });
    document.body.appendChild(this.display.getContainer());
  }

  start() {
    this.scheduler.start();
  }

  update(delta, lag) {
    this.moveViewport();
    this.movePlayer();
    this.player.move(delta, lag);
  }

  movePlayer() {
    if (this.keyboard.isKeyPressed('ArrowUp')) {
      this.player.vy = -this.player.maxVelocity;
    } else if (this.keyboard.isKeyPressed('ArrowDown')) {
      this.player.vy = this.player.maxVelocity;
    } else {
      this.player.vy = 0;
    }
    if (this.keyboard.isKeyPressed('ArrowLeft')) {
      this.player.vx = -this.player.maxVelocity;
    } else if (this.keyboard.isKeyPressed('ArrowRight')) {
      this.player.vx = this.player.maxVelocity;
    } else {
      this.player.vx = 0;
    }
  }

  moveViewport() {
    if (this.keyboard.isKeyPressed('w')) {
      this.viewport.y--;
    } else if (this.keyboard.isKeyPressed('s')) {
      this.viewport.y++;
    }
    if (this.keyboard.isKeyPressed('a')) {
      this.viewport.x--;
    } else if (this.keyboard.isKeyPressed('d')) {
      this.viewport.x++;
    }
  }

  render(delta, lag) {
    this.display.clear();
    this.drawTileMap();
    this.drawPlayer();
    this.display.drawText(0,24,`(${this.player.x}, ${this.player.y}) -> ${this.player.vx}, ${this.player.vy} || delta ${delta.toFixed(3)} || lag ${lag.toFixed(3)}`);
  }

  drawPlayer() {
    if (this.viewport.globalIsVisible(this.player.x, this.player.y)) {
      const [lx, ly] = this.viewport.transformGlobalToLocal(this.player.x, this.player.y);
      const tile = this.viewport.getTile(lx, ly);
      const bg = tile ? tile.bg : null;
      this.display.draw(lx, ly, this.player.char, this.player.color, bg);
    }
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
