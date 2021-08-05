import { Component } from "ape-ecs";

class Collectable extends Component {
  static properties = {
    item: {
      id: null,
      onCollect: null,
      onActivate: null,
    }
  }
}

export default Collectable;
