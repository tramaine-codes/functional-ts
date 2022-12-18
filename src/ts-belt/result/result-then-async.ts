/* eslint-disable no-console */
import { pipe, R } from '@mobily/ts-belt';

function validate(num: number) {
  if (num < 10) {
    return R.Error(['foo', 'bar'] as const);
  }

  return R.Ok({
    baz: 'qux',
  } as const);
}

function process({ baz }: { readonly baz: string }) {
  return Promise.resolve(baz);
}

const result = pipe(1, validate, R.map(process));
// const result = pipe(11, validate, R.map(process));

if (R.isOk(result)) {
  console.log(R.Ok(await pipe(result, R.getExn)));
} else {
  console.log(result);
}
