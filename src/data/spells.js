import { randomVectorOfRandomMagnitudeBetween, randomIntBetween, successCheck, clamp } from 'core/utils/mathUtils';
import { criticalHitProbByFocus } from 'core/utils/statUtils';
import flame from 'entityTemplates/flame';

export default [
  {
    id: 'banish',
    name: 'Banish',
    icon: '\u269D',
    description: 'Force an entity to retreat',
    area: 3,
    strength: 10,
    cost: 10,
    calculateDamage: (player, enemy, spell) => {
      const { will, focus } = player.getOne('Stats');
      const { will: enemyWill } = enemy.getOne('MobStats');
      const willDelta = will / enemyWill;
      return spell.strength * willDelta;
    },
    onCast: (spell, player, game, effectManager, soundManager) => {
      const stats = player.getOne('Stats');
      const { focus, maxFocus } = stats;
      const critical = successCheck(criticalHitProbByFocus(focus / maxFocus));
      if ((stats.energy - spell.cost) < 0) {
        return;
      }
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
      const enemies = Array.from(game.world.createQuery().fromAll('Enemy', 'Position').not('Dead').execute());
      const nearby = enemies.filter(enemy => {
        const { x: ex, y: ey } = enemy.getOne('Position');
        const d = Math.sqrt(((ex - x) * (ex - x)) + ((ey - y) * (ey - y)));
        return d < spell.area;
      });
      nearby.forEach((enemy) => {
        const damage = spell.calculateDamage(player, enemy, spell);
        const criticalBonus = critical ? 2 : 1;
        game.messageQueue.enqueue({
          type: 'DAMAGE_CMD',
          data: {
            entity: enemy,
            agent: player,
            spell,
            damage: damage * criticalBonus,
          }
        });
      });
    }
  },

  {
    id: 'breath',
    name: 'Breath',
    icon: '\u269D',
    description: 'Refill focus',
    onCast: (spell, player, game, effectManager, soundManager) => {
      const stats = player.getOne('Stats');
      stats.update({ focus: clamp(stats.focus + randomIntBetween(1, 10), 0, stats.maxFocus) });
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
  },

  {
    id: 'flame',
    name: 'Flame',
    icon: '\u269D',
    description: 'Project your will as a flame of fire',
    cost: 3,
    onCast: (spell, player, game, effectManager, soundManager) => {
      const stats = player.getOne('Stats');
      if ((stats.energy - spell.cost) < 0) {
        return;
      }
      stats.update({ energy: stats.energy - spell.cost });
      const { direction } = player.getOne('Movable');
      const { x, y } = player.getOne('Position');
      game.world.createEntity(flame(x, y, direction));
    }
  }
];