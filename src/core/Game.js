import Scheduler from "core/Scheduler";
import { World } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import Screen from 'core/Screen';
import * as components from 'components';
import tags from 'components/tags';
import {
  RenderSystem,
  CameraFollowSystem
} from 'systems';
import MapManager from 'core/Map/MapManager';
import DungeonGenerator from 'core/Map/DungeonGenerator';

class Game {
  constructor() {
    this.scheduler = new Scheduler();
    this.world = new World();
    this.screen = new Screen();
    this.mapManager = new MapManager();
  }

  initialize() {
    this.screen.initialize();

    // Register systems
    this.world.registerSystem(CameraFollowSystem.group, CameraFollowSystem);
    this.world.registerSystem(RenderSystem.group, RenderSystem, [this.screen]);

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
      tags: ['FollowWithMainCamera'],
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
          ch: '@',
          fg: '#c00',
          bg: '#000'
        }
      ]
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
