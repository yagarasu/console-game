import { allItemsBut } from 'core/utils';

class CollisionResolver {
  constructor(entityManager, mapManager, eventQueue) {
    this.entityManager = entityManager;
    this.mapManager = mapManager;
    this.eventQueue = eventQueue;
  }

  update() {
    this.resolveEntityVsTiles();
    this.resolveEntityVsEntity();
  }

  resolveEntityVsTiles() {
    this.entityManager.filterByAllComponentName(['position'])
      .forEach((entity) => {
        const { position: { x, y, prevX, prevY } } = entity;
        const tile = this.mapManager.getMap().getTile(x, y);
        const isSolid = !tile || tile.solid;
        if (!isSolid) return;
        this.entityManager.updateComponent(entity.id, 'position', { x: prevX, y: prevY });
      });
  }

  resolveEntityVsEntity() {
    this.entityManager.filterByAllComponentName(['position', 'collision'])
      .forEach((entity, i, arr) => {
        const { position: { x, y } } = entity;
        const collidables = allItemsBut(arr, i);
        const colliding = collidables.filter((collidable) => {
          const { position: { x: colX, y: colY } } = collidable;
          return x === colX && y === colY;
        });
        if (colliding.length > 0) {
          this.entityManager.updateComponent(entity.id, 'collision', { collidesWith: colliding });
          this.eventQueue.enqueue({ type: 'collision', target: entity, colliding });
        }
      });
  }
}

export default CollisionResolver;
