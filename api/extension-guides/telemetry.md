# Telemetry

For reporting telemetry your extension can use the VS Code telemetry infrastructure for reporting through the [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) npm module. This module provides a consistent way for extensions to report telemetry over [Azure Monitor and Application Insights](https://azure.microsoft.com/services/monitor/). The module respects the user's decision about whether or not to send telemetry data via the `telemetry.telemetryLevel` setting. Additionally, this module guarantees backwards compatability against previous versions of VS Code.

Follow this guide to set up [Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/learn/nodejs-quick-start) and get your Application Insights instrumentation key.

If you would prefer to not utilize the npm module, it is still recommended that extension authors respect the user's choice by utilizing the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API. By doing this users will have one centralised place to control their telemetry settings.

If your extension would like to give control to the user if telemetry for your extension is collected independent of VS Code telemetry then we suggest that you introduce a specific extension setting to control this and to always ask user for consent before any data is reported.

Additionally, telemetry authors can add a `telemetry.json` file to their root build directory for their telemetry to show up in the `--telemetry` dump that VS Code produces.

**✔️ Do**

* Use the [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) npm module if using application insights works for you.
* Otherwise, respect the `isTelemetryEnabled` and `onDidChangeTelemetryEnabled` API.

❌ Don't
* Introduce a custom telemetry collection solution that does not ask for user consent.
* Collect Personally identifable information.
