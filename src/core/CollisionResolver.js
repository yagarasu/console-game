class CollisionResolver {
  constructor({ EntityManager }) {
    this.entityManager = EntityManager;
  }

  update() {
    this.entityManager.filterByAllComponentName(['position', 'collision'])
    .forEach((entity) => {
      if (entity.collision.mapCollision) {
        const { prevX, prevY } = entity.position;
        this.entityManager.updateComponent(entity.id, 'position', { x: prevX, y: prevY });
        this.entityManager.updateComponent(entity.id, 'collision', { mapCollision: false });
      } else {
        const { x, y } = entity.position;
        this.entityManager.updateComponent(entity.id, 'position', { prevX: x, prevY: y });
      }
    });
  }
}

export default CollisionResolver;
