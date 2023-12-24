import { Chunk, Console, Effect, Option, ReadonlyArray, pipe } from 'effect';

const add = (x: number) => (y: number) => x + y;

pipe(
  Option.some(add),
  Option.ap(Option.some(2)),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);

pipe(
  Option.some(add),
  Option.ap(pipe(Chunk.make(1, 2, 3), Chunk.get(1))),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);

pipe(
  Option.some(add),
  Option.ap(pipe([1, 2, 3], ReadonlyArray.get(3))),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);
