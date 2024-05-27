/* eslint-disable no-console */
import { combine, fromArray, pipe, subscribe } from 'wonka';

pipe(
  combine(fromArray([1, 2, 3]), fromArray([4, 5, 6])),
  subscribe(([x, y]) => {
    console.log(x + y);
  })
);
