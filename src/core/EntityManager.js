class EntityManager {
  constructor() {
    this.entities = {};
    this.tags = {};

    this.stage = {
      entities: {},
      tags: {},
    };

    this.inTransaction = false;
  }

  startTransaction() {
    this.stage = {
      entities: { ...this.entities },
      tags: { ...this.tags },
    };
    this.inTransaction = true;
  }
  
  commit() {
    this.entities = { ...this.stage.entities };
    this.tags = { ...this.stage.tags };
    this.inTransaction = false;
  }

  rollback() {
    this.stage = {
      entities: {},
      tags: {},
    };
    this.inTransaction = false;
  }

  rollbackComponent(id, component) {
    if (!this.inTransaction) throw new Error('You can not rollback without a transaction');
    if (!this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    return this.stage.entities[id][component] = this.entities[id];
  }

  _getDataRoot() {
    return this.inTransaction ? this.stage : this;
  }

  getEntity(id) {
    return this._getDataRoot().entities[id];
  }

  createEntity(id, components = {}) {
    const $this = this._getDataRoot();
    if (id in $this.entities) throw new Error(`Entity id ${id} already exists.`);
    $this.entities[id] = {
      id,
      ...components
    };
    return $this.entities[id];
  }

  addComponents(id, components) {
    const $this = this._getDataRoot();
    if (!$this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    $this.entities[id] = {
      ...$this.entities[id],
      ...components
    };
    return $this.entities[id];
  }

  updateComponent(id, componentName, data) {
    const $this = this._getDataRoot();
    if (!$this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    $this.entities[id] = {
      ...$this.entities[id],
      [componentName]: {
        ...$this.entities[id][componentName],
        ...data
      }
    };
    return $this.entities[id];
  }

  entityHasComponent(id, componentName) {
    const $this = this._getDataRoot();
    if (!$this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    return (componentName in $this.entities[id]);
  }

  addTags(id, tags) {
    const $this = this._getDataRoot();
    if (!$this.entities[id]) throw new Error(`Entity id ${id} does not exist.`);
    tags.forEach((tag) => {
      if (!$this.tags[tag]) {
        $this.tags[tag] = [id];
      } else {
        $this.tags[tag].push(id);
      }
    });
  }

  entityIsTaggedWith(id, tag) {
    const $this = this._getDataRoot();
    if (!$this.tags[id]) throw new Error(`Entity id ${id} does not exist.`);
    return $this.tags[id].includes(tag);
  }

  filterByAnyComponentName(componentNames) {
    return Object.values(this._getDataRoot().entities)
      .filter((entity) => componentNames.some((componentName) => (componentName in entity)));
  }

  filterByAllComponentName(componentNames) {
    return Object.values(this._getDataRoot().entities)
      .filter((entity) => componentNames.every((componentName) => (componentName in entity)));
  }

  findByTag(tag) {
    const $this = this._getDataRoot();
    return $this.tags[tag].map((id) => $this.entities[id]);
  }
}

export default EntityManager;
