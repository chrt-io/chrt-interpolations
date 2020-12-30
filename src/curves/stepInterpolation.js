import { svgPath } from '../layout';
import { isNull, isInfinity } from '~/helpers';

export default function stepInterpolation(data, type) {
  return svgPath(
    data.map((d) => [
      this.parentNode.scales.x[this.scales.x](d[this.fields.x]),
      isNull(d[this.fields.y]) || isInfinity(d[this.fields.y])
        ? null
        : this.parentNode.scales.y[this.scales.y](d[this.fields.y]),
    ]),
    isNull(type) ? stepCommand : type === 'after' ? stepCommandAfter : stepCommandBefore
  );
}

export function stepAfterInterpolation(data) {
  return stepInterpolation.call(this, data, 'after');
}
export function stepBeforeInterpolation(data) {
  return stepInterpolation.call(this, data, 'before');
}

const stepCommand = (point, i, a) => {
  const xMiddle = ((isNaN(point[0]) ? 0 : point[0]) + (isNaN(a[i-1][0]) ? 0 : a[i-1][0]))/2;

  return `L${isNaN(xMiddle) ? 0 : xMiddle},${isNaN(a[i - 1][1]) ? 0 : a[i - 1][1]}
    L${isNaN(xMiddle) ? 0 : xMiddle},${isNaN(point[1]) ? 0 : point[1]}
      L${isNaN(point[0]) ? 0 : point[0]},${isNaN(point[1]) ? 0 : point[1]
  }`
};

const stepCommandAfter = (point, i, a) => `L${isNaN(point[0]) ? 0 : point[0]},${
  isNaN(a[i - 1][1]) ? 0 : a[i - 1][1]
}
                                    L${isNaN(point[0]) ? 0 : point[0]},${
  isNaN(point[1]) ? 0 : point[1]
}`;
const stepCommandBefore = (point, i, a) => `L${
  isNaN(a[i - 1][0]) ? 0 : a[i - 1][0]
},${isNaN(point[1]) ? 0 : point[1]}
                                    L${isNaN(point[0]) ? 0 : point[0]},${
  isNaN(point[1]) ? 0 : point[1]
}`;
