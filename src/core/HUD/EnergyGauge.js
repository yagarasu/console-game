const INDICATOR_COUNT = 10;

class EnergyGauge {
  constructor (player) {
    this.player = player;
  }

  getIndicator(value) {
    const amount = Math.round((value / 100) * INDICATOR_COUNT);
    const rest = INDICATOR_COUNT - amount;
    return '\u25C9'.repeat(amount) + '\u25CB'.repeat(rest);
  }

  render({ display }) {
    const stats = this.player.getOne('Stats');
    const indicatorFocus = this.getIndicator(stats.focus);
    const indicatorEnergy = this.getIndicator(stats.energy);
    display.drawText(80 - 35, 24, `%c{grey}Focus[%c{#7a31ae}${indicatorFocus}%c{grey}]Energy[%c{#3893b6}${indicatorEnergy}%c{grey}]`);
  }
}

export default EnergyGauge;
