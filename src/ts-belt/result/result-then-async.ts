/* eslint-disable no-console */
import { AR, pipe, R } from '@mobily/ts-belt';

async function validate(num: number) {
  if (num < 10) {
    return R.Error(['foo', 'bar'] as const);
  }

  return R.Ok({
    baz: 'qux',
  } as const);
}

// function validate2(num: number) {
//   if (num < 10) {
//     return AR.reject(['foo', 'bar'] as const);
//   }

//   return AR.resolve({
//     baz: 'qux',
//   } as const);
// }

function process({ baz }: { readonly baz: string }) {
  return AR.resolve(baz);
}

const result = await pipe(11, validate, AR.flatMap(process));

console.log(result);
