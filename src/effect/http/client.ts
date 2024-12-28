import {
  FetchHttpClient,
  HttpClient,
  HttpClientResponse,
} from '@effect/platform';
import { BunRuntime } from '@effect/platform-bun';
import { Console, Effect, Schema } from 'effect';

const Post = Schema.Struct({
  id: Schema.Number,
  body: Schema.String,
  title: Schema.String,
  userId: Schema.Number,
});

Effect.gen(function* () {
  const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);

  return yield* client.get('https://jsonplaceholder.typicode.com/posts/1');
}).pipe(
  Effect.andThen(HttpClientResponse.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.provide(FetchHttpClient.layer),
  Effect.tapBoth({
    onFailure: (error) => Console.log(error),
    onSuccess: (post) => Console.log(post),
  }),
  Effect.ignore,
  BunRuntime.runMain
);
