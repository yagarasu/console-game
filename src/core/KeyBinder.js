class KeyBinder {
  constructor(MessageQueue) {
    this.messageQueue = MessageQueue;
    this.bindings = {};

    document.addEventListener('keydown', this.handleEvent.bind(this));
    document.addEventListener('keyup', this.handleEvent.bind(this));
  }

  addBinding(id, binding) {
    this.bindings[id] = binding;
  }

  removeBinding(id) {
    delete this.bindings[id];
  }

  handleEvent(e) {
    Object.values(this.bindings).forEach(binding => {
      binding
        .filter(({ key, event }) => event === e.type && key === e.key)
        .forEach(({ message }) => {
          this.messageQueue.enqueue(message);
        });
    });
  }
}

export default KeyBinder;
