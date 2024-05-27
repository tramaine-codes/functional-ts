/* eslint-disable no-console */
import * as O from 'ts-option';

const get = <T>(lst: readonly T[], index: number) => O.option(lst[index]);

console.log(get([1, 2, 3], 2).getOrElse(() => -1));

console.log(get([1, 2, 3], 3).getOrElse(() => -1));
