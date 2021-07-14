import TilemapViewport from './TileMapViewport';

class MapManager {
  constructor() {
    this.map = null;
    this.viewport = null;
  }

  setMap(map) {
    this.map = map;
    this.viewport = new TilemapViewport(this.map);
  }

  getViewport() {
    return this.viewport;
  }
}

export default MapManager;
