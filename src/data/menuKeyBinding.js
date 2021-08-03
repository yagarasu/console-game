export default [
  {
    key: 'p',
    event: 'keydown',
    message: { type: 'TOGGLE_MENU_CMD', data: { menu: 'PLAYER' } }
  },
  {
    key: 'g',
    event: 'keydown',
    message: { type: 'TOGGLE_MENU_CMD', data: { menu: 'GRIMOIRE' } }
  },
  {
    key: 'i',
    event: 'keydown',
    message: { type: 'TOGGLE_MENU_CMD', data: { menu: 'INVENTORY' } }
  },
  {
    key: 'PageUp',
    event: 'keydown',
    message: { type: 'MENU_MOVE_CMD', data: { dir: 'UP' } }
  },
  {
    key: 'PageDown',
    event: 'keydown',
    message: { type: 'MENU_MOVE_CMD', data: { dir: 'DOWN' } }
  },
  {
    key: 'Enter',
    event: 'keydown',
    message: { type: 'MENU_SELECT_CMD' }
  },
];
