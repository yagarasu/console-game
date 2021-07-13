import { Display } from 'rot-js';
import config from 'data/config';

class Screen {
  constructor() {
    this.display = new Display({
      fontSize: config.screen.fontSize,
    });

    this.children = [];
  }

  initialize() {
    document.body.appendChild(this.display.getContainer());
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children.filter((ch) => ch !== child);
  }

  render(delta, progress) {
    this.children.forEach((child) => {
      child.render(this.display, delta, progress);
    });
  }
}

export default Screen;
