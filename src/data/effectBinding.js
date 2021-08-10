import { airForce, randomForce } from 'systems/particleForces';

export default [
  {
    test: ({ type }) => type === 'ITEM_COLLECT',
    buildEffect: ({ data }) => {
      const { subject } = data;
      let particles = null;
      return {
        removeAt: performance.now() + 500,
        onEnqueue: () => {
          particles = subject.addComponent({
            type: 'ParticleEmitter',
            forces: [randomForce(3,5), airForce(-90, 1, 0)],
            maxParticles: 50,
            particlesPerSecond: 20,
            particleLife: 16,
            maxVelocity: 5,
            particleSize: [2, 1],
            blendingMode: 'screen',
            colors: ['#e33434', '#ffc6c6'],
          });
        },
        onRemove: () => {
          subject.removeComponent(particles);
        }
      };
    }
  },

  {
    test: ({ type, data: { entity } = {} }) => type === 'DAMAGE_CMD' && entity.id === 'player',
    buildEffect: ({ data }) => {
      const { entity } = data;
      let particles = null;
      return {
        removeAt: performance.now() + 250,
        onEnqueue: () => {
          particles = entity.addComponent({
            type: 'ParticleEmitter',
            forces: [randomForce(0.5,1)],
            maxParticles: 50,
            particlesPerSecond: 20,
            particleLife: 8,
            maxVelocity: 5,
            particleSize: [3, 5],
            blendingMode: 'screen',
            colors: ['#6a9f9d', '#C3D8D7'],
          });
        },
        onRemove: () => {
          entity.removeComponent(particles);
        }
      };
    }
  },

  {
    test: ({ type }) => type === 'ENTITY_DEAD_EVT',
    buildEffect: ({ data }) => {
      const { entity } = data;
      let particles = null;
      return {
        removeAt: performance.now() + 1000,
        onEnqueue: () => {
          particles = entity.addComponent({
            type: 'ParticleEmitter',
            forces: [airForce(-90, 1, 2)],
            maxParticles: 10,
            particlesPerSecond: 1,
            particleLife: 64,
            maxVelocity: 2,
            particleSize: [15, 2],
            blendingMode: 'screen',
            colors: ['#396494', '#d0e6ff'],
          });
        },
        onRemove: () => {
          entity.removeComponent(particles);
        }
      };
    }
  }
];
