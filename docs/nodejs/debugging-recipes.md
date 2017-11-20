---
Order: 7
Area: nodejs
TOCTitle: Debugging Recipes
ContentId: 215832f9-d5bd-4cea-8cea-bfc4dc7ff7d1
PageTitle: Debugging Recipes for VS Code
DateApproved: 11/8/2017
MetaDescription:  Learn more about how to setup debugging in Visual Studio Code with debugging recipes
MetaSocialImage: debugging_Debugging.png
---
# Debugging Recipes

Visual Studio Code supports debugging of many languages and platforms via debuggers that are either built-in or contributed by extensions.

To make it easier to get started with debugging, we have made a collection of debugging "recipes" which contain the steps and configuration you need to set up debugging for your favorite platform. The recipes are in GitHub at [https://github.com/Microsoft/vscode-recipes](https://github.com/Microsoft/vscode-recipes).

## Chrome - Debug JavaScript in Google Chrome

The Visual Studio Code editor supports debugging of JavaScript running in [Google Chrome](https://electron.atom.io) applications via the [Debugger for Chrome extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

![chrome](images/recipes/chrome.png)

You can read more about how our Debugger for Chrome works in this introduction [blog post](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code).

**Recipe:** [Chrome Debugging with Angular CLI](https://github.com/Microsoft/vscode-recipes/tree/master/Angular-CLI)

Here are two other relevant blog posts:

* [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f)

* [Super-charged live editing and JavaScript debugging for Angular using VS Code](https://medium.com/@auchenberg/super-charged-live-editing-and-javascript-debugging-for-angular-using-visual-studio-code-c29da251ec71)

## Node.js + TypeScript + Docker Container

This recipe shows how to run and debug a VS Code Node.js project written in TypeScript running inside a [Docker](https://www.docker.com) container.

![](images/recipes/node-typescript-docker.png)

**Recipe:** [Docker-TypeScript](https://github.com/Microsoft/vscode-recipes/tree/master/Docker-TypeScript)

## MERN - Mongo, Express, React and NodeJS

This recipe shows how to run and debug a MERN (Mongo, Express, React and NodeJS) based project in VS Code.

![](images/recipes/mern.png)

**Recipe:** [Developing the MERN Starter in VS Code](https://github.com/Microsoft/vscode-recipes/tree/master/MERN-Starter)


## Electron - Debug Electron applications

The Visual Studio Code editor supports debugging [Electron](https://electron.atom.io) applications via the built-in [Node.js](https://nodejs.org/) debugger and the [Debugger for Chrome extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

![electron](images/recipes/electron.png)

**Recipe:** [Electron](https://github.com/Microsoft/vscode-recipes/tree/master/Electron)

## Next Steps

* [Debugging](/docs/editor/debugging.md) - Read about general VS Code debugging features.
* [Node.js Debugging](/docs/nodejs/nodejs-debugging.md) - Learn about the built-in Node.js debugger.