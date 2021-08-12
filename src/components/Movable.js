import { Component } from "ape-ecs";

class Movable extends Component {
  static properties = {
    dx: 0,
    dy: 0,
    direction: 'down'
  }
}

export default Movable;
