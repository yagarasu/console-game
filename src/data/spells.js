export default [
  {
    id: 'banishing',
    name: 'Banishing',
    description: 'Force an entity to retreat',
    area: 3,
    strength: 5,
    cost: 3,
    focusBonus: 1.5,
    calculateDamage: (player, enemy, spell) => {
      const { will, focus } = player.getOne('Stats');
      const { will: enemyWill } = enemy.getOne('MobStats');
      const willDelta = will / enemyWill;
      const fBonus = (focus / 100) * spell.focusBonus;
      return spell.strength * fBonus * willDelta;
    },
    onCast: (spell, player, world) => {
      const stats = player.getOne('Stats');
      stats.update({ energy: stats.energy - spell.cost });
      const { x, y } = player.getOne('Position');
      const enemies = Array.from(world.createQuery().fromAll('Enemy', 'Position').not('Dead').execute());
      const nearby = enemies.filter(enemy => {
        const { x: ex, y: ey } = enemy.getOne('Position');
        const d = Math.sqrt(((ex - x) * (ex - x)) + ((ey - y) * (ey - y)));
        return d < spell.area;
      });
      nearby.forEach((enemy) => {
        const stats = enemy.getOne('MobStats');
        const damage = spell.calculateDamage(player, enemy, spell);
        stats.update({ energy: stats.energy - damage });
      });
      console.log('BOOM!', nearby);
    }
  }
];