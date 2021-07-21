import { player, mob } from 'entities';

class EntityFactory {
  static entityMap = {
    player,
    mob
  }

  static create(entity, params) {
    const specificFactory = this.entityMap[entity];
    if (!specificFactory) throw new Error(`Unknown entity type "${entity}".`);
    return specificFactory(params);
  }
}

export default EntityFactory;
