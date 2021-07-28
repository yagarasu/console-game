export default [
  {
    key: 'ArrowUp',
    event: 'keydown',
    message: { type: 'MOVE_CMD', data: { direction: 'up' } }
  },
  {
    key: 'ArrowDown',
    event: 'keydown',
    message: { type: 'MOVE_CMD',  data: { direction: 'down' } }
  },
  {
    key: 'ArrowLeft',
    event: 'keydown',
    message: { type: 'MOVE_CMD', data: { direction: 'left' } }
  },
  {
    key: 'ArrowRight',
    event: 'keydown',
    message: { type: 'MOVE_CMD', data: { direction: 'right' } }
  }
];
