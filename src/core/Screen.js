import { Display } from 'rot-js';
import Camera from './Camera';

class Screen {
  constructor() {
    this.display = new Display({
      fontSize: config.screen.fontSize,
      forceSquareRatio: true,
    });

    this.tasks = [];
  }

  initialize() {
    document.body.appendChild(this.display.getContainer());

    const { width, height } = this.display.getOptions();
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  render(delta, ts) {
    this.display.clear();
    this.tasks.forEach((task) => {
      task.render({
        display: this.display,
      }, delta, ts);
    });
  }
}

export default Screen;
