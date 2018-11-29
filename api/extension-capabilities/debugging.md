---
---

# Debugging

The Debug Extension API serves two orthogonal purposes:

- Support to contribute new debuggers as "Debugger Extensions".
- Surface debug functionality to extensions.

## Debugger Extensions

Debugger Extensions add rich debugging support for specific languages or runtimes. VS Code's built-in Node.js debugger extension is just one showcase of the various debugger features that extensions can provide:

- Source-, function-, conditional-, inline breakpoints, and logpoints.
- Multi-process and multi-thread support.
- Navigating through complex data structures in views and hovers.
- Variable values are shown in hovers or inlined in the source.
- Creating and managing watch expressions.
- Debug console for interactive evaluation with autocomplete (REPL).

A debugger extension does not have to implement any debugger UI as this is already provided by VS Code. And it does not have to implement a real debugger either, because most languages already come with their own debugger.

Consequently a typical debugger extension only needs to talk to an existing debugger back end to retrieve display data and massage it so that it can be used by VS Code's general debugger UI. To make this adapter functionality independent from VS Code and reusable for other development tools, there is a JSON-based [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/) (similar to the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)) that specifies the "shape" of the display data flowing between the UI and a so-called "debug adapter". The debug adapter implements the Debug Adapter Protocol as a separate program (and therefore can be implemented in any programming language).

An introduction for how debug adapters work can be found [here](https://microsoft.github.io/debug-adapter-protocol/overview#How_it_works). Developing a debug adapter in the context of a debugger extension is explained in detail [here](/docs/extensions/example-debuggers).

A VS Code debugger extension contributes the debug adapter as a standalone executable via the `debuggers` extension point. VS Code launches the debug adapter whenever a debug session of that type is started.

In addition to the debug adapter executable, the `debuggers` extension point declares the following information:

- List of languages supported by the debugger. VS Code enables the UI to set breakpoints for those languages.
- JSON schema for the debug configuration attributes introduced by the debugger. VS Code uses this schema to verify the configuration in the launch.json editor and provides Intellisense.
- Default debug configurations for the initial launch.json created by VS Code.
- Debug configuration snippets that a user can add to a launch.json file.
- Declaration of variables that can be used in debug configurations.

In addition to the purely declarative contributions from above, the debug extension API provides this code-based functionality:

- Dynamically generated default debug configurations for the initial launch.json created by VS Code.
- Determine the debug adapter to use dynamically.
- Verify or modify debug configuration before they are passed to the debug adapter.
- Communicate with the debug adapter.
- Send informative messages to the debug console.

## Debug Extension API

The debug extension API is typically used by extensions that implement debug-related functionality on top of VS Code's debuggers. So it is not used for **implementing** a debugger extension.

Today this API encompasses the following functionality:

- Starting debug sessions based on in-memory debug configuration.
- Tracking the life-cycle of debug sessions.
- Accessing and managing breakpoints.
- Tracking the communication between a debug adapter and VS Code.
