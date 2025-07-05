import { Maybe } from 'purify-ts';

const get = <T>(lst: readonly T[], index: number) =>
  Maybe.fromNullable(lst[index]);

console.log(get([1, 2, 3], 2).orDefault(-1));
console.log(get([1, 2, 3], 3).orDefaultLazy(() => -1));
