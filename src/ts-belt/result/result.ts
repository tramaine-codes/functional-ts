import { R, pipe } from '@mobily/ts-belt';

interface Foo {
  status: 200 | 400;
  body: string;
}

const success = (): Promise<Foo> =>
  Promise.resolve({
    status: 200,
    body: 'success',
  });

const failure = (body: string): Foo => ({
  status: 400,
  body,
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await pipe(
    R.Ok('foo'),
    R.match(success, () => Promise.resolve(failure('failure')))
  )
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await pipe(
    R.Error('failure'),
    R.match(success, (message) => Promise.resolve(failure(message)))
  )
);
