import { fromArray, fromValue, map, pipe, subscribe } from 'wonka';

pipe(fromArray([1, 2, 3]), subscribe(console.log));

pipe(
  fromValue('foo'),
  map((x) => `${x.toUpperCase()}!`),
  subscribe(console.log)
);
