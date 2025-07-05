import { Either, Left, Right } from 'purify-ts';
import { Response, trySomething } from '../../util/util.js';

/*
 * Handle errors and successes
 */

const failOrNot = (fail: boolean): Either<string, string> =>
  fail ? Left('failure') : Right('success');

// biome-ignore lint/suspicious/noConsole: testing
failOrNot(true).caseOf({ Right: console.log, Left: console.error });

// biome-ignore lint/suspicious/noConsole: testing
failOrNot(false).caseOf({ Right: console.log, Left: console.error });

/*
 * Handle exceptions
 */

const result = Either.encase(() => ({ number: trySomething() })).mapLeft(
  (e) => ({
    errors: [(e as Error).message],
  })
);

Response.log(
  result.caseOf({
    Left: (data) => new Response(400, data),
    Right: (data) => new Response(200, data),
  })
);

Response.log(
  result
    .bimap(
      (e) => new Response(400, e),
      (data) => new Response(200, data)
    )
    .extract()
);
