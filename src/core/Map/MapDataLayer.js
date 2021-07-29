class MapDataLayer {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    this.data = {};
  }

  resetData(type) {
    if (!type) {
      this.data = {};
      return;
    }
    Object.keys(this.data).forEach(key => {
      delete this.data[key][type];
    });
  }

  getData(x, y, type) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx = (y * this.width) + x;
    if (!this.data[idx]) return;
    if (type) return this.data[idx][type];
    return this.data[idx];
  }

  setData(x, y, type, data) {
    const idx = (y * this.width) + x;
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error(`Tile (${x}, ${y}) is out of bounds`);
    }
    return this.data[idx] = {
      ...this.data[idx],
      [type]: data,
    };
  }
}

export default MapDataLayer;
