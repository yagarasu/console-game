import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";
import spells from 'data/spells';

class CastingSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue, effectManager, soundManager) {
    this.effectManager = effectManager;
    this.soundManager = soundManager;
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type === 'PRIMARY_ACTION_CMD') {
        const player = this.world.getEntity('player');
        const { primary } = player.getOne('Equipment');
        const spell = spells.find(({ id }) => primary);
        if (spell) {
          const { onCast } = spell;
          onCast(spell, player, this.world, this.effectManager, this.soundManager);
        }
      }
      if (message.type === 'CAST_SPELL_CMD') {
        const player = this.world.getEntity('player');
        const { data } = message;
        const spell = spells.find(({ id }) => id == data.spellId);
        if (spell) {
          const { onCast } = spell;
          onCast(spell, player, this.world, this.effectManager, this.soundManager);
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default CastingSystem;
