export function isNull(value) {
  return value === null || value == null || typeof value === 'undefined';
}

function isInfinity(value) {
  return typeof value === 'number' && !isFinite(value);
}

export function getCoords(data) {
  if(!this?.fields) {
    return [];
  }
  return data.map(d => {
    const x = (isNull(d[this.fields.x]) || isInfinity(d[this.fields.x])) ? null : this.parentNode.scales.x[this.scales.x](d[this.fields.x]);
    const y = (isNull(d[this.fields.y]) || isInfinity(d[this.fields.y])) ? null : this.parentNode.scales.y[this.scales.y](d[this.fields.y]);

    return [
      isInfinity(x) ? 0 : x,
      isInfinity(y) ? 0 : y,
    ];
  })//.filter(d => !isNull(d[0]) && !isNull(d[1]))
}
