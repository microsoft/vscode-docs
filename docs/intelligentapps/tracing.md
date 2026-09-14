---
ContentId: e1e49b32-272f-4aef-a73b-56920112057d
DateApproved: 10/03/2025
MetaDescription: Collect local traces and inspect hosted-agent telemetry in Foundry Toolkit to diagnose model calls, tool execution, and latency.
MetaSocialImage: images/tracing/hosted-agent-traces.png
---

# Tracing in Foundry Toolkit

A slow or incorrect agent response can involve several model calls, tools, or orchestration steps. A trace groups the recorded operations for a request. Each operation is represented by a span with timing, status, and any attributes or events supplied by the instrumentation.

Use Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %} to collect and inspect traces during local development, or to view telemetry for agents deployed to Microsoft Foundry. This article takes you through local collection first, then explains cloud tracing for deployed-agent traffic.

Choose the data source that matches the question you're investigating:

| Approach | Use it for | Data and responsibilities |
| --- | --- | --- |
| [Agent Inspector](/docs/intelligentapps/agent-inspector.md) | Send a local request, inspect live response and tool events, or pause your code at a breakpoint. | The agent server supplies protocol events and development diagnostics. This doesn't require the OTLP collector or create cloud trace history. |
| Local tracing | Compare recorded model, tool, and agent spans while developing an application. | Your application exports telemetry to the Toolkit's local collector. You configure instrumentation and manage the stored local data. |
| Hosted-agent tracing | Investigate requests handled by an agent deployed to Foundry, then monitor behavior across requests. | Traces are stored in the project's connected Application Insights resource. Access, retention, and charges follow the Azure resource configuration. |

A hosted agent runs your custom agent code in Foundry Agent Service. Foundry manages hosting, but you remain responsible for the code and its dependencies. For creation and deployment, follow [Create and deploy a hosted agent](/docs/intelligentapps/hosted-agents.md). Tracing doesn't replace those steps.

## Collect local traces

The local collector receives telemetry over OpenTelemetry Protocol (OTLP). It doesn't instrument an application automatically. Your framework or an instrumentation library must create spans and export them to the collector.

### Prerequisites

* {% data variables.product.prodname_vscode %} with the current public Foundry Toolkit extension. See [Install Foundry Toolkit](/docs/intelligentapps/overview.md#install-and-setup).
* An application you can run locally, with its model and tool connections already configured.
* For the example below, a Python Agent Framework application and its selected Python environment.

The collector doesn't require an Application Insights resource. Model calls and tool execution can still use remote services and incur charges even when traces are collected locally.

### Set up instrumentation

Use this procedure to collect spans from an existing Python Agent Framework application. Keep the agent and collector in the same local environment for this walkthrough.

1. Select **Foundry Toolkit** in the Activity Bar, then **Developer Tools** > **Monitor** > **Tracing**.
2. Select **Start Collector** before running your application.
3. In the application's Python environment, install the gRPC exporter if it isn't already declared in your dependencies:

    ```bash
    python -m pip install opentelemetry-exporter-otlp-proto-grpc
    ```

4. Configure OpenTelemetry once at application startup, before constructing or running the agent:

    ```python
    import os

    os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4317"
    os.environ["OTEL_EXPORTER_OTLP_PROTOCOL"] = "grpc"

    from agent_framework.observability import configure_otel_providers

    configure_otel_providers(enable_sensitive_data=False)
    ```

    If your application or hosting library already configures OpenTelemetry providers, configure its existing exporters instead of adding a second provider setup. Signal-specific `OTEL_EXPORTER_OTLP_*_ENDPOINT` variables can override the base endpoint, so check for existing trace, log, or metric settings that point elsewhere. See [Agent Framework observability](https://learn.microsoft.com/en-us/agent-framework/agents/observability) for exporter configuration.

5. Run the application using its normal entry point and send a request that exercises the agent. Let the request complete and give the exporter time to send its telemetry before stopping the process.
6. In **Tracing**, select **Refresh**, then select the new trace to inspect its spans.

Agent Framework instruments supported model clients, agents, and workflow operations. Other frameworks can require an instrumentation library. OTLP compatibility lets the collector receive data, while the emitted attributes and [generative AI semantic conventions](https://github.com/open-telemetry/semantic-conventions-genai) determine what the viewer can display.

For another SDK or language, use its current instrumentation guidance or the Toolkit's [Tracing Code Gen tool](/docs/intelligentapps/copilot-tools.md#tracing-code-gen-tool). Support for a particular model API, such as Chat Completions or Responses, depends on that instrumentation. It isn't determined by whether Agent Inspector supports the same API.

<!-- TODO: Capture the current local Tracing view with Start Collector and a populated trace list. Use the released Foundry Toolkit sidebar, not the retired GitHub Models navigation. -->

### Collector endpoints

Match the exporter protocol to the collector endpoint. The Toolkit listens on localhost using these defaults:

| Exporter | Endpoint |
| --- | --- |
| OTLP gRPC | `http://localhost:4317` |
| OTLP HTTP trace exporter | `http://localhost:4318/v1/traces` |
| OTLP HTTP log exporter | `http://localhost:4318/v1/logs` |

Some HTTP exporters accept the base endpoint `http://localhost:4318` and append the signal path themselves. Follow your exporter's configuration rather than appending the path twice. Some instrumentation libraries send message content as log records, so exporting spans alone might not provide input and output details.

These ports are unrelated to the agent HTTP server and debugger ports. If your application runs in a container or a remote development environment, `localhost` refers to that environment. Establish the appropriate connection to the collector rather than assuming it refers to your desktop.

## Inspect and manage local traces

Use the span tree to follow the request from agent orchestration to model and tool operations. Select a slow or failed span, then inspect its duration, status, and metadata.

* **Input + Output** shows recorded messages when the instrumentation supplies them.
* **Metadata** shows the span attributes for further diagnosis.

The example keeps sensitive content capture off. If a trace has timing data but no messages, that can be the expected result. For a controlled development test, you can set `enable_sensitive_data=True` in the existing configuration to record supported prompt, response, and tool content. Restore it to `False` when that test is complete.

> [!CAUTION]
> Content recording can capture personal data, secrets, tool arguments, and results. Use non-sensitive test data and minimize or redact content before it enters telemetry. Don't turn on content recording in production solely to fill an empty input and output view.

<!-- TODO: Capture a current local trace span with Metadata and, using non-sensitive test data, Input + Output. -->

Collected traces persist in a local SQLite database named `traces.db`, in the `tracing` subdirectory of `.aitk` under your user home folder. Closing the viewer doesn't delete them. Select **Stop Collector** to stop local telemetry collection. Your agent and its model calls continue running. To remove local records, select the traces in the list and select **Delete**.

Local storage is separate from Application Insights. Deleting local traces doesn't remove cloud telemetry, and clearing a conversation in Inspector doesn't delete either store.

## View hosted-agent traces

After deployment, use cloud traces to investigate the agent running in Foundry rather than your local process. The Toolkit queries the Application Insights resource connected to your Foundry project. It doesn't upload your local trace database.

Before starting, prepare:

* A deployed agent that you can invoke in your Foundry project.
* An Application Insights resource connected to the project, or permission to connect or create one.
* Permission to query the telemetry. Access to the agent alone isn't sufficient. See the [tracing prerequisites](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup#prerequisites) for Application Insights, Log Analytics, and protected-table access.

### Connect Application Insights and inspect a request

1. In the Foundry Toolkit sidebar, open **My Resources** > **Agents**. Select the **Hosted Agent** tab, then select the agent's name.
2. Select the agent's **Traces** tab. If the project has no connected resource, select **Enable App Insights**.
3. In **App Insights Settings**, select an existing **Application Insights Resource Name**, or choose to create a new resource and complete the required resource and workspace fields. Select **Submit** and wait for confirmation.

    This changes the project's shared Application Insights connection, not a local workspace preference. Creating resources and collecting telemetry can incur Azure charges. Confirm the intended project and resource before submitting.

4. Return to **Playground** and send a test request to the deployed agent.
5. Allow time for ingestion, then open **Traces** again. Use the time range, **Search by conversation ID**, **Status**, or **Duration** filters to locate the request.

    ![Screenshot showing the hosted-agent Traces tab with time, conversation, status, and duration filters and a list of completed requests, with resource and request identifiers redacted.](./images/tracing/hosted-agent-traces.png)

6. Select a trace, then select a span to review **Metadata** and **Input + Output**, when content is available.

To inspect the operations associated with a conversation, select its **Conversation ID** in the trace list. The conversation view shows an operation tree and metadata.

![Screenshot showing a hosted-agent conversation view with agent, model, and tool operations alongside metadata, with resource and conversation identifiers redacted.](./images/tracing/hosted-agent-conversation.png)

<!-- TODO: Capture the App Insights Settings dialog. Redact project, subscription, and resource identifiers. -->

Connecting Application Insights enables Foundry's server-side tracing. Visibility into your own model calls, tool calls, and custom code also depends on the hosting library and framework instrumentation. Follow [Set up tracing in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup) for service-side collection and additional client instrumentation.

The Toolkit's trace-detail query currently covers the last seven days. This is a query window, not a retention setting. For older data, use the Foundry portal or Azure Monitor, subject to the connected workspace's retention configuration.

## Data, access, retention, and cost

Decide where telemetry should go before enabling content capture or connecting a cloud resource. The same request can generate local spans, cloud telemetry, and data sent to model or tool providers.

* **Local traces:** The Toolkit stores records on your computer. Protect access to the local database and any copied data. Stopping the collector doesn't stop other exporters configured in your application.
* **Cloud traces:** Application Insights and its Log Analytics workspace control access, retention, and telemetry charges. The Toolkit's filters don't change those policies.
* **Model and tool calls:** Local collection doesn't prevent requests from leaving your computer. Review the data handling of every connected service, including non-Microsoft tools.

Use [Foundry tracing security and privacy guidance](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup#security-and-privacy) to minimize sensitive data, and its [data retention and cost guidance](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/trace-agent-setup#data-retention-and-cost) for cloud responsibilities. For production identity, network isolation, and downstream access, follow [Hosted-agent security and data handling](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents#security-and-data-handling) rather than treating local credentials as the deployed agent's permissions.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| **Tracing** isn't available in the sidebar. | Confirm the current Foundry Toolkit extension is installed and enabled in the environment where you run it. Local tracing requires its native SQLite component to load. |
| The collector doesn't start. | Check for another process using port 4317 or 4318 and review the Toolkit output. Avoid running competing collectors on the same ports. |
| A local request succeeds but no trace appears. | Confirm instrumentation runs before the request, the collector is running, and the exporter uses the correct protocol and endpoint. Check for signal-specific endpoint overrides, exporter errors, and buffered telemetry, then select **Refresh**. |
| Spans appear without input or output messages. | Check content-recording settings and the instrumentation's supported attributes. Some libraries also require a log exporter. Missing content doesn't necessarily mean collection failed. |
| Cloud traces are empty. | Confirm the intended project and Application Insights connection, generate new traffic, expand the time range, and allow for ingestion delay. |
| Cloud trace queries fail with an authorization error. | Check read access to Application Insights and Log Analytics, including any protected tables, using the linked service prerequisites. |
| An older trace has no detail in the Toolkit. | The detail query covers seven days. Query older retained records in Foundry or Azure Monitor. |

## Related resources

* [Agent tracing concepts](https://learn.microsoft.com/en-us/azure/foundry/observability/concepts/trace-agent-concept)
* [Agent development lifecycle](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/development-lifecycle)
