import { isNull } from '../helpers';
// Render the svg <path> element
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
export const svgPath = (points, command) => {
  // build the d attributes by looping over the points
  const splitByNullPoints = points.reduce(
    (acc, point) => {
      if (isNull(point[1])) {
        acc.push([]);
      } else {
        acc[acc.length - 1].push(point);
      }
      return acc;
    },
    [[]]
  );

  const paths = splitByNullPoints.map(points => {
    return points.reduce((acc, point, i, a) => {
      acc.push(
        i === 0
          ? // if first point
            `M${isNaN(point[0]) ? 0 : point[0]},${isNaN(point[1]) ? 0 : point[1]}`
          : // else
            `${command(point, i, a)}`
      );
      return acc;
    }, [])
  })

  return [].concat(...paths);

};
