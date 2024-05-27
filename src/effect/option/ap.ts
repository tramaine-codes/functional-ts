import * as A from 'effect/Array';
import * as Chunk from 'effect/Chunk';
import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';
import * as F from 'effect/Function';
import * as Option from 'effect/Option';

const add = (x: number) => (y: number) => x + y;

Option.some(add).pipe(
  Option.ap(Option.some(2)),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);

Option.some(add).pipe(
  Option.ap(Chunk.make(1, 2, 3).pipe(Chunk.get(1))),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);

Option.some(add).pipe(
  Option.ap(F.pipe([1, 2, 3], A.get(3))),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);
