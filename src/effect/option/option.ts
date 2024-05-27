import * as Chunk from 'effect/Chunk';
import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';
import * as F from 'effect/Function';
import * as Option from 'effect/Option';

Chunk.make(1, 2, 3).pipe(
  Chunk.get(2),
  Option.match({
    onNone: () => -1,
    onSome: F.identity,
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
