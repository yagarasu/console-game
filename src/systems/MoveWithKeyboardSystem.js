import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";

class MoveWithKeyboardSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
    this.target = this.createQuery().fromAll('MoveWithKeyboard', 'Movable').persist();
  }

  consumer() {
    const targets = this.target.execute();
    return next => message => {
      if (message.type === 'MOVE_CMD') {
        for (const target of targets) {
          const movable = target.getOne('Movable');
          switch (message.data.direction) {
            case 'up': movable.dy = -1; break;
            case 'down': movable.dy = 1; break;
            case 'left': movable.dx = -1; break;
            case 'right': movable.dx = 1; break;
          }
          movable.direction = message.data.direction;
          movable.update();
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default MoveWithKeyboardSystem;
