import { withPosition, withStats, withStaticSprite, withCollision } from "./components"

export default function player({ position }) {
  return {
    ...withPosition(position),
    ...withStats(),
    ...withStaticSprite('\u263B', '#f00'),
    ...withCollision(),
  }
}