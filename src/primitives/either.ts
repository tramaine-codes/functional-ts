/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import util from 'bun';

abstract class Either<L, R> {
  protected constructor(
    protected readonly _tag: 'Left' | 'Right',
    protected readonly x: L | R
  ) {}

  abstract chain: <R2>(f: (x: R) => R2) => R2;

  abstract fold: <L2, R2>(o: {
    onLeft: (x: L) => L2;
    onRight: (x: R) => R2;
  }) => L2 | R2;

  abstract map: <R2>(f: (x: R) => R2) => Either<L, R2>;

  abstract mapLeft: <L2>(f: (x: L) => L2) => Either<L2, R>;

  protected [util.inspect.custom] = () =>
    `${this._tag}(${util.inspect(this.x)})`;

  static fromNullable = <T>(x: T) =>
    x !== null && x !== undefined ? Right.of(x) : Left.of('Left');

  static left = <L>(x: L) => Left.of(x);

  static right = <R>(x: R) => Right.of(x);

  static try = <R2, L2 = unknown>(f: () => R2): Either<L2, R2> => {
    try {
      return Right.of(f());
    } catch (error) {
      return Left.of<L2>(error as L2);
    }
  };
}

class Right<R, L = never> extends Either<L, R> {
  private constructor(protected override readonly x: R) {
    super('Right', x);
  }

  chain = <R2>(f: (x: R) => R2) => f(this.x);

  fold = <L2, R2>({
    onRight,
  }: {
    onLeft: (x: L) => L2;
    onRight: (x: R) => R2;
  }) => onRight(this.x);

  map = <R2>(f: (x: R) => R2): Either<L, R2> =>
    Right.of(f(this.x)) as unknown as Either<L, R2>;

  mapLeft = <L2>(_: (x: L) => L2): Either<L2, R> =>
    this as unknown as Either<L2, R>;

  static of = <R>(x: R) => new Right(x);
}

class Left<L, R = never> extends Either<L, R> {
  private constructor(protected override readonly x: L) {
    super('Left', x);
  }

  chain = <R2>(_: (x: R) => R2) => this as unknown as R2;

  fold = <L2, R2>({
    onLeft,
  }: {
    onLeft: (x: L) => L2;
    onRight: (x: R) => R2;
  }) => onLeft(this.x);

  map = <R2>(_: (x: R) => R2): Either<L, R2> =>
    this as unknown as Either<L, R2>;

  mapLeft = <L2>(f: (x: L) => L2): Either<L2, R> =>
    Left.of(f(this.x)) as unknown as Either<L2, R>;

  static of = <L>(x: L) => new Left(x);
}

const findColor = (name: string) =>
  Either.fromNullable(
    { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]
  );

console.log(
  findColor('red')
    .map((color) => color.toUpperCase())
    .map((color) => color.slice(1))
    .fold({
      onLeft: () => 'no color!',
      onRight: (color) => color,
    })
);

console.log(
  findColor('foo')
    .map((color) => color.toUpperCase())
    .map((color) => color.slice(1))
    .fold({
      onLeft: () => 'no color!',
      onRight: (color) => color,
    })
);

console.log(Either.fromNullable(1));
console.log(Either.fromNullable(false));
console.log(Either.fromNullable(null));
console.log(Either.fromNullable(undefined));
console.log(Either.fromNullable(1).map(() => Either.fromNullable(2)));
console.log(Either.fromNullable(1).chain(() => Either.fromNullable(2)));
console.log(Either.fromNullable(null).chain(() => Either.fromNullable(1)));
console.log(
  Either.try(() => {
    throw new Error('baz');
  })
);
console.log(
  Either.try<never, Error>(() => {
    throw new Error('qux');
  }).mapLeft((_) => 'an error was thrown and caught')
);
