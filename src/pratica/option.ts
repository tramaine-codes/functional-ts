import { nullable } from 'pratica';

const get = <T>(lst: readonly T[], index: number) => nullable(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  get([1, 2, 3], 2).cata({
    Just: (x) => x,
    Nothing: () => -1,
  })
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  get([1, 2, 3], 3).cata({
    Just: (x) => x,
    Nothing: () => -1,
  })
);
