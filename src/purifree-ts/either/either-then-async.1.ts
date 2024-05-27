/* eslint-disable no-console */
import { EitherAsync, Left, Right, chain, extract, pipe } from 'purifree-ts';

function validate(num: number) {
  if (num < 10) {
    return Left(['foo', 'bar'] as const);
  }

  return Right({
    baz: 'qux',
  } as const);
}

async function process({ baz }: { readonly baz: string }) {
  return baz;
}

const result = pipe(
  await pipe(
    11,
    validate,
    EitherAsync.liftEither,
    chain((a) => EitherAsync<never, string>(() => process(a)))
  ),
  extract()
);

console.log(result);
