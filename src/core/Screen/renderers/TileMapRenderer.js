class TileMapRenderer {
  constructor({ EntityManager, MapManager }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
  }

  render({ display, camera }) {
    const map = this.mapManager.getMap();
    const [ followEntity ] = this.entityManager.findByTag('followWithCamera');
    if (followEntity) {
      const { position } = followEntity;
      camera.centerTo(position.x, position.y);
    }
    camera.forEachLocalTile((lx, ly, gx, gy) => {
      const tile = map.getTile(gx, gy);
      if (!tile) return;
      const { fg, bg, char } = tile;
      display.draw(lx, ly, char, fg, bg);
    });
  }
}

export default TileMapRenderer;
