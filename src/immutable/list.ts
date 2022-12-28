/* eslint-disable no-console */
import { List, Range } from 'immutable';

const lst = List([1, 2, 3, 4, 5]);

console.log(lst);
console.log(lst.reduce((acc, x) => acc + x, 0, lst));
console.log(lst.toArray());
console.log(Range(6, 10).toArray());
