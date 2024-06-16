import { Chunk, Console, Effect, Option, identity } from 'effect';

Chunk.make(1, 2, 3).pipe(
  Chunk.get(2),
  Option.match({
    onNone: () => -1,
    onSome: identity,
  }),
  Console.log,
  Effect.runSync
);

Chunk.fromIterable([1, 2, 3]).pipe(
  Chunk.get(3),
  Option.getOrElse(() => -1),
  Console.log,
  Effect.runSync
);
