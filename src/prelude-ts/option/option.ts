/* eslint-disable no-console */
import { Option } from 'prelude-ts';

const get = <T>(lst: readonly T[], index: number) =>
  Option.ofNullable(lst[index]);

console.log(get([1, 2, 3], 2).getOrElse(-1));

console.log(get([1, 2, 3], 3).getOrCall(() => -1));
