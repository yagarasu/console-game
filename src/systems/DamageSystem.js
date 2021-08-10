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
      if (message.type === 'DAMAGE_CMD') {
        const { entity, agent, damage } = message.data;
        const stats = entity.has('Stats') ? entity.getOne('Stats') : entity.getOne('MobStats');
        stats.update({ energy: stats.energy - damage });
        // @TODO: Should we move death to this place instead of devoting a system only for this?
      }
      next();
    };
  }

  update(tick) {
  }
}

export default DamageSystem;
