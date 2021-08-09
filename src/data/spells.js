import { randomVectorOfRandomMagnitudeBetween, randomIntBetween, successCheck } from 'core/utils/mathUtils';
import { criticalHitProbByFocus } from 'core/utils/statUtils';

export default [
  {
    id: 'banishing',
    name: 'Banishing',
    description: 'Force an entity to retreat',
    area: 3,
    strength: 10,
    cost: 3,
    calculateDamage: (player, enemy, spell) => {
      const { will, focus } = player.getOne('Stats');
      const { will: enemyWill } = enemy.getOne('MobStats');
      const willDelta = will / enemyWill;
      return spell.strength * willDelta;
    },
    onCast: (spell, player, world, effectManager, soundManager) => {
      const stats = player.getOne('Stats');
      const { focus, maxFocus } = stats;
      const critical = successCheck(criticalHitProbByFocus(focus / maxFocus));
      stats.update({ energy: stats.energy - spell.cost });
      let particles;
      effectManager.enqueueEffect({
        removeAt: performance.now() + 500,
        onEnqueue: () => {
          particles = player.addComponent({
            type: 'ParticleEmitter',
            forces: [],
            initialParticles: critical ? 500 : 100,
            startingAcceleration: () => randomVectorOfRandomMagnitudeBetween(1,2),
            maxParticles: critical ? 500 : 100,
            particlesPerSecond: 50,
            particleLife: 32,
            maxVelocity: 2,
            particleSize: [5, 1],
            blendingMode: 'screen',
            colors: ['#644089', '#D0C5DB'],
          });
        },
        onRemove: () => {
          player.removeComponent(particles);
        }
      });
      if (critical) {
        soundManager.play('thunder', 'thunder');
      }
      soundManager.play('choir', 'choir' + randomIntBetween(1, 4));
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
        const criticalBonus = critical ? 2 : 1;
        stats.update({ energy: stats.energy - (damage * criticalBonus) });
      });
      console.log('BOOM!', nearby);
    }
  },

  {
    id: 'breath',
    name: 'Breath',
    description: 'Refill focus',
    onCast: (spell, player, world, effectManager, soundManager) => {
      const stats = player.getOne('Stats');
      stats.update({ focus: stats.focus + randomIntBetween(1, 10) });
      let particles;
      effectManager.enqueueEffect({
        removeAt: performance.now() + 500,
        onEnqueue: () => {
          particles = player.addComponent({
            type: 'ParticleEmitter',
            forces: [],
            initialParticles: 50,
            startingAcceleration: () => randomVectorOfRandomMagnitudeBetween(1,2),
            maxParticles: 50,
            particlesPerSecond: 50,
            particleLife: 32,
            maxVelocity: 2,
            particleSize: [5, 1],
            blendingMode: 'screen',
            colors: ['#771a98', '#f4d5ff'],
          });
        },
        onRemove: () => {
          player.removeComponent(particles);
        }
      });
      soundManager.play('choir', 'choir' + randomIntBetween(1, 4));
    }
  }
];