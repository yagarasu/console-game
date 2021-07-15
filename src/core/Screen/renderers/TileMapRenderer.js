class TileMapRenderer {
  static render({ mapManager, entityManager, display, camera }) {
    const [ followEntity ] = entityManager.findByTag('followWithCamera');
    const { position } = followEntity;
    const map = mapManager.getMap();
    camera.centerTo(position.x, position.y);
    camera.forEachLocalTile((lx, ly, gx, gy) => {
      const tile = map.getTile(gx, gy);
      if (!tile) return;
      const { fg, bg, char } = tile;
      display.draw(lx, ly, char, fg, bg);
    });
  }
}

export default TileMapRenderer;
