import { distance, normalizeVector } from "core/utils/mathUtils";

const STATE_WANDER = 'wander';
const STATE_FOLLOW = 'follow';

export default function follower(entity) {
  const ai = entity.getOne('AI');
  const { state } = ai;
  if (state.tick < state.cooldown) {
    state.tick++;
    ai.update();
    return;
  }
  state.tick = 0;
  const fns = {
    wander: () => {
      const rndx = Math.round((Math.random() * 2) - 1);
      const rndy = Math.round((Math.random() * 2) - 1);
      const movable = entity.getOne('Movable');
      movable.update({
        dx: rndx,
        dy: rndy,
      });
      const { x, y } = entity.getOne('Position');
      const player = this.world.getEntity('player');
      const { x: px, y: py } = player.getOne('Position');
      const dist = distance(x, y, px, py);
      if (dist < 7) {
        state.state = STATE_FOLLOW;
      }
    },
    follow: () => {
      const { x, y } = entity.getOne('Position');
      const player = this.world.getEntity('player');
      const { x: px, y: py } = player.getOne('Position');
      const dx = px - x;
      const dy = py - y;
      const [ndx, ndy] = normalizeVector(dx, dy);
      const movable = entity.getOne('Movable');
      movable.update({
        dx: ndx,
        dy: ndy,
      });
    },
  };
  const fn = fns[state.state] ?? fns.wander;
  fn();
  ai.update();
}