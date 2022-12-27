import {
  console as C,
  function as F,
  option as O,
  readonlyArray as RA,
} from 'fp-ts';

const { flow, pipe } = F;

function get(index: number) {
  return flow(RA.lookup(index));
}

pipe(
  [1, 2, 3],
  get(2),
  O.match(
    () => -1,
    (val) => val
  ),
  C.log
)();

pipe(
  [1, 2, 3],
  get(3),
  O.getOrElse(() => -1),
  C.log
)();
