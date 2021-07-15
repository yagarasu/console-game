import Screen from 'core/Screen';
import Keyboard from 'core/Keyboard';
import Scheduler from 'core/Scheduler';
import EntityManager from 'core/EntityManager';
import MapManager from 'core/Map/MapManager';
import DungeonGenerator from 'core/Map/DungeonGenerator';
import TileMap from 'core/Map/TileMap';
import { createPlayer } from 'entities/entityFactories';
import defaultTileset from 'data/defaultTileset';

class Game {
  constructor() {
    this.screen = new Screen();
    this.keyboard = new Keyboard();
    this.scheduler = new Scheduler();
    this.entityManager = new EntityManager();
    this.mapManager = new MapManager();

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
    this.screen.initialize(this.entityManager, this.mapManager);

    // Initialize map
    const map = new TileMap();
    map.tileset = defaultTileset;
    DungeonGenerator.digger(map);
    this.mapManager.setMap(map);

    // Initialize player
    this.entityManager.createEntity('player', createPlayer());
    const [playerStartingX, playerStartingY] = DungeonGenerator.randomStartingPosition(map);
    this.entityManager.updateComponent('player', 'position', { x: playerStartingX, y: playerStartingY });
    this.entityManager.addTags('player', ['followWithCamera']);
    
    // Tasks
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
