import { Console, Effect, Match } from 'effect';

type Foo = 'foo' | 'bar' | 'baz';

const qux = (): Foo => 'foo';

const quux = Match.value(qux()).pipe(
  Match.when('foo', () => 1),
  Match.when('bar', () => 'bar'),
  Match.when('baz', () => 'baz'),
  Match.exhaustive
);

Effect.runSync(Console.log(quux));

const match = Match.type<{ a: number } | { b: string }>().pipe(
  Match.when({ a: Match.number }, (_) => _.a),
  Match.when({ b: Match.string }, (_) => _.b),
  Match.exhaustive
);

Effect.runSync(Console.log(match({ a: 0 })));
Effect.runSync(Console.log(match({ b: 'hello' })));
