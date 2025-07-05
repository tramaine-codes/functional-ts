import {
  bimap,
  Either,
  extract,
  Left,
  mapLeft,
  match,
  pipe,
  Right,
} from 'purifree-ts';
import { Response, trySomething } from '../../util/util.js';

/*
 * Handle errors and successes
 */

const failOrNot = (fail: boolean): Either<string, string> =>
  fail ? Left('failure') : Right('success');

// biome-ignore lint/suspicious/noConsole: testing
pipe(failOrNot(true), match({ Right: console.log, Left: console.error }));

// biome-ignore lint/suspicious/noConsole: testing
pipe(failOrNot(false), match({ Right: console.log, Left: console.error }));

/*
 * Handle exceptions
 */

const result = pipe(
  Either.encase(() => ({ number: trySomething() })),
  mapLeft((e) => ({
    errors: [(e as Error).message],
  }))
);

Response.log(
  pipe(
    result,
    match({
      Left: (data) => new Response(400, data),
      Right: (data) => new Response(200, data),
    })
  )
);

Response.log(
  pipe(
    result,
    bimap(
      (e) => new Response(400, e),
      (data) => new Response(200, data)
    ),
    extract()
  )
);
