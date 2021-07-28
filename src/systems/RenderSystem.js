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
    this.animatedSprites = this.createQuery().fromAll('Position', 'AnimatedSprite');
    this.fovAllies = this.createQuery().fromAll('FOVAlly', 'Vision');
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
    this.renderAnimatedSprites(tick, camera);
  }

  calculateSharedFov() {
    const fovAllies = Array.from(this.fovAllies.execute());
    return fovAllies.reduce((acc, ally) => {
      const { data } = ally.getOne('Vision');
      const knownTiles = Object.keys(acc);
      const newTiles = Object.keys(data);
      const shared = newTiles.filter(newTile => knownTiles.includes(newTile));
      const haveMoreInfo = shared.filter(tile => data[tile].v > knownTiles[tile]);
      const newInfo = newTiles.filter(newTile => !knownTiles.includes(newTile));
      return {
        ...acc,
        ...haveMoreInfo.reduce((acc, coord) => ({ ...acc, [coord]: data[coord].v }), {}),
        ...newInfo.reduce((acc, coord) => ({ ...acc, [coord]: data[coord].v }), {}),
      }
    }, {});
  }
  
  renderTilemap(tick, camera) {
    const calculateColor = (color, visibility, known) => {
      let percentage = 0;
      if (visibility < 0.3 && known) {
        percentage = 0.3;
      } else {
        percentage = visibility;
      }
      return Color.toHex(Color.interpolate([0, 0, 0], Color.fromString(color), percentage));
    }
    const display = this.screen.getDisplay();
    const entities = this.map.execute();
    const sharedFov = this.calculateSharedFov();
    for (const entity of entities) {
      const vision = entity.has('Vision') ? entity.getOne('Vision') : { data: {}};
      const { map, mapData } = entity.getOne('Tilemap');
      camera.forEachLocalTile((lx, ly, gx, gy) => {
        const tile = map.getTile(gx, gy);
        if (!tile) return;
        const { fg, bg, char } = tile;
        const ffg = calculateColor(fg, sharedFov[`${gx},${gy}`], true);
        const fbg = calculateColor(bg, sharedFov[`${gx},${gy}`], true);
        display.draw(lx, ly, char, ffg, fbg);
      });
    }
  }

  renderStaticSprites(tick, camera) {
    const display = this.screen.getDisplay();
    const [mapEntity] = this.map.execute();
    const { map } = mapEntity.getOne('Tilemap');
    const entities = this.staticSprites.execute();
    for (const entity of entities) {
      const position = entity.getOne('Position');
      if (!camera.globalIsVisible(position.x, position.y)) continue;
      const tileBg = map.getTile(position.x, position.y)?.bg;
      const [lx, ly] = camera.transformGlobalToLocal(position.x, position.y);
      const sprite = entity.getOne('StaticSprite');
      display.draw(lx, ly, sprite.ch, sprite.fg, sprite.bg ?? tileBg);
    }
  }

  renderAnimatedSprites(tick, camera) {
    const display = this.screen.getDisplay();
    const [mapEntity] = this.map.execute();
    const { map } = mapEntity.getOne('Tilemap');
    const entities = this.animatedSprites.execute();
    for (const entity of entities) {
      const position = entity.getOne('Position');
      if (!camera.globalIsVisible(position.x, position.y)) continue;
      const tileBg = map.getTile(position.x, position.y)?.bg;
      const [lx, ly] = camera.transformGlobalToLocal(position.x, position.y);
      const sprite = entity.getOne('AnimatedSprite');
      const { frames, currentFrame, ticks, frameDuration } = sprite;

      display.draw(lx, ly, frames[currentFrame], sprite.fg, sprite.bg ?? tileBg);      

      if (ticks >= frameDuration) {
        if (currentFrame >= frames.length - 1) {
          sprite.currentFrame = 0;
        } else {
          sprite.currentFrame++;
        }
        sprite.ticks = 0;
      } else {
        sprite.ticks++;
      }
      sprite.update();
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
