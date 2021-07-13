export function createPlayer(x = 0, y = 0) {
  return {
    position: { x, y },
    stats: {
      health: 100,
      mana: 100
    },
    staticSprite: {
      bg: null,
      fg: '#f00',
      ch: '\u263B'
    }
  }
}