import airForce from 'systems/particleForces/airForce';

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
        forces: [airForce(-90, 0.5, 0.5)],
        maxParticles: 50,
        particlesPerSecond: 10,
        particleLife: 24,
        maxVelocity: 3,
        particleSize: [5, 2],
        blendingMode: 'screen',
        colors: ['#162385', '#94dbf6'],
      }
    ]
  };
}
