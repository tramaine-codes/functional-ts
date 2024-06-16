import { Just, List } from 'purify-ts';

const add = (x: number) => (y: number) => x + y;

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  Just(3)
    .ap(Just(2).ap(Just(add)))
    .extract()
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  List.at(1, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  List.at(3, [1, 2, 3])
    .ap(Just(3).ap(Just(add)))
    .extract()
);
