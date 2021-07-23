export default function PlayerController({ EntityManager }) {
  const ID = 'player';
  return () => next => event => {
    const playerEntity = EntityManager.getEntity(ID);
    const currentPosition = playerEntity.position;
    if (event.type === 'MOVE') {
      switch (event.direction) {
        case 'UP':
          EntityManager.updateComponent(ID, 'position', { y: currentPosition.y - 1 });
          break;
        case 'DOWN':
          EntityManager.updateComponent(ID, 'position', { y: currentPosition.y + 1 });
          break;
        case 'RIGHT':
          EntityManager.updateComponent(ID, 'position', { x: currentPosition.x + 1 });
          break;
        case 'LEFT':
          EntityManager.updateComponent(ID, 'position', { x: currentPosition.x - 1 });
          break;
      }
    }
    if (event.type === 'CAST') {
      console.log('BOOM');
    }
    next();
  };
}