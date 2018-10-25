---
Order: 1
Area: get-started
TOCTitle: Your First Extension
PageTitle: Your First Extension
---

# Your First Extension

In this section, we'll teach you fundamentals concepts for building VS Code extensions and walk you through the development cycle of writing-running-debugging-testing-publishing VS Code extensions.

To get started you'll need `Hello Code` extension, which is our "Hello World" example for VS Code.

You can find source code for `Hello Code` on [GitHub](https://github.com/Microsoft/vscode-extension-samples/tree/ext-docs/hellocode-sample).

Extensions in VS Code are implemented in Node.js, and is powered by TypeScript, so you need to install a few dependencies before you can get doing.

## Getting and opening Hello Code

To get started you need to checkout `Hello Code`, install dendencies and open `Hello Code` in VS Code which you can do using the `code` alias:

```
git clone https://github.com/Microsoft/vscode-extension-samples/
cd hellocode-sample
npm install
code .
```


< Insert screenshot of VS Code with Hello Code open >

## Running Hello Code

Next is to run the `Hello Code` extension from VS Code, and you do this by simply presssing `F5` on your keyboard or by going to the Debug section of VS Code and clicking the green play button.

This will kickoff the built-step of the extension, where TypeScript gets compiled to JavaScript. Once finished a new instance of VS Code will start in a special mode (Extension Development Host) and this new instance is now aware of your `Hello Code` extension.

## What can Hello Code do?

Next is to see what `Hello Code` can do, and if you open the command pallette by pressing `kb(workbench.action.showCommands)` you should see a new command called `Hello World`. Run that command, and see what happens!

<Insert extensions/example-hello-world/running.png image>

Congratulations! You've just created and executed your first custom VS Code command! 🎉

## Next Steps
Now you have successfully checked-out the source code built the extension and run in in VS Code.

Next for you is to dive into the details of how extensions are structured, how you run and debug your extensions and you can distribute your own extension.

Keep reading, this is just the beginning!