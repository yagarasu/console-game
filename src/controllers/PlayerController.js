class PlayerController {
  constructor(entityManager, mapManager) {
    this.em = entityManager;
    this.mm = mapManager;
  }

  hndIntent(intent) {
    const player = this.em.getEntity('player');
    const { position } = player;
    const newPosition = { ...position };
    newPosition.prevY = position.y;
    newPosition.prevX = position.x;
    switch (intent.type) {
      case 'MOVE_UP':
        newPosition.y--;
        break;
      case 'MOVE_DOWN':
        newPosition.y++;
        break;
      case 'MOVE_LEFT':
        newPosition.x--;
        break;
      case 'MOVE_RIGHT':
        newPosition.x++;
        break;
    }
    const tile = this.mm.getMap().getTile(newPosition.x, newPosition.y);
    const isSolid = !tile || tile.solid;
    if (isSolid) return;
    this.em.updateComponent('player', 'position', newPosition);
  }

  consumer(context) {
    return next => intent => {
      if (intent.target !== 'player') {
        return next();
      }
      this.hndIntent(intent);
      return next();
    }
  }
}

export default PlayerController;
