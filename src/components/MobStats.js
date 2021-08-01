import { Component } from "ape-ecs";

class MobStats extends Component {
  static properties = {
    energy: 100,
    will: 20,
  }
}

export default MobStats;
