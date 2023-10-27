import { Console, Effect, pipe } from 'effect';

const program = Console.log('Hello, World!');

Effect.runSync(program);

const divide = (a: number, b: number): Effect.Effect<never, Error, number> =>
  b === 0
    ? Effect.fail(new Error('cannot divide by zero'))
    : Effect.succeed(a / b);

pipe(
  divide(1, 2),
  // Effect.match({
  //   onFailure: (error) => error.message,
  //   onSuccess: (value) => value,
  // }),
  Effect.mapBoth({
    onFailure: (error) => error.message,
    onSuccess: (value) => value,
  }),
  (x) => x,
  Console.log,
  Effect.runSync
);
