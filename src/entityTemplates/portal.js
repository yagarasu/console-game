import { airForce } from 'systems/particleForces';

export default function mainCamera(id, x, y) {
  return {
    id,
    tags: ['FOVAlly'],
    components: [
      {
        type: 'Position',
        key: 'Position',
        x,
        y,
      },
      {
        type: 'AnimatedSprite',
        key: 'AnimatedSprite',
        frames: ['\u233A', '\u233B', '\u233C'],
        fg: '#ee5757',
        bg: '#631f1f'
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'ParticleEmitter',
        lastUpdated: performance.now(),
        forces: [airForce(-90, 0.5, 0.5)],
        maxParticles: 64,
        particlesPerSecond: 1,
        particleLife: 32,
        maxVelocity: 1,
        particleSize: [2, 1],
        blendingMode: 'screen',
        colors: ['#162385', '#94dbf6'],
      }
    ]
  };
}
