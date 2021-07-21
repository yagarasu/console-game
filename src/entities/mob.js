import { withPosition, withStats, withStaticSprite, withCollision } from "./components"

export default function player({ position }) {
  return {
    ...withPosition(position),
    ...withStats(),
    ...withStaticSprite('\u263B', '#9fc197'),
    ...withCollision(),
  }
}