import { randomIntBetween } from 'core/utils/mathUtils';

export default [
  {
    test: ({ type, data: { entity } = {} }) => type === 'DAMAGE_CMD' && entity.id === 'player',
    run: (message, sounds) => sounds.hit.play('hit' + randomIntBetween(1,5)),
  },
  {
    test: ({ type }) => type === 'ENTITY_DEAD_EVT',
    run: (message, sounds, play) => {
      const { data: { entity } } = message;
      if (entity.has('Enemy')) {
        play('monsterRoarAggr', 'dead');
      }
    },
  },{
    test: ({ type }) => type === 'ITEM_COLLECT',
    run: (message, sounds, play) => {
      play('chimes', 'chimes' + randomIntBetween(1,3));
      // @TODO: Use different sounds for different items
    }
  }
];