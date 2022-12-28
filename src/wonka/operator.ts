/* eslint-disable no-console */
import { fromArray, pipe, combine, subscribe } from 'wonka';

const xs = fromArray([1, 2, 3]);
const ys = fromArray([4, 5, 6]);

pipe(
  combine(xs, ys),
  subscribe(([x, y]) => {
    console.log(x + y);
  })
);
