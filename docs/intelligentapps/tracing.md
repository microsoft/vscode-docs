---
ContentId: e1e49b32-272f-4aef-a73b-56920112057d
DateApproved: 10/03/2025
MetaDescription: AI Toolkit hosts a local  server to collect trace data. The collector server is OLTP-compatible and most language model SDKs either directly support OTLP or have third-party instrumentation libraries to support it.
---

# Tracing in AI Toolkit

AI Toolkit provides tracing capabilities to help you monitor and analyze the performance of your AI applications. You can trace the execution of your AI applications, including interactions with generative AI models, to gain insights into their behavior and performance.

AI Toolkit hosts a local HTTP and gRPC server to collect trace data. The collector server is compatible with OTLP (OpenTelemetry Protocol) and most language model SDKs either directly support OTLP or have non-Microsoft instrumentation libraries to support it. Use AI Toolkit to visualize the collected instrumentation data.

All frameworks or SDKs that support OTLP and follow [semantic conventions for generative AI systems](https://opentelemetry.io/docs/specs/semconv/gen-ai/) are supported. The following table contains common AI SDKs tested for compatibility.

| | Azure AI Inference | Azure AI Foundry Agents Service | Anthropic | Gemini | LangChain | OpenAI SDK <sub>3</sub> | OpenAI Agents SDK |
|---|---|---|---|---|---|---|---|
| **Python** | ✅ | ✅ | ✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub> | ✅  | ✅ ([LangSmith](https://github.com/langchain-ai/langsmith-sdk))<sub>1,2</sub> | ✅ ([opentelemetry-python-contrib](https://github.com/open-telemetry/opentelemetry-python-contrib))<sub>1</sub> | ✅ ([Logfire](https://github.com/pydantic/logfire))<sub>1,2</sub>  |
| **TS/JS** | ✅ | ✅ | ✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub>| ❌ |✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub> |✅ ([traceloop](https://github.com/traceloop/openllmetry))<sub>1,2</sub>|❌|

> 1. The SDKs in brackets are non-Microsoft tools that add OTLP support because the official SDKs do not support OTLP.
> 1. These tools do not fully follow the OpenTelemetry rules for generative AI systems.
> 1. For OpenAI SDK, only the [Chat Completions API](https://platform.openai.com/docs/api-reference/chat) is supported. The [Responses API](https://platform.openai.com/docs/api-reference/responses) is not supported yet.

## How to get started with tracing

1. Open the tracing webview by selecting **Tracing** in the tree view.
1. Select the **Start Collector** button to start the local OTLP trace collector server.

    ![Screenshot showing the Start Collector button in the Tracing webview.](./images/tracing/trace_start.png)

1. Enable instrumentation with a code snippet. See the [Set up instrumentation](#set-up-instrumentation) section for code snippets for different languages and SDKs.

1. Generate trace data by running your app.

1. In the tracing webview, select the **Refresh** button to see new trace data.

    ![Screenshot showing the Trace List in the Tracing webview.](./images/tracing/trace_list.png)

## Set up instrumentation

Set up tracing in your AI application to collect trace data. The following code snippets show how to set up tracing for different SDKs and languages:

The process is similar for all SDKs:

- Add tracing to your LLM or agent app.
- Set up the OTLP trace exporter to use the AITK local collector.

<details>
<summary>Azure AI Inference SDK - Python</summary>

**Installation:**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**Setup:**
```python
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.inference.tracing import AIInferenceInstrumentor
AIInferenceInstrumentor().instrument(True)
```
</details>

<details>
<summary>Azure AI Inference SDK - TypeScript/JavaScript</summary>

**Installation:**
```bash
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**Setup:**
```javascript
const { context } = require("@opentelemetry/api");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const {
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});
const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
        "service.name": "opentelemetry-instrumentation-azure-ai-inference",
    }),
    spanProcessors: [
        new SimpleSpanProcessor(exporter)
    ],
});
provider.register();

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});
```
</details>

<details>
<summary>Azure AI Foundry Agent Service - Python</summary>

**Installation:**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
```

**Setup:**
```python
import os
os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-azure-ai-agents"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from azure.ai.agents.telemetry import AIAgentsInstrumentor
AIAgentsInstrumentor().instrument(True)
```
</details>

<details>
<summary>Azure AI Foundry Agent Service - TypeScript/JavaScript</summary>

**Installation:**
```bash
npm install @azure/opentelemetry-instrumentation-azure-sdk @opentelemetry/api @opentelemetry/exporter-trace-otlp-proto @opentelemetry/instrumentation @opentelemetry/resources @opentelemetry/sdk-trace-node
```

**Setup:**
```javascript
const { context } = require("@opentelemetry/api");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const {
  NodeTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-node");
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
});
const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
        "service.name": "opentelemetry-instrumentation-azure-ai-inference",
    }),
    spanProcessors: [
        new SimpleSpanProcessor(exporter)
    ],
});
provider.register();

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});
```

</details>

<details>
<summary>Anthropic - Python</summary>

**Installation:**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-anthropic
```

**Setup:**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-anthropic-traceloop"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.anthropic import AnthropicInstrumentor
AnthropicInstrumentor().instrument()
```
</details>

<details>
<summary>Anthropic - TypeScript/JavaScript</summary>

**Installation:**
```bash
npm install @traceloop/node-server-sdk
```

**Setup:**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
const { trace } = require("@opentelemetry/api");

initialize({
    appName: "opentelemetry-instrumentation-anthropic-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>Google Gemini - Python</summary>

**Installation:**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-google-genai
```

**Setup:**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-google-genai"
})
provider = TracerProvider(resource=resource)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",
)
processor = BatchSpanProcessor(otlp_exporter)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

from opentelemetry.instrumentation.google_genai import GoogleGenAiSdkInstrumentor
GoogleGenAiSdkInstrumentor().instrument(enable_content_recording=True)
```
</details>

<details>
<summary>LangChain - Python</summary>

**Installation:**
```bash
pip install langsmith[otel]
```

**Setup:**
```python
import os
os.environ["LANGSMITH_OTEL_ENABLED"] = "true"
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4318"
```
</details>

<details>
<summary>LangChain - TypeScript/JavaScript</summary>

**Installation:**
```bash
npm install @traceloop/node-server-sdk
```

**Setup:**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
initialize({
    appName: "opentelemetry-instrumentation-langchain-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>OpenAI - Python</summary>

**Installation:**
```bash
pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http opentelemetry-instrumentation-openai-v2
```

**Setup:**
```python
from opentelemetry import trace, _events
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk._logs import LoggerProvider
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
```python
import os

os.environ["OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT"] = "true"

# Set up resource
resource = Resource(attributes={
    "service.name": "opentelemetry-instrumentation-openai"
})

# Create tracer provider
trace.set_tracer_provider(TracerProvider(resource=resource))

# Configure OTLP exporter
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces"
)

# Add span processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

# Set up logger provider
logger_provider = LoggerProvider(resource=resource)
logger_provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
)
_events.set_event_logger_provider(EventLoggerProvider(logger_provider))

# Enable OpenAI instrumentation
OpenAIInstrumentor().instrument()
```
</details>

<details>
<summary>OpenAI - TypeScript/JavaScript</summary>

**Installation:**
```bash
npm install @traceloop/instrumentation-openai @traceloop/node-server-sdk
```

**Setup:**
```javascript
const { initialize } = require("@traceloop/node-server-sdk");
initialize({
    appName: "opentelemetry-instrumentation-openai-traceloop",
    baseUrl: "http://localhost:4318",
    disableBatch: true,
});
```
</details>

<details>
<summary>OpenAI Agents SDK - Python</summary>

**Installation:**
```bash
pip install logfire
```

**Setup:**
```python
import logfire
import os

os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "http://localhost:4318/v1/traces"

logfire.configure(
    service_name="opentelemetry-instrumentation-openai-agents-logfire",
    send_to_logfire=False,
)
logfire.instrument_openai_agents()
```
</details>

## Example: set up tracing with the Azure AI Inference SDK

The following end-to-end example uses the Azure AI Inference SDK in Python and shows how to set up the tracing provider and instrumentation.

### Prerequisites

To run this example, you need the following prerequisites:

- [Visual Studio Code](https://code.visualstudio.com/)
- [AI Toolkit extension](https://marketplace.visualstudio.com/items?itemName=ms-ai-toolkit.vscode-ai-toolkit)
- [Azure AI Inference SDK](https://pypi.org/project/azure-ai-inference/)
- [OpenTelemetry](https://opentelemetry.io/)
- [Python latest version](https://www.python.org/downloads)
- [GitHub account](https://github.com/)

### Set up your development environment

Use the following instructions to deploy a preconfigured development environment containing all required dependencies to run this example.

1. Setup GitHub Personal Access Token

    Use the free [GitHub Models](https://docs.github.com/en/github-models) as an example model.

    Open [GitHub Developer Settings](https://github.com/settings/tokens) and select **Generate new token**.

    > [!IMPORTANT]
    > `models:read` permissions are required for the token or it will return unauthorized. The token is sent to a Microsoft service.

1. Create environment variable

    Create an environment variable to set your token as the key for the client code using one of the following code snippets. Replace `<your-github-token-goes-here>` with your actual GitHub token.

    bash:

    ```bash
    export GITHUB_TOKEN="<your-github-token-goes-here>"
    ```

    powershell:

    ```powershell
    $Env:GITHUB_TOKEN="<your-github-token-goes-here>"
    ```

    Windows command prompt:

    ```cmd
    set GITHUB_TOKEN=<your-github-token-goes-here>
    ```

1. Install Python packages

    The following command installs the required Python packages for tracing with Azure AI Inference SDK:

    ```bash
    pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-http azure-ai-inference[opentelemetry]
    ```

1. Set up tracing

    1. Create a new local directory on your computer for the project.

        ```shell
        mkdir my-tracing-app
        ```

    1. Navigate to the directory you created.

        ```shell
        cd my-tracing-app
        ```

    1. Open Visual Studio Code in that directory:

        ```shell
        code .
        ```

1. Create the Python file

    1. In the `my-tracing-app` directory, create a Python file named `main.py`.

        You'll add the code to set up tracing and interact with the Azure AI Inference SDK.

    1. Add the following code to `main.py` and save the file:

        ```python
        import os

        ### Set up for OpenTelemetry tracing ###
        os.environ["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true"
        os.environ["AZURE_SDK_TRACING_IMPLEMENTATION"] = "opentelemetry"

        from opentelemetry import trace, _events
        from opentelemetry.sdk.resources import Resource
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        from opentelemetry.sdk._logs import LoggerProvider
        from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
        from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
        from opentelemetry.sdk._events import EventLoggerProvider
        from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter

        github_token = os.environ["GITHUB_TOKEN"]

        resource = Resource(attributes={
            "service.name": "opentelemetry-instrumentation-azure-ai-inference"
        })
        provider = TracerProvider(resource=resource)
        otlp_exporter = OTLPSpanExporter(
            endpoint="http://localhost:4318/v1/traces",
        )
        processor = BatchSpanProcessor(otlp_exporter)
        provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)

        logger_provider = LoggerProvider(resource=resource)
        logger_provider.add_log_record_processor(
            BatchLogRecordProcessor(OTLPLogExporter(endpoint="http://localhost:4318/v1/logs"))
        )
        _events.set_event_logger_provider(EventLoggerProvider(logger_provider))

        from azure.ai.inference.tracing import AIInferenceInstrumentor
        AIInferenceInstrumentor().instrument()
        ### Set up for OpenTelemetry tracing ###

        from azure.ai.inference import ChatCompletionsClient
        from azure.ai.inference.models import UserMessage
        from azure.ai.inference.models import TextContentItem
        from azure.core.credentials import AzureKeyCredential

        client = ChatCompletionsClient(
            endpoint = "https://models.inference.ai.azure.com",
            credential = AzureKeyCredential(github_token),
            api_version = "2024-08-01-preview",
        )

        response = client.complete(
            messages = [
                UserMessage(content = [
                    TextContentItem(text = "hi"),
                ]),
            ],
            model = "gpt-4.1",
            tools = [],
            response_format = "text",
            temperature = 1,
            top_p = 1,
        )

        print(response.choices[0].message.content)
        ```

1. Run the code

    1. Open a new terminal in Visual Studio Code.

    1. In the terminal, run the code using the command `python main.py`.

1. Check the trace data in AI Toolkit

    After you run the code and refresh the tracing webview, there's a new trace in the list.

    Select the trace to open the trace details webview.

    ![Screenshot showing selecting a trace from the Trace List in the Tracing webview.](./images/tracing/trace_list.png)

    Check the complete execution flow of your app in the left span tree view.

    Select a span in the right span details view to see generative AI messages in the **Input + Output** tab.

    Select the **Metadata** tab to view the raw metadata.

    ![Screenshot showing the Trace Details view in the Tracing webview.](./images/tracing/trace_details.png)

## What you learned

In this article, you learned how to:

- Set up tracing in your AI application using the Azure AI Inference SDK and OpenTelemetry.
- Configure the OTLP trace exporter to send trace data to the local collector server.
- Run your application to generate trace data and view traces in the AI Toolkit webview.
- Use the tracing feature with multiple SDKs and languages, including Python and TypeScript/JavaScript, and non-Microsoft tools via OTLP.
- Instrument various AI frameworks (Anthropic, Gemini, LangChain, OpenAI, and more) using provided code snippets.
- Use the tracing webview UI, including the **Start Collector** and **Refresh** buttons, to manage trace data.
- Set up your development environment, including environment variables and package installation, to enable tracing.
- Analyze the execution flow of your app using the span tree and details view, including generative AI message flow and metadata.
