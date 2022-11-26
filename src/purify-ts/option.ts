/* eslint-disable no-console */
import { Maybe } from 'purify-ts';

const get = <T>(array: readonly T[], index: number) => {
  return Maybe.fromNullable(array[index]);
};

console.log(get([1, 2, 3], 2).orDefault(-1));

console.log(get([1, 2, 3], 3).orDefaultLazy(() => -1));
