import { drawBox } from 'core/Screen/renderUtils';

class InGameMenu {
  constructor({ EventQueue }) {
    this.eventQueue = EventQueue;
    this.eventQueue.addConsumer(this.eventConsumer.bind(this));

    this.currentMenu = null;
  }

  eventConsumer() {
    return next => event => {
      if (event.type === 'MENU_TOGGLE') {
        if (this.currentMenu === event.menu) {
          this.currentMenu = null;
        } else {
          this.currentMenu = event.menu;
        }
      }
      return next();
    };
  }

  getTab(label, hotkey, isHighlighted) {
    const colors = {
      hi: {
        h: '#fff61f',
        n: '#fff'
      },
      no: {
        h: '#746630',
        n: 'grey'
      }
    };
    const palette = isHighlighted ? colors.hi : colors.no;
    const withHotkey = label.replace(hotkey, `%c{${palette.h}}$&%c{${palette.n}}`);
    return `%c{${palette.n}}${withHotkey}%c{}`;
  }

  renderPlayerMenu(display) {
    display.drawText(0,0,'Player menu not ready yet');
  }
  
  renderGrimoireMenu(display) {
    drawBox(display, 0, 0, 20, 23);
    display.drawText(5, 1, '\u263F Spells \u263F');
    display.drawText(2, 3, '\u269D Banish');
  }

  render({ display }) {
    const tabs = this.getTab('Player\u263B', 'P', this.currentMenu === 'PLAYER')
      + ' '
      + this.getTab('Grimoire\u263F', 'G', this.currentMenu === 'GRIMOIRE');
    display.drawText(0, 24, tabs);
    if (this.currentMenu !== null) {
      // display menu
      const menus = {
        PLAYER: this.renderPlayerMenu,
        GRIMOIRE: this.renderGrimoireMenu,
      };
      const menu = menus[this.currentMenu];
      if (!menu) return;
      menu(display);
    }
  }
}

export default InGameMenu;
