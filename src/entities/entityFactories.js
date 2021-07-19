function withPosition(x, y) {
  return {
    position: { x, y, prevX: x, prevY: y },
  }
}

function withStats() {
  return {
    stats: {
      health: 100,
      mana: 100
    },
  }
}

function withStaticSprite(ch, fg, bg = null) {
  return {
    staticSprite: { bg, fg, ch, },
  }
}

function withCollision() {
  return {
    collision: {
      collidesWith: []
    }
  }
}

export function createPlayer(x = 0, y = 0) {
  return {
    ...withPosition(x, y),
    ...withStats(),
    ...withStaticSprite('\u263B', '#f00'),
    ...withCollision(),
  }
}

export function createMob(x = 0, y = 0) {
  return {
    ...withPosition(x, y),
    ...withStats(),
    ...withStaticSprite('\u263B', '#880'),
    ...withCollision(),
  }
}
