import { Component } from "ape-ecs";

class DamageInducer extends Component {
  static properties = {
    damage: 5
  }
}

export default DamageInducer;
