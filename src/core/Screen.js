import { Display } from 'rot-js';

class Screen {
  constructor() {
    this.display = new Display({
      fontSize: 24,
    });
  }

  initialize() {
    document.body.appendChild(this.display.getContainer());
  }

  getDisplay() {
    return this.display;
  }
}

export default Screen;
