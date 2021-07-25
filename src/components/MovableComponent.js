import { Component, Types } from "ecsy";

class MovableComponent extends Component {
  static schema = {
    intentedX:  Types.Number,
    intentedY:  Types.Number,
    speed:      Types.Number,
    lastMoved:  Types.Number,
  }
}

export default MovableComponent;
