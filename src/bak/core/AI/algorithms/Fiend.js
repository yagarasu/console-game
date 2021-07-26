export default ({ EntityManager }) => (prevState, entity) => {
  const { state, tick = 0 } = prevState;
  const newState = { state, tick };
  if (!state) newState.state = 'wander';
  if (tick < 8) {
    newState.tick++;
    return newState;
  }
  newState.tick = 0;
  const statesBehavior = {
    wander: () => {
      const { position } = entity;
      const rx = Math.round((Math.random() * 2) - 1);
      const ry = Math.round((Math.random() * 2) - 1);
      EntityManager.updateComponent(entity.id, 'position', { x: position.x + rx, y: position.y + ry });
    }
  }
  statesBehavior[newState.state]();
  return newState;
};
