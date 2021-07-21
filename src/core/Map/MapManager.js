import TileMap from 'core/Map/TileMap';

class MapManager {
  constructor({ config }) {
    this.config = config;
    this.map = null;
  }

  createMap() {
    this.map = new TileMap();
    this.map.tileset = this.config.maps.defaultTileset;
    return this.map;
  }

  setMap(map) {
    this.map = map;
  }

  getMap() {
    return this.map;
  }
}

export default MapManager;
