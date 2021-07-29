import { Component } from "ape-ecs";

class ProximityClient extends Component {
  static properties = {
    nearbyEntities: []
  }
}

export default ProximityClient;
