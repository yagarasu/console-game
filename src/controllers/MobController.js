import { RNG } from 'rot-js';

class MobController {
  constructor(entityManager, mapManager) {
    this.entityManager = entityManager;
    this.mapManager = mapManager;
  }

  update() {
    this.entityManager.findByTag('aiControlled')
      .forEach((entity) => {
        const { position } = entity;
        const dirs = [
          { x: position.x + 1, prevX: position.x },
          { y: position.y + 1, prevY: position.y },
          { y: position.y - 1, prevY: position.y },
          { x: position.x - 1, prevX: position.x },
        ];
        const shouldMove = RNG.getPercentage();
        if (shouldMove < 90) return;
        const dir = RNG.getItem(dirs);
        this.entityManager.updateComponent(entity.id, 'position', dir);
      });
  }
}

export default MobController;
