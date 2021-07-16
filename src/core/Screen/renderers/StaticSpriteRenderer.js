class StaticSpriteRendered {
  static render({ entityManager, display, camera }) {
    const entities = entityManager.filterByAllComponentName(['position', 'staticSprite'])
      .filter(({ position: { x, y } }) => camera.globalIsVisible(x, y))
      .forEach(entity => {
        const { x, y } = entity.position;
        const { ch, fg, bg } = entity.staticSprite;
        const [lx, ly] = camera.transformGlobalToLocal(x, y);
        display.draw(lx, ly, ch, fg, bg);
      });
  }
}

export default StaticSpriteRendered;
