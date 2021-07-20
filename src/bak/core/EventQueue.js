class EventQueue {
  constructor() {
    this.events = [];
    this.consumers = [];
  }

  addConsumer(consumer) {
    this.consumers.push(consumer);
  }

  removeConsumers(consumer) {
    this.consumers = this.consumers.filter((c) => c !== consumer);
  }

  enqueue(event) {
    this.events.unshift(event);
  }

  runConsumerPipeline(context, event) {
    let lastIdx = -1;
    const run = (idx) => {
      if (idx === lastIdx) throw new Error('Multiple next() calls');
      lastIdx = idx;
      const consumer = this.consumers[idx];
      if (consumer) {
        const next = () => run(idx + 1)
        consumer(context)(next)(event);
      }
    }
    run(0);
  }

  consume(context) {
    // Clone events
    const frameEvents = this.events.slice();
    this.events.splice(0, this.events.length);
    let event = frameEvents.pop();
    while (event !== undefined) {
      this.runConsumerPipeline(context, event);
      event = frameEvents.pop();
    }
  }
}

export default EventQueue;
