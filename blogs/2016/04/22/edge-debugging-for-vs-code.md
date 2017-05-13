---
Order: 8
TOCTitle: Microsoft Edge Debugging
PageTitle: Microsoft Edge Debugging for VS Code
MetaDescription: Microsoft Edge Debugging for Visual Studio Code
Date: 2016-04-22
ShortDescription: As a part of our continuous effort to simplify the daily workflow for developers, we are happy to enable web developers to debug their code running inside Microsoft Edge, directly from the editor by introducing Microsoft Edge Debugging for Visual Studio Code.

Author: Kenneth Auchenberg
---

# Introducing Microsoft Edge Debugging for VS Code

April 22, 2016 by [Andy Sterland](https://twitter.com/AndySterland) and [Kenneth Auchenberg](https://twitter.com/auchenberg)

As a part of our continuous effort to simplify the daily workflow for developers, we are happy to enable web developers to debug their code running inside Microsoft Edge, directly from the editor by introducing Microsoft Edge Debugging for Visual Studio Code.

Our new Edge Debugger works similar to [our Chrome debugger](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code) which we introduced back in February. Technically it’s the same debugger running inside VS Code, as we are using the [Chrome Debugger protocol](https://developer.chrome.com/devtools/docs/debugger-protocol) with our new Edge Diagnostics Adaptor. 

You can learn all the details about the Edge Diagnostics Adaptor on the [Edge blog](http://blogs.windows.com/msedgedev/2016/04/22/introducing-edge-diagnostics-adapter/).

<br />

![Demo](2016_04_22_edge-debugger-demo.gif)

## To get started

To get started, you simply open the Command Palette (`kb(workbench.action.showCommands)`) inside VS Code and type `ext install` to run the `Extensions: Install Extension` command.  When the extension list appears, type 'edge' to filter the list and install the `Debugger for Edge` extension.  You'll then create a launch-configuration file which we explain in detail in our README [right here](https://github.com/Microsoft/vscode-edge-debug).

## Supported features

In this release, we support the following features:

- Setting breakpoints, including within source files when source maps are enabled
- TypeScript, via source maps
- Debug stepping
- Locals scope variables via the **VARIABLES** panel 
- Debugging eval scripts, script tags, and scripts that are added dynamically
- Watches via the **WATCH** panel.
- The debug console
- Most console APIs

## Going forward

If you have any issues or ideas for improvements, feel free to reach out to us on [Twitter](https://twitter.com/EdgeDevTools) or [GitHub](https://github.com/Microsoft/vscode-edge-debug/).

–

[Andy Sterland](https://twitter.com/AndySterland), Senior Program Manager, JavaScript Diagnostics <br/>
[Kenneth Auchenberg](https://twitter.com/auchenberg), Program Manager, JavaScript Diagnostics
