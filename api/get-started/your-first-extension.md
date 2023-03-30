---
# DO NOT TOUCH — Managed by doc writer
ContentId: DC915D6C-13D4-4022-9101-57C4A4118B07
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Create your first Visual Studio Code extension (plug-in) with a simple Hello World example.
---

# Your First Extension

In this topic, we'll teach you the fundamental concepts for building extensions. Make sure you have [Node.js](https://nodejs.org) and [Git](https://git-scm.com/) installed, then install [Yeoman](https://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) with:

```bash
npm install -g yo generator-code
```

The generator scaffolds a TypeScript or JavaScript project ready for development. Run the generator and fill out a few fields for a TypeScript project:

```bash
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`

```

Then, inside the editor, press `kb(workbench.action.debug.start)`. This will compile and run the extension in a new **Extension Development Host** window.

Run the **Hello World** command from the Command Palette (`kb(workbench.action.showCommands)`) in the new window:

<video loop muted playsinline controls title="Launch your first VS Code extension video">
  <source src="/api/get-started/your-first-extension/launch.mp4" type="video/mp4">
</video>

You should see the `Hello World from HelloWorld!` notification showing up. Success!

## Developing the extension

Let's make a change to the message:

1. Change the message from "Hello World from HelloWorld!" to "Hello VS Code" in `extension.ts`.
1. Run **Developer: Reload Window** in the new window.
1. Run the command **Hello World** again.

You should see the updated message showing up.

<video loop muted playsinline controls title="Reload VS Code extension video">
  <source src="/api/get-started/your-first-extension/reload.mp4" type="video/mp4">
</video>

Here are some ideas for things for you to try:

- Give the **Hello World** command a new name in the Command Palette.
- [Contribute](/api/references/contribution-points) another command that displays current time in an information message. Contribution points are static declarations you make in the `package.json` [Extension Manifest](/api/references/extension-manifest) to extend VS Code, such as adding commands, menus, or keybindings to your extension.
- Replace the `vscode.window.showInformationMessage` with another [VS Code API](/api/references/vscode-api) call to show a warning message.

## Debugging the extension

VS Code's built-in debugging functionality makes it easy to debug extensions. Set a breakpoint by clicking the gutter next to a line, and VS Code will hit the breakpoint. You can hover over variables in the editor or use the **Run and Debug** view in the left to check a variable's value. The Debug Console allows you to evaluate expressions.

<video loop muted playsinline controls title="Debug VS Code extension video">
  <source src="/api/get-started/your-first-extension/debug.mp4" type="video/mp4">
</video>

You can learn more about debugging Node.js apps in VS Code in the [Node.js Debugging Topic](/docs/nodejs/nodejs-debugging).

## Next steps

In the next topic, [Extension Anatomy](/api/get-started/extension-anatomy), we'll take a closer look at the source code of the `Hello World` sample and explain key concepts.

You can find the source code of this tutorial at: [https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample). The [Extension Guides](/api/extension-guides/overview) topic contains other samples, each illustrating a different VS Code API or Contribution Point, and following the recommendations in our [UX Guidelines](/api/ux-guidelines/overview).

### Using JavaScript

In this guide, we mainly describe how to develop VS Code extension with TypeScript because we believe TypeScript offers the best experience for developing VS Code extensions. However, if you prefer JavaScript, you can still follow along using [helloworld-minimal-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-minimal-sample).

### UX Guidelines

This is also a good time to review our [UX Guidelines](/api/ux-guidelines/overview) so you can start designing your extension user interface to follow the VS Code best practices.
