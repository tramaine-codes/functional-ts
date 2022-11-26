/* eslint-disable no-console */
import Monet from 'monet';

const get = <T>(array: readonly T[], index: number) => {
  return Monet.Maybe.fromUndefined(array[index]);
};

console.log(get([1, 2, 3], 2).getOrElse(-1));

console.log(get([1, 2, 3], 3).getOrElse(-1));
