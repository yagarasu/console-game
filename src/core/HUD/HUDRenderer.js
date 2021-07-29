import EnergyGauge from './EnergyGauge';

class HUDRenderer {
  constructor(screen) {
    this.screen = screen;
    this.components = [];
  }

  addComponent(id, component) {
    this.components.push({ id, component });
  }

  render() {
    this.components.forEach(({ component }) => {
      component.render(this.screen);
    })
  }
}

export default HUDRenderer;
