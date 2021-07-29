import { Component } from "ape-ecs";

class AnimatedSprite extends Component {
  static properties = {
    frames: ['|', '/', '­—', '\\'],
    fg: '#fff',
    bg: null,
    currentFrame: 0,
    ticks: 0,
    frameDuration: 8
  }
}

export default AnimatedSprite;
