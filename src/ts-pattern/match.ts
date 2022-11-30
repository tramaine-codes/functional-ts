/* eslint-disable no-console */
import { match } from 'ts-pattern';

enum Foo {
  FOO,
  BAR,
  BAZ,
}

const qux = () => {
  return Foo.BAR;
};

console.log(
  match(qux())
    .with(Foo.FOO, () => 'foo')
    .with(Foo.BAR, () => 'bar')
    .with(Foo.BAZ, () => 'baz')
    .exhaustive()
);
