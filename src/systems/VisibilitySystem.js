import { FOV } from 'rot-js'

class VisibilitySystem {
  constructor({ EntityManager, MapManager }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
    this.fov = new FOV.PreciseShadowcasting(this.lightPasses.bind(this));
  }

  lightPasses(gx, gy) {
    const map = this.mapManager.getMap();
    const tile = map.getTile(gx, gy);
    return !(!tile || tile.solid);
  }

  storeVisible(x, y, r, v) {
    const map = this.mapManager.getMapData();
    map.setData(x, y, 'visibility', { r, v });
    if (v > 0.5) {
      map.setData(x, y, 'known', true);
    }
  }

  update() {
    this.mapManager.getMapData().resetData('visibility');
    const player = this.entityManager.getEntity('player');
    const { position, visibility } = player;
    this.fov.compute(position.x, position.y, visibility.radius, this.storeVisible.bind(this));
  }
}

export default VisibilitySystem;
