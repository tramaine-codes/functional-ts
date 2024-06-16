import { Just, List, extract, lift2C, pipe } from 'purifree-ts';

const add = (x: number) => (y: number) => x + y;
const addLifted = lift2C(add);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(Just(3), pipe(Just(2), addLifted), extract()));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe([1, 2, 3], List.at(1), pipe(Just(2), addLifted), extract()));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe([1, 2, 3], List.at(3), pipe(Just(2), addLifted), extract()));
