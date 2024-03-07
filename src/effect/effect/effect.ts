import { Console, Effect, pipe } from 'effect';

const program = Console.log('Hello, World!');

Effect.runSync(program);

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error('cannot divide by zero'))
    : Effect.succeed(a / b);

pipe(
  divide(1, 2),
  Effect.match({
    onFailure: (error) => error.message,
    onSuccess: (value) => value,
  }),
  Effect.flatMap(Console.log),
  Effect.runSync
);

const result = await pipe(
  Effect.promise(() => Promise.resolve(1)),
  Effect.tap(Console.log),
  Effect.runPromise
);

// eslint-disable-next-line no-console
console.log(result);

await pipe(
  Effect.tryPromise(() =>
    fetch('https://jsonplaceholder.typicode.com/todos/1')
  ),
  Effect.flatMap((response) => Effect.tryPromise(() => response.json())),
  Effect.tap(Console.log),
  Effect.runPromise
);
