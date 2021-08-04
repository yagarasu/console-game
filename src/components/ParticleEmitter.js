import { Component } from "ape-ecs";

class ParticleEmitter extends Component {
  static properties = {
    particles: [],
    lastUpdated: 0,
    maxParticles: 500,
    particlesPerSecond: 100,
    particleLife: 50,
    maxVelocity: 5,
    particleSize: [2, 1],
    blendingMode: null,
    colors: ['#f00', '#0c0'],
  }
}

export default ParticleEmitter;
