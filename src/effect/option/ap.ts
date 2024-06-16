import { Array as Arr, Chunk, Console, Effect, Option, pipe } from 'effect';

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
  Option.ap(pipe([1, 2, 3], Arr.get(3))),
  Option.ap(Option.some(3)),
  Console.log,
  Effect.runSync
);
