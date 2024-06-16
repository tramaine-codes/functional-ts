import { AR, R, pipe } from '@mobily/ts-belt';

const validate = async (num: number) => {
  if (num < 10) {
    return R.Error(['foo', 'bar'] as const);
  }

  return R.Ok({
    baz: 'qux',
  } as const);
};

const process = ({ baz }: { readonly baz: string }) => AR.resolve(baz);

const result = await pipe(11, validate, AR.flatMap(process));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(result);
