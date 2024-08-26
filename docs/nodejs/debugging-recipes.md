---
Order: 10
Area: nodejs
TOCTitle: Debugging Recipes
ContentId: 215832f9-d5bd-4cea-8cea-bfc4dc7ff7d1
PageTitle: JavaScript Debugging Recipes for Visual Studio Code
DateApproved: 08/01/2024
MetaDescription:  Learn more about how to setup debugging in Visual Studio Code with debugging recipes
MetaSocialImage: ../editor/images/debugging/debugging-social.png
---
# JavaScript Debugging Recipes

Visual Studio Code supports debugging of many languages and platforms via debuggers that are either built-in or contributed by extensions.

To make it easier to get started with debugging, we have made a collection of debugging "recipes" which contain the steps and configuration you need to set up debugging for your favorite platform. The recipes are in GitHub at [https://github.com/microsoft/vscode-recipes](https://github.com/microsoft/vscode-recipes).

## Debug server-side JavaScript in Node.js

The Visual Studio Code editor supports debugging Node.js applications via the built-in [Node.js](https://nodejs.org/) debugger.

![Node.js logo](images/recipes/nodejs.png)

**Recipes:**

* [Debugging Node.js with Nodemon](https://github.com/microsoft/vscode-recipes/tree/main/nodemon)
* [Debugging Node.js AWS Lambda functions](https://github.com/microsoft/vscode-recipes/tree/main/debugging-lambda-functions)

## Debug client-side JavaScript in Browsers

The Visual Studio Code editor supports debugging of JavaScript running in [Microsoft Edge](https://www.microsoft.com/edge) and [Google Chrome](https://www.google.com/chrome/).

![JavaScript, Edge, and Chrome logo](images/recipes/browsers.png)

You can read more about debugging browsers works in the [Browser Debugging documentation](/docs/nodejs/browser-debugging.md).

**Recipes:**

* [Debugging Angular apps with Angular CLI](https://github.com/microsoft/vscode-recipes/tree/main/Angular-CLI)
* [Debugging Next.js apps](https://github.com/microsoft/vscode-recipes/tree/main/Next-js)
* [Debugging Meteor apps](https://github.com/microsoft/vscode-recipes/tree/main/meteor)
* [Debugging Vue.js apps](https://github.com/microsoft/vscode-recipes/tree/main/vuejs-cli)
* [Debugging Mocha tests](https://github.com/microsoft/vscode-recipes/tree/main/debugging-mocha-tests)
* [Debugging Jest tests](https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests)

**Blog posts**:

* [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f)
* [Super-charged live editing and JavaScript debugging for Angular using VS Code](https://medium.com/@auchenberg/super-charged-live-editing-and-javascript-debugging-for-angular-using-visual-studio-code-c29da251ec71)

## Electron - Debug Electron applications

The Visual Studio Code editor supports debugging [Electron](https://www.electronjs.org) applications via the built-in JavaScript debugger.

![electron logo](images/recipes/electron.png)

**Recipes:**

* [Debugging Electron Main and Renderer processes](https://github.com/microsoft/vscode-recipes/tree/main/Electron)

## Next steps

* [Debugging](/docs/editor/debugging.md) - Read about general VS Code debugging features.
* [Node.js Debugging](/docs/nodejs/nodejs-debugging.md) - Learn about the built-in Node.js debugger.
* [Video: Getting started with debugging in VS Code](https://www.youtube.com/watch?v=3HiLLByBWkg) - Learn about debugging in VS Code.
