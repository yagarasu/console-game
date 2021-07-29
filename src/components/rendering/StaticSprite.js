import { Component } from "ape-ecs";

class StaticSprite extends Component {
  static properties = {
    ch: '@',
    fg: '#fff',
    bg: null
  }
}

export default StaticSprite;
