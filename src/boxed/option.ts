import { Option } from '@swan-io/boxed';

const get = <T>(lst: readonly T[], index: number) =>
  Option.fromNullable(lst[index]);

console.log(get([1, 2, 3], 2).getOr(-1));
console.log(get([1, 2, 3], 3).getOr(-1));
