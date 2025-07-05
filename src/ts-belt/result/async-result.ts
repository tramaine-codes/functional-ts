import { AR, pipe, R } from '@mobily/ts-belt';

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
