import { F } from '@mobily/ts-belt';

const expensive = F.once(() => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('expensive call');

  return 12345;
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(expensive());
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(expensive());
