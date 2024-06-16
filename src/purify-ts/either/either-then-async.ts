import { EitherAsync, Left, Right } from 'purify-ts';

const validate = (num: number) => {
  if (num < 10) {
    return Left(['foo', 'bar'] as const);
  }

  return Right({
    baz: 'qux',
  } as const);
};

const process = async ({ baz }: { readonly baz: string }) => baz;

const result = await EitherAsync.liftEither(validate(11)).chain((a) =>
  EitherAsync<never, string>(() => process(a))
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(result.extract());
