/* eslint-disable no-console */
import { Option } from 'prelude-ts';

const get = <T>(array: readonly T[], index: number) => {
  return Option.ofNullable(array[index]);
};

console.log(get([1, 2, 3], 2).getOrElse(-1));

console.log(get([1, 2, 3], 3).getOrCall(() => -1));
