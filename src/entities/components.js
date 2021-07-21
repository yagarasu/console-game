export function withPosition({ x, y }) {
  return {
    position: { x, y, prevX: x, prevY: y },
  }
}

export function withStats() {
  return {
    stats: {
      health: 100,
      mana: 100
    },
  }
}

export function withStaticSprite(ch, fg, bg = null) {
  return {
    staticSprite: { bg, fg, ch, },
  }
}

export function withCollision() {
  return {
    collision: {
      collidesWith: [],
      mapCollision: false
    }
  }
}