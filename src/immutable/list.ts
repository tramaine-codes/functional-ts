import { List, Range } from 'immutable';

const lst = List([1, 2, 3, 4, 5]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.reduce((acc, x) => acc + x, 0, lst));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.toArray());
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(Range(6, 10).toArray());
