import { PlatformConfigProvider } from '@effect/platform';
import { BunContext } from '@effect/platform-bun';
import { Config, Console, Effect, Layer, Redacted } from 'effect';

Effect.runSync(
  Config.number('foo').pipe(Config.withDefault(0), Effect.andThen(Console.log))
);

Effect.runSync(Config.string('HOME').pipe(Effect.andThen(Console.log)));

const ConfigProviderLive = PlatformConfigProvider.layerFileTree({
  rootDirectory: `${import.meta.dir}/fixtures`,
}).pipe(Layer.provide(BunContext.layer));

await Effect.gen(function* () {
  const secret = yield* Config.redacted('secret');
  const value = yield* Config.string('value').pipe(Config.nested('nested'));

  yield* Console.log('secret:', Redacted.value(secret));
  yield* Console.log('value:', value);
}).pipe(Effect.provide(ConfigProviderLive), Effect.runPromise);
