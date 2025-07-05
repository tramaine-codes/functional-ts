import { Either } from 'effect';

console.log(
  Either.right(1).pipe(
    Either.map((x) => x + 1),
    Either.map((x) => Either.right(x + 1))
  )
);

console.log(
  Either.right(1).pipe(
    Either.map((x) => x + 1),
    Either.andThen((x) => Either.right(x + 1))
  )
);

console.log(
  Either.right(1).pipe(
    Either.andThen((x) => x + 1),
    Either.andThen((x) => Either.right(x + 1))
  )
);
