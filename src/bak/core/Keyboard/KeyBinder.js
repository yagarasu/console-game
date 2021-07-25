class KeyBinder {
  constructor({ config, Keyboard, EventQueue }) {
    this.keyboard = Keyboard;
    this.eventQueue = EventQueue;
    this.bindings = Object.keys(config.keymap)
      .reduce((acc, key) => ({ ...acc, [key]: () => config.keymap[key] }), {});
  }

  initialize() {
    this.subscribeToBindings();
  }

  addBinding(key, intentCreator) {
    this.bindings[key] = intentCreator;
  }

  createEvent(key) {
    return { ...this.bindings[key](), entityId: 'player' };
  }

  subscribeToBindings() {
    Object.keys(this.bindings).forEach((key) => {
      this.keyboard.subscribeTo(key, () => {
        this.eventQueue.enqueue(this.createEvent(key));
      });
    });
  }
}

export default KeyBinder;
