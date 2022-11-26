/* eslint-disable no-console */
export class Response {
  constructor(
    private readonly statusCode: 200 | 400,
    private readonly data: unknown
  ) {}

  get body() {
    return JSON.stringify({
      statusCode: this.statusCode,
      body: this.data,
    });
  }

  static log({ body }: Response) {
    console.log(body);
  }
}

export function trySomething() {
  const throwError = () => {
    throw new Error('foo');
  };
  const random = ((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  })(1, 10);

  return random > 5 ? throwError() : random;
}
