---
ContentId: 4e7a2c91-b8d3-4f6e-a1c5-9d0e3f7b2a84
DateApproved: 3/18/2026
MetaDescription: Learn how to monitor GitHub Copilot agent interactions in VS Code with OpenTelemetry traces, metrics, and events.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- monitoring
- telemetry
- OpenTelemetry
- OTel
- traces
- metrics
- agents
---

# Monitor agent usage with OpenTelemetry

This article describes how to enable and configure OpenTelemetry monitoring for Copilot Chat agent interactions in VS Code.

Copilot Chat can export traces, metrics, and events via [OpenTelemetry](https://opentelemetry.io/) (OTel), giving you visibility into agent interactions, LLM calls, tool executions, and token usage. All signal names and attributes follow the [OTel GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/gen-ai/), so the data works with any OTel-compatible backend.

## What gets collected

Copilot Chat emits three types of OTel signals: traces, metrics, and events.

### Traces

Each agent interaction produces a hierarchical span tree that captures the full execution flow:

```text
invoke_agent copilot                           [~15s]
  ├── chat gpt-4o                              [~3s]  (LLM requests tool calls)
  ├── execute_tool readFile                    [~50ms]
  ├── execute_tool runCommand                  [~2s]
  ├── chat gpt-4o                              [~4s]  (LLM generates final response)
  └── (span ends)
```

Three span types make up the trace:

| Span | Description | Key attributes |
|---|---|---|
| `invoke_agent` | Wraps the entire agent orchestration, including all LLM calls and tool executions | Agent name, conversation ID, turn count, total token usage |
| `chat` | A single LLM API call | Model, token counts, response time, finish reason |
| `execute_tool` | A single tool invocation | Tool name, tool type, duration, success status |

When an agent invokes a subagent (for example, through the `runSubagent` tool), the trace context is automatically propagated. The subagent's `invoke_agent` span appears as a child of the parent agent's `execute_tool` span, producing a connected trace tree across async boundaries.

### Metrics

| Metric | Type | Description |
|---|---|---|
| `gen_ai.client.operation.duration` | Histogram | LLM API call duration (seconds) |
| `gen_ai.client.token.usage` | Histogram | Token counts (input and output) |
| `copilot_chat.tool.call.count` | Counter | Tool invocations by name and success |
| `copilot_chat.tool.call.duration` | Histogram | Tool execution latency (milliseconds) |
| `copilot_chat.agent.invocation.duration` | Histogram | Agent end-to-end duration (seconds) |
| `copilot_chat.agent.turn.count` | Histogram | LLM round-trips per agent invocation |
| `copilot_chat.session.count` | Counter | Chat sessions started |
| `copilot_chat.time_to_first_token` | Histogram | Time to first SSE token (seconds) |

Metrics include attributes for filtering, such as `gen_ai.request.model`, `gen_ai.provider.name`, `gen_ai.tool.name`, and `error.type`.

### Events

| Event | Description |
|---|---|
| `gen_ai.client.inference.operation.details` | Full LLM call metadata with model, tokens, and finish reason |
| `copilot_chat.session.start` | Emitted when a new chat session begins |
| `copilot_chat.tool.call` | Per-tool invocation with timing and error details |
| `copilot_chat.agent.turn` | Per-turn LLM round-trip with token counts |

### Resource attributes

All signals carry these resource attributes:

| Attribute | Value |
|---|---|
| `service.name` | `copilot-chat` (configurable with `OTEL_SERVICE_NAME`) |
| `service.version` | Extension version |
| `session.id` | Unique per VS Code window |

Add custom resource attributes with `OTEL_RESOURCE_ATTRIBUTES` to filter by team, department, or other organizational boundaries:

```bash
export OTEL_RESOURCE_ATTRIBUTES="team.id=platform,department=engineering"
```

### Content capture

By default, no prompt content, responses, or tool arguments are captured. Only metadata like model names, token counts, and durations are included.

To capture full content, enable the `setting(github.copilot.chat.otel.captureContent)` setting or set `COPILOT_OTEL_CAPTURE_CONTENT=true`. This populates span attributes with full prompt messages, response messages, system prompts, tool schemas, tool arguments, and tool results.

> [!CAUTION]
> Content capture can include sensitive information such as code, file contents, and user prompts. Only enable this in trusted environments.

## Enable OTel monitoring

OTel activates when any of the following conditions is true:

* `setting(github.copilot.chat.otel.enabled)` is `true`
* `COPILOT_OTEL_ENABLED=true`
* `OTEL_EXPORTER_OTLP_ENDPOINT` is set

### VS Code settings

Open **Settings** (`kb(workbench.action.openSettings)`) and search for `copilot otel`:

| Setting | Type | Default | Description |
|---|---|---|---|
| `setting(github.copilot.chat.otel.enabled)` | boolean | `false` | Enable OTel emission |
| `setting(github.copilot.chat.otel.exporterType)` | string | `"otlp-http"` | `otlp-http`, `otlp-grpc`, `console`, or `file` |
| `setting(github.copilot.chat.otel.otlpEndpoint)` | string | `"http://localhost:4318"` | OTLP collector endpoint |
| `setting(github.copilot.chat.otel.captureContent)` | boolean | `false` | Capture full prompt and response content |
| `setting(github.copilot.chat.otel.outfile)` | string | `""` | File path for JSON-lines output |

### Environment variables

Environment variables always take precedence over VS Code settings.

| Variable | Default | Description |
|---|---|---|
| `COPILOT_OTEL_ENABLED` | `false` | Enable OTel. Also enabled when `OTEL_EXPORTER_OTLP_ENDPOINT` is set. |
| `COPILOT_OTEL_ENDPOINT` | | OTLP endpoint URL (takes precedence over `OTEL_EXPORTER_OTLP_ENDPOINT`) |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | | Standard OTel OTLP endpoint URL |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `http/protobuf` | OTLP protocol. Only `grpc` changes behavior. |
| `OTEL_SERVICE_NAME` | `copilot-chat` | Service name in resource attributes |
| `OTEL_RESOURCE_ATTRIBUTES` | | Extra resource attributes (`key1=val1,key2=val2`) |
| `COPILOT_OTEL_CAPTURE_CONTENT` | `false` | Capture full prompt and response content |
| `OTEL_EXPORTER_OTLP_HEADERS` | | Auth headers (for example, `Authorization=Bearer token`) |

## Use with observability backends

Copilot Chat's OTel output works with any backend that supports the OTLP protocol. Point the `setting(github.copilot.chat.otel.otlpEndpoint)` setting or `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable at the backend's OTLP ingestion URL, and configure the exporter type to match the backend's protocol (`otlp-http` or `otlp-grpc`).

### Aspire Dashboard

The [Aspire Dashboard](https://aspire.dev/dashboard/standalone/) is the simplest option for local development. It is a single Docker container with a built-in OTLP endpoint and trace viewer, and requires no cloud account.

```bash
docker run --rm -d \
  -p 18888:18888 \
  -p 4317:18889 \
  --name aspire-dashboard \
  mcr.microsoft.com/dotnet/aspire-dashboard:latest
```

```json
{
  "github.copilot.chat.otel.enabled": true,
  "github.copilot.chat.otel.exporterType": "otlp-grpc",
  "github.copilot.chat.otel.otlpEndpoint": "http://localhost:4317"
}
```

Open `http://localhost:18888` and go to **Traces** to view your agent interaction spans.

### Jaeger

[Jaeger](https://www.jaegertracing.io/) is an open-source distributed tracing platform that accepts OTLP directly.

```bash
docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/jaeger:latest
```

```json
{
  "github.copilot.chat.otel.enabled": true,
  "github.copilot.chat.otel.otlpEndpoint": "http://localhost:4318"
}
```

Open `http://localhost:16686`, select service `copilot-chat`, and select **Find Traces**.

### Azure Application Insights

Use an [OTel Collector](https://opentelemetry.io/docs/collector/) with the [Azure Monitor exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/azuremonitorexporter) to forward Copilot Chat telemetry to Application Insights. Point the VS Code `setting(github.copilot.chat.otel.otlpEndpoint)` setting at the collector's OTLP endpoint, and configure the collector to export to your Application Insights connection string.

### Langfuse

[Langfuse](https://langfuse.com/) is an open-source LLM observability platform with native OTLP ingestion and support for OTel GenAI Semantic Conventions.

```json
{
  "github.copilot.chat.otel.enabled": true,
  "github.copilot.chat.otel.otlpEndpoint": "http://localhost:3000/api/public/otel",
  "github.copilot.chat.otel.captureContent": true
}
```

Set the auth header with the `OTEL_EXPORTER_OTLP_HEADERS` environment variable. See the [Langfuse OTel docs](https://langfuse.com/docs/opentelemetry/introduction) for details.

### Other backends

Any OTLP-compatible backend works, including [Grafana Tempo](https://grafana.com/oss/tempo/), [Honeycomb](https://www.honeycomb.io/), and [Datadog](https://www.datadoghq.com/). Refer to each backend's documentation for OTLP ingestion setup.

## Security and privacy

OTel monitoring is off by default and emits no data until you explicitly enable it. You control what is collected and where it goes.

| Aspect | Detail |
|---|---|
| **Off by default** | No OTel data is emitted unless you explicitly enable it. The OTel SDK is not loaded when disabled, resulting in zero runtime overhead. |
| **No content by default** | Prompts, responses, and tool arguments require opt-in with `captureContent`. |
| **No PII in default attributes** | Session IDs, model names, and token counts are not personally identifiable. |
| **User-configured endpoints** | Data goes only where you point it. There is no phone-home behavior. |

## Related content

- [Copilot settings reference](/docs/copilot/reference/copilot-settings.md)
- [Troubleshoot AI in VS Code](/docs/copilot/troubleshooting.md)
- [OTel GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/gen-ai/)
- [Aspire Dashboard standalone docs](https://aspire.dev/dashboard/standalone/)
