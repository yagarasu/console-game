export default [
  {
    id: 'flame-onHit',
    script: (projectile, target) => {
      if (target.has('MobStats')) {
        const DAMAGE = 20;
        projectile.destroy();
        const stats = target.getOne('MobStats');
        stats.update({ energy: stats.energy - DAMAGE });
      }
    }
  }
];