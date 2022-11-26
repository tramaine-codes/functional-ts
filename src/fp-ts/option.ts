/* eslint-disable no-console */
import { pipe } from 'fp-ts/lib/function.js';
import * as O from 'fp-ts/lib/Option.js';
import * as RA from 'fp-ts/lib/ReadonlyArray.js';

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
