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
    
    // Input
    const keybinder = this.container.resolve('KeyBinder');
    keybinder.initialize();
    
    // Initialize map
    const mapManager = this.container.resolve('MapManager');
    mapManager.createMap();
    DungeonGenerator.digger(mapManager.getMap());
    
    // Initialize player
    const entityManager = this.container.resolve('EntityManager');
    const entityFactory = this.container.resolve('EntityFactory');
    const [playerStartingX, playerStartingY] = DungeonGenerator.randomStartingPosition(mapManager.getMap());
    entityManager.createEntity('player', entityFactory.create('player', { position: { x: playerStartingX, y: playerStartingY } }));
    entityManager.addTags('player', ['followWithCamera']);
    const eventQueue = this.container.resolve('EventQueue');
    eventQueue.addConsumer(this.container.resolve('PlayerController'));

    // Tasks
    const scheduler = this.container.resolve('Scheduler');
    this.tasks.consumeEvents = scheduler.addTask(
      eventQueue.consume.bind(eventQueue)
    );
     const collisionDetector = this.container.resolve('CollisionDetector');
     this.tasks.collisionDetect = scheduler.addTask(
       collisionDetector.update.bind(collisionDetector)
       );
    const collisionResolver = this.container.resolve('CollisionResolver');
    this.tasks.collisionResolve = scheduler.addTask(
      collisionResolver.update.bind(collisionResolver)
    );
    this.tasks.render = scheduler.addTask(
      screen.render.bind(screen)
    );
    
    // ...
  }
}

export default Game;
