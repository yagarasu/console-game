export function throttle(fn, time) {
  let blocked = false;
  setTimeout(() => blocked = false, time);
  blocked = true;
  return (...args) => {
    if (blocked) return;
    fn(...args);
  }
}

export function allItemsBut(arr, except) {
  const before = arr.slice(0, except);
  const after = arr.slice(except + 1);
  return [...before, ...after];
}
