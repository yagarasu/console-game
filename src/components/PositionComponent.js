import { Component, Types } from "ecsy";

class PositionComponent extends Component {
  static schema = {
    x: Types.Number,
    y: Types.Number,
  }
}

export default PositionComponent;
