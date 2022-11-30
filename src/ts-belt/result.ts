/* eslint-disable no-console */
import { AR, pipe, R } from '@mobily/ts-belt';

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

console.log(
  await pipe(
    R.Ok('foo'),
    R.match(success, () => Promise.resolve(failure('failure')))
  )
);

console.log(
  await pipe(
    R.Error('failure'),
    R.match(success, (message) => Promise.resolve(failure(message)))
  )
);

console.log(
  await pipe(
    R.Ok('foo'),
    R.match(
      () => Promise.resolve(),
      () => Promise.reject()
    ),
    AR.make,
    AR.match(
      () => 'R -> AR: resolve',
      () => 'R -> AR: reject'
    )
  )
);

console.log(
  await pipe(
    R.Error('foo'),
    R.match(
      () => Promise.resolve(),
      () => Promise.reject()
    ),
    AR.make,
    AR.match(
      () => 'R -> AR: resolve',
      () => 'R -> AR: reject'
    )
  )
);

console.log(
  await pipe(
    AR.make(Promise.resolve()),
    AR.match(
      () => 'AR: resolve',
      () => 'AR: reject'
    )
  )
);

console.log(
  await pipe(
    AR.make(Promise.reject()),
    AR.match(
      () => 'AR: resolve',
      () => 'AR: reject'
    )
  )
);
