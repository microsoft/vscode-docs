---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: The Visual Studio Code Extension Host is responsible for managing extensions and ensuring the stability and performance of Visual Studio Code.
---

# Extension Host

As you learned in the [Extension Anatomy](/api/get-started/extension-anatomy) topic, an extension exposes the `activate` and `deactivate` methods and VS Code will manage its lifecycle. This topic provides more details on the **Extension Host** that manages all running extensions.

**Extension host** is a Node.js process in VS Code responsible for loading and running extensions. Although you don't need to worry about the Extension Host when you are writing extensions, it is still useful to know what the Extension Host does to your extension.

## Stability and Performance

VS Code aims to deliver a stable and performant editor to end users, and misbehaving extensions should not impact the user experience. The Extension Host in VS Code prevents extensions from:

- Impacting startup performance
- Slowing down UI operations
- Modifying the UI

Additionally, VS Code lets extensions declare their [Activation Events](/api/references/activation-events) and loads them lazily. For example, the Markdown extension should only be loaded when a user opens a Markdown file. This makes sure that extensions do not consume unnecessary CPU and memory.
