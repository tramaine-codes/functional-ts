/* eslint-disable no-console */
import { pipe, fromArray, subscribe } from 'wonka';

pipe(fromArray([1, 2, 3]), subscribe(console.log));
