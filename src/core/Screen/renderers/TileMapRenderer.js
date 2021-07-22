import { Color } from 'rot-js'

class TileMapRenderer {
  constructor({ EntityManager, MapManager }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
  }

  calculateColor(color, visibility, known) {
    let percentage = 0;
    if (visibility < 0.3 && known) {
      percentage = 0.3;
    } else {
      percentage = visibility;
    }
    return Color.toHex(Color.interpolate([0, 0, 0], Color.fromString(color), percentage));
  }

  render({ display, camera }) {
    const map = this.mapManager.getMap();
    const mapData = this.mapManager.getMapData();
    const [ followEntity ] = this.entityManager.findByTag('followWithCamera');
    if (followEntity) {
      const { position } = followEntity;
      camera.centerTo(position.x, position.y);
    }
    camera.forEachLocalTile((lx, ly, gx, gy) => {
      const tile = map.getTile(gx, gy);
      const data = mapData.getData(gx, gy);
      if (!tile) return;
      const { fg, bg, char } = tile;
      const { visibility: { v = 0 } = {}, known } = data ?? {};
      const finalFg = this.calculateColor(fg, v, known);
      const finalBg = this.calculateColor(bg, v, known);
      display.draw(lx, ly, ' ', finalFg, finalBg);
    });
  }
}

export default TileMapRenderer;
