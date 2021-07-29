import { System } from "ape-ecs";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class ProximitySystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init() {
    this.triggers = this.createQuery().fromAll('ProximityTrigger', 'Position').persist();
    this.clients = this.createQuery().fromAll('ProximityClient', 'Position').persist();
  }

  update(tick) {
    const clients = this.clients.execute();
    const triggersSet = this.triggers.execute();
    const triggers = [...triggersSet];
    const positions = triggers.reduce((acc, entity) => {
      const { x, y } = entity.getOne('Position')
      return [
        ...acc,
        { x, y, entity }
      ];
    }, []);
    for (const client of clients) {
      const { x: cx, y: cy } = client.getOne('Position');
      const nearbyEntities = positions.filter(({ x, y }) =>
      (cx == x && cy == y) ||
      (cx == x && (cy - 1) == y) ||
      (cx == x && (cy + 1) == y) ||
      ((cx - 1) == x && cy == y) ||
      ((cx + 1) == x && cy == y)
      );
      const proximityClient = client.getOne('ProximityClient');
      if (nearbyEntities.length > 0) {
        proximityClient.update({
          nearbyEntities
        });
      } else {
        proximityClient.update({
          nearbyEntities: []
        });
      }
    }
  }
}

export default ProximitySystem;
