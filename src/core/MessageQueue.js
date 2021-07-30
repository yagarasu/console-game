import { v4 as uuidv4 } from 'uuid'

class MessageQueue {
  constructor() {
    this.messages = [];
    this.consumers = [];
  }

  addConsumer(consumer) {
    this.consumers.push(consumer);
  }

  removeConsumers(consumer) {
    this.consumers = this.consumers.filter((c) => c !== consumer);
  }

  enqueue(message) {
    const uuid = uuidv4();
    this.messages.unshift({ uuid, ...message });
  }

  runConsumerPipeline(message) {
    let lastIdx = -1;
    const run = (idx) => {
      if (idx === lastIdx) throw new Error('Multiple next() calls');
      lastIdx = idx;
      const consumer = this.consumers[idx];
      if (consumer) {
        const next = () => run(idx + 1)
        consumer()(next)(message);
      }
    }
    run(0);
  }

  consume() {
    // Clone messages
    const frameMessages = this.messages.slice();
    this.messages.splice(0, this.messages.length);
    let message = frameMessages.pop();
    while (message !== undefined) {
      this.runConsumerPipeline(message);
      message = frameMessages.pop();
    }
  }
}

export default MessageQueue;
