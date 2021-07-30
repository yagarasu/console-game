import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";

class DamageSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type == 'COLLISION_EVENT') {
        const { subject, object } = message.data;
        if(subject.has('DamageTaker' && object.has('DamageInducer'))) {
          console.log('take damage', subject, object)
          // Take damage
          const { damage } = object.getOne('DamageInducer');
          const stats = subject.getOne('Stats');
          stats.update({
            energy: stats.energy - damage,
          });
        }
        if(subject.has('DamageInducer' && object.has('DamageTaker'))) {
          // Inflict damage
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default DamageSystem;
