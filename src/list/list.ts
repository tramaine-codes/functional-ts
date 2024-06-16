import L from 'list';

const lst = L.list(1, 2, 3, 4, 5);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(L.reduce((acc, x) => acc + x, 0, lst));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(L.toArray(lst));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(L.range(6, 10));
