import * as Http from '@effect/platform/HttpClient';
import * as Schema from '@effect/schema/Schema';
import { Console, Effect } from 'effect';
import { constVoid } from 'effect/Function';

const Post = Schema.Struct({
  id: Schema.Number,
  body: Schema.String,
  title: Schema.String,
  userId: Schema.Number,
});

await Http.request.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
  Http.client.fetchOk,
  Effect.andThen(Http.response.schemaBodyJson(Post)),
  Effect.scoped,
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

await Http.request.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
  Http.client.fetchOk,
  Effect.andThen(Http.response.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.ignore,
  Effect.runPromise
);
