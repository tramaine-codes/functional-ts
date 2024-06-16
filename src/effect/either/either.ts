import { Either } from 'effect';

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  Either.right(1).pipe(
    Either.map((x) => x + 1),
    Either.map((x) => Either.right(x + 1))
  )
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  Either.right(1).pipe(
    Either.map((x) => x + 1),
    Either.andThen((x) => Either.right(x + 1))
  )
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  Either.right(1).pipe(
    Either.andThen((x) => x + 1),
    Either.andThen((x) => Either.right(x + 1))
  )
);
