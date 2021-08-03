import { System } from "ape-ecs";
import { SYSTEM_GROUP_NONE } from "systems/groups";
import items from 'data/items';

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
      if (message.type == 'ITEM_USE') {
        const { item: { id } } = message.data;
        const item = items.find(item => item.id == id);
        if (!item) throw new Error(`Item "${id}" not found.`);
        item.onUse(this.world.getEntity('player'));
      }
      next();
    };
  }

  update(tick) {
  }
}

export default ItemSystem;
