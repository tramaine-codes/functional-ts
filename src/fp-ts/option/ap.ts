/* eslint-disable no-console */
import { function as F, option as O, readonlyArray as RA } from 'fp-ts';

const { flow, pipe } = F;

function get(index: number) {
  return flow(RA.lookup(index));
}

console.log(
  pipe(
    O.some((x: number) => (y: number) => x + y),
    O.ap(O.some(2)),
    O.ap(O.some(3))
  )
);

console.log(
  pipe(
    O.some((x: number) => (y: number) => x + y),
    O.ap(pipe([1, 2, 3], get(1))),
    O.ap(O.some(3))
  )
);

console.log(
  pipe(
    O.some((x: number) => (y: number) => x + y),
    O.ap(pipe([1, 2, 3], get(3))),
    O.ap(O.some(3))
  )
);
