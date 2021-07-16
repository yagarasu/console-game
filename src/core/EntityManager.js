class EntityManager {
  constructor() {
    this.entities = {};
    this.tags = {};
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
    if (!this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    this.entities[id] = {
      ...this.entities[id],
      ...components
    };
    return this.entities[id];
  }

  updateComponent(id, componentName, data) {
    if (!this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    this.entities[id] = {
      ...this.entities[id],
      [componentName]: {
        ...this.entities[id][componentName],
        ...data
      }
    };
    return this.entities[id];
  }

  entityHasComponent(id, componentName) {
    if (!this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    return (componentName in this.entities[id]);
  }

  addTags(id, tags) {
    if (!this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    tags.forEach((tag) => {
      if (!this.tags[tag]) {
        this.tags[tag] = [id];
      } else {
        this.tags[tag].push(id);
      }
    });
  }

  entityIsTaggedWith(id, tag) {
    if (!this.tags[id]) throw new Error(`Entity id ${id} does not exist.`);
    return this.tags[id].includes(tag);
  }

  filterByAnyComponentName(componentNames) {
    return Object.values(this.entities).filter((entity) => componentNames.some((componentName) => (componentName in entity)));
  }

  filterByAllComponentName(componentNames) {
    return Object.values(this.entities).filter((entity) => componentNames.every((componentName) => (componentName in entity)));
  }

  findByTag(tag) {
    return this.tags[tag].map((id) => this.entities[id]);
  }
}

export default EntityManager;
