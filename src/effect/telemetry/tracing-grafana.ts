import { NodeSdk, Tracer } from '@effect/opentelemetry';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Config, Effect, Encoding } from 'effect';

/*
 *
 *  /v1/traces or /v1/metrics or /v1/logs
 *
 */

// Function to simulate a task with possible subtasks
const task = (
  name: string,
  delay: number,
  children: ReadonlyArray<Effect.Effect<void>> = []
) =>
  Effect.gen(function* () {
    yield* Effect.log(name);
    yield* Effect.sleep(`${delay} millis`);
    for (const child of children) {
      yield* child;
    }
    yield* Effect.sleep(`${delay} millis`);
  }).pipe(Effect.withSpan(name));

const poll = task('/poll', 1);

// Create a program with tasks and subtasks
const program = Effect.gen(function* () {
  yield* task('client', 2, [
    task('/api', 3, [
      task('/authN', 4, [task('/authZ', 5)]),
      task('/payment Gateway', 6, [task('DB', 7), task('Ext. Merchant', 8)]),
      task('/dispatch', 9, [
        task('/dispatch/search', 10),
        Effect.all([poll, poll, poll], { concurrency: 'inherit' }),
        task('/pollDriver/{id}', 11),
      ]),
    ]),
  ]);

  return yield* Effect.currentSpan;
}).pipe(Effect.withSpan('program'));

const { spanId, traceId } = await Effect.runPromise(
  Effect.gen(function* () {
    const baseUrl = yield* Config.string('GRAFANA_OTLP_BASE_URL');
    const instanceId = yield* Config.string('GRAFANA_OTLP_INSTANCE_ID');
    const token = yield* Config.string('GRAFANA_OTLP_TOKEN');

    const url = `${baseUrl}/v1/traces`;
    const authorization = `Basic ${Encoding.encodeBase64(`${instanceId}:${token}`)}`;

    return yield* program.pipe(
      Effect.provide(
        NodeSdk.layer(() => ({
          resource: { serviceName: 'foo' },
          spanProcessor: new BatchSpanProcessor(
            new OTLPTraceExporter({
              headers: {
                Authorization: authorization,
              },
              url,
            })
          ),
        }))
      )
    );
  })
);

await Effect.runPromise(
  Effect.gen(function* () {
    const baseUrl = yield* Config.string('GRAFANA_OTLP_BASE_URL');
    const instanceId = yield* Config.string('GRAFANA_OTLP_INSTANCE_ID');
    const token = yield* Config.string('GRAFANA_OTLP_TOKEN');

    const url = `${baseUrl}/v1/traces`;
    const authorization = `Basic ${Encoding.encodeBase64(`${instanceId}:${token}`)}`;

    return yield* program.pipe(
      Effect.provide(
        NodeSdk.layer(() => ({
          resource: { serviceName: 'bar' },
          spanProcessor: new BatchSpanProcessor(
            new OTLPTraceExporter({
              headers: {
                Authorization: authorization,
              },
              url,
            })
          ),
        }))
      ),
      Effect.withParentSpan(
        Tracer.makeExternalSpan({
          spanId,
          traceId,
        })
      )
    );
  })
);
