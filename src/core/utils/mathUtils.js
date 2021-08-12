import { RNG } from "rot-js";

export const TAU = Math.PI * 2;

export function randomBetween(min, max) {
  return (RNG.getUniform() * (max - min)) + min;
}

export function randomIntBetween(min, max) {
  return Math.round(randomBetween(min, max));
}

export function successCheck(prob) {
  return RNG.getUniform() <= prob;
}

export function randomNormalizedVector() {
  return [
    randomBetween(-1, 1),
    randomBetween(-1, 1),
  ];
}

export function randomVectorOfMagnitude(magnitude) {
  const [nx, ny] = randomNormalizedVector();
  return [
    nx * magnitude,
    ny * magnitude,
  ];
}

export function randomVectorOfRandomMagnitudeBetween(min, max) {
  const magnitude = randomBetween(min, max);
  const [nx, ny] = randomNormalizedVector();
  return [
    nx * magnitude,
    ny * magnitude,
  ];
}

export function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function normalizeVector(x, y) {
  const mag = Math.sqrt((x*x) + (y*y));
  return [x / mag, y / mag];
}

export function clampVector(x, y, maxMagnitude) {
  const mag = Math.sqrt((x*x) + (y*y));
  if (mag > maxMagnitude) {
    const [nx, ny] = normalizeVector(x, y);
    return [
      nx * maxMagnitude,
      ny * maxMagnitude
    ];
  }
  return [x, y];
}

export function lerp(min, max, factor) {
  return min * (1 - factor) + max * factor;
}

export function vectorFromAngle(angle) {
  return [
    Math.cos(angle * (TAU / 360)),
    Math.sin(angle * (TAU / 360))
  ];
}

export function angleFromVector(x, y) {
  return Math.atan2(y, x) * (360 / TAU);
}

export function reflectVectorHorizontal(x, y) {
  return [x * -1, y];
}

export function reflectVectorVertical(x, y) {
  return [x, y * -1];
}

export function directionToVector(direction) {
  switch (direction) {
    case 'up': return [0, -1];
    case 'down': return [0, 1];
    case 'left': return [-1, 0];
    case 'right': return [1, 0];
  }
}

export function vectorToDirection(x, y) {
  if (y < 0) return 'up';
  if (y > 0) return 'down';
  if (x < 0) return 'left';
  if (x > 0) return 'right';
}
