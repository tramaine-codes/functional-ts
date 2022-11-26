/* eslint-disable no-console */
import { err, ok, Result } from 'neverthrow';
import { Response, trySomething } from '../util/util.js';

/*
 * Handle errors and successes
 */

const failOrNot = (fail: boolean): Result<string, string> => {
  return fail ? err('failure') : ok('success');
};

failOrNot(true).match(console.log, console.error);

failOrNot(false).match(console.log, console.error);

/*
 * Handle exceptions
 */

const result = Result.fromThrowable(
  () => ({ number: trySomething() }),
  (e) => ({ errors: [(e as Error).message] })
)();

Response.log(
  result.match(
    (data) => new Response(200, data),
    (data) => new Response(400, data)
  )
);

Response.log(
  result
    .map((data) => new Response(200, data))
    .mapErr((data) => new Response(400, data))
    .match(
      (response) => response,
      (response) => response
    )
);
