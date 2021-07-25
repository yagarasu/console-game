import { Map, RNG } from 'rot-js';

class DungeonGenerator {
  static digger(tilemap) {
    const digger = new Map.Digger(tilemap.width, tilemap.height);
    digger.create((x, y, value) => {
      tilemap.setTile(x, y, !value ? value : undefined);
    });
  }

  static randomStartingPosition(tilemap) {
    let x, y, blocked;
    while (blocked === undefined || blocked === true) {
      x = Math.round(RNG.getUniform() * tilemap.width);
      y = Math.round(RNG.getUniform() * tilemap.height);
      const tile = tilemap.getTile(x, y);
      blocked = tile ? tile.solid : true;
    }
    return [x, y];
  }
}

export default DungeonGenerator;
