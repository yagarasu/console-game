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
      }
    ]
  };
}
