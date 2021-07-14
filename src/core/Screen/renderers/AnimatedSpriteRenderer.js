class StaticSpriteRendered {
  static render({ entityManager }, display) {
    const entities = entityManager.filterByAllComponentName(['position', 'animatedSprite']);
    entities.forEach(entity => {
      const { x, y } = entity.position;
      const { currentFrame, frames, tickCount } = entity.animatedSprite;
      const { ch, fg, bg, duration = 1 } = frames[currentFrame];
      display.draw(x, y, ch, fg, bg);
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
