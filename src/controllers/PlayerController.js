import { throttle } from 'core/utils';

class PlayerController {
  constructor(game) {
    this.game = game;
  }

  hndIntent(intent) {
    const player = this.game.entityManager.getEntity('player');
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
    const tile = this.game.mapManager.getMap().getTile(newPosition.x, newPosition.y);
    const isSolid = !tile || tile.solid;
    if (isSolid) return;
    this.game.entityManager.updateComponent('player', 'position', newPosition);
  }

  consumer() {
    return next => intent => {
      if (intent.target !== 'player') {
        return next();
      }
      this.hndIntent(intent);
      return next();
    }
  }

  events() {
    return next => event => {
      const { target } = event;
      if (event.type == 'collision' && target.id == 'player') {
        if (this.game.entityManager.entityIsTaggedWith(target.id, 'invulnerable')) {
          console.log('invul');
          return;
        }
        console.log('hit');
        const { stats: { health } } = target;
        const newHealth = health - 10;
        if (newHealth < 0) {
          this.game.entityManager.updateComponent('player', 'stats', { health: 0 });
          this.game.eventQueue.enqueue({ type: 'death', target });
          return next();
        }
        this.game.entityManager.updateComponent('player', 'stats', { health: event.target.stats.health - 10 });
        this.game.entityManager.addTags('player', ['invulnerable']);
        // this.game.scheduler.scheduleOneTimeTask(() => {
        //   this.game.entityManager.removeTags('player', ['invulnerable']);
        // }, 120);
      }
    };
  }
}

export default PlayerController;
