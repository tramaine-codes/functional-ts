import Monet from 'monet';

const lst = Monet.List.fromArray([1, 2, 3, 4, 5]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.foldLeft(0)((acc, x) => acc + x));
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(lst.toArray());
