export default [
  {
    id: 'breath',
    name: 'Breath',
    sequence: [
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
    ],
    message: { type: 'CAST_SPELL_CMD', data: { spellId: 'breath' } }
  }
];
