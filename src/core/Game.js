import Screen from 'core/Screen';
import Keyboard from 'core/Keyboard';
import KeyBinder from 'core/Keyboard/KeyBinder';
import Scheduler from 'core/Scheduler';
import EventQueue from 'core/EventQueue';
import EntityManager from 'core/EntityManager';
import MapManager from 'core/Map/MapManager';
import TileMap from 'core/Map/TileMap';
import DungeonGenerator from 'core/Map/DungeonGenerator';
import { createPlayer, createMob } from 'entities/entityFactories';
import defaultTileset from 'data/defaultTileset';
import config from 'data/config';
import PlayerController from 'controllers/PlayerController';
import MobController from 'controllers/MobController';
import CollisionResolver from 'core/CollisionResolver';

class Game {
  constructor() {
    this.keyboard = new Keyboard();
    this.keybinder = new KeyBinder(config.keymap);
    this.scheduler = new Scheduler();
    this.inputQueue = new EventQueue();
    this.eventQueue = new EventQueue();
    this.entityManager = new EntityManager();
    this.mapManager = new MapManager();
    this.collisionResolver = new CollisionResolver(this.entityManager, this.mapManager);
    this.screen = new Screen(this.entityManager, this.mapManager);

    this.tasks = {
      update: null,
      render: null,
    };

    this.controllers = {
      player: new PlayerController(this.entityManager),
      mob: new MobController(this.entityManager, this.mapManager),
    };
  }

  run() {
    this.initialize();
    this.scheduler.start();
  }

  initialize() {
    this.screen.initialize();

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

    // Initialize mobs
    for (let i = 0; i < 50; i++) {
      const id = `mob-${i}`;
      this.entityManager.createEntity(id, createMob());
      const [sx, sy] = DungeonGenerator.randomStartingPosition(map);
      this.entityManager.updateComponent(id, 'position', { x: sx, y: sy });
      this.entityManager.addTags(id, ['aiControlled']);
    }

    // Tasks
    this.tasks.update = this.scheduler.addTask(
      this.update.bind(this)
    );
    this.tasks.render = this.scheduler.addTask(
      this.screen.render.bind(this.screen)
    );
    // Debug
    this.scheduler.addTask(() => {
      this.screen.display.draw(40,0,`(${this.entityManager.entities['mob-0'].position.x},${this.entityManager.entities['mob-0'].position.y})`);
    });

    // ...
  }

  update(delta, progress) {
    this.inputQueue.consume({ delta, progress });
    this.controllers.mob.update();
    this.collisionResolver.resolveEntityVsTiles();
    this.eventQueue.consume({ delta, progress });
  }
}

export default Game;
