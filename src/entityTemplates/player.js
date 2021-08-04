import { randomVectorOfRandomMagnitudeBetween } from "core/utils/mathUtils";

export default function mainCamera(id, startingx, startingy) {
  return {
    id,
    tags: ['FollowWithMainCamera', 'MoveWithKeyboard', 'FOVAlly'],
    components: [
      {
        type: 'Position',
        key: 'Position',
        x: startingx,
        y: startingy,
      },
      {
        type: 'StaticSprite',
        key: 'StaticSprite',
        ch: '\u263B',
        fg: '#c00',
      },
      {
        type: 'Movable',
        key: 'Movable',
      },
      {
        type: 'Vision',
        key: 'Vision',
        sight: 5
      },
      {
        type: 'Stats',
        key: 'Stats',
      },
      {
        type: 'ProximityClient',
        key: 'ProximityClient',
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'Equipment',
        key: 'Equipment',
        primary: 'banishing'
      },
      {
        type: 'InventoryHolder',
        key: 'InventoryHolder',
      },
      {
        type: 'ParticleEmitter',
        key: 'ParticleEmitter',
        lastUpdated: performance.now(),
        forces: [() => randomVectorOfRandomMagnitudeBetween(0, 2)],
        maxParticles: 20,
        particlesPerSecond: 20,
        particleLife: 64,
        maxVelocity: 5,
        particleSize: [3, 1],
        blendingMode: 'screen',
        colors: ['#162385', '#94dbf6'],
      }
    ]
  };
}
