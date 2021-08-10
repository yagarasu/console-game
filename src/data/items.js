import { clamp } from 'core/utils/mathUtils';

export default [
  {
    id: 'halitus',
    onUse: (player) => {
      const stats = player.getOne('Stats');
      stats.update({ energy: clamp(stats.energy + 10, 0, stats.maxEnergy) });
    }
  },
  {
    id: 'consciousnessFragment',
    onUse: (player) => {
      const stats = player.getOne('Stats');
      stats.update({ energy: clamp(stats.energy + 25, 0, stats.maxEnergy) });
    }
  }
];