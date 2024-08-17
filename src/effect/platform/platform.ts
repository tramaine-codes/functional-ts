import { FileSystem, Path } from '@effect/platform';
import { BunFileSystem, BunPath, BunRuntime } from '@effect/platform-bun';
import { Console, Effect } from 'effect';

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;

  const sep = path.sep;
  const realPath = yield* fs.realPath(import.meta.path);
  const url = yield* path.toFileUrl(`.${sep}fixtures${sep}secret`);

  yield* Console.log('real path:', realPath);
  yield* Console.log('path name:', url.pathname);
  yield* Console.log('path sep:', sep);
}).pipe(Effect.provide(BunFileSystem.layer), Effect.provide(BunPath.layer));

BunRuntime.runMain(program);
