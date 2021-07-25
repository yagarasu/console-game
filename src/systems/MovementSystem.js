import { System } from "ecsy";
import MovableComponent from "components/MovableComponent";
import PositionComponent from "components/PositionComponent";

class MovementSystem extends System {
  static queries = {
    moving: {
      components: [MovableComponent, PositionComponent],
      listen: {
        changed: [MovableComponent]
      }
    }
  }

  execute(delta, time) {
    const entities = this.queries.moving.changed;
    entities.forEach(entity => {
      const movable = entity.getMutableComponent(MovableComponent);
      const position = entity.getMutableComponent(PositionComponent);
      position.x = movable.x;
      position.y = movable.y;
    });
  }
}

export default MovementSystem;
