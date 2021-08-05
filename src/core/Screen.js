import { Display } from 'rot-js';

class Screen {
  constructor() {
    this.display = new Display({
      fontSize: 24,
    });
    const { width: optWidth, height: optHeight } = this.display.getOptions();
    const canvas = this.display.getContainer();
    const { width: canvWidth, height: canvHeight } = canvas;
    this.tileSize = [canvWidth / optWidth, canvHeight / optHeight];
  }

  initialize() {
    document.body.appendChild(this.display.getContainer());
  }

  getDisplay() {
    return this.display;
  }

  getTileSize() {
    return this.tileSize;
  }

  getTileCenter(tx, ty) {
    const [tw, th] = this.getTileSize();
    return [
      (tx * tw) + (tw / 2),
      (ty * th) + (th / 2)
    ];
  }
}

export default Screen;
