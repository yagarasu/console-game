import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";
import spells from 'data/spells';

class CastingSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue, effectManager) {
    this.effectManager = effectManager;
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type === 'PRIMARY_ACTION_CMD') {
        const player = this.world.getEntity('player');
        const { primary } = player.getOne('Equipment');
        const spell = spells.find(({ id }) => primary);
        if (!spell) return next();
        const { onCast } = spell;
        onCast(spell, player, this.world, this.effectManager);
      }
      next();
    };
  }

  update(tick) {
  }
}

export default CastingSystem;
