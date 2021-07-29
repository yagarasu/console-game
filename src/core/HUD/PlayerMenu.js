import { drawBox } from 'core/utils/renderUtils';

class PlayerMenu {
  constructor(messageQueue) {
    this.currentMenu = null;
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      if (message.type === 'TOGGLE_MENU_CMD') {
        console.log('toggle',message)
        if (this.currentMenu === message.data.menu) {
          this.currentMenu = null;
        } else {
          this.currentMenu = message.data.menu;
        }
      }
      return next();
    }
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
}

export default PlayerMenu;
