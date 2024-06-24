import { Console, Context, Effect, Layer } from 'effect';

class Config extends Context.Tag('Config')<
  Config,
  {
    readonly getConfg: Effect.Effect<{
      readonly logLevel: string;
      readonly connection: string;
    }>;
  }
>() {}

class Logger extends Context.Tag('Logger')<
  Logger,
  {
    readonly log: (message: string) => Effect.Effect<void>;
  }
>() {}

class Database extends Context.Tag('Database')<
  Database,
  {
    readonly query: (sql: string) => Effect.Effect<unknown>;
  }
>() {}

////////////////////////////////////////////////////////////////////////

const ConfigLive = Layer.succeed(Config, {
  getConfg: Effect.succeed({
    connection: 'mysql://username:password@hostname:port/database_name',
    logLevel: 'INFO',
  }),
});

////////////////////////////////////////////////////////////////////////

const LoggerLive = Layer.effect(
  Logger,
  Effect.gen(function* () {
    const config = yield* Config;
    return {
      log: (message) =>
        Effect.gen(function* () {
          const { logLevel } = yield* config.getConfg;
          yield* Console.log(`[${logLevel}] ${message}`);
        }),
    };
  })
);

const LoggerLivePipe = Layer.effect(
  Logger,
  Config.pipe(
    Effect.andThen((config) => config.getConfg),
    Effect.andThen(({ logLevel }) => ({
      log: (message: string) => Console.log(`[${logLevel}] ${message}`),
    }))
  )
);

////////////////////////////////////////////////////////////////////////

const DatabaseLive = Layer.effect(
  Database,
  Effect.gen(function* () {
    const config = yield* Config;
    const logger = yield* Logger;
    return {
      query: (sql: string) =>
        Effect.gen(function* () {
          yield* logger.log(`Executing query: ${sql}`);
          const { connection } = yield* config.getConfg;
          return {
            result: `Results from ${connection}`,
          };
        }),
    };
  })
);

const DatabaseLivePipe = Layer.effect(
  Database,
  Effect.all([Config, Logger]).pipe(
    Effect.andThen(([config, logger]) =>
      config.getConfg.pipe(
        Effect.andThen(({ connection }) => ({
          query: (sql: string) =>
            logger
              .log(`Executing query: ${sql}`)
              .pipe(
                Effect.andThen(() => ({ result: `Results from ${connection}` }))
              ),
        }))
      )
    )
  )
);

////////////////////////////////////////////////////////////////////////

const AppConfigLive = LoggerLive.pipe(Layer.provideMerge(ConfigLive));
const MainLive = DatabaseLive.pipe(Layer.provide(AppConfigLive));

const program = Effect.gen(function* () {
  const database = yield* Database;
  return yield* database.query('SELECT * FROM users');
});

Effect.runSync(
  program.pipe(Effect.provide(MainLive), Effect.andThen(Console.log))
);

////////////////////////////////////////////////////////////////////////

const AppConfigLivePipe = LoggerLivePipe.pipe(Layer.provideMerge(ConfigLive));
const MainLivePipe = DatabaseLivePipe.pipe(Layer.provide(AppConfigLivePipe));

const programPipe = Database.pipe(
  Effect.andThen((database) => database.query('SELECT * FROM users'))
);

Effect.runSync(
  programPipe.pipe(Effect.provide(MainLivePipe), Effect.andThen(Console.log))
);
