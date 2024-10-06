import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import { BunRuntime } from '@effect/platform-bun';
import * as Schema from '@effect/schema/Schema';
import { Console, Effect } from 'effect';
import { constVoid } from 'effect/Function';

const Post = Schema.Struct({
  id: Schema.Number,
  body: Schema.String,
  title: Schema.String,
  userId: Schema.Number,
});

Effect.gen(function* () {
  const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);
  const request = HttpClientRequest.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  return yield* client.execute(request);
}).pipe(
  Effect.andThen(HttpClientResponse.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.provide(FetchHttpClient.layer),
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.match({
    onFailure: constVoid,
    onSuccess: constVoid,
  }),
  Effect.ignore,
  BunRuntime.runMain
);
