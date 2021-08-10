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
        if(subject.has('ProximityDamageInducer') && !subject.has('Dead') && object.has('Stats')) {
          const { damage } = subject.getOne('ProximityDamageInducer');
          this.messageQueue.enqueue({ type: 'DAMAGE_CMD', data: { entity: object, agent: subject, damage } });
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default ProximityDamageSystem;
