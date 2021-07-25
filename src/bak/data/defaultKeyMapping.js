export default {
  // Player nav
  'ArrowUp':     { type: 'MOVE', direction: 'UP' },
  'ArrowDown':   { type: 'MOVE', direction: 'DOWN' },
  'ArrowRight':  { type: 'MOVE', direction: 'RIGHT' },
  'ArrowLeft':   { type: 'MOVE', direction: 'LEFT' },
  // Player actions
  'Control':     { type: 'CAST', which: 'PRIMARY' },
  // Menus
  'p':           { type: 'MENU_TOGGLE', menu: 'PLAYER' },
  'g':           { type: 'MENU_TOGGLE', menu: 'GRIMOIRE' },
};
