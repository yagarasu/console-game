import { Display } from 'rot-js';
import config from 'data/config';
import Camera from './Camera';
import AnimatedSpriteRenderer from './renderers/AnimatedSpriteRenderer';
import StaticSpriteRenderer from './renderers/StaticSpriteRenderer';
import TileMapRenderer from './renderers/TileMapRenderer';

class Screen {
  constructor(entityManager, mapManager) {
    this.display = new Display({
      fontSize: config.screen.fontSize,
    });

    this.managers = {
      entityManager,
      mapManager,
    };

    this.camera = null;

    this.tasks = [];
  }
  
  initialize() {
    document.body.appendChild(this.display.getContainer());
    
    const { width, height } = this.display.getOptions();
    this.camera = new Camera(this, { width, height });

    this.addTask(TileMapRenderer);
    this.addTask(AnimatedSpriteRenderer);
    this.addTask(StaticSpriteRenderer);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  render(delta, progress) {
    this.display.clear();
    this.tasks.forEach((task) => {
      task.render({
        ...this.managers,
        camera: this.camera,
        display: this.display,
      }, delta, progress);
    });
  }
}

export default Screen;
