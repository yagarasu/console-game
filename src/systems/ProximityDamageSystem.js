import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";

class ProximityDamageSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type == 'COLLISION_EVT') {
        const { subject, object } = message.data;
        if(subject.has('ProximityDamageInducer') && object.has('Stats')) {
          const { energyDamage, focusDamage } = subject.getOne('ProximityDamageInducer');
          const stats = object.getOne('Stats');
          stats.update({
            energy: stats.energy - energyDamage,
            focus: stats.focus - focusDamage,
          });
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default ProximityDamageSystem;
