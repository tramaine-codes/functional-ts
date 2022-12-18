/* eslint-disable no-console */
import { pipe } from 'fp-ts/es6/function.js';
import O from 'fp-ts/es6/Option.js';
import RA from 'fp-ts/es6/ReadonlyArray.js';

function get<T>(array: readonly T[], index: number) {
  return pipe(array, RA.lookup(index));
}

console.log(
  pipe(
    get([1, 2, 3], 2),
    O.match(
      () => -1,
      (val) => val
    )
  )
);

console.log(
  pipe(
    get([1, 2, 3], 3),
    O.getOrElse(() => -1)
  )
);
