import { Component, Types } from "ecsy";

class CameraComponent extends Component {
  static schema = {
    x:      Types.Number,
    y:      Types.Number,
    width:  Types.Number,
    height: Types.Number,
  }
}

export default CameraComponent;
