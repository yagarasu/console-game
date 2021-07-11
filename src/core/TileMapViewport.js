class TilemapViewport {
  constructor(tilemap, { x = 0, y = 0, width = 80, height = 25 } = {}) {
    this.tilemap = tilemap;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  transformGlobalToLocal(gx, gy) {
    return [
      gx - this.x,
      gy - this.y
    ];
  }

  globalIsVisible(gx, gy) {
    const [lx, ly] = this.transformGlobalToLocal(gx, gy);
    return (lx >= 0 || lx < this.width || ly >= 0 || ly < this.height);
  }

  getTile(lx, ly) {
    if (lx >= this.width || ly >= this.height) {
      return undefined;
    }
    const gx = this.x + lx;
    const gy = this.y + ly;
    if (gx >= this.tilemap.width || gy >= this.tilemap.height) {
      return undefined;
    }
    return this.tilemap.getTile(gx, gy);
  }

  setTile(lx, ly, tileIdx) {
    if (lx >= this.width || ly >= this.height) {
      return undefined;
    }
    const gx = this.x + lx;
    const gy = this.y + ly;
    if (gx >= this.tilemap.width || gy >= this.tilemap.height) {
      return undefined;
    }
    return this.tilemap.setTile(gx, gy, tileIdx);
  }

  forEach(fn) {
    let ly = 0;
    for (let gy = this.y; gy < (this.y + this.height); gy++) {
      let lx = 0;
      for (let gx = this.x; gx < (this.x + this.width); gx++) {
        fn(lx, ly, gx, gy, this.tilemap.getTile(gx, gy));
        lx++;
      }
      ly++;
    }
  }
}

export default TilemapViewport;
