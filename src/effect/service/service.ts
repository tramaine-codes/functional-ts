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

////////////////////////////////////////////////////////////////////////

const program1 = Effect.gen(function* () {
  const random = yield* Random;
  const randomNumber = yield* random.next;
  return yield* Console.log(`random number: ${randomNumber}`);
});

Effect.runSync(
  Effect.provideService(program1, Random, {
    next: Effect.sync(() => Math.random()),
  })
);

const program1Pipe = Random.pipe(
  Effect.andThen((random) => random.next),
  Effect.andThen((randomNumber) =>
    Console.log(`random number: ${randomNumber}`)
  )
);

Effect.runSync(
  Effect.provideService(program1Pipe, Random, {
    next: Effect.sync(() => Math.random()),
  })
);

const context1 = Context.empty().pipe(
  Context.add(Random, {
    next: Effect.sync(() => Math.random()),
  })
);

Effect.runSync(Effect.provide(program1, context1));

////////////////////////////////////////////////////////////////////////

const program2 = Effect.gen(function* () {
  const random = yield* Random;
  const randomNumber = yield* random.next;
  const logger = yield* Logger;

  return yield* logger.log(`${randomNumber}`);
});

Effect.runSync(
  program2.pipe(
    Effect.provideService(Random, {
      next: Effect.sync(() => Math.random()),
    }),
    Effect.provideService(Logger, {
      log: Console.log,
    })
  )
);

const program2Pipe = Effect.all([Random, Logger]).pipe(
  Effect.andThen(([random, logger]) =>
    random.next.pipe(
      Effect.andThen((randomNumber) => logger.log(`${randomNumber}`))
    )
  )
);

Effect.runSync(
  program2Pipe.pipe(
    Effect.provideService(Random, {
      next: Effect.sync(() => Math.random()),
    }),
    Effect.provideService(Logger, {
      log: Console.log,
    })
  )
);

////////////////////////////////////////////////////////////////////////

const context2 = Context.empty().pipe(
  Context.add(Random, {
    next: Effect.sync(() => Math.random()),
  }),
  Context.add(Logger, {
    log: Console.log,
  })
);

Effect.runSync(Effect.provide(program2, context2));

////////////////////////////////////////////////////////////////////////

const program3 = Effect.gen(function* () {
  const randomOption = yield* Effect.serviceOption(Random);
  const randNumber = yield* Option.match(randomOption, {
    onNone: () => Effect.succeed(-1),
    onSome: (random) => random.next,
  });
  return yield* Console.log(randNumber);
});

Effect.runSync(program3);

Effect.runSync(
  Effect.provideService(program3, Random, {
    next: Effect.sync(() => Math.random()),
  })
);

const program3Pipe = Effect.serviceOption(Random).pipe(
  Effect.andThen((randomOption) =>
    Option.match(randomOption, {
      onNone: () => Effect.succeed(-1),
      onSome: (random) => random.next,
    })
  ),
  Effect.andThen((randomNumber) => Console.log(`${randomNumber}`))
);

Effect.runSync(program3Pipe);

Effect.runSync(
  Effect.provideService(program3Pipe, Random, {
    next: Effect.sync(() => Math.random()),
  })
);

////////////////////////////////////////////////////////////////////////

const context3 = Context.empty().pipe(
  Context.add(Random, {
    next: Effect.sync(() => Math.random()),
  })
);

Effect.runSync(Effect.provide(program3, context3));
