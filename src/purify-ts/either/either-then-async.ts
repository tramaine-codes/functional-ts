/* eslint-disable no-console */
import { EitherAsync, Left, Right } from 'purify-ts';

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

const result = await EitherAsync.liftEither(validate(11)).chain((a) =>
  EitherAsync<never, string>(() => process(a))
);

console.log(result.extract());
