import PlayerStats from "./hudControls/PlayerStats";
import InGameMenu from "./hudControls/InGameMenu";

class HUD {
  constructor(cradle) {
    this.controls = {
      'playerStats': (new PlayerStats(cradle)),
      'inGameMenu': (new InGameMenu(cradle))
    };
  }

  render({ display }) {
    Object.keys(this.controls).forEach(id => {
      const control = this.controls[id];
      control.render.call(control, { display });
    });
  }
}

export default HUD;
