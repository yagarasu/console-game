import { withPosition, withStats, withStaticSprite, withCollision, withVisibility } from "./components"

export default function player({ position, visibility }) {
  return {
    ...withPosition(position),
    ...withVisibility(visibility),
    ...withStats(),
    ...withStaticSprite('\u263B', '#f00'),
    ...withCollision(),
  }
}