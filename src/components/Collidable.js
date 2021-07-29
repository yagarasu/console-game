import { Component } from "ape-ecs";

class Collidable extends Component {
  static properties = {
    collidesWith: []
  }
}

export default Collidable;
