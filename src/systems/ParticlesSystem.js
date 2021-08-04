import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import { clampVector, randomVectorOfRandomMagnitudeBetween } from "core/utils/mathUtils";

class ParticlesSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.entities = this.createQuery().fromAll('ParticleEmitter').persist();
  }

  createParticle(ttl) {
    const [ax, ay] = randomVectorOfRandomMagnitudeBetween(0, 5);
    const [vx, vy] = randomVectorOfRandomMagnitudeBetween(0, 5);
    return {
      life: 0,
      lifePercent: 0,
      ttl,
      x: 0,
      y: 0,
      vx,
      vy,
      ax,
      ay,
    };
  }

  updateParticle(particle, emitter) {
    const { maxVelocity, particleLife } = emitter;
    const newState = { ...particle };
    const { vx, vy, ax, ay } = newState;
    const [clampedVx, clampedVy] = clampVector(vx + ax, vy + ay, maxVelocity);
    newState.vx = clampedVx;
    newState.vy = clampedVy;
    newState.x += newState.vx;
    newState.y += newState.vy;
    newState.life++;
    newState.lifePercent = newState.life / particleLife;
    return newState;
  }

  updateEmiter(tick, entity) {
    const emitter = entity.getOne('ParticleEmitter');
    const {
      lastUpdated,
      maxParticles,
      particlesPerSecond,
      particleLife
    } = emitter;
    const now = performance.now();
    const delta = (now - lastUpdated) / 1000;
    const particles = emitter.particles
      .map(particle => this.updateParticle(particle, emitter))
      .filter(({ life, ttl }) => life < ttl);
    const newParticlesOnTick = Math.ceil(delta * particlesPerSecond);
    const newParticleCount = maxParticles - (particles.length + newParticlesOnTick)
    if (newParticleCount > 0) {
      for (let i = 0; i < newParticleCount * delta; i++) {
        particles.push(this.createParticle(particleLife));
      }
    }
    emitter.update({ particles, lastUpdated: performance.now() });
  }

  update(tick) {
    const entities = this.entities.execute();
    for (const entity of entities) {
      this.updateEmiter(tick, entity);
    }
  }
}

export default ParticlesSystem;
