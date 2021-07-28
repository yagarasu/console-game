import { System } from "ape-ecs";
import { FOV } from "rot-js";
import { SYSTEM_GROUP_FRAME } from "systems/groups";


class VisionSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.entities = this.createQuery().fromAll('Vision', 'Position');
    this.map = this.createQuery().fromAll('Tilemap');
    this.fov = new FOV.PreciseShadowcasting(this.lightPasses.bind(this));
  }

  lightPasses(gx, gy) {
    const [mapEntity] = this.map.execute();
    const { map } = mapEntity.getOne('Tilemap');
    const tile = map.getTile(gx, gy);
    return !(!tile || tile.solid);
  }

  update(tick) {
    const entities = this.entities.execute();
    const [mapEntity] = this.map.execute();
    const { map } = mapEntity.getOne('Tilemap');
    for (const entity of entities) {
      const position = entity.getOne('Position');
      const vision = entity.getOne('Vision');
      const newVisiondata = {};
      this.fov.compute(position.x, position.y, vision.sight, (x, y, r, v) => {
        newVisiondata[`${x},${y}`] = { r, v };
      });
      vision.data = newVisiondata;
      vision.update();
    }
  }
}

export default VisionSystem;
