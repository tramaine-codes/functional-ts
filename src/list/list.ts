/* eslint-disable no-console */
import * as L from 'list';

const lst = L.list(1, 2, 3, 4, 5);

console.log(lst);
console.log(L.reduce((acc, x) => acc + x, 0, lst));
console.log(L.toArray(lst));
console.log(L.range(6, 10));
