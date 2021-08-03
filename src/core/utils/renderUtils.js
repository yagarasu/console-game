export function drawBox(display, x, y, w, h) {
  const blocks = {
    tl: '\u250c', // ┌
    tr: '\u2510', // ┐
    bl: '\u2514', // └
    br: '\u2518', // ┘
    h:  '\u2500', // ─
    v:  '\u2502', // │
  };
  const top = `${blocks.tl}${blocks.h.repeat(w - 2)}${blocks.tr}`;
  const middle = `${blocks.v}${' '.repeat(w - 2)}${blocks.v}`;
  const bottom = `${blocks.bl}${blocks.h.repeat(w - 2)}${blocks.br}`;
  display.drawText(x, y, top);
  for (let cy = y + 1; cy < y + h; cy++) {
    display.drawText(x, cy, middle);
  }
  display.drawText(x, y + h, bottom);
}

export function viewport(display, content, x, y, w, h, offsetx = 0, offsety = 0) {
  const numLines = content.length > h ? h : content.length;
  for (let i = 0; i < numLines; i++) {
    const line = content[offsety + i] ? content[offsety + i].substr(offsetx, w) : '';
    display.drawText(x, y + i, line);
  }
}

export function selectmenu(display, items, selected, selector, blank, x, y, w, h) {
  const fullHeight = items.length < h ? items.length : h;
  const offsety = selected + 1 < fullHeight ? 0 : (selected + 1) - fullHeight;
  const contentWithSelector = items.map((item, i) => i == selected ? `${selector}${item}` : blank.repeat(selector.length) + item);
  viewport(display, contentWithSelector, x, y, w, h, undefined, offsety);
}
