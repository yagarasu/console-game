import { RNG } from "rot-js";

export function randomBetween(min, max) {
  return (RNG.getUniform() * (max - min)) + min;
}

export function randomIntBetween(min, max) {
  return Math.round(randomBetween(min, max));
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
