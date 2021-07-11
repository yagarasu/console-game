class Scheduler {
  constructor({ fps = 30 } = {}) {
    this.fps = fps;
    this.frameDuration = (1 / this.fps) * 1000;
    this.lastTs = null;
    this.timer = null;
    this.tick = this.tick.bind(this);
    this.jobs = [];
  }

  addJob(fn) {
    this.jobs.push(fn);
  }

  start() {
    this.timer = requestAnimationFrame(this.tick);
  }

  stop() {
    cancelAnimationFrame(this.timer);
  }

  tick(ts) {
    if (!this.lastTs) this.lastTs = ts;
    const delta = ts - this.lastTs;
    this.lastTs = ts;
    const lag = delta / this.frameDuration;
    this.jobs.forEach((job) => {
      job(delta, lag);
    });
    this.timer = requestAnimationFrame(this.tick);
  }
}

export default Scheduler;