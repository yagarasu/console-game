import { drawBox, selectmenu } from 'core/utils/renderUtils';

class PlayerMenu {
  constructor(messageQueue, player) {
    this.messageQueue = messageQueue;
    this.messageQueue.addConsumer(this.consumer.bind(this));

    this.player = player;
    
    this.currentMenu = null;
    this.selectMenuIdx = 0;
    this.selectMenuMax = 0;
  }

  consumer() {
    return next => message => {
      if (message.type === 'TOGGLE_MENU_CMD') {
        if (this.currentMenu === message.data.menu) {
          this.currentMenu = null;
        } else {
          this.currentMenu = message.data.menu;
          this.initMenu(message.data.menu);
        }
      }
      if (message.type === 'MENU_MOVE_CMD' && this.currentMenu !== null) {
        if (message.data.dir === 'UP' && this.selectMenuIdx > 0) {
          this.selectMenuIdx--;
        } else if (message.data.dir === 'DOWN' && this.selectMenuIdx < this.selectMenuMax) {
          this.selectMenuIdx++;
        }
        console.log(this.selectMenuIdx);
      }
      return next();
    }
  }

  render({ display }) {
    const tabs = this.getTab('Player\u263B', 'P', this.currentMenu === 'PLAYER')
      + ' '
      + this.getTab('Grimoire\u263F', 'G', this.currentMenu === 'GRIMOIRE')
      + ' '
      + this.getTab('Inventory\u26B1', 'I', this.currentMenu === 'INVENTORY');
    display.drawText(0, 24, tabs);
    if (this.currentMenu !== null) {
      // display menu
      const menus = {
        PLAYER: this.renderPlayerMenu,
        GRIMOIRE: this.renderGrimoireMenu,
        INVENTORY: this.renderInventoryMenu.bind(this),
      };
      const menu = menus[this.currentMenu];
      if (!menu) return;
      menu(display);
    }
  }

  initMenu(type) {
    if (type === 'INVENTORY') {
      const { bag } = this.player.getOne('InventoryHolder');
      this.selectMenuMax = bag.length - 1;
      this.selectMenuIdx = 0;
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

  renderInventoryMenu(display) {
    drawBox(display, 0, 0, 20, 23);
    display.drawText(3, 1, '\u263F Inventory \u263F');
    const { bag } = this.player.getOne('InventoryHolder');
    const itemNames = bag.map(({ name }) => name);
    selectmenu(display, itemNames, this.selectMenuIdx, '\u25B6', '\u2022', 2, 3, 16, 3);
    // selectmenu(display, content, this.inventorySelectedItem, '\u25B6', '\u2022', 2, 3, 16, 19);
    // selectmenu(display, content, 2, 3, 16, 19)
    // display.drawText(2, 3, '\u269D Banish');
  }
}

export default PlayerMenu;
