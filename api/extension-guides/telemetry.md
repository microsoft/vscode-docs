# Telemetry

## Telemetry Module

The VS Code team maintains the [vscode-extension-telemetry](https://www.npmjs.com/package/@vscode/extension-telemetry) npm module which provides a consistent and safe way to collect telemetry within VS Code. The module reports telemetry to [Azure Monitor and Application Insights](https://azure.microsoft.com/services/monitor/) and guarantees backwards compatability against previous versios of VS Code.

Follow this guide to set up [Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/learn/nodejs-quick-start) and get your Application Insights instrumentation key.

## Without the teleemtry module

Extension authors who wish not to use Application Insights can utilize their own custom solution to send telemetry. When deciding not to utilize the npm module, it is still required that extension authors respect the user's choice by utilizing the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API. By doing this users will have one centralised place to control their telemetry settings.

## Custom telemetry setting

Extension may wish to give control to the user regarding extension specific telemetry independent of VS Code telemetry. In this case we suggest that you introduce a specific extension setting. Custom telemetry settings are recommended to be tagged with `telemetry` and `usesOnlineServices ` so that users can more easily query them in the settings UI. Adding a custom telemetry setting is not an exemption from respecting a users decision and the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` flag must always be respected. If `isTelemetryEnabled` reports false, even if your setting is enabled, telemetry must not be sent.

## Telemetry.json

VS Code understands that telemetry can be a sensitive topic for many and aims to be as transparent as possible. The core VS code product and most first party extensions ship with a `telemetry.json` file in their root. This allows for a user to use the VS Code CLI with the `--telemetry` flag to receive a dump of all telemetry which VS Code produces. Extension authors may include a `telemetry.json` file in their root and it will also appear in the CLI dump.

## Do's and Don'ts
**✔️ Do**

* Use the [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) npm module if using application insights works for you.
* Otherwise, respect the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API.
* Tag your custom telemetry setting with `telemetry` and `usesOnlineServices ` if you have one.
* Collect as little telemetry as possible
* Be as transparent as possible to your users about what you collect

❌ Don't
* Introduce a custom telemetry collection solution that does not ask for user consent.
* Collect Personally identifable information.
* Collect more telemetry than necessary
* Use just the `telemetry.telemetryLevel` setting as it can sometimes be incorrect compared to `isTelemetryEnabled`.
