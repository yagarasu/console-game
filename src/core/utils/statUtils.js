import { clamp } from './mathUtils';

export function criticalHitProbByFocus(focus) {
  const A = 10; // Steepness
  return clamp(((Math.pow(focus, A) * 0.5) + 0.5) * (Math.log(focus) + 0.75), 0, 1);
}
