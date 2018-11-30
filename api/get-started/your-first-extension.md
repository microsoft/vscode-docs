---
---

# Your First Extension

In this topic, we'll teach you the fundamental concepts for building Visual Studio Code extensions. Make sure you have [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed, then install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) with:

```bash
npm install -g yo generator-code
```

The generator scaffolds a project ready for development. Run the generator and fill out a few fields:

```bash
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? hello-code
# ? What's the description of your extension?
# ? What's your publisher name (more info: https://code.visualstudio.com/docs/tools/vscecli#_publishing-extensions)? pine
# ? Enable stricter TypeScript checking in 'tsconfig.json'? Yes
# ? Setup linting using 'tslint'? Yes
# ? Initialize a git repository? Yes

code ./hello-code
```

Then, inside the editor, press `kb(workbench.action.debug.start)`, and run the `Hello Code` command from the Command Palette (`kb(workbench.action.showCommands)`) in the new **Extension Development Host** window:

<video autoplay loop muted playsinline controls>
  <source src="/api/get-started/your-first-extension/launch.mp4" type="video/mp4">
</video>

You should see the `Hello Code` notification showing up. Success!

## Developing the extension

Let's make a change to the message:

- Change the message from `Hello Code` to `Hello VS Code` in `extension.ts`
- Run `Reload Window` in the new window
- Run the command `Hello Code` again

You should see the updated message showing up.

<video autoplay loop muted playsinline controls>
  <source src="/api/get-started/your-first-extension/reload.mp4" type="video/mp4">
</video>

Here are some ideas for you to try:

- Give the `Hello Code` command a new name.
- [Contribute](/api/references/contribution-points) another command such as `Goodbye Code`
- Replace the `vscode.window.showInformationMessage` with another [VS Code API](/api/references/vscode-api) call to show a warning message.

## Debugging the extension

The debugger and debug console allow you stop the program and inspect variables effectively. Here we have an extension that would show a message `Hello Visual Studio Code!`, each time with an increasing exclamation mark. Let's find out how many exclamation marks the message would show by using the Debugger and the Debug Console.

<video autoplay loop muted playsinline controls>
  <source src="/api/get-started/your-first-extension/debug.mp4" type="video/mp4">
</video>

You can learn more about debugging Node.js apps in VS Code at the [Node.js Debugging Topic](/docs/nodejs/nodejs-debugging).

## Next Steps

In the next topic, [Extension Anatomy](/api/get-started/extension-anatomy), we'll take a closer look at the source code of the `Hello Code` sample and explain key concepts.

You can find the source code of this tutorial at: https://github.com/Microsoft/vscode-extension-samples/tree/master/hellocode-sample. The [Extension Guides](/api/extension-guides/overview) topic contains other samples, each illustrating a different part of VS Code API.

### Using JavaScript

In this guide, we mainly describe how to develop VS Code extension with TypeScript because we believe TypeScript offers the best experience for developing VS Code extensions. However, if you prefer JavaScript, you can still follow along using [hellocode-minimal-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/hellocode-minimal-sample).