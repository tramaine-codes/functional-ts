import { List, Stream } from '@rimbu/core';

const lst = List.from(Stream.range({ start: 2, amount: 64 }));

console.log(lst.toString());
