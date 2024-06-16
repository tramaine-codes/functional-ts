import { pipe } from 'purifree-ts';
import S from 'shades';

const jack = {
  name: 'Jack Sparrow',
  goldMember: false,
  posts: [
    {
      title:
        'Why is the rum always gone? An analysis of Carribean trade surplus',
      likes: 5,
    },
    {
      title: 'Sea Turtles - The Tortoise and the Hair',
      likes: 70,
    },
  ],
};

const liz = {
  name: 'Elizabeth Swan',
  goldMember: true,
  posts: [
    {
      title: 'Bloody Pirates - My Life Aboard the Black Pearl',
      likes: 10000,
    },
    {
      title:
        'Guidelines - When YOU need to be disinclined to acquiesce to their request',
      likes: 5000,
    },
  ],
};

const bill = {
  name: 'Bill Turner',
  goldMember: false,
  posts: [
    {
      title: 'Bootstraps Bootstraps - UEFI, GRUB and the Linux Kernel',
      likes: 3000,
    },
  ],
};

const store = {
  users: [jack, liz, bill],
  byName: {
    jack,
    liz,
    bill,
  },
};

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(jack, S.get('name')));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(store, S.get('users', 0, 'name')));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(store, S.get('users', S.all(), 'posts')));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(pipe(store, S.get('users', S.all(), 'posts', S.all(), 'likes')));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  pipe(
    store,
    S.mod('users', 0, 'posts', 0, 'likes')((likes: number) => likes + 1),
    S.get('users', 0, 'posts', 0, 'likes')
  )
);
