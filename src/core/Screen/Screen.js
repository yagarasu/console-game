import { Display } from 'rot-js';
import config from 'data/config';
import AnimatedSpriteRenderer from './renderers/AnimatedSpriteRenderer';
import StaticSpriteRenderer from './renderers/StaticSpriteRenderer';
import TileMapRenderer from './renderers/TileMapRenderer';

class Screen {
  constructor() {
    this.display = new Display({
      fontSize: config.screen.fontSize,
    });

    this.managers = {
      mapManager: null,
      entityManager: null,
    };

    this.tasks = [];
  }
  
  initialize(entityManager, mapManager) {
    document.body.appendChild(this.display.getContainer());
    this.managers.entityManager = entityManager;
    this.managers.mapManager = mapManager;

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
      task.render(this.managers, this.display, delta, progress);
    });
  }
}

export default Screen;
