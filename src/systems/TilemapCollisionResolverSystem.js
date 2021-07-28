import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class TilemapCollisionResolverSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.target = this.createQuery().fromAll('Movable', 'Position');
    this.map = this.createQuery().fromAll('Tilemap');
  }

  update(tick) {
    const targets = this.target.execute();
    const [mapEntity] = this.map.execute();
    const { map } = mapEntity.getOne('Tilemap');
    for (const target of targets) {
      const position = target.getOne('Position');
      const movable = target.getOne('Movable');
      const futureX = position.x + movable.dx;
      const futureY = position.y + movable.dy;
      const tile = map.getTile(futureX, futureY);
      if (!tile || tile.solid) {
        movable.update({
          dx: 0,
          dy: 0,
        });
      }
    }
  }
}

export default TilemapCollisionResolverSystem;
