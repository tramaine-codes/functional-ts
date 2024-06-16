import { match } from 'ts-pattern';

type Foo = 'foo' | 'bar' | 'baz';

const qux = (): Foo => 'foo';

const quux = match(qux())
  .with('foo', () => 1)
  .with('bar', () => 'bar')
  .with('baz', () => 'baz')
  .exhaustive();

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(quux);
