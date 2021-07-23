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
    entityManager.createEntity('player', entityFactory.create('player', {
      position: { x: playerStartingX, y: playerStartingY },
      visibility: { radius: 10 },
    }));
    entityManager.addTags('player', ['followWithCamera']);
    const eventQueue = this.container.resolve('EventQueue');
    eventQueue.addConsumer(this.container.resolve('PlayerController'));

    // Initialize some mobs
    for (let i = 0; i < 5; i++) {
      const [startingX, startingY] = DungeonGenerator.randomStartingPosition(mapManager.getMap());
      entityManager.createEntity('mob'+i, entityFactory.create('mob', { position: { x: startingX, y: startingY }, ai: { algorithm: 'Fiend' } }));
      entityManager.addTags('mob'+i, ['mob']);
      console.log('>New mob %d , %d', startingX, startingY)
    }

    // === Tasks ===
    const scheduler = this.container.resolve('Scheduler');
    // AI turn
    const mobAiSystem = this.container.resolve('MobAiSystem');
    this.tasks.aiTurn = scheduler.addTask(
      mobAiSystem.update.bind(mobAiSystem)
    );
    // Handle events
    this.tasks.consumeEvents = scheduler.addTask(
      eventQueue.consume.bind(eventQueue)
    );
    // Detect collisions
    const collisionDetector = this.container.resolve('CollisionDetector');
    this.tasks.collisionDetect = scheduler.addTask(
      collisionDetector.update.bind(collisionDetector)
      );
    // Resolve collisions
    const collisionResolver = this.container.resolve('CollisionResolver');
    this.tasks.collisionResolve = scheduler.addTask(
      collisionResolver.update.bind(collisionResolver)
    );
    // Calculate visibility and FOV
    const visibilitySystem = this.container.resolve('VisibilitySystem');
    this.tasks.visibilitySystem = scheduler.addTask(
      visibilitySystem.update.bind(visibilitySystem)
    );
    // Render
    this.tasks.render = scheduler.addTask(
      screen.render.bind(screen)
    );
    // === Tasks ===
    
    // ...
  }
}

export default Game;
