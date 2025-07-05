import { Just, List } from 'purify-ts';

const add = (x: number) => (y: number) => x + y;

console.log(
  Just(3)
    .ap(Just(2).ap(Just(add)))
    .extract()
);
console.log(
  List.at(1, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);
console.log(
  List.at(3, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);
