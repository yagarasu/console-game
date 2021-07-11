class Scheduler {
  constructor() {
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
    this.jobs.forEach((job) => {
      job(delta);
    });
    this.timer = requestAnimationFrame(this.tick);
  }
}

export default Scheduler;