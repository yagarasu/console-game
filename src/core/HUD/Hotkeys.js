import { rotFormattedTextLength } from 'core/utils/stringUtils';
import spells from 'data/spells';

class Hotkeys {
  constructor (player) {
    this.player = player;
  }

  render({ display }) {
    const equip = this.player.getOne('Equipment');
    const { primary, secondary } = equip;
    const primarySpell = primary ? spells.find(({ id }) => id == primary) : null;
    const secondarySpell = secondary ? spells.find(({ id }) => id == secondary) : null;
    const primaryStr = primary ? `[%c{#3893b6}${primarySpell.icon} ${primarySpell.name}%c{#777}]` : '';
    const secondaryStr = secondary ? `[%c{#3893b6}${secondarySpell.icon} ${secondarySpell.name}%c{#777}]` : '';
    const hotkeys = `%c{#777}${primaryStr + secondaryStr}%c{}`;
    const len = rotFormattedTextLength(hotkeys);
    display.drawText(80 - len, 0, hotkeys);
  }
}

export default Hotkeys;
