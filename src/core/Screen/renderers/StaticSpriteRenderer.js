class StaticSpriteRendered {
  static render({ entityManager }, display) {
    const entities = entityManager.filterByAllComponentName(['position', 'staticSprite']);
    entities.forEach(entity => {
      const { x, y } = entity.position;
      const { ch, fg, bg } = entity.staticSprite;
      display.draw(x, y, ch, fg, bg);
    });
  }
}

export default StaticSpriteRendered;
