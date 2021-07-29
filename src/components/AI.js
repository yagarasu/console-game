import { Component } from "ape-ecs";

class AI extends Component {
  static properties = {
    algorithm: 'fiend',
    state: {}
  }
}

export default AI;
