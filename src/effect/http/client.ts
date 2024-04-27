import * as Http from '@effect/platform/HttpClient';
import * as Schema from '@effect/schema/Schema';
import * as Console from 'effect/Console';
import * as Effect from 'effect/Effect';
import * as Function from 'effect/Function';

const Post = Schema.Struct({
  id: Schema.Number,
  body: Schema.String,
  title: Schema.String,
  userId: Schema.Number,
});

await Http.request.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
  Http.client.fetch,
  Effect.andThen(Http.response.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.match({
    onFailure: Function.constVoid,
    onSuccess: Function.constVoid,
  }),
  Effect.ignore,
  Effect.runPromise
);

await Http.request.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
  Http.client.fetch,
  Effect.andThen(Http.response.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.ignore,
  Effect.runPromise
);
