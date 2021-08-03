export default [
  {
    id: 'halitus',
    onUse: (player) => {
      const stats = player.getOne('Stats');
      stats.update({ energy: stats.energy + 10 });
    }
  }
];