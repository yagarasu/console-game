import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import consciousnessFragment from "entityTemplates/consciousnessFragment";

class DeathSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.mobs = this.createQuery().fromAny('MobStats').not('Dead').persist();
    this.players = this.createQuery().fromAny('Stats').not('Dead').persist();
  }

  update(tick) {
    this.updateMobs(tick);
    this.updatePlayers(tick);
  }

  updateMobs(tick) {
    const entities = this.mobs.execute();
    for (const entity of entities) {
      const stats = entity.getOne('MobStats');
      if (stats.energy <= 0) {
        entity.addTag('Dead');
        // TODO: Find a better way to switch sprite to corpse
        if (entity.has('StaticSprite')) {
          entity.getOne('StaticSprite').update({ ch: '\u263A' })
        }
        this.messageQueue.enqueue({ type: 'ENTITY_DEAD_EVT', data: { entity } });
      }
    }
  }

  updatePlayers(tick) {
    const entities = this.players.execute();
    for (const entity of entities) {
      const stats = entity.getOne('Stats');
      if (stats.energy <= 0) {
        this.messageQueue.enqueue({ type: 'ENTITY_DEAD_EVT', data: { entity } });
        const position = entity.getOne('Position');
        this.world.createEntity(consciousnessFragment(undefined, position.x, position.y));
        const startingPosition = entity.getOne('StartingPosition');
        position.update({
          x: startingPosition.x,
          y: startingPosition.y,
        });
        stats.update({
          energy: 50,
          focus: 50,
        })
      }
    }
  }
}

export default DeathSystem;
