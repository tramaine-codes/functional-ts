/* eslint-disable no-console */
import { List } from '@collectable/list';

const lst = List.fromArray([1, 2, 3, 4, 5]);

console.log(List.toArray(List.append(6, lst)));
