class StaticSpriteRendered {
  constructor({ EntityManager, MapManager }) {
    this.entityManager = EntityManager;
    this.mapManager = MapManager;
  }

  render({ display, camera }) {
    const map = this.mapManager.getMap();
    const mapData = this.mapManager.getMapData();
    this.entityManager.filterByAllComponentName(['position', 'staticSprite'])
      .filter(({ position: { x, y } }) => camera.globalIsVisible(x, y))
      .filter(({ position: { x, y } }) => mapData.getData(x, y)?.visibility?.v > 0.3)
      .forEach(entity => {
        const { x, y } = entity.position;
        const { ch, fg, bg } = entity.staticSprite;
        const [lx, ly] = camera.transformGlobalToLocal(x, y);
        const tileBg = map.getTile(x, y)?.bg;
        display.draw(lx, ly, ch, fg, bg ?? tileBg);
      });
  }
}

export default StaticSpriteRendered;
