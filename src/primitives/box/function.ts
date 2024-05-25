import util from 'bun';

const Box = <T>(x: T) => ({
  fold: <U>(f: (x: T) => U) => f(x),
  map: <U>(f: (x: T) => U) => Box(f(x)),
  [util.inspect.custom]: () => `Box {
  ${x}
}`,
});

const nextCharForNumberString_ = (str: string) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

const nextCharForNumberString = (str: string) =>
  Box(str)
    .map((x) => x.trim())
    .map(parseInt)
    .map((x) => x + 1)
    .fold(String.fromCharCode);

// eslint-disable-next-line no-console
console.log(nextCharForNumberString_('   64 '));

// eslint-disable-next-line no-console
console.log(nextCharForNumberString('   64 '));

const halfTheFirstLargeNumber_ = (xs: number[]) => {
  const first = (xs: number[]) => xs[0]!;

  const found = xs.filter((x) => x >= 20);
  const answer = first(found) / 2;
  return `The answer is ${answer}`;
};

const halfTheFirstLargeNumber = (xs: number[]) => {
  const first = (xs: number[]) => xs[0]!;

  return Box(xs)
    .map((xs) => xs.filter((x) => x >= 20))
    .map(first)
    .map((x) => x / 2)
    .fold((x) => `The answer is ${x}`);
};

// eslint-disable-next-line no-console
console.log(halfTheFirstLargeNumber_([1, 4, 50]));

// eslint-disable-next-line no-console
console.log(halfTheFirstLargeNumber([1, 4, 50]));
