import { Chunk, Console, Effect, Option, pipe } from 'effect';

pipe(
  Chunk.make(1, 2, 3),
  Chunk.get(2),
  Option.match({
    onNone: () => -1,
    onSome: (val) => val,
  }),
  Console.log,
  Effect.runSync
);

pipe(
  [1, 2, 3],
  Chunk.fromIterable,
  Chunk.get(3),
  Option.getOrElse(() => -1),
  Console.log,
  Effect.runSync
);
