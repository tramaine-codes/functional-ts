import { combine, fromArray, pipe, subscribe } from 'wonka';

pipe(
  combine(fromArray([1, 2, 3]), fromArray([4, 5, 6])),
  subscribe(([x, y]) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(x + y);
  })
);
