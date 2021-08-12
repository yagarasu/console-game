import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class LifespanSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.entities = this.createQuery().fromAll('Lifespan').persist();
  }

  update(tick) {
    const entities = this.entities.execute();
    for (const entity of entities) {
      const lifespan = entity.getOne('Lifespan');
      lifespan.life++;
      if (lifespan.life > lifespan.ttl) {
        entity.destroy();
      } else {
        lifespan.update();
      }
    }
  }
}

export default LifespanSystem;
