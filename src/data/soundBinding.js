import { randomIntBetween } from 'core/utils/mathUtils';

export default [
  {
    test: ({ type }) => type === 'PROXIMITY_DAMAGE_EVT',
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
  }
];