class EntityManager {
  constructor() {
    this.entities = {};
  }

  getEntity(id) {
    return this.entities[id];
  }

  createEntity(id, components = {}) {
    if (id in this.entities) throw new Error(`Entity id ${id} already exists.`);
    this.entities[id] = {
      id,
      ...components
    };
    return this.entities[id];
  }

  addComponents(id, components) {
    if (!this.entities) throw new Error(`Entity id ${id} does not exist.`);
    this.entities[id] = {
      ...this.entities[id],
      ...components
    };
    return this.entities[id];
  }

  entityHasComponent(id, componentName) {
    if (!this.entities) throw new Error(`Entity id ${id} does not exist.`);
    return (componentName in this.entities[id]);
  }

  filterByAnyComponentName(componentNames) {
    return Object.values(this.entities).filter((entity) => componentNames.some((componentName) => (componentName in entity)));
  }

  filterByAllComponentName(componentNames) {
    return Object.values(this.entities).filter((entity) => componentNames.every((componentName) => (componentName in entity)));
  }
}

export default EntityManager;
