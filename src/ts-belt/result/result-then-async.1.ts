/* eslint-disable no-console */
import { AR, R, pipe } from '@mobily/ts-belt';

async function validate(num: number) {
  if (num < 10) {
    return R.Error(['foo', 'bar'] as const);
  }

  return R.Ok({
    baz: 'qux',
  } as const);
}

function process({ baz }: { readonly baz: string }) {
  return AR.resolve(baz);
}

const result = await pipe(11, validate, AR.flatMap(process));

console.log(result);
