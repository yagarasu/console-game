class Keyboard {
  constructor() {
    this.keys = [];
    this.subscribers = [];
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  subscribeTo(key, callback) {
    this.subscribers.push({
      key,
      callback
    });
  }

  onKeyDown(e) {
    if (!this.keys.includes(e.key)) {
      this.keys.push(e.key);
    }
    const subs = this.subscribers.filter(({ key }) => key === e.key);
    if (subs.length > 0) {
      subs.forEach(({ callback }) => callback());
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
