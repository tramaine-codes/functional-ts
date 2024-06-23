import { Console, Context, Effect, Option } from 'effect';

class Random extends Context.Tag('MyRandomService')<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

class Logger extends Context.Tag('MyLoggerService')<
  Logger,
  {
    readonly log: (message: string) => Effect.Effect<void>;
  }
>() {}

// type RandomShape = Context.Tag.Service<Random>;
// type LoggerShape = Context.Tag.Service<Logger>;

const program1 = Random.pipe(
  Effect.andThen((random) => random.next),
  Effect.andThen((randomNumber) =>
    Console.log(`random number: ${randomNumber}`)
  )
);
const runnable1 = Effect.provideService(program1, Random, {
  next: Effect.sync(() => Math.random()),
});
Effect.runSync(runnable1);

const program2 = Effect.all([Random, Logger]).pipe(
  Effect.andThen(([random, logger]) =>
    random.next.pipe(
      Effect.andThen((randomNumber) => logger.log(`${randomNumber}`))
    )
  )
);
const runnable2 = program2.pipe(
  Effect.provideService(Random, {
    next: Effect.sync(() => Math.random()),
  }),
  Effect.provideService(Logger, {
    log: Console.log,
  })
);
Effect.runSync(runnable2);

const context = Context.empty().pipe(
  Context.add(Random, {
    next: Effect.sync(() => Math.random()),
  }),
  Context.add(Logger, {
    log: Console.log,
  })
);
const runnable3 = Effect.provide(program2, context);
Effect.runSync(runnable3);

const program3 = Effect.serviceOption(Random).pipe(
  Effect.andThen((randomOption) =>
    Option.match(randomOption, {
      onNone: () => Effect.succeed(-1),
      onSome: (random) => random.next,
    })
  ),
  Effect.andThen((randomNumber) => Console.log(`${randomNumber}`))
);
Effect.runSync(program3);
Effect.runSync(
  Effect.provideService(program3, Random, {
    next: Effect.sync(() => Math.random()),
  })
);
