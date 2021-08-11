import { Component } from "ape-ecs";

class Equipment extends Component {
  static properties = {
    primary: null,
    secondary: null,
    runes: [],
  }
}

export default Equipment;
