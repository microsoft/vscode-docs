---
Order: 7
Area: nodejs
TOCTitle: Vue Tutorial
ContentId: 85ce0bcc-d2b8-4b7c-b744-5eddce9a8d00
PageTitle: Vue JavaScript Tutorial in VS Code
DateApproved: 7/182018
MetaDescription: Vue JavaScript tutorial showing IntelliSense, debugging, and code navigation support in the Visual Studio Code editor.
MetaSocialImage: /assets/images/nodejs_javascript_vscode.png TBD
---
# Using Vue in VS Code

[Vue](https://facebook.github.io/react/) is a popular JavaScript library  for building web application user interfaces. The Visual Studio Code editor supports Vue.js IntelliSense and code navigation out of the box. TBD

![welcome to react](images/vuejs/welcome-to-vue.png)

## Welcome to Vue

We'll be using the [Vue CLI](https://cli.vuejs.org/) for this tutorial. To install and use the Vue CLI as well as run the Vue application server, you'll need the [Node.js](https://nodejs.org/) JavaScript runtime and [npm](https://www.npmjs.com/) (the Node.js package manager) installed. npm is included with Node.js which you can install from [here](https://nodejs.org/en/download/).

>**Tip**: To test that you have Node.js and npm correctly installed on your machine, you can type `node --version` and `npm --version`.

To install the `vue/cli` , in a terminal or command prompt type:

```bash
npm install -g @vue/cli
```

This may take a few minutes to install. You can now create a new Vue application by typing:

```bash
vue create my-app
```

TBD better to user vue init webpack? needs a second install

where `my-app` is the name of the folder for your application. You will be prompted to select a preset and you can keep the default (babel, eslint). It may take a few minutes to create the Vue application and install its dependencies.

Let's quickly run our Vue application by navigating to the new folder and typing `npm start` to start the web server and open the application in a browser:

```bash
cd my-app
npm run serve
```

You should see "Welcome to your Vue.js App" on `http://localhost:8080` in your browser. You can press `kbstyle(Ctrl+C)` to stop the `vue-cli-service` server.

To open your Vue application in VS Code, from a terminal (or command prompt), navigate to the `my-app` folder and type `code .`:

```bash
cd my-app
code .
```

VS Code will launch and display your Vue application in the File Explorer.

### Vetur extension

Now expand the `src` folder and select the `App.vue` file. You'll notice that VS Code doesn't show any syntax highlighting and it treats the file as **Plain Text** as you can see in the lower right Status Bar. You'll also see a notification recommending the [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extension for the `.vue` file type.

![vetur extension recommendation](images/vuejs/vetur-extension-recommendation.png)

The Vetur extension supplies Vue.js language features (syntax highlighting, snippets, formatting) to VS Code.

![vetur extension](images/vuejs/vetur-extension.png)

Install the Vetur extension and reload VS Code when you see the **Reload** button on the extension tile.

Now you should see advanced language features such as syntax highlighting, bracket matching, hover descriptions and more.

![vue language features](images/vuejs/vue-language-features.png)

### Other Vue.js extensions

Vetur is only one of many Vue.js extensions available for VS Code. TBD

### IntelliSense ?? does Vetur provide TBD

As you start typing in `index.js`, you'll see smart suggestions or completions.

![react suggestions](images/reactjs/suggestions.png)

After you select a suggestion and type `.`, you see the types and methods on the object through [IntelliSense](/docs/editor/intellisense.md).

![react intellisense](images/reactjs/intellisense.png)

VS Code uses the TypeScript language service for its JavaScript code intelligence and it has a feature called [Automatic Type Acquisition](/docs/languages/javascript.md#automatic-type-acquisition) (ATA). ATA pulls down the npm Type Declaration files (`*.d.ts`) for the npm modules referenced in the `package.json`.

If you select a method, you'll also get parameter help:

![react parameter help](images/reactjs/parameter-help.png)

### Go to Definition, Peek definition TBD seems to work

Through the TypeScript language service, VS Code can also provide type definition information in the editor through **Go to Definition** (`kb(editor.action.gotodeclaration)`) or **Peek Definition** (`kb(editor.action.peekImplementation)`). Put the cursor over the `App`, right click and select **Peek Definition**. A [Peek window](/docs/editor/editingevolved.md#peek) will open showing the `App` definition from `App.js`.

![react peek definition](images/reactjs/peek-definition.png) TBD

Press `kbstyle(Escape)` to close the Peek window.

## Hello World!

TBD hot update does seem to work

Let's update the sample application to "Hello World!". In `App.vue` replace the `HelloWorld msg` text with "Hello World!".

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Hello World!"/>
  </div>
</template>
```

Once you save the `App.vue` file, rebuild and restart the server with `npm run serve` and you'll see "Hello World!".

>**Tip**: VS Code supports Auto Save, which by default saves your files after a delay. Check the **Auto Save** option in the **File** menu to turn on Auto Save or directly configure the `files.autoSave` user [setting](/docs/getstarted/settings.md).

![hello world](images/vuejs/hello-world.png)

## Debugging Vue

To debug the client side Vue code, we'll need to install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

>Note: This tutorial assumes you have the Chrome browser installed. The builders of the Debugger for Chrome extension also have versions for the [Safari on iOS](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-ios-web) and [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) browsers.

Open the Extensions view (`kb(workbench.view.extensions)`) and type 'chrome` in the search box. You'll see several extensions which reference Chrome.

![debugger for chrome](images/vuejs/debugger-for-chrome.png)

Press the **Install** button for **Debugger for Chrome**. The button will change to **Installing** then, after completing the installation, it will change to **Reload**. Press **Reload** to restart VS Code and activate the extension.

### Set a breakpoint

To set a breakpoint in `App.vue`, click on the gutter to the left of the line numbers. This will set a breakpoint which will be visible as a red circle.

![set a breakpoint](images/vuejs/breakpoint.png)

### Configure the Chrome debugger

We need to initially configure the [debugger](/docs/editor/debugging.md). To do so, go to the Debug view (`kb(workbench.view.debug)`) and click on gear button to create a `launch.json` debugger configuration file. Choose **Chrome** from the **Select Environment** dropdown. This will create a `launch.json` file in a new `.vscode` folder in your project which includes a configuration to launch the website.

We need to make one change for our example: change your `webroot` to `${workspaceFolder}/src`. Your `launch.json` should look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}/src"
        }
    ]
}
```

Ensure that your development server is running ("npm run serve"). Then press `kb(workbench.action.debug.start)` or the green arrow to launch the debugger and open a new browser instance. The source code where the breakpoint is set runs on startup before the debugger was attached so we won't hit the breakpoint until we refresh the web page. Refresh the page and you should hit your breakpoint.

![hit breakpoint](images/reactjs/hit-breakpoint.png) TBD

You can step through your source code (`kb(workbench.action.debug.stepOver)`), inspect variables such as `element`, and see the call stack of the client side React application.

![debug variable](images/reactjs/debug-variable.png) TBD

The **Debugger for Chrome** extension README has lots of information on other configurations, working with sourcemaps, and troubleshooting. You can review it directly within VS Code from the **Extensions** view by clicking on the extension item and opening the **Details** view.

![debugger for chrome readme](images/reactjs/chrome-debugger-readme.png)

TBD need to talk about vue-devtools since it is in the output panel TBD

### Live editing and debugging

If you are using [webpack](https://webpack.js.org/) together with your React app, you can have a more efficient workflow by taking advantage of webpack's HMR mechanism which enables you to have live editing and debugging directly from VS Code. You can learn more in this [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f) blog post.

## Linting

Linters analyze your source code and can warn you about potential problems before you run your application. The vue-cli-service language service has syntax error checking support by default which you can see in action in the **Problems** panel (**View** > **Problems** `kb(workbench.actions.view.problems)`).

Try making a small error in your Vue source code and you'll see a red squiggle and an error in the **Problems** panel.

![javascript error](images/reactjs/js-error.png)

## Popular Starter Kits

In this tutorial, we used the `create-react-app` generator to create a simple Vue application. There are lots of great samples and starter kits available to help build your first Vue application.

### VuePack

### Veturpack

https://vuejs.github.io/vetur/

### VS Code React Sample

This is a [sample](https://github.com/Microsoft/vscode-react-sample) React application used for a [demo](https://channel9.msdn.com/events/Build/2017/T6078) at this year's //Build conference. The sample creates a simple TODO application and includes the source code for a Node.js [Express](https://expressjs.com/) server. It also shows how to use the [Babel](https://babeljs.io) ES6 transpiler and then use [webpack](https://webpack.js.org/) to bundle the site assets.

## Common Questions

### Can I get IntelliSense within declarative JSX?

Yes. For example, if you open the `create-react-app` project's `App.js` file, you can see IntelliSense within the React JSX in the `render()` method.

![JSX IntelliSense](images/reactjs/jsx-intellisense.png)
