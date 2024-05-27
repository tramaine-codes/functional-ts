/* eslint-disable no-console */
import { AR, R, pipe } from '@mobily/ts-belt';

interface Result {
  baz: string;
}

type Errors = readonly string[];

function validate(num: number) {
  if (num < 10) {
    return R.Error(['foo', 'bar'] as const);
  }

  return R.Ok({
    baz: 'qux',
  } as const);
}

function process({ baz }: Result) {
  return AR.resolve(baz);
}

const result = await pipe(
  11,
  validate,
  R.fold<Result, Errors, AR.AsyncResult<Result, Errors>>(AR.resolve, AR.reject),
  AR.flatMap(process)
);

console.log(result);
