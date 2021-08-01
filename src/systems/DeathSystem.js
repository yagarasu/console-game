import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class DeathSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.withStats = this.createQuery().fromAny('Stats', 'MobStats').not('Dead').persist();
  }

  update(tick) {
    const entities = this.withStats.execute();
    for (const entity of entities) {
      let stats = null;
      if (entity.has('Stats')) stats = entity.getOne('Stats');
      if (entity.has('MobStats')) stats = entity.getOne('MobStats');
      if (stats.energy <= 0) {
        console.log('dead', entity);
        entity.addTag('Dead');
        // TODO: Find a better way to switch sprite to corpse
        if (entity.has('StaticSprite')) {
          entity.getOne('StaticSprite').update({ ch: '\u263A' })
        }
        this.messageQueue.enqueue({ type: 'ENTITY_DEAD_EVT', data: { entity } });
      }
    }
  }
}

export default DeathSystem;
