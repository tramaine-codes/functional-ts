import * as R from 'remeda';

const users = [
  { name: 'samara', age: 24, gender: 'f' },
  { name: 'john', age: 20, gender: 'm' },
  { name: 'bill', age: 33, gender: 'm' },
  { name: 'marry', age: 22, gender: 'f' },
  { name: 'paula', age: 24, gender: 'f' },
];

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  R.pipe(
    users,
    R.filter((x) => x.gender === 'f'),
    R.groupBy((x) => x.age)
  )
);
