import { Option } from '@swan-io/boxed';

const get = <T>(lst: readonly T[], index: number) =>
  Option.fromNullable(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 2).getWithDefault(-1));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 3).getWithDefault(-1));
