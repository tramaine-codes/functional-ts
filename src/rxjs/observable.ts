/* eslint-disable no-console */
import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('foo');
  subscriber.next(42);
});

foo.subscribe(console.log);
foo.subscribe(console.log);
