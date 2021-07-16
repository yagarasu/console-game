class PlayerController {
  constructor(entityManager) {
    this.em = entityManager
  }

  hndIntent(intent) {
    const player = this.em.getEntity('player');
    switch (intent.type) {
      case 'MOVE_UP':
        return player.position.y--;
      case 'MOVE_DOWN':
        return player.position.y++;
      case 'MOVE_LEFT':
        return player.position.x--;
      case 'MOVE_RIGHT':
        return player.position.x++;
      default:
    }
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
