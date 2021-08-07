import { clamp } from 'core/utils/mathUtils';

const INDICATOR_COUNT = 5;

const STR_CIRCLE_FULL = '\u25C9'; // ◉
const STR_CIRCLE_HALF = '\u25CE'; // ◎
const STR_CIRCLE_EMPTY = '\u25CB'; // ○

class EnergyGauge {
  constructor (player) {
    this.player = player;
  }

  getIndicator(value) {
    const amount = (value / 100) * INDICATOR_COUNT;
    const amountFull = Math.floor(amount);
    const amountHalf = Math.ceil(amount % 1);
    const rest = INDICATOR_COUNT - (amountFull + amountHalf);
    return STR_CIRCLE_FULL.repeat(amountFull) + STR_CIRCLE_HALF.repeat(amountHalf) + STR_CIRCLE_EMPTY.repeat(rest);
  }

  render({ display }) {
    const stats = this.player.getOne('Stats');
    const indicatorFocus = this.getIndicator(clamp(stats.focus, 0, 100));
    const indicatorEnergy = this.getIndicator(clamp(stats.energy, 0, 100));
    display.drawText(80 - 35, 24, `%c{grey}Focus[%c{#7a31ae}${indicatorFocus}%c{grey}](${stats.focus})Energy[%c{#3893b6}${indicatorEnergy}%c{grey}](${stats.energy})`);
  }
}

export default EnergyGauge;
