/* eslint-disable no-console */
import Monet from 'monet';

const lst = Monet.List.fromArray([1, 2, 3, 4, 5]);

console.log(lst);
console.log(lst.foldLeft(0)((acc, x) => acc + x));
console.log(lst.toArray());
