import Screen from 'core/Screen';
import Keyboard from 'core/Keyboard';
import KeyBinder from 'core/Keyboard/KeyBinder';
import Scheduler from 'core/Scheduler';
import EventQueue from 'core/EventQueue';
import EntityManager from 'core/EntityManager';
import MapManager from 'core/Map/MapManager';
import TileMap from 'core/Map/TileMap';
import DungeonGenerator from 'core/Map/DungeonGenerator';
import { createPlayer } from 'entities/entityFactories';
import defaultTileset from 'data/defaultTileset';
import config from 'data/config';
import PlayerController from 'controllers/PlayerController';

class Game {
  constructor() {
    this.screen = new Screen();
    this.keyboard = new Keyboard();
    this.keybinder = new KeyBinder(config.keymap);
    this.scheduler = new Scheduler();
    this.inputQueue = new EventQueue();
    this.eventQueue = new EventQueue();
    this.entityManager = new EntityManager();
    this.mapManager = new MapManager();

    this.tasks = {
      update: null,
      render: null,
    };

    this.controllers = {
      player: new PlayerController(this.entityManager),
    };
  }

  run() {
    this.initialize();
    this.scheduler.start();
  }
  
  initialize() {
    this.screen.initialize(this.entityManager, this.mapManager);

    // Input
    this.keybinder.subscribeToBindings(this.keyboard, this.inputQueue);
    this.inputQueue.addConsumer(this.controllers.player.consumer.bind(this.controllers.player));

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
    // Debug
    this.scheduler.addTask(() => {
      this.screen.display.draw(40,0,this.keyboard.keys.join(','));
    });

    // ...
  }

  update(delta, progress) {
    this.inputQueue.consume({ delta, progress });
    this.eventQueue.consume({ delta, progress });
  }
}

export default Game;
