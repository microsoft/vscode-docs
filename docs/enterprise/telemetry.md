---
ContentId: 9b3e5c2d-1a4f-6e8b-c7d9-0f2a3b4c5d6e
DateApproved: 8/19/2026
MetaDescription: Learn how to centrally manage {% data variables.product.prodname_vscode_shortname %} telemetry settings for enterprise environments, including telemetry levels and feedback options.
---

# Manage telemetry in enterprise environments

{% data variables.product.prodname_vscode_shortname %} collects telemetry data to help understand how the product is used and to improve it. Organizations can centrally manage telemetry settings to control what data is collected across their development teams.

This article covers how IT admins can configure telemetry through [enterprise policies](/docs/enterprise/policies.md).

## Telemetry-related policies

{% data variables.product.prodname_vscode_shortname %} provides the following policies for managing telemetry:

| Policy           | Description                                                | {% data variables.product.prodname_vscode_shortname %} setting                       | Available since |
|------------------|------------------------------------------------------------|---------------------------------------|-----------------|
| `TelemetryLevel` | Specify the telemetry data level                           | `setting(telemetry.telemetryLevel)`   | 1.99            |
| `EnableFeedback` | Configure feedback mechanisms (issue reporter and surveys) | `setting(telemetry.feedback.enabled)` | 1.99            |

Learn how to [deploy policies](/docs/enterprise/policies.md) to your organization's devices.

## Configure telemetry level

The `TelemetryLevel` policy controls {% data variables.product.prodname_vscode_shortname %} telemetry, first-party extension telemetry, and participating third-party extension telemetry.

> [!NOTE]
> Some third-party extensions might not respect this setting. Consult the specific extension's documentation to learn about its telemetry reporting.

### Telemetry level options

| Value   | Crash reports | Error telemetry | Usage data |
|---------|:-------------:|:---------------:|:----------:|
| `all`   | ✓             | ✓               | ✓          |
| `error` | ✓             | ✓               | -          |
| `crash` | ✓             | -               | -          |
| `off`   | -             | -               | -          |

**Data types:**

* **Crash reports** - Diagnostic information when {% data variables.product.prodname_vscode_shortname %} crashes
* **Error telemetry** - Information about errors that don't crash the application
* **Usage data** - Information about feature usage and performance

### Disable telemetry

To disable all telemetry across your organization, set the `TelemetryLevel` policy to `off`:

**Policy value**:

```text
off
```

> [!IMPORTANT]
> Setting telemetry to `off` or `error` disables A/B experimentation. This might delay the rollout of new features to your users until they are generally available.

### Enable error telemetry only

To collect only crash reports and error telemetry while disabling usage data, set the `TelemetryLevel` policy to `error`:

**Policy value**:

```text
error
```

## Configure feedback mechanisms

The `EnableFeedback` policy controls whether users can access feedback mechanisms in {% data variables.product.prodname_vscode_shortname %}, such as the issue reporter and surveys.

To disable feedback mechanisms, set the `EnableFeedback` policy to `false`:

**Policy value**:

```text
false
```

## Extension telemetry

{% data variables.product.prodname_vscode_shortname %} extensions might collect their own telemetry data. The `setting(telemetry.telemetryLevel)` setting affects first-party Microsoft extensions and participating third-party extensions. However, some extensions might not respect this setting and might have their own telemetry configuration.

Review the documentation of extensions used in your organization to understand their telemetry practices.

## OpenTelemetry support for agent interactions

[Copilot Chat](/docs/agent-native/overview.md) in {% data variables.product.prodname_vscode_shortname %} can export traces, metrics, and events via [OpenTelemetry](https://opentelemetry.io/) (OTel) to give you real-time visibility into agent interactions, LLM calls, tool execution, and token usage. You can use this telemetry data with any OTel-compatible backend.

Learn more about how to [Monitor agent interactions with OpenTelemetry](https://github.com/microsoft/vscode-copilot-chat/blob/main/docs/monitoring/agent_monitoring.md).

## GDPR compliance

{% data variables.product.prodname_vscode_shortname %} is designed to be GDPR compliant. When users disable telemetry, {% data variables.product.prodname_vscode_shortname %} stops sending telemetry data going forward. For more information about GDPR and {% data variables.product.prodname_vscode_shortname %}, see the [telemetry documentation](/docs/configure/telemetry.md#gdpr-and-vs-code).

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md) - Complete list of enterprise policies
* [Telemetry in {% data variables.product.prodname_vscode_shortname %}](/docs/configure/telemetry.md) - Learn about telemetry data collection
* [Privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) - Microsoft privacy statement
