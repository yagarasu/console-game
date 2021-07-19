class StaticSpriteRendered {
  static render({ entityManager, mapManager, display, camera }) {
    const map = mapManager.getMap();
    entityManager.filterByAllComponentName(['position', 'staticSprite'])
      .filter(({ position: { x, y } }) => camera.globalIsVisible(x, y))
      .forEach(entity => {
        const { x, y } = entity.position;
        const { ch, fg, bg } = entity.staticSprite;
        const [lx, ly] = camera.transformGlobalToLocal(x, y);
        const { bg: tileBg } = map.getTile(x, y) ?? {};
        display.draw(lx, ly, ch, fg, bg ?? tileBg);
      });
  }
}

export default StaticSpriteRendered;
