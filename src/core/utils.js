export function throttle(fn, time) {
  let blocked = false;
  setTimeout(() => blocked = false, time);
  blocked = true;
  return (...args) => {
    if (blocked) return;
    fn(...args);
  }
}
