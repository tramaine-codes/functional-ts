import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('foo');
  subscriber.next(42);
});

foo.subscribe(console.log);
foo.subscribe(console.log);
