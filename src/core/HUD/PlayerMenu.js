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
      }
      if (message.type === 'MENU_SELECT_CMD' && this.currentMenu !== null) {
        const inventory = this.player.getOne('InventoryHolder');
        const { bag } = inventory;
        const item = bag[this.selectMenuIdx];
        this.messageQueue.enqueue({ type: 'ITEM_USE', data: { item } });
        inventory.update({
          bag: bag.splice(this.selectMenuIdx, 1),
        });
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
        PLAYER: this.renderPlayerMenu.bind(this),
        GRIMOIRE: this.renderGrimoireMenu.bind(this),
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
    const stats = this.player.getOne('Stats');
    drawBox(display, 0, 0, 20, 23);
    display.drawText(5, 1, '\u263F %c{#c00}Player%c{} \u263F');
    display.drawText(2, 3, 'Lvl  ' + stats.level);
    display.drawText(2, 4, 'Exp  ' + stats.exp);
    display.drawText(2, 6, 'Will ' + stats.will);
    display.drawText(2, 7, 'Dom  ' + stats.dominion);
    display.drawText(2, 9, 'MaxFocus  ' + stats.maxFocus);
    display.drawText(2, 10, 'MaxEnergy ' + stats.maxEnergy);
    display.drawText(3, 12, '\u263F %c{#c00}Equipment%c{} \u263F');
  }
  
  renderGrimoireMenu(display) {
    drawBox(display, 0, 0, 20, 23);
    display.drawText(5, 1, '\u263F %c{#c00}Spells%c{} \u263F');
    display.drawText(2, 3, '\u269D Banish');
  }

  renderInventoryMenu(display) {
    drawBox(display, 0, 0, 20, 23);
    display.drawText(3, 1, '\u263F %c{#c00}Inventory%c{} \u263F');
    const { bag } = this.player.getOne('InventoryHolder');
    const itemNames = bag.map(({ name, amount = 1 }) => name + ` (${amount})`);
    selectmenu(display, itemNames, this.selectMenuIdx, '\u25B6', '\u2022', 2, 3, 16, 3);
  }
}

export default PlayerMenu;
