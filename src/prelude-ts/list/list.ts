import { LinkedList, Vector } from 'prelude-ts';

const lst = LinkedList.of(1, 2, 3, 4, 5);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.reduce((x, y) => x + y));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.toArray());

const vec = Vector.of(6, 7, 8, 9, 10);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(vec);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(vec.reduce((x, y) => x + y));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(vec.toArray());
