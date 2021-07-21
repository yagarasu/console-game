import { Display } from 'rot-js';
import Camera from './Camera';

class Screen {
  constructor({
    config,
    AnimatedSpriteRenderer,
    StaticSpriteRenderer,
    TileMapRenderer,
  }) {
    this.display = new Display({
      fontSize: config.screen.fontSize,
    });

    this.renderers = {
      AnimatedSpriteRenderer,
      StaticSpriteRenderer,
      TileMapRenderer,
    };

    this.camera = null;

    this.tasks = [];
  }

  initialize() {
    document.body.appendChild(this.display.getContainer());

    const { width, height } = this.display.getOptions();
    this.camera = new Camera(this, { width, height });

    this.addTask(this.renderers.TileMapRenderer);
    this.addTask(this.renderers.AnimatedSpriteRenderer);
    this.addTask(this.renderers.StaticSpriteRenderer);
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
        camera: this.camera,
        display: this.display,
      }, delta, progress);
    });
  }
}

export default Screen;
