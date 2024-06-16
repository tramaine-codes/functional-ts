import S from 'sanctuary';

const users = [
  { name: 'samara', age: 24, gender: 'f' },
  { name: 'john', age: 20, gender: 'm' },
  { name: 'bill', age: 33, gender: 'm' },
  { name: 'marry', age: 22, gender: 'f' },
  { name: 'paula', age: 24, gender: 'f' },
];

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(S.filter((x: { gender: string }) => x.gender === 'f')(users));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  S.pipe([
    S.filter((x: { gender: string; age: number }) => x.gender === 'f'),
    S.sortBy(S.prop('age')),
  ])(users)
);
