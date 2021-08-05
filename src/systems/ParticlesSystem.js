import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import { clampVector } from "core/utils/mathUtils";
import Camera from "core/Camera";

class ParticlesSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(screen) {
    this.screen = screen;
    this.entities = this.createQuery().fromAll('ParticleEmitter').persist();
    this.camera = this.createQuery().fromAll('MainCamera', 'Viewport');
  }

  createParticle(ttl, x, y, startingAcceleration) {
    let ax = 0, ay = 0;
    if (startingAcceleration) {
      ax = startingAcceleration[0];
      ay = startingAcceleration[1];
    }
    return {
      life: 0,
      lifePercent: 0,
      ttl,
      x,
      y,
      vx: 0,
      vy: 0,
      ax,
      ay,
    };
  }

  applyForce(x, y, [fx, fy]) {
    return [x + fx, y + fy];
  }

  applyForces(x, y, forces) {
    return forces.reduce(([x, y], force) => {
      let vect = force;
      if (typeof force === 'function') {
        vect = force(x, y);
      }
      return this.applyForce(x, y, vect);
    }, [x, y]);
  }

  updateParticle(particle, emitter) {
    const { maxVelocity, particleLife, forces } = emitter;
    const newState = { ...particle };
    const { vx, vy, ax: initialAx, ay: initialAy } = newState;
    const [ax, ay] = this.applyForces(initialAx, initialAy, forces);
    const [clampedVx, clampedVy] = clampVector(vx + ax, vy + ay, maxVelocity);
    newState.vx = clampedVx;
    newState.vy = clampedVy;
    newState.x += newState.vx;
    newState.y += newState.vy;
    newState.life++;
    newState.lifePercent = newState.life / particleLife;
    return newState;
  }

  updateEmiter(tick, entity, emitter) {
    const { x: tx, y: ty } = entity.getOne('Position');
    const [x, y] = this.screen.getTileCenter(tx, ty);
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
    if (lastUpdated === 0) {
      const {
        initialParticles,
        startingAcceleration
      } = emitter;
      for (let i = 0; i < initialParticles; i++) {
        particles.push(this.createParticle(particleLife, x, y, startingAcceleration()));
      }
    }
    const newParticlesOnTick = Math.ceil(delta * particlesPerSecond);
    const newParticleCount = maxParticles - (particles.length + newParticlesOnTick)
    if (newParticleCount > 0) {
      for (let i = 0; i < newParticleCount * delta; i++) {
        particles.push(this.createParticle(particleLife, x, y));
      }
    }
    emitter.update({ particles, lastUpdated: performance.now() });
  }

  update(tick) {
    const cameraData = this.camera.execute();
    const [mainCameraData] = cameraData.values();
    const { x, y, width, height } = mainCameraData.getOne('Viewport');
    const camera = new Camera(this.screen, { x, y, width, height });
    const entities = this.entities.execute();
    for (const entity of entities) {
      const { x: ex, y: ey } = entity.getOne('Position');
      if (!camera.globalIsVisible(ex, ey)) continue;
      const emitters = entity.getComponents('ParticleEmitter');
      for (const emitter of emitters) {
        this.updateEmiter(tick, entity, emitter);
      }
    }
  }
}

export default ParticlesSystem;
