import { System } from "ecsy";
import RenderableComponent from "components/RenderableComponent";
import CurrentCameraTag from "components/CurrentCameraTag";

class RenderSystem extends System {
  static queries = {
    render: {
      components: [RenderableComponent],
    },
    camera: {
      components: [CameraComponent, CurrentCameraTag]
    }
  }

  execute(delta, time) {
    const camera = this.queries.camera.results;
    const entities = this.queries.render.results;
    entities.forEach(entity => {
      
    });
  }
}

export default RenderSystem;
