import { Console, Effect, Match, pipe } from 'effect';

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

Effect.runSync(Console.log(quux));

const match = pipe(
  Match.type<{ a: number } | { b: string }>(),
  Match.when({ a: Match.number }, (_) => _.a),
  Match.when({ b: Match.string }, (_) => _.b),
  Match.exhaustive
);

Effect.runSync(Console.log(match({ a: 0 })));
Effect.runSync(Console.log(match({ b: 'hello' })));
