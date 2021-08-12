import { Component } from "ape-ecs";

class Lifespan extends Component {
  static properties = {
    ttl: 80,
    life: 0
  }
}

export default Lifespan;
