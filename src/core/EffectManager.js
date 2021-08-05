import effectBinding from 'data/effectBinding';

class EffectManager {
  constructor(messageQueue, world) {
    this.messageQueue = messageQueue;
    this.world = world;
    this.effects = [];

    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      next();
      effectBinding
        .filter(effect => effect.test(message))
        .forEach(effect => this.enqueueEffect(effect.buildEffect(message)));
    };
  }

  enqueueEffect(effect) {
    this.effects.push(effect);
    effect.onEnqueue(this);
  }

  update() {
    const now = performance.now();
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i];
      if (typeof effect.update === 'function') effect.update(now);
      if (effect.removeAt <= now) {
        effect.onRemove(this);
        this.effects.splice(i, 1);
      }
    }
  }
}

export default EffectManager;
