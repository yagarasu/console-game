export default function mainCamera(id, startingx, startingy) {
  return {
    id,
    tags: ['FollowWithMainCamera', 'MoveWithKeyboard', 'FOVAlly', 'DamageTaker'],
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
      }
    ]
  };
}
