/* eslint-disable no-console */
import { either as E, function as F, task as T, taskEither as TE } from 'fp-ts';

const { flow, pipe } = F;

function validate(num: number) {
  if (num < 10) {
    return E.left(['foo', 'bar'] as const);
  }

  return E.right({
    baz: 'qux',
  } as const);
}

function process({ baz }: { readonly baz: string }): T.Task<string> {
  return async () => baz;
}

const result = await pipe(
  11,
  validate,
  TE.fromEither,
  TE.chainW(flow(process, TE.fromTask))
)();

console.log(result);
