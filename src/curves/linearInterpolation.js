import { svgPath } from '../layout';
import { getCoords } from '~/helpers';

export default function linearInterpolation(data) {
  return svgPath(
    getCoords.call(this, data),
    lineCommand
  );
}

export const lineCommand = point => `L${isNaN(point[0]) ? 0 : point[0]},${isNaN(point[1]) ? 0 : point[1]}`;
