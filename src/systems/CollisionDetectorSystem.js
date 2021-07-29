import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import * as algorithms from './aiAlgorithms';

class CollisionDetectorSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.entities = this.createQuery().fromAll('Collidable', 'Position').persist();
  }

  update(tick) {
    const entities = this.entities.execute();
    for (const entity of entities) {
      const collidable = entity.getOne('Collidable');
      const prevFrameColliding = collidable.collidesWith;
      const { x: ox, y: oy } = entity.getOne('Position');
      const colliding = Array.from(entities).filter(e => {
        if (e.id === entity.id) return false;
        const { x, y } = e.getOne('Position');
        const collides = x == ox && y == oy;
        if (collides && !prevFrameColliding.includes(e)) {
          this.messageQueue.enqueue({ type: 'COLLISION_EVT', data: { subject: entity, object: e } });
        }
        return collides;
      });
      if (colliding.length > 0) {
        collidable.update({
          collidesWith: colliding
        });
      } else {
        collidable.update({
          collidesWith: []
        });
      }
    }
  }
}

export default CollisionDetectorSystem;
