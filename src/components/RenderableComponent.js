import { Component, Types } from "ecsy";

class RenderableComponent extends Component {
  static schema = {
    renderer: Types.String,
    params: Types.JSON,
  }
}

export default RenderableComponent;
