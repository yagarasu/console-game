import { World } from 'ecsy';
import registerSystems from "systems";
import registerComponents from "components";
import Scheduler from 'core';
import Screen from 'core';
import { CameraComponent, CurrentCameraTag, MovableComponent, PositionComponent, RenderableComponent } from "components";

class Game {
  constructor() {
    this.screen = new Screen();
    this.scheduler = new Scheduler();
    this.world = new World();
    registerSystems(this.world);
    registerComponents(this.world);
  }

  run() {
    this.initialize();
    this.scheduler.start();
  }

  initialize() {
    this.screen.initialize();

    // Prepare data
    this.world.createEntity('camera')
      .addComponent(CameraComponent)
      .addComponent(CurrentCameraTag);
    
    this.world.createEntity('player')
      .addComponent(RenderableComponent, { renderer: 'statisSpriteRenderer', params: { ch: '@', fg: 'red', bg: null } })
      .addComponent(PositionComponent)
      .addComponent(MovableComponent);

    this.scheduler.addTask((delta, ts) => {
      this.world.execute(delta, ts);
    });
  }
}

export default Game;
