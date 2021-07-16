class PlayerController {
  constructor(entityManager) {
    this.em = entityManager
  }

  hndIntent(intent) {
    const player = this.em.getEntity('player');
    const { position } = player
    position.px = position.x;
    position.py = position.y;
    switch (intent.type) {
      case 'MOVE_UP':
        position.y--;
        break;
      case 'MOVE_DOWN':
        position.y++;
        break;
      case 'MOVE_LEFT':
        position.x--;
        break;
      case 'MOVE_RIGHT':
        position.x++;
        break;
      default:
    }
    this.em.updateComponent('player', 'position', {
      x: position.x,
      y: position.y,
      px: position.px,
      px: position.px,
    });
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
