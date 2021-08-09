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
          const { bag } = inventory;
          const itemInBag = bag.find(i => i.id === collectable.item.id);
          if (itemInBag) {
            itemInBag.amount++;
          } else {
            inventory.update({
              bag: [...inventory.bag, { ...collectable.item, amount: 1 }],
            });
          }
          object.destroy();
          this.messageQueue.enqueue({ type: 'ITEM_COLLECT', data: { item: object, subject } });
        }
      }
      if (message.type == 'ITEM_USE') {
        const player = this.world.getEntity('player');
        const { item: { id } } = message.data;
        const item = items.find(item => item.id == id);
        if (!item) throw new Error(`Item "${id}" not found.`);
        item.onUse(player);
        const inventory = player.getOne('InventoryHolder');
        const { bag } = inventory;
        const itemInBag = bag.find(i => i.id === id);
        itemInBag.amount--;
        if (itemInBag.amount <= 0) {
          inventory.update({ bag: bag.filter(i => i.id !== id) });
        }
      }
      next();
    };
  }

  update(tick) {
  }
}

export default ItemSystem;
