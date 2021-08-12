import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";
import { vectorToDirection } from 'core/utils/mathUtils';

class ProjectileSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(messageQueue, scriptManager) {
    this.scriptManager = scriptManager;
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
    this.entities = this.createQuery().fromAll('Projectile', 'Movable').persist();
  }

  consumer() {
    return next => message => {
      next();
      if (message.type === 'COLLISION_EVT') {
        const { data: { subject, object } = {} } = message;
        if (subject.has('Projectile')) {
          const projectile = subject.getOne('Projectile');
          const { onHit } = projectile;
          this.scriptManager.runScript(onHit, subject, object);
        }
      }
    };
  }

  update(tick) {
    const entities = this.entities.execute();
    for (const entity of entities) {
      const projectile = entity.getOne('Projectile');
      projectile.tickCount++;
      if (projectile.tickCount > projectile.moveEachNticks) {
        const movable = entity.getOne('Movable');
        movable.dx = projectile.vx;
        movable.dy = projectile.vy;
        movable.direction = vectorToDirection(projectile.vx, projectile.vy);
        projectile.tickCount = 0;
      }
      projectile.update();
    }
  }
}

export default ProjectileSystem;
