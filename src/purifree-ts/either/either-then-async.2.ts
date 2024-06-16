import { EitherAsync, Left, Right, chain, extract, pipe } from 'purifree-ts';

const validate = (num: number) => {
  if (num < 10) {
    return Left(['foo', 'bar'] as const);
  }

  return Right({
    baz: 'qux',
  } as const);
};

const process = async ({ baz }: { readonly baz: string }) => baz;

const result = pipe(
  await pipe(
    11,
    validate,
    EitherAsync.liftEither,
    chain((a) => EitherAsync.fromPromise(async () => Right(await process(a))))
  ),
  extract()
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(result);
