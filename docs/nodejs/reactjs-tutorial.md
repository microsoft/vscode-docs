---
Order:
Area: nodejs
TOCTitle: React Tutorial
ContentId: 2dd2eeff-2eb3-4a0c-a59d-ea9a0b10c468
PageTitle: React JavaScript Tutorial in VS Code
DateApproved: 3/10/2017
MetaDescription: React JavaScript tutorial showing IntelliSense, debugging, and code navigation support in Visual Studio Code.
MetaSocialImage: nodejs_javascript_vscode.png
---
# React Tutorial in VS Code

[React](https://facebook.github.io/react/) is a popular JavaScript library for building web application user interfaces developed by Facebook. VS Code supports React.js IntelliSense and code navigation out of the box.

![welcome to react](images/reactjs/welcome-to-react.png)

## Hello World

We'll be using the `create-react-app` [generator](https://facebook.github.io/react/docs/installation.html#creating-a-new-application) for this tutorial. To install and use the generator as well as run the React application server, you'll need the [Node.js](https://nodejs.org/) JavaScript runtime and [npm](https://www.npmjs.com/) (the Node.js package manager) installed. You can install Node.js from [here](https://nodejs.org/en/download/ and npm is included.

>**Tip**: To test that you have Node.js and npm correctly install on your machine, you can type `node --version` and `npm --version`.

To install the `create-react-app` generator, in a terminal or command prompt type:

```bash
npm install -g create-react-app
```

This may take a few minutes to install. You can now create a new React application by typing:

```bash
create-react-app my-app
```

where `my-app` is the name of the folder for your application. This may also take a few minutes to create the React application and install it's dependencies.

Let's quickly run our React application by navigating to the new folder and typing `npm start` to start the web server and open the application in a browser:

```bash
cd my-app
npm start
```

You should see "Welcome to React" on `http:localhost:3000` in your browser. We'll leave the web server running while we look at the application with VS Code.

To open your React application in VS Code, open another terminal (or command prompt) and navigate to the `my-app` folder and type `code .`:

```bash
cd my-app
code .
```

### Markdown Preview

In the File Explorer, one file you'll see is the application `README.md`. This has lots of great information about the application and React in general. A nice way to review the README is by using the VS Code Markdown Preview. You can open the preview in either the current editor group (**Markdown: Open Preview** `kb(markdown.showPreview)`) or in a new editor group to the side (**Markdown: Open Preview to the Side** `kb(markdown.showPreviewToSide)`). You'll get nice formatting, hyperlink navigation to headers, and syntax highlighting in code blocks.

![README markdown preview](images/reactjs/markdown-preview.png)

### Syntax highlighting and bracket matching

Now open the `src` folder and select the `index.js` file. You'll notice that VS Code has syntax highlighting of the various source code elements and if you put the cursor on a parentheses, the matching bracket is also selected.

![react bracket matching](images/reactjs/bracket-matching.png)

### IntelliSense

As you start typing in `index.js`, you'll see smart suggestions or completions.

![react suggestions](images/reactjs/suggestions.png)

After you select a suggestion and type `.`, you see the types and methods on the object through IntelliSense.

![react intellisense](images/reactjs/intellisense.png)

VS Code uses the TypeScript language service for it's JavaScript code intelligence and it has a feature called Automatic Type Acquisition (ATA) which pulls down the npm Type Definition files (`*.d.ts`) for the npm modules referenced in the `package.json`.

If you select a method, you'll also get parameter help:

![react parameter help](images/reactjs/parameter-help.png)

### Go to Definition, Peek definition

Through the TypeScript language service, VS Code can also provide type definition information in the editor through **Go to Definition** (`kb(editor.action.gotodeclaration)`) or ** and **Peek Defintion** (`kb(editor.action.peekImplementation)`). Put the cursor over the `App`, right click and select **Peek Definition**. A Peek window with open showing the `App` definition from `App.js`.

![react peek definition](images/reactjs/peek-definition.png)

Press `kbstyle(Escape)` to close the Peek window.

### Hello World!

Let's update the sample application to "Hello World!". Add the link to declare a new H1 header and replace the `<App />` tag in `ReactDOM.render` with `element'.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var element = React.createElement('h1', {className: 'greeting'}, 'Hello, world!');
ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();
```

Once you save the `index.js`, the running instance of the server will update the web page and you'll see "Hello World!".

![hello world](images/reactjs/hello-world.png)

## Debug Hello World

To debug the client side React code, we'll need to install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

>Note: This tutorial assumes you have the Chrome browser installed. The builders of the Debugger for Chrome extension also have versions for the [Safari on iOS(https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-ios-web) and [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) browsers.

Open the Extensions view (`kb(workbench.view.showExtensions)`) and type 'chrome` in the search box. You'll see several extension which reference Chrome.

![debugger for chrome](images/reactjs/debugger-for-chrome.png)

Press the **Install** button for **Debugger for Chrome**. The button will change to **Installing** then **Reload**. Press **Reload** to restart VS Code and activate the extension.

### Set a breakpoint

To set a breakpoint in `index.js`, click on the gutter to the left of the line numbers. This will set a breakpoint which will be visible as a red circle.

![set a breakpoint](images/reactjs/breakpoint.png)

### Configure the Chrome debugger

We need to initially configure the debugger. To do so, go to the Debug view (`kb(workbench.view.debug)`) and click on gear button to create a `launch.json` debugger configuration file. Choose **Chrome** from the **Select Environment** dropdown. This will create a `launch.json` file in a new `.vscode` folder in your project which includes configuration to both launch the website or attach to a running instance.

We need to make one change for our example which is runninng on localhost port `3000`, not `8080` as in the generated file. Your `launch.json` should look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceRoot}"
        },
        {
            "type": "chrome",
            "request": "attach",
            "name": "Attach to Chrome",
            "port": 9222,
            "webRoot": "${workspaceRoot}"
        }
    ]
}
```

Press `kb(workbench.action.debug.start)` or the green arrow to launch the debugger and open a new browser instance. The source code where the breakpoint is set runs on startup before the debugger was attached so we won't hit the breakpoint until we refresh the web page. Refresh the page and you should hit your breakpoint.

![hit breakpoint](images/reactjs/hit-breakpoint.png)

You can step through your source code (`kb(workbench.action.debug.stepOver)`), inspect variables such as `element`, and see the callstack of the client side React application.

![debug variable](images/reactjs/debug-variable.png)

The **Debugger for Chrome** extension README has lots of information on other configurations, working with sourcemaps, and troubleshooting and you can review it directly within VS Code from the **Extensions** view by clicking on the extension item and opening the **Details** view.

![debugger for chrome readme](images/reactjs/chrome-debugger-readme.png)

## [Linting]

get js errors by default

```bash
npm install -g eslint
```

## [Popular Starter Kit]