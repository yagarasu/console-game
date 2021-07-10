import defaultTileset from 'data/defaultTileset';

class TileMap {
  constructor({ width = 320, height = 100, tileset = defaultTileset } = {}) {
    this.width = width;
    this.height = height;

    this.tiles = Array.from({ length: width * height });
    for (let i = 0; i < (width * height); i++) {
      this.tiles[i] = 0;
    }
    this.tileset = tileset;
  }

  getTile(x, y) {
    const idx = (y * this.width) + x;
    const tileIdx = this.tiles[idx];
    return this.tileset[tileIdx];
  }

  setTile(x, y, tileIdx) {
    const idx = (y * this.width) + x;
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error(`Tile (${x}, ${y}) is out of bounds`);
    }
    return this.tiles[idx] = tileIdx;
  }

  forEach(fn) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(x, y, this.getTile(x, y));
      }
    }
  }
}

export default TileMap;
