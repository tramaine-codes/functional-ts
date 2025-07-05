import Future, {
  attempt,
  attemptP,
  chainRej,
  map,
  mapRej,
  promise,
  reject,
  resolve,
  value,
} from 'fluture';
import { doNothing } from 'remeda';

const future = reject(20)
  .pipe(mapRej((x) => x + 1))
  .pipe(chainRej((x) => resolve(x + x)));

future.pipe(value(console.log));

const foo = await promise(
  Future<Error, string>((_reject, resolve) => {
    resolve('foo');
    return doNothing;
  }).pipe(map((val) => `${val}!`))
);

console.log(foo);

const bar = await promise(
  attempt<Error, string>(() => 'bar').pipe(map((val) => `${val}!`))
);

console.log(bar);

const baz = await promise(
  attemptP<Error, string>(async () => 'baz').pipe(map((val) => `${val}!`))
);

console.log(baz);
