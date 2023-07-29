import { Effect } from 'effect';

const program = Effect.sync(() => {
  // eslint-disable-next-line no-console
  console.log('Hello, World!');
});

Effect.runSync(program);
