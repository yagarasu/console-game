class CollisionDetector {
  constructor({ EntityManager, MapManager, EventQueue }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
    this.eventQueue = EventQueue;
  }

  update() {
    this.entityVsMap();
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
}

export default CollisionDetector;
