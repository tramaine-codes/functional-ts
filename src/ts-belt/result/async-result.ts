import { AR, R, pipe } from '@mobily/ts-belt';

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
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

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
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

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await pipe(
    AR.make(Promise.resolve()),
    AR.match(
      () => 'AR: resolve',
      () => 'AR: reject'
    )
  )
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await pipe(
    AR.make(Promise.reject()),
    AR.match(
      () => 'AR: resolve',
      () => 'AR: reject'
    )
  )
);
