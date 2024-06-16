import { A, O, pipe } from '@mobily/ts-belt';

const get = <T>(lst: readonly T[], index: number) => pipe(lst, A.get(index));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  pipe(
    get([1, 2, 3], 2),
    O.match(
      (val) => val,
      () => -1
    )
  )
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(get([1, 2, 3], 2), O.getWithDefault(-1)));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(O.getWithDefault(get([1, 2, 3], 3), -1));
