class CollisionResolver {
  constructor(entityManager, mapManager) {
    this.entityManager = entityManager;
    this.mapManager = mapManager;
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
}

export default CollisionResolver;
