class Scheduler {
  constructor({ fps = 30 } = {}) {
    this.fps = fps;
    this.frameDuration = (1 / this.fps) * 1000;
    this.lastTs = null;
    this.timer = null;
    this.tick = this.tick.bind(this);
    this.lastTaskId = -1;
    this.tasks = [];
    this.scheduledTasks = [];
  }

  addTask(task) {
    const newTaskId = this.lastTaskId++;
    this.tasks.push({
      id: newTaskId,
      task
    });
    return newTaskId;
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }

  removeScheduledTask(taskId) {
    this.scheduledTasks = this.scheduledTasks.filter(({ id }) => id !== taskId);
  }

  scheduleOneTimeTask(task, ticksAhead) {
    const newTaskId = this.lastTaskId++;
    this.scheduledTasks.push({
      id: newTaskId,
      task,
      ticksRemaining: ticksAhead,
    })
  }

  start() {
    this.timer = requestAnimationFrame(this.tick);
  }

  stop() {
    cancelAnimationFrame(this.timer);
    this.timer = null;
  }

  tick(ts) {
    if (!this.lastTs) this.lastTs = performance.now();
    const delta = ts - this.lastTs;
    this.lastTs = ts;
    const progress = delta / this.frameDuration;
    this.tasks.forEach(({ task }) => {
      task(delta, progress);
    });
    this.scheduledTasks.forEach((task) => {
      if ((task.ticksRemaining--) <= 0) {
        task.task(delta, progress);
        this.removeScheduledTask(task.id);
      }
    });
    this.timer = requestAnimationFrame(this.tick);
  }
}

export default Scheduler;