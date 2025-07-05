import { Console, Effect, pipe } from 'effect';

const program = Console.log('Hello, World!');
Effect.runSync(program);

const divide = (a: number, b: number) =>
  Effect.if(b === 0, {
    onTrue: () => Effect.fail(new Error('cannot divide by zero')),
    onFalse: () => Effect.succeed(a / b),
  });

pipe(
  divide(1, 2),
  Effect.match({
    onFailure: (error) => error.message,
    onSuccess: (value) => value,
  }),
  Effect.tap(Console.log),
  Effect.runSync
);

const result = await Effect.promise(() => Promise.resolve(1)).pipe(
  Effect.tap(Console.log),
  Effect.runPromise
);
console.log(result);

await Effect.tryPromise(() =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
).pipe(
  Effect.andThen((response) => Effect.tryPromise(() => response.json())),
  Effect.tap(Console.log),
  Effect.runPromise
);

await Effect.tryPromise(() =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
).pipe(
  Effect.andThen((response) => Effect.tryPromise(() => response.json())),
  Effect.tap(Console.log),
  Effect.runPromise
);

Effect.succeed(1).pipe(
  Effect.andThen((x) => x + 1),
  Effect.andThen((x) => Effect.succeed(x + 1)),
  Effect.tap(Console.log),
  Effect.runSync
);

Effect.orElse(Effect.succeed('succeed 1'), () =>
  Effect.succeed('succeed 2')
).pipe(Effect.tap(Console.log), Effect.runSync);

Effect.orElse(Effect.fail('fail 1'), () => Effect.succeed('succeed 2')).pipe(
  Effect.tap(Console.log),
  Effect.runSync
);
