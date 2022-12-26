/* eslint-disable no-console */
import * as R from 'remeda';

const users = [
  { name: 'john', age: 20, gender: 'm' },
  { name: 'marry', age: 22, gender: 'f' },
  { name: 'samara', age: 24, gender: 'f' },
  { name: 'paula', age: 24, gender: 'f' },
  { name: 'bill', age: 33, gender: 'm' },
];

console.log(
  R.pipe(
    users,
    R.filter((x) => x.gender === 'f'),
    R.groupBy((x) => x.age)
  )
);
