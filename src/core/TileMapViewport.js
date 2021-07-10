class TilemapViewport {
  constructor(tilemap, { x = 0, y = 0, width = 80, heigth = 25 }) {
    this.tilemap = tilemap;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
  }

  getTile(lx, ly) {
    if (lx >= this.width || ly >= this.heigth) {
      return undefined;
    }
    const gx = this.x + lx;
    const gy = this.y + ly;
    if (gx >= this.tilemap.width || gy >= this.tilemap.heigth) {
      return undefined;
    }
    return this.tilemap.getTile(gx, gy);
  }

  setTile(lx, ly, tileIdx) {
    if (lx >= this.width || ly >= this.heigth) {
      return undefined;
    }
    const gx = this.x + lx;
    const gy = this.y + ly;
    if (gx >= this.tilemap.width || gy >= this.tilemap.heigth) {
      return undefined;
    }
    return this.tilemap.setTile(gx, gy, tileIdx);
  }

  forEach(fn) {
    let lx = 0;
    for (let gy = this.y; gy < (this.y + this.height); gy++) {
      let ly = 0;
      for (let gx = this.x; gx < (this.x + this.width); gx++) {
        fn(lx, ly, gx, gy, this.tilemap.getTile(x, y));
      }
      ly++;
    }
    lx++;
  }
}

export default TilemapViewport;
