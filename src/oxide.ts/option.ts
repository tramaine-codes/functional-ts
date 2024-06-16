import { Option } from 'oxide.ts';

const get = <T>(lst: readonly T[], index: number) => Option.from(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 2).unwrapOr(-1));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 3).unwrapOrElse(() => -1));
