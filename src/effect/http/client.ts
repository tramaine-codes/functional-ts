import * as Http from '@effect/platform/HttpClient';
import * as Schema from '@effect/schema/Schema';
import { Console, Effect } from 'effect';
import { constVoid, pipe } from 'effect/Function';

const Post = Schema.struct({
  id: Schema.number,
  body: Schema.string,
  title: Schema.string,
  userId: Schema.number,
});

await pipe(
  Http.request.get('https://jsonplaceholder.typicode.com/posts/1'),
  Http.client.fetch(),
  Effect.flatMap(Http.response.schemaBodyJson(Post)),
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.match({
    onFailure: constVoid,
    onSuccess: constVoid,
  }),
  Effect.ignore,
  Effect.runPromise
);

await pipe(
  Http.request.get('https://jsonplaceholder.typicode.com/postsz/1'),
  Http.client.fetch(),
  Effect.flatMap(Http.response.schemaBodyJson(Post)),
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.ignore,
  Effect.runPromise
);
