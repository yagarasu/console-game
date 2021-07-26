class MobAiSystem {
  constructor({ EntityManager, AiManager }) {
    this.entityManager = EntityManager
    this.aiManager = AiManager
  }

  update() {
    this.entityManager.filterByAllComponentName(['ai'])
    .forEach((entity) => {
      const { algorithm: algorithmName, state } = entity.ai;
      const algorithm = this.aiManager.getAlgorithm(algorithmName);
      const newState = algorithm(state, entity);
      this.entityManager.updateComponent(entity.id, 'ai', { state: newState });
    });
  }
}

export default MobAiSystem;
