import { Component } from "ape-ecs";

class Projectile extends Component {
  static properties = {
    vx: 0,
    vy: 0,
    tickCount: 0,
    moveEachNticks: 16,
    onHit: null
  }
}

export default Projectile;
