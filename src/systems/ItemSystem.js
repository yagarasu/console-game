import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";

class ItemSystem extends System {
  static group = SYSTEM_GROUP_NONE;

  init(messageQueue) {
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type == 'COLLISION_EVT') {
        const { subject, object } = message.data;
        if(subject.has('InventoryHolder') && object.has('Collectable')) {
          const inventory = subject.getOne('InventoryHolder');
          const collectable = object.getOne('Collectable');
          inventory.update({
            bag: [...inventory.bag, collectable.item],
          });
          object.destroy();
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default ItemSystem;
