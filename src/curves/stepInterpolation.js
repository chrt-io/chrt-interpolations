import { svgPath } from '../layout';
import { getCoords } from '../helpers';

export default function stepInterpolation(data, command = stepCommand) {
  return svgPath(
    getCoords.call(this, data),
    command
  );
}

export function stepAfterInterpolation(data) {
  return stepInterpolation.call(this, data, stepCommandAfter);
}
export function stepBeforeInterpolation(data) {
  return stepInterpolation.call(this, data, stepCommandBefore);
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
