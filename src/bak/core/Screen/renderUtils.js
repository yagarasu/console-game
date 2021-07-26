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