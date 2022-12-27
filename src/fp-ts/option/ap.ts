/* eslint-disable no-console */
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

const add = (x: number) => (y: number) => x + y;

pipe(O.some(add), O.ap(O.some(2)), O.ap(O.some(3)), C.log)();

pipe(O.some(add), O.ap(pipe([1, 2, 3], get(1))), O.ap(O.some(3)), C.log)();

pipe(O.some(add), O.ap(pipe([1, 2, 3], get(3))), O.ap(O.some(3)), C.log)();
