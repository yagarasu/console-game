import MovementSystem from './MovementSystem';
import RenderSystem from './RenderSystem';

export default function registerSystems(world) {
  world
    .registerSystem(MovementSystem)
    .registerSystem(RenderSystem);
}