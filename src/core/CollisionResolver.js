class CollisionResolver {
  static resolveTileMapCollisionAndMoveEntity(entity, tilemap, delta, lag) {
    const [newPlayerFx, newPlayerFy] = entity.attemptMove(delta, lag);
    const newPlayerX = Math.round(newPlayerFx);
    const newPlayerY = Math.round(newPlayerFy);
    const tile = tilemap.getTile(newPlayerX, newPlayerY);
    if (!tile) return;
    if (tile.solid) return;
    entity.move(newPlayerFx, newPlayerFy);
  }
}

export default CollisionResolver;
