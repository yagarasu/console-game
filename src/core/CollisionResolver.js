class CollisionResolver {
  constructor(entityManager, mapManager) {
    this.entityManager = entityManager;
    this.mapManager = mapManager;
  }

  update() {
    this.resolveEntityVsMap();
  }

  resolveEntityVsMap() {
    const map = this.mapManager.getMap();
    this.entityManager.filterByAllComponentName(['position'])
      .forEach(entity => {
        const { x, y, px, py } = entity.position;
        const tile = map.getTile(x, y);
        if (!tile || tile.solid) {
          this.entityManager.updateComponent(entity.id, 'position', { x: px, y: py });
        }
      });
  }
}

export default CollisionResolver;
