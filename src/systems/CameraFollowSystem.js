import { System } from "ape-ecs";
import Camera from "core/Camera";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class CameraFollowSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.camera = this.createQuery().fromAll('MainCamera', 'Viewport');
    this.target = this.createQuery().fromAll('FollowWithMainCamera', 'Position').persist();
  }

  update(tick) {
    const cameraData = this.camera.execute();
    const [mainCamera] = cameraData.values();
    const targetData = this.target.execute();
    const [targetEntity] = targetData.values();
    const viewport = mainCamera.getOne('Viewport');
    const { x, y, width, height } = viewport;
    const camera = new Camera(null, { x, y, width, height });
    const { x: targetX, y: targetY } = targetEntity.getOne('Position');
    const [newX, newY] = camera.getCenterTo(targetX, targetY);

    viewport.x = newX;
    viewport.y =newY;

    viewport.update();
  }
}

export default CameraFollowSystem;
