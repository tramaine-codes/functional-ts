/* eslint-disable no-console */
import { pipe } from '@effect/data/Function';
import * as Match from '@effect/match';

type Foo = 'foo' | 'bar' | 'baz';

const qux = (): Foo => {
  return 'foo';
};

const quux = pipe(
  Match.value(qux()),
  Match.when('foo', () => 1),
  Match.when('bar', () => 'bar'),
  Match.when('baz', () => 'baz'),
  Match.exhaustive
);

console.log(quux);

const match = pipe(
  Match.type<{ a: number } | { b: string }>(),
  Match.when({ a: Match.number }, (_) => _.a),
  Match.when({ b: Match.string }, (_) => _.b),
  Match.exhaustive
);

console.log(match({ a: 0 }));
console.log(match({ b: 'hello' }));
