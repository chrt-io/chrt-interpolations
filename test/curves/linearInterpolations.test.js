import * as chrt from 'chrt';
import linearInterpolation, { lineCommand } from '../../src/curves/linearInterpolation';

test('Test linearInterpolation with linear scale', () => {
  const data = [
    {
      x: 0,
      y: 10
    },
    {
      x: 1,
      y: 20
    },
    {
      x: 2,
      y: 15
    }
  ];

  const chart = chrt.Chrt().data(data);

  let lineChart;
  chart.add((lineChart = chrt.chrtLine()));

  const path = linearInterpolation.call(lineChart, data);
  expect(path).toStrictEqual(['M40,280', 'L310,20', 'L580,150']);
});

test('Test linearInterpolation with ordinal scale', () => {
  const data = [
    {
      x: 'a',
      y: 10
    },
    {
      x: 'b',
      y: 20
    },
    {
      x: 'c',
      y: 15
    }
  ];

  const chart = chrt
    .Chrt()
    .data(data)
    .x({ scale: 'ordinal' });

  let lineChart;
  chart.add((lineChart = chrt.chrtLine()));

  const path = linearInterpolation.call(lineChart, data);
  expect(path).toStrictEqual(['M130,280', 'L310,20', 'L490,150']);
});

test('Test lineCommand with NaN', () => {
  expect(lineCommand(['NaN', 'NaN'])).toStrictEqual('L0,0');
});
