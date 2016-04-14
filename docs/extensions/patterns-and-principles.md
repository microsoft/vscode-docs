---
Order: 7
Area: extensions
TOCTitle: Principles and Patterns
ContentId: 36C1E34B-2F41-4AA0-9443-015D92EF85FB
PageTitle: Visual Studio Code Extensibility Patterns and Principles
DateApproved: 4/14/2016
MetaDescription: The Visual Studio Code extensibility (plug-in) API is designed around a set of guiding patterns and principles to promote extension consistency, correctness and ease of development.
---

# Extensibility Principles and Patterns

The extension API of Visual Studio Code follows some guiding patterns and principles which are applied throughout the whole API. 

## Promises

The VS Code API represents asynchronous operations with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). From extensions, __any__ type of promise can be returned, like ES6, WinJS, A+, etc.

Being independent of a specific promise library is expressed in the API by the `Thenable`-type. `Thenable` represents the common denominator which is the `then`-property.

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
	console.log(“It happened”, event);
};

// start listening
var subscription = fsWatcher.onDidDelete(listener);

// do more stuff

subscriptions.dispose(); // stop listening
```

Names of events follow the `on[Will|Did]VerbNoun?` pattern. The name signals if the event is going to happens *(onWill)* or already happened *(onDid)*, what happened *(verb)*, and the context *(noun)* unless obvious from the context.

An example from the VS Code API is `window.onDidChangeActiveTextEditor` which is an event fired when the active text editor *(noun)* has been (*onDid*) changed (*verb*).

## Using Node.js Modules with Extensions

Your extension can depend on [Node.js](https://nodejs.org) modules at runtime. Similarly to a node module itself, you can add those dependencies to your [`package.json` extension manifest](/docs/extensionAPI/extension-manifest.md) using the `dependencies` field.

### Installation and Packaging

Visual Studio Code **will not** install your extension's dependencies when a user installs it, so you must `npm install` before publishing. The extension's publishing package will contain all of its dependencies within. You can run `vsce ls` to list all the files that `vsce` will include in the package.

## Next Steps

* [Extension Manifest File](/docs/extensionAPI/extension-manifest.md) - VS Code package.json extension manifest file reference
* [Contribution Points](/docs/extensionAPI/extension-points.md) - VS Code contribution points reference
* [Activation Events](/docs/extensionAPI/activation-events.md) - VS Code activation events reference

## Common Questions

**Q: Can I use native Node.js modules with my extension?**

**A:** A Visual Studio Code extension package contains all of its dependencies. This means that if you develop your extension on Windows and depend on a native Node.js module when you publish that extension, the Windows compiled native dependency will be contained in your extension. Users on OS X or Linux won't be able to use the extension.

The only way to make this work for now is to include binaries for all four platforms of VS Code (Windows x86 and x64, Linux, OS X) in your extension and have code that dynamically loads the right one.


