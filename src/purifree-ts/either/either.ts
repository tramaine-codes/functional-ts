/* eslint-disable no-console */
import { bimap, Either, extract, Left, match, pipe, Right } from 'purifree-ts';
import { Response, trySomething } from '../../util/util.js';

/*
 * Handle errors and successes
 */

const failOrNot = (fail: boolean): Either<string, string> => {
  return fail ? Left('failure') : Right('success');
};

pipe(failOrNot(true), match({ Right: console.log, Left: console.error }));

pipe(failOrNot(false), match({ Right: console.log, Left: console.error }));

/*
 * Handle exceptions
 */

const result = Either.encase(() => ({ number: trySomething() })).mapLeft(
  (e) => ({
    errors: [(e as Error).message],
  })
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
