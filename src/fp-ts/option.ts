/* eslint-disable no-console */
import { flow, pipe } from 'fp-ts/lib/function.js';
import O from 'fp-ts/lib/Option.js';
import RA from 'fp-ts/lib/ReadonlyArray.js';

function get(index: number) {
  return flow(RA.lookup(index));
}

console.log(
  pipe(
    [1, 2, 3],
    get(2),
    O.match(
      () => -1,
      (val) => val
    )
  )
);

console.log(
  pipe(
    [1, 2, 3],
    get(3),
    O.getOrElse(() => -1)
  )
);
