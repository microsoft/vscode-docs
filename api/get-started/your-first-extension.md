---
# DO NOT TOUCH — Managed by doc writer
ContentId: DC915D6C-13D4-4022-9101-57C4A4118B07
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Create your first Visual Studio Code extension (plug-in) with a simple Hello World example.
---

# Your First Extension

In this topic, we'll teach you the fundamental concepts for building extensions. Make sure you have [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed, then install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) with:

```bash
npm install -g yo generator-code
```

The generator scaffolds a project ready for development. Run the generator and fill out a few fields:

```bash
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Which package manager to use? npm

code ./helloworld
```

Then, inside the editor, press `kb(workbench.action.debug.start)`. This will compile and run the extension in a new **Extension Development Host** window.

Run the `Hello World` command from the Command Palette (`kb(workbench.action.showCommands)`) in the new window:

<video autoplay loop muted playsinline controls title="Launch your first VS Code extension video">
  <source src="/api/get-started/your-first-extension/launch.mp4" type="video/mp4">
</video>

You should see the `Hello World` notification showing up. Success!

## Developing the extension

Let's make a change to the message:

- Change the message from `Hello World` to `Hello VS Code` in `extension.ts`
- Run `Reload Window` in the new window
- Run the command `Hello World` again

You should see the updated message showing up.

<video autoplay loop muted playsinline controls title="Reload VS Code extension video">
  <source src="/api/get-started/your-first-extension/reload.mp4" type="video/mp4">
</video>

Here are some ideas for you to try:

- Give the `Hello World` command a new name in the Command Palette.
- [Contribute](/api/references/contribution-points) another command that displays current time in an information message.
- Replace the `vscode.window.showInformationMessage` with another [VS Code API](/api/references/vscode-api) call to show a warning message.

## Debugging the extension

VS Code's built-in debugging functionality makes it easy to debug extensions. Set a breakpoint by clicking the gutter next to a line, and VS Code will hit the breakpoint. You can hover over variables in the editor or use the Debug View in the left to check a variable's value. The Debug Console allows you to evaluate expressions.

<video autoplay loop muted playsinline controls title="Debug VS Code extension video">
  <source src="/api/get-started/your-first-extension/debug.mp4" type="video/mp4">
</video>

You can learn more about debugging Node.js apps in VS Code in the [Node.js Debugging Topic](/docs/nodejs/nodejs-debugging).

## Next steps

In the next topic, [Extension Anatomy](/api/get-started/extension-anatomy), we'll take a closer look at the source code of the `Hello World` sample and explain key concepts.

You can find the source code of this tutorial at: https://github.com/Microsoft/vscode-extension-samples/tree/master/helloworld-sample. The [Extension Guides](/api/extension-guides/overview) topic contains other samples, each illustrating a different VS Code API or Contribution Point.

### Using JavaScript

In this guide, we mainly describe how to develop VS Code extension with TypeScript because we believe TypeScript offers the best experience for developing VS Code extensions. However, if you prefer JavaScript, you can still follow along using [helloworld-minimal-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/helloworld-minimal-sample).
