export default function mainCamera(id, x, y, color = '#6a9f9d', aiAlgo = 'fiend') {
  return {
    id,
    tags: ['FOVAlly', 'Enemy'],
    components: [
      {
        type: 'Position',
        key: 'Position',
        x,
        y,
      },
      {
        type: 'StaticSprite',
        key: 'StaticSprite',
        ch: '\u263B',
        fg: color,
      },
      {
        type: 'Movable',
        key: 'Movable',
      },
      {
        type: 'AI',
        algorithm: aiAlgo,
        state: {
          tick: 0,
          cooldown: 16
        },
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'ProximityDamageInducer',
        key: 'ProximityDamageInducer',
      },
      {
        type: 'MobStats',
        key: 'MobStats',
        energy: 50,
        will: 10
      }
    ]
  };
}