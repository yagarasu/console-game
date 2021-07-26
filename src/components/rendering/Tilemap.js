import { Component } from "ape-ecs";

class Tilemap extends Component {
  static properties = {
    width: 0,
    height: 0,
    tileset: {},
    map: null,
    mapData: null,
  }
}

export default Tilemap;
