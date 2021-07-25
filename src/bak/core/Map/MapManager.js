import TileMap from 'core/Map/TileMap';
import MapDataLayer from 'core/Map/MapDataLayer';

class MapManager {
  constructor({ config }) {
    this.config = config;
    this.map = null;
    this.mapData = null;
  }

  createMap() {
    this.map = new TileMap();
    this.map.tileset = this.config.maps.defaultTileset;
    this.mapData = new MapDataLayer({ width: this.map.width, heigth: this.map.heigth });
    return this.map;
  }

  setMap(map) {
    this.map = map;
    this.mapData = new MapDataLayer();
  }

  getMap() {
    return this.map;
  }

  getMapData() {
    return this.mapData;
  }
}

export default MapManager;
