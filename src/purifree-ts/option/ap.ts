/* eslint-disable no-console */
import { Just, List, ap, extract, pipe } from 'purifree-ts';

const add = (x: number) => (y: number) => x + y;

console.log(pipe(Just(3), ap(pipe(Just(2), ap(Just(add)))), extract()));

console.log(
  pipe([1, 2, 3], List.at(1), ap(pipe(Just(2), ap(Just(add)))), extract())
);

console.log(
  pipe([1, 2, 3], List.at(3), ap(pipe(Just(2), ap(Just(add)))), extract())
);
