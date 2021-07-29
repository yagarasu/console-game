import TileMap from 'core/Map/TileMap';
import MapDataLayer from 'core/Map/MapDataLayer';
import defaultTileset from 'data/defaultTileset';

class MapManager {
  constructor() {
    this.map = null;
    this.mapData = null;
  }

  createMap() {
    this.map = new TileMap();
    this.map.tileset = defaultTileset;
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
