export default function fiend(entity) {
  const ai = entity.getOne('AI');
  const { state } = ai;
  if (state.tick < state.cooldown) {
    state.tick++;
    ai.update();
    return;
  }
  state.tick = 0;
  ai.update();
  const rndx = Math.round((Math.random() * 2) - 1);
  const rndy = Math.round((Math.random() * 2) - 1);
  const movable = entity.getOne('Movable');
  movable.update({
    dx: rndx,
    dy: rndy,
  });
}