/* eslint-disable no-console */
import { Maybe, caseOf, pipe } from 'purifree-ts';

const get = <T>(lst: readonly T[], index: number) =>
  Maybe.fromNullable(lst[index]);

console.log(
  pipe(
    get([1, 2, 3], 2),
    caseOf({
      Just: (val) => val,
      Nothing: () => -1,
    })
  )
);

console.log(get([1, 2, 3], 2).orDefault(-1));

console.log(get([1, 2, 3], 3).orDefaultLazy(() => -1));
