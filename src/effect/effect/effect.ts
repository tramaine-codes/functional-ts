import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';
import * as Function from 'effect/Function';

const program = Console.log('Hello, World!');

Effect.runSync(program);

const divide = (a: number, b: number) =>
  Effect.if(b === 0, {
    onTrue: () => Effect.fail(new Error('cannot divide by zero')),
    onFalse: () => Effect.succeed(a / b),
  });

Function.pipe(
  divide(1, 2),
  Effect.match({
    onFailure: (error) => error.message,
    onSuccess: (value) => value,
  }),
  Effect.flatMap(Console.log),
  Effect.runSync
);

const result = await Effect.promise(() => Promise.resolve(1)).pipe(
  Effect.tap(Console.log),
  Effect.runPromise
);

// eslint-disable-next-line no-console
console.log(result);

await Effect.tryPromise(() =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
).pipe(
  Effect.flatMap((response) => Effect.tryPromise(() => response.json())),
  Effect.tap(Console.log),
  Effect.runPromise
);
