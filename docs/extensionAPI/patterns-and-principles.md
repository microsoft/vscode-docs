---
Order: 2
Area: extensionapi
TOCTitle: Principles and Patterns
ContentId: 36C1E34B-2F41-4AA0-9443-015D92EF85FB
PageTitle: Visual Studio Code Extensibility Patterns and Principles
DateApproved: 11/8/2017
MetaDescription: The Visual Studio Code extensibility (plug-in) API is designed around a set of guiding patterns and principles to promote extension consistency, correctness and ease of development.
---
# Extensibility Principles and Patterns

## Our Approach to Extensibility

Visual Studio Code has a very rich extensibility model and there are many ways to extend the tool. However, we do not provide direct access to the underlying UI DOM to extension writers. With VS Code, we’re continually trying to optimize use of the underlying web technologies to deliver an always available, highly responsive editor and we will continue to tune our use of the DOM as these technologies and our product evolve. To maintain performance and compatibility, we run extensions in their own host process and prevent direct access to the DOM. VS Code also includes a built-in set of UI components for common scenarios such as IntelliSense, so that these experiences are consistent across programming languages and extensions and extension developers do not need to build their own.

We realize that this approach may initially feel restrictive to extension developers. We’re always looking for ways to improve our extensibility model and expand the capabilities available to extensions.  We look forward to hearing your feedback and ideas.

## Core Concepts

When we set out to add extensibility to VS Code, we had a number of considerations in mind.  The following sections provide some context as to a number of our core decisions.

### Stability - Extension Isolation

Extensions are wonderful but extensions can also affect startup performance or the overall stability of VS Code itself. To avoid these problems, VS Code loads and runs extensions in a separate process, the `extension host process`. A misbehaving extension cannot impact VS Code and in particular its startup time.

We have built this architecture with the end-user in mind, as this architecture allows us to ensure that the end-user is always in control of VS Code: the user can open, type or save files at any time, VS Code ensures a responsive UI irrespective of what extensions are doing.

The `extension host` is a Node.js process and it exposes the VS Code API to extension writers. VS Code provides debugging support for extensions running inside the `extension host`.

### Performance - Extension Activation

VS Code loads extensions as late as possible and extensions that are not used during a session are not loaded and therefore do not consume memory. To help support lazy loading of extensions, VS Code defines so-called `activation events`. An [activation event](/docs/extensionAPI/activation-events.md) is fired by VS Code based on specific activities and an extension can define for which events it needs to be activated. For example, an extension for editing Markdown only needs to be activated when the user opens a Markdown file.

### Extension Manifest

To activate an extension lazily, VS Code requires a description of your extension, the `extension manifest` which is a `package.json` file enriched with some additional [VS Code specific fields](/docs/extensionAPI/extension-manifest.md). This includes the [activation events](/docs/extensionAPI/activation-events.md) that trigger the loading of the extension. VS Code provides a set of `contribution points` that an [extension can add](/docs/extensionAPI/extension-points.md) to. For example, when adding a command to VS Code, you provide the command definition through the `commands` contribution point. You define the contributions of your extension in the package.json. VS Code reads and interprets the manifest during start-up and prepares its UI accordingly.

As the `extension host` is a Node.js process, you can use the Node API in your extensions and even better you can reuse existing Node.js modules when implementing an extension. You define your module dependencies inside the `package.json` and you use npm to install a Node.js module.

See the [package.json contribution points reference](/docs/extensionAPI/extension-points.md) for more details.

### Extensibility API

The approach to run the extensions isolated in a separate process allows VS Code to strictly control the API exposed to extenders. See the [Extensibility API Overview](/docs/extensionAPI/overview.md) for details on the current API.

VS Code is implemented using web technologies (HTML, CSS) and web technologies are very powerful when it comes to modifying and styling UI. You can easily add nodes to the DOM and implement a custom appearance using CSS. However, this power is not without its problems when it comes to evolving a complex application like VS Code. The structure can change and extensions that are tightly coupled to the UI would break. For this reason, VS Code took the defensive approach to not expose the DOM to extenders.

### Protocol based extensions

A common extension pattern in VS Code is to execute extension code in a separate process that communicates with VS Code through a protocol. Examples of this in VS Code are the language servers and debug adapters.  Typically this protocol uses stdin/stdout to communicate between the processes using a JSON payload. Using separate processes provides good isolation boundaries which helps VS Code preserve the stability of the core editor. In addition, this allows extenders to pick the programming language that is most appropriate for the particular extension implementation.

## Extensibility Patterns

The extension API of Visual Studio Code follows some guiding patterns which are applied throughout the whole API.

## Promises

The VS Code API represents asynchronous operations with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). From extensions, __any__ type of promise can be returned, like ES6, WinJS, A+, etc.

Being independent of a specific promise library is expressed in the API by the `Thenable`-type. `Thenable` represents the common denominator which is the [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method.

In most cases the use of promises is optional and when VS Code calls into an extension, it can handle the _result type_ as well as a `Thenable` of the _result type_. When the use of a promise is optional, the API indicates this by returning `or`-types.

```typescript
provideNumber(): number | Thenable<number>
```

## Cancellation Tokens

Often operations are started on volatile state which changes before operations can finish. For instance, computing IntelliSense starts and the user continues to type making the result of that operation obsolete.

APIs that are exposed to such behavior will get passed a `CancellationToken` on which you can check for cancellation (`isCancellationRequested`) or get notified when cancellation occurs (`onCancellationRequested`). The cancellation token is usually the last parameter of a function call and optional.

## Disposables

The VS Code API uses the [dispose pattern](https://en.wikipedia.org/wiki/Dispose_pattern) for resources that are obtained from VS Code. This applies to event listening, commands, interacting with the UI, and various language contributions.

For instance, the `setStatusBarMessage(value: string)` function returns a `Disposable` which upon calling `dispose` removes the message again.

## Events

Events in the VS Code API are exposed as functions which you call with a listener-function to subscribe. Calls to subscribe return a `Disposable` which removes the event listener upon dispose.

```javascript
var listener = function(event) {
	console.log("It happened", event);
};

// start listening
var subscription = fsWatcher.onDidDelete(listener);

// do more stuff

subscription.dispose(); // stop listening
```

Names of events follow the `on[Will|Did]VerbNoun?` pattern. The name signals if the event is going to happen *(onWill)* or already happened *(onDid)*, what happened *(verb)*, and the context *(noun)* unless obvious from the context.

An example from the VS Code API is `window.onDidChangeActiveTextEditor` which is an event fired when the active text editor *(noun)* has been (*onDid*) changed (*verb*).

## Strict null

The VS Code API uses the `undefined` and `null` TypeScript types where appropriate to support [strict null checking](https://github.com/Microsoft/TypeScript/pull/7140).

## Using Node.js Modules with Extensions

Your extension can depend on [Node.js](https://nodejs.org) modules at runtime. Similarly to a node module itself, you can add those dependencies to your [`package.json` extension manifest](/docs/extensionAPI/extension-manifest.md) using the `dependencies` field.

There are even VS Code specific Node.js modules which are [useful in extension development](/docs/extensionAPI/extension-manifest.md#useful-node-modules).

### Installation and Packaging

Visual Studio Code **will not** install your extension's dependencies when a user installs it, so you must `npm install` before publishing. The extension's publishing package will contain all of its dependencies within. You can run `vsce ls` to list all the files that `vsce` will include in the package.

You can create a `.vscodeignore` file to exclude some files from being included in your extension's package. See the `vsce` publishing tool topic for [details](https://code.visualstudio.com/docs/extensions/publish-extension.md#vscodeignore) about using a `.vscodeignore` file.

## Next Steps

* [Extension Manifest File](/docs/extensionAPI/extension-manifest.md) - Visual Studio Code package.json extension manifest file reference
* [Contribution Points](/docs/extensionAPI/extension-points.md) - VS Code contribution points reference
* [Activation Events](/docs/extensionAPI/activation-events.md) - VS Code activation events reference

## Common Questions

**Q: Can I use native Node.js modules with my extension?**

**A:** A Visual Studio Code extension package contains all of its dependencies. This means that if you develop your extension on Windows and depend on a native Node.js module when you publish that extension, the Windows compiled native dependency will be contained in your extension. Users on Mac or Linux won't be able to use the extension.

The only way to make this work for now is to include binaries for all four platforms of VS Code (Windows x86 and x64, Linux, Mac) in your extension and have code that dynamically loads the right one.

We don't recommend extensions use native `npm` modules as native modules bundled with an extension must be recompiled with every new version of VS Code against the same Node.js version that VS Code ships with. You can find the Node.js and module versions by running `process.versions` from the developer tools console (**Help** > **Toggle Developer Tools**).



