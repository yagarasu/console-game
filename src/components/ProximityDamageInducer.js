import { Component } from "ape-ecs";

class ProximityDamageInducer extends Component {
  static properties = {
    energyDamage: 5,
    focusDamage: 5
  }
}

export default ProximityDamageInducer;
