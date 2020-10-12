export function isNull(value) {
  return value === null || value == null || typeof value === 'undefined';
}

export function uuid() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
export function isInfinity(value) {
  return !isFinite(value);
}
