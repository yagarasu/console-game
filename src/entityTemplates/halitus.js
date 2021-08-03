export default function halitus(id, x, y) {
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
        frames: ['\u03c3', '\u03b4', '\u03ed', '\u03ec', '\u03ed'],
        fg: '#3893b6',
      },
      {
        type: 'Collidable',
        key: 'Collidable',
      },
      {
        type: 'Collectable',
        key: 'Collectable',
        item: {
          id: 'halitus',
          name: 'Halitus'
        },
      }
    ]
  };
}
