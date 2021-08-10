import { Component } from "ape-ecs";

class ProximityDamageInducer extends Component {
  static properties = {
    damage: 5,
  }
}

export default ProximityDamageInducer;
