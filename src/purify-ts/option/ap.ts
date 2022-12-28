/* eslint-disable no-console */
import { Just, List } from 'purify-ts';

function get<T>(index: number, lst: T[]) {
  return List.at(index, lst);
}

const add = (x: number) => (y: number) => x + y;

console.log(
  Just(3)
    .ap(Just(2).ap(Just(add)))
    .extract()
);

console.log(
  get(1, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);

console.log(
  get(3, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);
