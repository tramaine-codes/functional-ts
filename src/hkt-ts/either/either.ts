/* eslint-disable no-console */
import { Either, pipe } from 'hkt-ts';
import { Response, trySomething } from '../../util/util.js';

/*
 * Handle errors and successes
 */

const failOrNot = (fail: boolean): Either.Either<string, string> => {
  return fail ? Either.Left('failure') : Either.Right('success');
};

pipe(failOrNot(true), Either.match(console.log, console.error));

pipe(failOrNot(false), Either.match(console.log, console.error));

/*
 * Handle exceptions
 */

const result = pipe(
  Either.tryCatch(() => ({ number: trySomething() })),
  Either.mapLeft((e) => ({ errors: [(e as Error).message] }))
);

Response.log(
  pipe(
    result,
    Either.match(
      (data) => new Response(400, data),
      (data) => new Response(200, data)
    )
  )
);

Response.log(
  pipe(
    result,
    Either.bimap(
      (e) => new Response(400, e),
      (data) => new Response(200, data)
    ),
    Either.match(
      (response) => response,
      (response) => response
    )
  )
);
