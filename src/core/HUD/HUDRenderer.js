import EnergyGauge from './EnergyGauge';

class HUDRenderer {
  constructor(game) {
    this.game = game;
    this.screen = game.screen;
    this.layers = [];
  }

  initialize() {
    this.addLayer(new EnergyGauge(this.game.world.getEntity('player')));
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  render() {
    this.layers.forEach(layer => {
      layer.render(this.screen);
    })
  }
}

export default HUDRenderer;
