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
];
