---
Order:
TOCTitle: iOS Web Debugging
PageTitle: Introducing iOS Web Debugging for VS Code on Windows and Mac
MetaDescription: iOS Web Debugging for VS Code on Windows and Mac
Date: 2016-08-24
ShortDescription: Today debugging websites running on iOS devices are limited to a subset of developers, as the Safari Web Inspector (Safari DevTools) requires an instance of desktop Safari which only is available for macOS users. With our new debugger we are aiming to change that, as our iOS Web Debugger for Visual Studio Code works both on Mac and Windows.
Author: Kenneth Auchenberg
---
# iOS Web Debugging on Windows and Mac

August 24, 2016 by [Kenneth Auchenberg](https://twitter.com/auchenberg)

## Update

The [iOS Web debugger](https://github.com/Microsoft/vscode-ios-web-debug) has been deprecated and we now recommend that you use the [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) together with Visual Studio Code. To learn more, see this introductory [guide](https://medium.com/@auchenberg/hello-remotedebug-ios-webkit-adapter-debug-safari-and-ios-webviews-from-anywhere-2a8553df7465) to the RemoteDebug iOS WebKit Adapter.

## Introduction

Debugging websites running on iOS devices is accessible only to a subset of developers. For example, using the Safari Web Inspector (Safari DevTools) requires an instance of desktop Safari which only is available for macOS users. Today, we’re enabling mobile web developers to debug JavaScript running on their iOS devices directly from their editor with a new [iOS Web Debugger for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-ios-web). This debug extension works on both **Mac and Windows**.

![Demo](ios-debugger-splash.png)

Our new iOS Web Debugger works quite similar to our Chrome debugger which we [introduced back in February](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code). Under the hood, it’s the same debugger running inside VS Code, which is powered by our open-source [vscode-chrome-debug-core](https://github.com/Microsoft/vscode-chrome-debug-core) library. To make the connection from our debugging library to the iOS device, we are leveraging two open-source projects, [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy) and [ios-webkit-debug-proxy-win32](https://github.com/artygus/ios-webkit-debug-proxy-win32), that enables communication with the iOS devices over USB through the WebKit Remote Debugging Protocol. The protocol is compatible with the Chrome Debugging Protocol for the script debugging APIs, and this means our debugger works without additional mapping logic.

## Enabling easy local development through emulated port forwarding

When developing websites running locally, it’s a cumbersome process to enable mobile devices access your local development server, which usually is a HTTP server running on localhost. To make this easier, platforms like Android supports port-forwarding natively, but iOS doesn’t support this.

So we found a way to emulate port forwarding by adding the option to start an instance of [localtunnel](https://localtunnel.github.io/www/), that behind the scenes creates HTTP tunnel from your local computer to the public internet for the specified `tunnelPort` property. This HTTP tunnel is then used by the iOS device to get access to your local development server, just as any other public website.

![Demo](ios-debugger-demo.gif)

## Getting started

To get started, open the **Extensions** view (`kb(workbench.view.extensions)`). When the extension list appears, type "ios" to filter the list and install the Debugger for iOS Web extension. You'll then create a launch-configuration file which we explain in detail in our README [right here](https://github.com/Microsoft/vscode-ios-web-debug).

## Supported features

In this release, we support the following features:

- Setting breakpoints, including in source files when source maps are enabled
- Stepping
- Stack traces
- The Locals pane
- Debugging eval scripts, script tags, and scripts that are added dynamically
- Watches
- Console
- Virtual port forwarding via HTTP tunnel from local computer.

## Experimenting out in the open

Our new iOS Web Debugger is a **public experiment** and this means we are releasing it to the public to find out if **integrated script debugging for iOS** are valuable for developers, so please let us know what you think.

If you have any issues or ideas for improvements, feel free to reach out to us on [Twitter](https://twitter.com/code) or on [GitHub](https://github.com/Microsoft/vscode-ios-web-debug).

–

[Kenneth Auchenberg](https://twitter.com/auchenberg), Program Manager, JavaScript Diagnostics
