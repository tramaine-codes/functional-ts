/* eslint-disable no-console */
import { nullable } from 'pratica';

const get = <T>(lst: readonly T[], index: number) => {
  return nullable(lst[index]);
};

console.log(
  get([1, 2, 3], 2).cata({
    Just: (x) => x,
    Nothing: () => -1,
  })
);

console.log(
  get([1, 2, 3], 3).cata({
    Just: (x) => x,
    Nothing: () => -1,
  })
);
