import Screen from 'core/Screen';
import Keyboard from 'core/Keyboard';
import Scheduler from 'core/Scheduler';
import EntityManager from 'core/EntityManager';
import { createPlayer } from 'entities/entityFactories';
import StaticSpriteRendered from './Screen/StaticSpriteRenderer';

class Game {
  constructor() {
    this.screen = new Screen();
    this.keyboard = new Keyboard();
    this.scheduler = new Scheduler();
    this.entityManager = new EntityManager();

    this.tasks = {
      update: null,
      render: null,
    };
  }

  run() {
    this.initialize();
    this.scheduler.start();
  }
  
  initialize() {
    this.screen.initialize();
    this.screen.addChild(StaticSpriteRendered.render(this.entityManager));

    this.entityManager.createEntity('player', createPlayer());
    this.tasks.update = this.scheduler.addTask(
      this.update.bind(this)
    );
    this.tasks.render = this.scheduler.addTask(
      this.screen.render.bind(this.screen)
    );


    // ...
  }

  update(delta, progress) {
    
  }
}

export default Game;
