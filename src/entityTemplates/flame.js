import { directionToVector, angleFromVector } from "core/utils/mathUtils";
import { airForce } from 'systems/particleForces';

export default function flame(x, y, direction) {
  const [vx, vy] = directionToVector(direction);
  return {
    tags: ['DestroyOnTileCollision'],
    components: [
      {
        type: 'Position',
        key: 'Position',
        x,
        y,
      },
      {
        type: 'Movable',
        key: 'Movable',
      },
      {
        type: 'AnimatedSprite',
        key: 'AnimatedSprite',
        frames: ['\u26AC', '\u26AD'],
        fg: '#db9b5a',
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'Lifespan',
        key: 'Lifespan'
      },
      {
        type:'Projectile',
        key:'Projectile',
        vx,
        vy,
        moveEachNticks: 8,
        onHit: 'flame-onHit'
      },
      {
        type: 'ParticleEmitter',
        key: 'ParticleEmitter',
        forces: [airForce(angleFromVector(vx * -1, vy * -1), 0.1, 0)],
        initialParticles: 50,
        startingAcceleration: () => () => [0,0],
        maxParticles: 500,
        particlesPerSecond: 50,
        particleLife: 16,
        maxVelocity: 16,
        particleSize: [5, 1],
        blendingMode: 'screen',
        colors: ['#771a98', '#f4d5ff'],
      }
    ]
  };
}
