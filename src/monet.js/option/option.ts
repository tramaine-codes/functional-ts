import Monet from 'monet';

const get = <T>(lst: readonly T[], index: number) =>
  Monet.Maybe.fromUndefined(lst[index]);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 2).getOrElse(-1));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(get([1, 2, 3], 3).getOrElse(-1));
