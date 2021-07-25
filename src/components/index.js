import FollowedByCameraComponent from "./FollowedByCameraComponent";
import MovableComponent from "./MovableComponent";
import PositionComponent from "./PositionComponent";
import CameraComponent from "./CameraComponent";
import CurrentCameraTag from "./CurrentCameraTag";
import RenderableComponent from "./RenderableComponent";

export { default as FollowedByCameraComponent } from "./FollowedByCameraComponent";
export { default as MovableComponent } from "./MovableComponent";
export { default as PositionComponent } from "./PositionComponent";
export { default as CameraComponent } from "./CameraComponent";
export { default as CurrentCameraTag } from "./CurrentCameraTag";
export { default as RenderableComponent } from "./RenderableComponent";

export default function registerComponents(world) {
  world
    .registerComponent(FollowedByCameraComponent)
    .registerComponent(MovableComponent)
    .registerComponent(PositionComponent)
    .registerComponent(CameraComponent)
    .registerComponent(CurrentCameraTag)
    .registerComponent(RenderableComponent);
}
