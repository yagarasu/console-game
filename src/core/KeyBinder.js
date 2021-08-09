const MAX_STACK = 10;

class KeyBinder {
  constructor(MessageQueue) {
    this.messageQueue = MessageQueue;
    this.bindings = {};
    this.sequences = [];
    this.stack = [];
    this.stackCleanupTimer = null;

    document.addEventListener('keydown', this.handleEvent.bind(this));
    document.addEventListener('keyup', this.handleEvent.bind(this));
  }

  addBinding(id, binding) {
    this.bindings[id] = binding;
  }

  removeBinding(id) {
    delete this.bindings[id];
  }

  pushKey(newKey) {
    this.stack.push(newKey);
    if (this.stack.length > MAX_STACK) {
      this.stack.shift();
    }
  }
  
  evalSequences() {
    const hash = this.getStackHash();
    const matching = this.sequences
      .filter(({ sequence }) => hash.includes(sequence.join(',')));
    matching.forEach(({ message }) => this.messageQueue.enqueue(message));
    if (matching.length) {
      this.stack = [];
    }
    this.restartCleanupTimer();
  }

  getStackHash() {
    return this.stack.join(',');
  }

  restartCleanupTimer() {
    clearTimeout(this.stackCleanupTimer);
    this.stackCleanupTimer = setTimeout(() => this.stack = [], 250);
  }

  handleEvent(e) {
    if (e.type === 'keydown') {
      this.pushKey(e.key);
      this.evalSequences();
    }
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
