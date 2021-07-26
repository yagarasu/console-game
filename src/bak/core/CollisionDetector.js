import { allItemsBut } from 'core/utils';

class CollisionDetector {
  constructor({ EntityManager, MapManager, EventQueue }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
    this.eventQueue = EventQueue;
  }

  update() {
    this.entityVsMap();
    this.entityVsEntity();
  }

  entityVsMap() {
    this.entityManager.filterByAllComponentName(['position', 'collision'])
    .forEach((entity) => {
      const { x, y } = entity.position;
      const map = this.mapManager.getMap();
      const tile = map.getTile(x, y);
      const isColliding = !tile || tile.solid;
      if (isColliding) {
        this.eventQueue.enqueue({ type: 'MAP_COLLISION', entityId: entity.id, entity, tile, position: { x, y } });
        this.entityManager.updateComponent(entity.id, 'collision', { mapCollision: true });
      }
    });
  }

  entityVsEntity() {
    this.entityManager
      .filterByAllComponentName(['position', 'collision'])
      .forEach((entity, i, arr) => {
        const { x, y } = entity.position;
        const others = allItemsBut(arr, i);
        const colliding = others.filter(other => other.position.y == y && other.position.x == x);
        if (colliding.length > 0) {
          this.eventQueue.enqueue({ type: 'ENTITY_COLLISION', entityId: entity.id, entity, targets: colliding, position: { x, y } });
        }
      });
  }
}

export default CollisionDetector;
