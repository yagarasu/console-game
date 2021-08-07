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
        type: 'StartingPosition',
        key: 'StartingPosition',
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
      }
    ]
  };
}
