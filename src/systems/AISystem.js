import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import * as algorithms from './aiAlgorithms';

class AISystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.entities = this.createQuery().fromAll('AI');
  }

  runAlgorithm(algorithm, entity) {
    const fn = algorithms[algorithm];
    if (!fn) throw new Error(`Unknown AI Algorithm "${algorithm}"`);
    return fn(entity);
  }

  update(tick) {
    const entities = this.entities.execute();
    for (const entity of entities) {
      const ai = entity.getOne('AI');
      this.runAlgorithm(ai.algorithm, entity);
    }
  }
}

export default AISystem;
