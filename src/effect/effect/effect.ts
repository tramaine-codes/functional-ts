import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';
import * as F from 'effect/Function';

const program = Console.log('Hello, World!');

Effect.runSync(program);

const divide = (a: number, b: number) =>
  Effect.if(b === 0, {
    onTrue: () => Effect.fail(new Error('cannot divide by zero')),
    onFalse: () => Effect.succeed(a / b),
  });

F.pipe(
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

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(result);

await Effect.tryPromise(() =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
).pipe(
  Effect.flatMap((response) => Effect.tryPromise(() => response.json())),
  Effect.tap(Console.log),
  Effect.runPromise
);
