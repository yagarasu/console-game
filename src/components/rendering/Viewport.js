import { Component } from "ape-ecs";

class Viewport extends Component {
  static properties = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

export default Viewport;
