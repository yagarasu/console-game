import { Map } from 'rot-js';

class DungeonGenerator {
  static digger(tilemap) {
    const digger = new Map.Digger(tilemap.width, tilemap.height);
    digger.create((x, y, value) => {
      tilemap.setTile(x, y, !value ? value : undefined);
    });
  }
}

export default DungeonGenerator;
