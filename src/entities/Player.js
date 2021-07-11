class Player {
  constructor(startingX, startingY) {
    this.x = startingX;
    this.y = startingY;
    this.vx = 0;
    this.vy = 0;
    this.maxVelocity = 1;
  }

  accelerate(x, y) {
    this.vx += x;
    this.vx = this.cap(this.vx, this.maxVelocity);
    this.vy += y;
    this.vy = this.cap(this.vy, this.maxVelocity);
  }

  cap(val, max) {
    return Math.abs(val) <= max ? val : val < 0 ? max * -1 : max;
  }

  move(delta) {
    const lag = delta == 0 ? 1 : (1000/60) / delta;
    this.x += Math.round(this.vx * lag);
    this.y += Math.round(this.vy * lag);
  }
}

export default Player;
