class KeyBinder {
  constructor(keymap = {}) {
    this.bindings = Object.keys(keymap)
      .reduce((acc, key) => ({ ...acc, [key]: () => keymap[key] }), {});
  }

  addBinding(key, intentCreator) {
    this.bindings[key] = intentCreator;
  }

  createIntent(key) {
    return { ...this.bindings[key](), target: 'player' };
  }

  subscribeToBindings(keyboard, inputQueue) {
    Object.keys(this.bindings).forEach((key) => {
      keyboard.subscribeTo(key, () => {
        inputQueue.enqueue(this.createIntent(key));
      });
    });
  }
}

export default KeyBinder;
