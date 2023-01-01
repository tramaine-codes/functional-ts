/* eslint-disable no-console */
import { Option } from 'oxide.ts';

const get = <T>(lst: readonly T[], index: number) => {
  return Option.from(lst[index]);
};

console.log(get([1, 2, 3], 2).unwrapOr(-1));

console.log(get([1, 2, 3], 3).unwrapOrElse(() => -1));
