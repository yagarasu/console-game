import { Component } from "ape-ecs";

class Stats extends Component {
  static properties = {
    energy: 100,
    focus: 100,
  }
}

export default Stats;
