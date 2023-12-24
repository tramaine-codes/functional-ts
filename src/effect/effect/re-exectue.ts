import { Console, Effect, pipe } from 'effect';

let i = 0;
const bad = Effect.succeed(i++);
const good = Effect.suspend(() => Effect.succeed(i++));

pipe(bad, Effect.tap(Console.log), Effect.runSync);
pipe(bad, Effect.tap(Console.log), Effect.runSync);

pipe(good, Effect.tap(Console.log), Effect.runSync);
pipe(good, Effect.tap(Console.log), Effect.runSync);
