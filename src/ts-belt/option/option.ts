import { A, O, pipe } from '@mobily/ts-belt';

const get = <T>(lst: readonly T[], index: number) => pipe(lst, A.get(index));

console.log(
  pipe(
    get([1, 2, 3], 2),
    O.match(
      (val) => val,
      () => -1
    )
  )
);
console.log(pipe(get([1, 2, 3], 2), O.getWithDefault(-1)));
console.log(O.getWithDefault(get([1, 2, 3], 3), -1));
