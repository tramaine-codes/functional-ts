/* eslint-disable no-console */
import { LinkedList, Vector } from 'prelude-ts';

const lst = LinkedList.of(1, 2, 3, 4, 5);

console.log(lst);
console.log(lst.reduce((x, y) => x + y));
console.log(lst.toArray());

const vec = Vector.of(6, 7, 8, 9, 10);

console.log(vec);
console.log(vec.reduce((x, y) => x + y));
console.log(vec.toArray());
