class Keyboard {
  constructor() {
    this.keys = [];
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    if (!this.keys.includes(e.key)) {
      this.keys.push(e.key);
    }
  }

  onKeyUp(e) {
    this.keys = this.keys.filter(k => k !== e.key);
  }

  isKeyPressed(key) {
    return this.keys.includes(key);
  }
}

export default Keyboard;
