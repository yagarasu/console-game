class TileMapRenderer {
  static render({ mapManager, entityManager }, display) {
    const [ followEntity ] = entityManager.findByTag('followWithCamera');
    const { position } = followEntity;
    mapManager.viewport.centerTo(position.x, position.y);
    mapManager.viewport.forEach((lx, ly, gx, gy, tile) => {
      if (!tile) return;
      const { fg, bg, char } = tile;
      display.draw(lx, ly, char, fg, bg);
    });
  }
}

export default TileMapRenderer;
