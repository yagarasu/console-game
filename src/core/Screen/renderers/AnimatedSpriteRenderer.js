class StaticSpriteRendered {
  static render({ entityManager, mapManager, display, camera }) {
    const map = mapManager.getMap();
    entityManager.filterByAllComponentName(['position', 'animatedSprite'])
      .filter(({ position: { x, y } }) => camera.globalIsVisible(x, y))
      .forEach(entity => {
        const { x, y } = entity.position;
        const [lx, ly] = camera.transformGlobalToLocal(x, y);
        const { currentFrame, frames, tickCount } = entity.animatedSprite;
        const { ch, fg, bg, duration = 1 } = frames[currentFrame];
        const { bg: tileBg } = map.getTile(x, y);
        display.draw(lx, ly, ch, fg, bg ?? tileBg);
        const nextState = {
          currentFrame,
          tickCount
        }
        if (tickCount >= duration) {
          if (currentFrame >= frames.length - 1) {
            nextState.currentFrame = 0;
          } else {
            nextState.currentFrame++;
          }
          nextState.tickCount = 0;
        } else {
          nextState.tickCount++;
        }
        entityManager.updateComponent(entity.id, 'animatedSprite', nextState);
      });
  }
}

export default StaticSpriteRendered;
