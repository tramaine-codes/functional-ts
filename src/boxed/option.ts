/* eslint-disable no-console */
import { Option } from '@swan-io/boxed';

const get = <T>(lst: readonly T[], index: number) => {
  return Option.fromNullable(lst[index]);
};

console.log(get([1, 2, 3], 2).getWithDefault(-1));

console.log(get([1, 2, 3], 3).getWithDefault(-1));
