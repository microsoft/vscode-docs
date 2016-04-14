---
Order: 11
Area: extensions
TOCTitle: Our Approach
ContentId: 2D912137-E7FE-4C5F-91D9-52088169C4AD
PageTitle: Our Approach to Extensibility
DateApproved: 4/14/2016
MetaDescription: Learn about the choices we made in creating the Visual Studio Code extension (plug-in) model.
---

# Our Approach to Extensibility

VS Code has a very rich extensibility model and there are many ways to extend the tool. However, we do not provide direct access to the underlying UI DOM to extension writers. With VS Code, we’re continually trying to optimize use of the underlying web technologies to deliver an always available, highly responsive editor and we will continue to tune our use of the DOM as these technologies and our product evolve. To maintain performance and compatibility, we run extensions in their own host process and prevent direct access to the DOM. VS Code also includes a built-in set of UI components for common scenarios such as IntelliSense, so that these experiences are consistent across programming languages and extensions and extension developers do not need to build their own.

We realize that this approach may initially feel restrictive to extension developers. We’re always looking for ways to improve our extensibility model and expand the capabilities available to extensions.  We look forward to hearing your feedback and ideas.


## Core Concepts
When we set out to add extensibility to VS Code, we had a number of considerations in mind.  The following sections provide some context as to a number of our core decisions.  We also have a document that outlines many of the core [patterns we have adopted](/docs/extensions/patterns-and-principles.md) within our APIs.

## Stability - Extension Isolation
Extensions are wonderful but extensions can also affect startup performance or the overall stability of VS Code itself. To avoid these problems, VS Code loads and runs extensions in a separate process, the `extension host process`. A misbehaving extension cannot impact VS Code and in particular its startup time.

We have built this architecture with the end-user in mind, as this architecture allows us to ensure that the end-user is always in control of VS Code: the user can open, type or save files at any time, VS Code ensures a responsive UI irrespective of what extensions are doing.

The `extension host` is a Node.js process and it exposes the VS Code API to extension writers. VS Code provides debugging support for
extensions running inside the `extension host`.

## Performance - Extension Activation
VS Code loads extensions as late as possible and extensions that are not used during a session are not loaded and therefore do not consume memory. To help support lazy loading of extensions, VS Code defines so-called `activation events`. An [activation event](/docs/extensionAPI/activation-events.md) is fired by VS Code based on specific activities and an extension can define for which events it needs to be activated. For example, an extension for editing Markdown only needs to be activated when the user opens a Markdown file.

## Extension Manifest
To activate an extension lazily, VS Code requires a description of your extension, the `extension manifest` which is a `package.json` file enriched with some additional [VS Code specific fields](/docs/extensionAPI/extension-manifest.md). This includes the [activation events](/docs/extensionAPI/activation-events.md) that trigger the loading of the extension. VS Code provides a set of `contribution points` that an [extension can add](/docs/extensionAPI/extension-points.md) to. For example, when adding a command to VS Code, you provide the command definition through the `commands` contribution point. You define the contributions of your extension in the package.json. VS Code reads and interprets the manifest during start-up and prepares its UI accordingly.

As the `extension host` is a Node.js process, you can use the Node API in your extensions and even better you can reuse existing Node.js modules when implementing an extension. You define your module dependencies inside the `package.json` and you use npm to install a Node.js module.

See the [package.json contribution points reference](/docs/extensionAPI/extension-points.md) for more details.

## Extensibility API 
The approach to run the extensions isolated in a separate process allows VS Code to strictly control the API exposed to extenders. See the [Extensibility API Overview](/docs/extensionAPI/overview.md) for details on the current API.

VS Code is implemented using web technologies (HTML, CSS) and web technologies are very powerful when it comes to modifying and styling UI. You can easily add nodes to the DOM and implement a custom appearance using CSS. However, this power is not without its problems when it comes to evolving a complex application like VS Code. The structure can change and extensions that are tightly coupled to the UI would break. For this reason, VS Code took the defensive approach to not expose the DOM to extenders.

## Protocol based extensions
A common extension pattern in VS Code is to execute extension code in a separate process that communicates with VS Code through a protocol. Examples of this in VS Code are the language servers and debug adapters.  Typically this protocol uses stdin/stdout to communicate between the processes using a JSON payload. Using separate processes provides good isolation boundaries which helps VS Code preserve the stability of the core editor. In addition, this allows extenders to pick the programming language that is most appropriate for the particular extension implementation.


## Next Steps
* [Your First Extension](/docs/extensions/example-hello-world.md) - Try creating a simple Hello World extension
* [Extension API](/docs/extensionAPI/overview.md) - Learn about the VS Code extensibility APIs
* [Samples](/docs/tools/samples.md) - A list of extension samples you can review and build

## Common Questions

Nothing yet





