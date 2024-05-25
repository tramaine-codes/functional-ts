import util from 'bun';

class Box<T> {
  private readonly x: T;

  private constructor(x: T) {
    this.x = x;
  }

  chain = <U>(f: (x: T) => U) => f(this.x);

  fold = <U>(f: (x: T) => U) => f(this.x);

  map = <U>(f: (x: T) => U) => Box.of(f(this.x));

  [util.inspect.custom] = () => {
    return `Box(${util.inspect(this.x)})`;
  };

  static of = <T>(x: T) => new Box(x);
}

const nextCharForNumberString_ = (str: string) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = number + 1;
  return String.fromCharCode(nextNumber);
};

const nextCharForNumberString = (str: string) =>
  Box.of(str)
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

  return Box.of(xs)
    .map((xs) => xs.filter((x) => x >= 20))
    .map(first)
    .map((x) => x / 2)
    .fold((x) => `The answer is ${x}`);
};

const calc___ = (x: number, y: number, z: number) => x + y * z;

const calc__ = (x: number, y: number, z: number) =>
  Box.of(x).map((x) =>
    Box.of(y)
      .map((y) => y * z)
      .map((yz) => x + yz)
  );

const calc_ = (x: number, y: number, z: number) =>
  Box.of(x).fold((x) =>
    Box.of(y)
      .map((y) => y * z)
      .fold((yz) => x + yz)
  );

const calc = (x: number, y: number, z: number) =>
  Box.of(x)
    .chain((x) =>
      Box.of(y)
        .map((y) => y * z)
        .map((yz) => x + yz)
    )
    .fold((x) => x);

// eslint-disable-next-line no-console
console.log(halfTheFirstLargeNumber_([1, 4, 50]));

// eslint-disable-next-line no-console
console.log(halfTheFirstLargeNumber([1, 4, 50]));

// eslint-disable-next-line no-console
console.log(calc___(1, 2, 4));

// eslint-disable-next-line no-console
console.log(calc__(1, 2, 4));

// eslint-disable-next-line no-console
console.log(calc_(1, 2, 4));

// eslint-disable-next-line no-console
console.log(calc(1, 2, 4));
