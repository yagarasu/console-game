class StaticSpriteRendered {
  constructor({ EntityManager, MapManager }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
  }

  render({ display, camera }) {
    const map = this.mapManager.getMap();
    this.entityManager.filterByAllComponentName(['position', 'animatedSprite'])
      .filter(({ position: { x, y } }) => camera.globalIsVisible(x, y))
      .forEach(entity => {
        const { x, y } = entity.position;
        const [lx, ly] = camera.transformGlobalToLocal(x, y);
        const { currentFrame, frames, tickCount } = entity.animatedSprite;
        const { ch, fg, bg, duration = 1 } = frames[currentFrame];
        const tileBg = map.getTile(x, y)?.bg;
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
        this.entityManager.updateComponent(entity.id, 'animatedSprite', nextState);
      });
  }
}

export default StaticSpriteRendered;
