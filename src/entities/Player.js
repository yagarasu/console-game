class Player {
  constructor(startingX, startingY) {
    this.char = '\u263B';
    this.color = '#f0f';
    this.fx = startingX;
    this.fy = startingY;
    this.x = Math.round(this.fx);
    this.y = Math.round(this.fy);
    this.vx = 0;
    this.vy = 0;
    this.maxVelocity = 0.25;
  }

  accelerate(x, y) {
    this.vx = this.maxVelocity * x;
    this.vy = this.maxVelocity * y;
  }

  move(delta, lag) {
    this.fx += this.vx * lag;
    this.fy += this.vy * lag;
    this.x = Math.round(this.fx);
    this.y = Math.round(this.fy);
  }
}

export default Player;
