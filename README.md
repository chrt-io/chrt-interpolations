# chrt-interpolations

Component providing interpolation functions for creating smooth curves between data points in chrt. These interpolation functions are primarily used by the line chart component to define how points are connected, but can be used by any component that needs to create paths between points.

The module provides three main types of interpolation:

- Linear interpolation (`linearInterpolation`): straight lines between points
- Spline interpolation (`splineInterpolation`): smooth curves using Bézier curves
- Step interpolation (`stepInterpolation`, `stepBeforeInterpolation`, `stepAfterInterpolation`): step-wise connections between points

### Observable Examples and Documentation:

- [Chrt Interpolations - Observable](https://observablehq.com/d/75be84fdba4cebb4?collection=@chrt/chrt)
- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-interpolations` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-interpolations chrt-core
```

`chrt-interpolations` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import {
  linearInterpolation,
  splineInterpolation,
  stepInterpolation,
} from "chrt-interpolations";

// Create a line chart with spline interpolation
Chrt().add(chrt.line().curve(splineInterpolation));
```

## API Reference

### Linear Interpolation

#### `linearInterpolation(data)`

Creates straight lines between consecutive points. This is the simplest form of interpolation.

```js
chrt.line().curve(linearInterpolation);
```

### Spline Interpolation

#### `splineInterpolation(data)`

Creates smooth curves between points using cubic Bézier curves. This produces a more natural-looking line that smoothly transitions between points.

```js
chrt.line().curve(splineInterpolation);
```

### Step Interpolation

Three types of step interpolation are available:

#### `stepInterpolation(data)`

Creates step-wise connections between points, with the step occurring at the midpoint between two data points.

```js
chrt.line().curve(stepInterpolation);
```

#### `stepBeforeInterpolation(data)`

Creates step-wise connections with the vertical step occurring before the data point.

```js
chrt.line().curve(stepBeforeInterpolation);
```

#### `stepAfterInterpolation(data)`

Creates step-wise connections with the vertical step occurring after the data point.

```js
chrt.line().curve(stepAfterInterpolation);
```

### Helper Functions

#### `lineCommand(point)`

Helper function for linear interpolation that generates SVG line commands.

#### `bezierCommand(point, index, points)`

Helper function for spline interpolation that generates SVG cubic Bézier curve commands.

### Examples

#### Basic Line Chart with Different Interpolations

```js
// Linear interpolation
Chrt().add(chrt.line().data(data).curve(linearInterpolation));

// Smooth curve
Chrt().add(chrt.line().data(data).curve(splineInterpolation));

// Step-wise
Chrt().add(chrt.line().data(data).curve(stepInterpolation));
```

#### Multiple Lines with Different Interpolations

```js
Chrt()
  .add(chrt.line().data(data1).curve(linearInterpolation).stroke("#ff0000"))
  .add(chrt.line().data(data2).curve(splineInterpolation).stroke("#00ff00"))
  .add(
    chrt.line().data(data3).curve(stepBeforeInterpolation).stroke("#0000ff"),
  );
```

#### Area Chart with Smooth Interpolation

```js
Chrt().add(
  chrt
    .line()
    .data(data)
    .curve(splineInterpolation)
    .area()
    .fill("#ff0000")
    .fillOpacity(0.3),
);
```
