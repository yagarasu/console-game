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
  }
];
