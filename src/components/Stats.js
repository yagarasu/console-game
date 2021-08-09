import { Component } from "ape-ecs";

class Stats extends Component {
  static properties = {
    energy: 100,
    maxEnergy: 100,
    focus: 100,
    maxFocus: 100,
    will: 40,
    domain: 20,
    exp: 0,
    level: 1,
  }
}

export default Stats;
