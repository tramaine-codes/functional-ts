import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';

let i = 0;
const bad = Effect.succeed(i++);
const good = Effect.suspend(() => Effect.succeed(i++));

bad.pipe(Effect.tap(Console.log), Effect.runSync);
bad.pipe(Effect.tap(Console.log), Effect.runSync);

good.pipe(Effect.tap(Console.log), Effect.runSync);
good.pipe(Effect.tap(Console.log), Effect.runSync);
