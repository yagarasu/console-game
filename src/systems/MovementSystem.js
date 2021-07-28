import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class MovementSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.movable = this.createQuery().fromAll('Movable', 'Position');
  }

  update(tick) {
    const movable = this.movable.execute();
    for (const entity of movable) {
      const position = entity.getOne('Position');
      const movable = entity.getOne('Movable');
      if (movable.dx !== 0 || movable.dy !== 0)  {
        position.update({
          x: position.x + movable.dx,
          y: position.y + movable.dy,
        });
        movable.update({ dx: 0, dy: 0 });
      }
    }
  }
}

export default MovementSystem;
