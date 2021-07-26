import { withPosition, withStats, withStaticSprite, withCollision, withAi } from "./components"

export default function mob({ position, ai }) {
  return {
    ...withPosition(position),
    ...withStats(),
    ...withStaticSprite('\u263B', '#9fc197'),
    ...withCollision(),
    ...withAi(ai),
  }
}