import { Maybe } from 'purify-ts';

const get = <T>(lst: readonly T[], index: number) =>
  Maybe.fromNullable(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 2).orDefault(-1));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 3).orDefaultLazy(() => -1));
