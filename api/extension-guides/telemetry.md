---
# DO NOT TOUCH — Managed by doc writer
ContentId: b31344d9-a1d9-4f87-82df-9c7151ef99e3
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how Visual Studio Code extensions can enable telemetry and respect user telemetry choices.
---

# Telemetry extension authors guide

Visual Studio Code collects usage data and sends it to Microsoft to help improve our products and services. Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) and [telemetry documentation](/docs/getstarted/telemetry) to learn more.

This topic has guidelines for extension authors so that their extensions can conform to VS Code telemetry requirements and best practices.

>**Note**: If you don't want to send usage data to Microsoft, you can set the `telemetry.telemetryLevel` user [setting](/docs/getstarted/settings) to `off`.

## Telemetry module

The VS Code team maintains the [@vscode/extension-telemetry](https://www.npmjs.com/package/@vscode/extension-telemetry) npm module that provides a consistent and safe way to collect telemetry within VS Code. The module reports telemetry to [Azure Monitor and Application Insights](https://azure.microsoft.com/services/monitor/) and guarantees backwards compatibility against previous versions of VS Code.

Follow this guide to set up [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/app/nodejs) and get your Application Insights instrumentation key.

## Without the telemetry module

Extension authors who wish not to use Application Insights can utilize their own custom solution to send telemetry. In this case, it is still required that extension authors respect the user's choice by utilizing the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API. By doing this, users will have one centralized place to control their telemetry settings.

## Custom telemetry setting

Extension may wish to give user control for extension specific telemetry independent of VS Code telemetry. In this case, we suggest that you introduce a specific extension setting. It is recommended that custom telemetry settings be tagged with `telemetry` and `usesOnlineServices` so that users can more easily query them in the Settings UI. Adding a custom telemetry setting is not an exemption from respecting a user's decision and the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` flag must always be respected. If `isTelemetryEnabled` reports false, even if your setting is enabled, telemetry must not be sent.

## telemetry.json

We understand that telemetry can be a sensitive topic for many users and we aim to be as transparent as possible. The core VS Code product and most first party extensions ship with a `telemetry.json` file in their root. This allows a user to use the VS Code CLI with the `--telemetry` flag to receive a dump of all telemetry that VS Code produces. Extension authors may include a `telemetry.json` file in their root and it will also appear in the CLI dump.

## Do's and Don'ts

✔️ Do

* Use the [@vscode/extension-telemetry](https://www.npmjs.com/package/@vscode/extension-telemetry) npm module if using application insights works for you.
* Otherwise, respect the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API.
* Tag your custom telemetry setting with `telemetry` and `usesOnlineServices` if you have one.
* Collect as little telemetry as possible.
* Be as transparent as possible to your users about what you collect.

❌ Don't

* Introduce a custom telemetry collection solution that does not ask for user consent.
* Collect Personally identifiable information (PII).
* Collect more telemetry than necessary.
* Use just the `telemetry.telemetryLevel` setting, as it can sometimes be incorrect compared to `isTelemetryEnabled`.
