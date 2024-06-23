import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import * as Schema from '@effect/schema/Schema';
import { Console, Effect } from 'effect';
import { constVoid } from 'effect/Function';

const Post = Schema.Struct({
  id: Schema.Number,
  body: Schema.String,
  title: Schema.String,
  userId: Schema.Number,
});

await HttpClientRequest.get(
  'https://jsonplaceholder.typicode.com/posts/1'
).pipe(
  HttpClient.fetchOk,
  Effect.andThen(HttpClientResponse.schemaBodyJson(Post)),
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

await HttpClientRequest.get(
  'https://jsonplaceholder.typicode.com/posts/1'
).pipe(
  HttpClient.fetchOk,
  Effect.andThen(HttpClientResponse.schemaBodyJson(Post)),
  Effect.scoped,
  Effect.tapBoth({
    onFailure: Console.log,
    onSuccess: Console.log,
  }),
  Effect.ignore,
  Effect.runPromise
);
