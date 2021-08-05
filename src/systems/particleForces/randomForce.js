import { randomVectorOfRandomMagnitudeBetween } from "core/utils/mathUtils";

export default function randomForce(min, max) {
  return () => randomVectorOfRandomMagnitudeBetween(min, max);
}