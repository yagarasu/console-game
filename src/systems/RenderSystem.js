import { Color } from "rot-js";
import { System } from "ape-ecs";
import Camera from "core/Camera";
import { SYSTEM_GROUP_FRAME } from "systems/groups";

class RenderSystem extends System {
  static group = SYSTEM_GROUP_FRAME;

  init(screen) {
    this.screen = screen;
    this.camera = this.createQuery().fromAll('MainCamera', 'Viewport');
    this.map = this.createQuery().fromAll('Tilemap');
    this.staticSprites = this.createQuery().fromAll('Position', 'StaticSprite');
  }

  update(tick) {
    this.render(tick);
  }

  render(tick) {
    const cameraData = this.camera.execute();
    const [mainCameraData] = cameraData.values();
    const { x, y, width, height } = mainCameraData.getOne('Viewport');
    const camera = new Camera(this.screen, { x, y, width, height });
    const display = this.screen.getDisplay();
    display.clear();
    this.renderTilemap(tick, camera);
    this.renderStaticSprites(tick, camera);
  }
  
  renderTilemap(tick, camera) {
    const display = this.screen.getDisplay();
    const entities = this.map.execute();
    for (const entity of entities) {
      const { map, mapData } = entity.getOne('Tilemap');
      camera.forEachLocalTile((lx, ly, gx, gy) => {
        const tile = map.getTile(gx, gy);
        const data = mapData.getData(gx, gy);
        if (!tile) return;
        const { fg, bg, char } = tile;
        // const { visibility: { v = 0 } = {}, known } = data ?? {};
        // const finalFg = this.calculateColor(fg, v, known);
        // const finalBg = this.calculateColor(bg, v, known);
        // display.draw(lx, ly, char, finalFg, finalBg);
        display.draw(lx, ly, char, fg, bg);
      });
    }
  }

  renderStaticSprites(tick, camera) {
    const display = this.screen.getDisplay();
    const entities = this.staticSprites.execute();
    for (const entity of entities) {
      const position = entity.getOne('Position');
      if (!camera.globalIsVisible(position.x, position.y)) continue;
      const [lx, ly] = camera.transformGlobalToLocal(position.x, position.y);
      const sprite = entity.getOne('StaticSprite');
      display.draw(lx, ly, sprite.ch, sprite.fg, sprite.bg);
    }
  }

  calculateColor(color, visibility, known) {
    let percentage = 0;
    if (visibility < 0.3 && known) {
      percentage = 0.3;
    } else {
      percentage = visibility;
    }
    return Color.toHex(Color.interpolate([0, 0, 0], Color.fromString(color), percentage));
  }
}

export default RenderSystem;
