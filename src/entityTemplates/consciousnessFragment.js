import { randomForce } from 'systems/particleForces';

export default function consciousnessFragment(id, x, y) {
  return {
    id,
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
        frames: ['\u0F2B', '\u0F2C', '\u0F2D', '\u0F2E', '\u0F2F'],
        fg: '#b03b3b',
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'Collectable',
        key: 'Collectable',
        item: {
          id: 'consciousnessFragment',
          name: 'Fragment'
        },
      },
      {
        type: 'ParticleEmitter',
        forces: [randomForce(1, 3)],
        maxParticles: 10,
        particlesPerSecond: 1,
        particleLife: 32,
        maxVelocity: 5,
        particleSize: [2, 1],
        blendingMode: 'screen',
        colors: ['#d26363', '#f2dcdc'],
      }
    ]
  };
}
