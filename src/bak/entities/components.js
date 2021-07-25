export function withPosition({ x, y }) {
  return {
    position: { x, y, prevX: x, prevY: y },
  }
}

export function withVisibility({ radius }) {
  return {
    visibility: { radius },
  }
}

export function withStats() {
  return {
    stats: {
      focus: 100,
      energy: 100
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

export function withAi({ algorithm }) {
  return {
    ai: {
      algorithm,
      state: {}
    }
  }
}
