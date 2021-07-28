import Scheduler from "core/Scheduler";
import { World } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import Screen from 'core/Screen';
import * as components from 'components';
import tags from 'components/tags';
import {
  RenderSystem,
  CameraFollowSystem,
  MoveWithKeyboardSystem,
  TilemapCollisionResolverSystem,
  MovementSystem,
  VisionSystem,
} from 'systems';
import MapManager from 'core/Map/MapManager';
import DungeonGenerator from 'core/Map/DungeonGenerator';
import MessageQueue from 'core/MessageQueue';
import KeyBinder from 'core/KeyBinder';
import navKeyBinding from 'data/navKeyBinding';

class Game {
  constructor() {
    this.scheduler = new Scheduler();
    this.world = new World();
    this.screen = new Screen();
    this.mapManager = new MapManager();
    this.messageQueue = new MessageQueue();
    this.keyBinder = new KeyBinder(this.messageQueue);
    this.keyBinder.addBinding('nav', navKeyBinding);
  }

  initialize() {
    this.screen.initialize();

    // Register systems
    this.world.registerSystem(CameraFollowSystem.group, CameraFollowSystem);
    this.world.registerSystem(RenderSystem.group, RenderSystem, [this.screen]);
    this.world.registerSystem(MoveWithKeyboardSystem.group, MoveWithKeyboardSystem, [this.messageQueue]);
    this.world.registerSystem(TilemapCollisionResolverSystem.group, TilemapCollisionResolverSystem);
    this.world.registerSystem(MovementSystem.group, MovementSystem);
    this.world.registerSystem(VisionSystem.group, VisionSystem);

    // Register components
    Object.values(components).forEach(component => {
      this.world.registerComponent(component);
    });
    // Register tags
    this.world.registerTags(...tags);

    // Initialize test world
    this.mapManager.createMap();
    DungeonGenerator.digger(this.mapManager.getMap());
    const [playerStartingX, playerStartingY] = DungeonGenerator.randomStartingPosition(this.mapManager.getMap());
    this.world.createEntity({
      id: 'mainMap',
      components: [
        {
          type: 'Tilemap',
          key: 'Tilemap',
          width: this.mapManager.getMap().width,
          height: this.mapManager.getMap().height,
          map: this.mapManager.getMap(),
          mapData: this.mapManager.getMapData(),
          tileset: this.mapManager.getMap().tileset,
        }
      ],
    });

    this.world.createEntity({
      id: 'camera',
      tags: ['MainCamera'],
      components: [
        {
          type: 'Viewport',
          key: 'Viewport',
          x: playerStartingX,
          y: playerStartingY,
          width: this.screen.getDisplay().getOptions().width,
          height: this.screen.getDisplay().getOptions().height,
        }
      ]
    });
    this.world.createEntity({
      id: 'player',
      tags: ['FollowWithMainCamera', 'MoveWithKeyboard', 'FOVAlly'],
      components: [
        {
          type: 'Position',
          key: 'Position',
          x: playerStartingX,
          y: playerStartingY,
        },
        {
          type: 'StaticSprite',
          key: 'StaticSprite',
          ch: '\u263B',
          fg: '#c00',
        },
        {
          type: 'Movable',
          key: 'Movable',
          cooldown: 8
        },
        {
          type: 'Vision',
          key: 'Vision',
          sight: 5
        }
      ]
    });

    this.scheduler.addTask(() => {
      this.messageQueue.consume();
    });
    this.scheduler.addTask(() => {
      this.world.runSystems(SYSTEM_GROUP_FRAME);
    });
  }

  run() {
    this.initialize();
    this.scheduler.start();
  }
}

export default Game;
