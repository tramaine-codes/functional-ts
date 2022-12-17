/* eslint-disable no-console */
import { F } from '@mobily/ts-belt';

const expensive = F.once(() => {
  console.log('expensive call');

  return 12345;
});

console.log(expensive());
console.log(expensive());
