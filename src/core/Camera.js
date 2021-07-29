class Camera {
  constructor(screen, { x = 0, y = 0, width = 80, height = 25 } = {}) {
    this.screen = screen;
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

  getCenterTo(gx, gy) {
    const lxc = this.width / 2;
    const lyc = this.height / 2;
    return [
      Math.round(gx - lxc),
      Math.round(gy - lyc),
    ];
  }

  forEachLocalTile(fn) {
    let ly = 0;
    for (let gy = this.y; gy < (this.y + this.height); gy++) {
      let lx = 0;
      for (let gx = this.x; gx < (this.x + this.width); gx++) {
        fn(lx, ly, gx, gy);
        lx++;
      }
      ly++;
    }
  }
}

export default Camera;
