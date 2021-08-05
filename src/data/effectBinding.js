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
            lastUpdated: performance.now(),
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
    test: ({ type }) => type === 'PROXIMITY_DAMAGE_EVT',
    buildEffect: ({ data }) => {
      const { object } = data;
      let particles = null;
      return {
        removeAt: performance.now() + 250,
        onEnqueue: () => {
          particles = object.addComponent({
            type: 'ParticleEmitter',
            lastUpdated: performance.now(),
            forces: [randomForce(5,10)],
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
          object.removeComponent(particles);
        }
      };
    }
  }
];
