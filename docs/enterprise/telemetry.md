---
ContentId: 9b3e5c2d-1a4f-6e8b-c7d9-0f2a3b4c5d6e
DateApproved: 02/04/2026
MetaDescription: Learn how to centrally manage VS Code telemetry settings for enterprise environments, including telemetry levels and feedback options.
---

# Manage telemetry in enterprise environments

VS Code collects telemetry data to help understand how the product is used and to improve it. Organizations can centrally manage telemetry settings to control what data is collected across their development teams.

This article covers how IT admins can configure telemetry through [enterprise policies](/docs/enterprise/policies.md).

## Telemetry-related policies

VS Code provides the following policies for managing telemetry:

| Policy           | Description                                                | VS Code setting                       | Available since |
|------------------|------------------------------------------------------------|---------------------------------------|-----------------|
| `TelemetryLevel` | Specify the telemetry data level                           | `setting(telemetry.telemetryLevel)`   | 1.99            |
| `EnableFeedback` | Configure feedback mechanisms (issue reporter and surveys) | `setting(telemetry.feedback.enabled)` | 1.99            |

Learn how to [deploy policies](/docs/enterprise/policies.md) to your organization's devices.

## Configure telemetry level

The `TelemetryLevel` policy controls VS Code telemetry, first-party extension telemetry, and participating third-party extension telemetry.

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

* **Crash reports** - Diagnostic information when VS Code crashes
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

The `EnableFeedback` policy controls whether users can access feedback mechanisms in VS Code, such as the issue reporter and surveys.

To disable feedback mechanisms, set the `EnableFeedback` policy to `false`:

**Policy value**:

```text
false
```

## Extension telemetry

VS Code extensions might collect their own telemetry data. The `setting(telemetry.telemetryLevel)` setting affects first-party Microsoft extensions and participating third-party extensions. However, some extensions might not respect this setting and might have their own telemetry configuration.

Review the documentation of extensions used in your organization to understand their telemetry practices.

## GDPR compliance

VS Code is designed to be GDPR compliant. When users disable telemetry, VS Code stops sending telemetry data going forward. For more information about GDPR and VS Code, see the [telemetry documentation](/docs/configure/telemetry.md#gdpr-and-vs-code).

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md) - Complete list of enterprise policies
* [Telemetry in VS Code](/docs/configure/telemetry.md) - Learn about telemetry data collection
* [Privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) - Microsoft privacy statement
