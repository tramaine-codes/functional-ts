import { Option } from 'prelude-ts';

const get = <T>(lst: readonly T[], index: number) =>
  Option.ofNullable(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 2).getOrElse(-1));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 3).getOrCall(() => -1));
