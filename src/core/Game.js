import createContainer from './createContainer';
import DungeonGenerator from 'core/Map/DungeonGenerator';

class Game {
  constructor() {
    this.container = createContainer();

    this.tasks = {};
  }

  run() {
    this.initialize();
    const scheduler = this.container.resolve('Scheduler');
    scheduler.start();
  }

  initialize() {
    // Screen
    const screen = this.container.resolve('Screen');
    screen.initialize();

    // Initialize map
    const mapManager = this.container.resolve('MapManager');
    mapManager.createMap();
    DungeonGenerator.digger(mapManager.getMap());

    // Tasks
    const scheduler = this.container.resolve('Scheduler');
    this.tasks.render = scheduler.addTask(
      screen.render.bind(screen)
    );

    // Initialize player
    const entityManager = this.container.resolve('EntityManager');
    const entityFactory = this.container.resolve('EntityFactory');
    const [playerStartingX, playerStartingY] = DungeonGenerator.randomStartingPosition(mapManager.getMap());
    entityManager.createEntity('player', entityFactory.create('player', { position: { x: playerStartingX, y: playerStartingY } }));
    // entityManager.updateComponent('player', 'position', { x: playerStartingX, y: playerStartingY });
    entityManager.addTags('player', ['followWithCamera']);
    // eventQueue.addConsumer(this.controllers.player.events.bind(this.controllers.player));
    
    
    // ...
  }
}

export default Game;
