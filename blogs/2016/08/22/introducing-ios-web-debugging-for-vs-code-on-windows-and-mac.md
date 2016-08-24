---
Order: 14
TOCTitle: Introducing iOS Web Debugging for VS Code on Windows and Mac
PageTitle: Introducing iOS Web Debugging for VS Code on Windows and Mac
MetaDescription: iOS Web Debugging for VS Code on Windows and Mac
Date: 2016-08-22
ShortDescription: Today debugging web sites running on iOS devices are limited to a subset of developers, as the Safari Web Inspector (Safari DevTools) requires an instance of desktop Safari which only is available for MacOS users. With our new debugger we are aiming to change that, as our iOS Web Debugger for Visual Studio Code works both on Mac and Windows.
Author: Kenneth Auchenberg
---

As a part of our continuous effort to simplify the daily workflow for developers, we are today enabling mobile web developers to debug JavaScript running on their iOS devices directly from their editor, with our new iOS Web Debugger for Visual Studio Code.

Today debugging web sites running on iOS devices are limited to a subset of developers, as the Safari Web Inspector (Safari DevTools) requires an instance of desktop Safari which only is available for MacOS users.

With our new debugger we are aiming to change that, as our <a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-ios-web">iOS Web Debugger for Visual Studio Code</a> works both on<strong> Mac and Windows</strong>.

![Demo](2016_08_22_ios-debugger-splash.png)

Our new iOS Web Debugger works quite similar to our Chrome debugger which we <a href="http://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code">introduced back in February</a>. Under the hood it’s the same debugger running inside VS Code, which is powered by our open source <a href="https://github.com/Microsoft/vscode-chrome-debug-core">vscode-chrome-debug-core</a> library. To make the connection from our debugging library to the iOS device, we are leveraging two open source projects, <a href="https://github.com/google/ios-webkit-debug-proxy">ios-webkit-debug-proxy</a> and <a href="https://github.com/artygus/ios-webkit-debug-proxy-win32">ios-webkit-debug-proxy-win32</a>, that enables communication with the iOS devices over USB through the WebKit Remote Debugging Protocol. The protocol is compatible with the Chrome Debugging Protocol for the script debugging APIs, and this means our debugger works without additional mapping logic.

<h2>Enabling easy local development through emulated port forwarding</h2>
When developing websites running locally, it’s a cumbersome process to enable mobile devices access your local development server, which usually is a HTTP server running on localhost. To make this easier, platforms like Android supports port-forwarding natively, but iOS doesn’t support this.

So we found a way to emulate port forwarding by adding the option to start an instance of <a href="https://localtunnel.github.io/www/">localtunnel</a>, that behind the scenes creates HTTP tunnel from your local computer to the public internet for the specified <code>tunnelPort</code> property. This HTTP tunnel is then used by the iOS device to get access to your local development server, just as any other public website.

![Demo](2016_08_22_ios-debugger-demo.gif)

<h2>Getting started</h2>

To get started, you simply open the Command Palette (F1) inside VS Code and type ext install to run the Extensions: Install Extension command. When the extension list appears, type <code>ios</code> to filter the list and install the Debugger for iOS Web extension. You'll then create a launch-configuration file which we explain in detail in our README <a href="https://github.com/Microsoft/vscode-ios-web-debug">right here</a>.

<h2>Supported features</h2>

In this release, we support the following features:
<ul>
 	<li>Setting breakpoints, including in source files when source maps are enabled</li>
 	<li>Stepping</li>
  <li>Stack traces</li>
 	<li>The Locals pane</li>
 	<li>Debugging eval scripts, script tags, and scripts that are added dynamically</li>
 	<li>Watches</li>
  <li>Console</li>
  <li>Virtual port forwarding via HTTP tunnel from local computer.</li>
</ul>

<h2>Experimenting out in the open</h2>

Our new iOS Web Debugger is a <u>public experiment</u> and this means we are releasing it to the public to find out if <u>integrated script debugging for iOS</u> are valuable for developers, so please let us know what you think.

If you have any issues or ideas for improvements, feel free to reach out to us on <a href="https://twitter.com/code">Twitter</a> or on <a href="https://github.com/Microsoft/vscode-ios-web-debug">GitHub</a>.

–
<a href="https://twitter.com/auchenberg">Kenneth Auchenberg</a>, Program Manager, JavaScript Diagnostics