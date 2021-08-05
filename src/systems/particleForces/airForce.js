import { vectorFromAngle, randomVectorOfRandomMagnitudeBetween } from 'core/utils/mathUtils';

export default function airForce(theta, strength, turbulence) {
  const [vx, vy] = vectorFromAngle(theta);
  return () => {
    const [tx, ty] = randomVectorOfRandomMagnitudeBetween(0, turbulence);
    return [
      vx * strength + tx,
      vy * strength + ty,
    ];
  }
}