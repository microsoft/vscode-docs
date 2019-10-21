---
Order: 5
Area: nodejs
TOCTitle: React Tutorial
ContentId: 2dd2eeff-2eb3-4a0c-a59d-ea9a0b10c468
PageTitle: React JavaScript Tutorial in Visual Studio Code
DateApproved: 10/9/2019
MetaDescription: React JavaScript tutorial showing IntelliSense, debugging, and code navigation support in the Visual Studio Code editor.
MetaSocialImage: /assets/images/nodejs_javascript_vscode.png
---
# Visual Studio Code에서 React의 사용

[React](https://facebook.github.io/react/) 는 웹 Application UI(user interfaces)를 위해 Facebook에서 개발한 잘알려진 JavaScript library입니다. Visual Studio Code editor는 React.js IntelliSense와 code navigation을 즉시 사용가능하도록 해줍니다.

![welcome to react](images/reactjs/welcome-to-react.png)

## Welcome to React

우리는 튜토리얼을 위해 `create-react-app` [generator](https://facebook.github.io/react/docs/installation.html#creating-a-new-application) 를 사용할 것입니다. 이 Generator를 설치 및 사용하고 React Application Server를 구동하기 위해서 [Node.js](https://nodejs.org/) JavaScript runtime과 [npm](https://www.npmjs.com/) (Node.js package manager) 이 설치되어져 있어야 합니다. npm이 탑재된 Node.js는 [Node.js downloads](https://nodejs.org/en/download/)로부터 다운로드 하실수 있습니다.

>**Tip**: 당신의 설비에 Node.js 와 npm이 정확히 설치되어 있는지 테스트 하기 위해서, Terminal 또는 Command Prompt에 `node --version`과 `npm --version`를 쳐볼수 있습니다.

`create-react-app`를 설치하기 위해서 terminal 또는 command prompt에 입력하십시오.:

```bash
npm install -g create-react-app
```

인스톨을 위해 몇 분 정도 소요될 것입니다. 이제 입력하는 것으로 새로운 React application을 생성할 수 있습니다.:

```bash
create-react-app my-app
```

여기서 `my-app`은 당신의 Application 폴더 이름입니다. React Application 생성과 dependency들을 설치하기 위해 몇 분 정도 소요될 것입니다.

새폴더로 찾아서 `npm start` 를 입력하는 것으로 웹 서버를 시작하고 브라우저에서 application을 여는 것으로 React application을 빠르게 실행해 봅시다.:

```bash
cd my-app
npm start
```

당신의 브라우져의 [http://localhost:3000](http://localhost:3000) 에서 "Welcome to React"를 볼 수 있어야 합니다. 우리가 VS Code를 사용하여 application을 보는 동안 웹서버는 Running으로 남겨둡니다. 

VS Code에서 당신의 React application을 열기 위해서 새로운 terminal 또는 command prompt 창을 열고 `my-app` 폴더를 찾아서 `code .`를 입력합니다.:

```bash
cd my-app
code .
```

### 마크다운 미리보기(Markdown Preview)

파일탐색기에서 볼 수 있는 파일 중 하나는 application `README.md` Markdown 파일입니다.  여기에는 application과 React 에 관한 많은 일반적인 정보를 담고 있습니다. README를 검토하기 좋은 방법은 VS Code 마크다운 미리보기[Markdown Preview](/docs/languages/markdown.md#markdown-preview)를 사용하는 것입니다. 현재 편집기 그룹(**Markdown: Open Preview** `kb(markdown.showPreview)`) 이나 측면에 새 편집기 그룹 (**Markdown: Open Preview to the Side** `kb(markdown.showPreviewToSide)`)에 미리보기를 열수 있습니다. 좋은 포멧팅(formatting), 하이퍼링크(hyperlink) navigation to headers와 코드블럭에서 구문 강조(syntax highlighting)에 대한 정보를 얻을수 있습니다.

![README markdown preview](images/reactjs/markdown-preview.png)

### Syntax highlighting and bracket matching

Now expand the `src` folder and select the `index.js` file. You'll notice that VS Code has syntax highlighting for the various source code elements and, if you put the cursor on a parenthesis, the matching bracket is also selected.

![react bracket matching](images/reactjs/bracket-matching.png)

### IntelliSense

As you start typing in `index.js`, you'll see smart suggestions or completions.

![react suggestions](images/reactjs/suggestions.png)

After you select a suggestion and type `.`, you see the types and methods on the object through [IntelliSense](/docs/editor/intellisense.md).

![react intellisense](images/reactjs/intellisense.png)

VS Code uses the TypeScript language service for its JavaScript code intelligence and it has a feature called [Automatic Type Acquisition](/docs/languages/javascript.md#automatic-type-acquisition) (ATA). ATA pulls down the npm Type Declaration files (`*.d.ts`) for the npm modules referenced in the `package.json`.

If you select a method, you'll also get parameter help:

![react parameter help](images/reactjs/parameter-help.png)

### Go to Definition, Peek definition

Through the TypeScript language service, VS Code can also provide type definition information in the editor through **Go to Definition** (`kb(editor.action.revealDefinition)`) or **Peek Definition** (`kb(editor.action.peekDefinition)`). Put the cursor over the `App`, right click and select **Peek Definition**. A [Peek window](/docs/editor/editingevolved.md#peek) will open showing the `App` definition from `App.js`.

![react peek definition](images/reactjs/peek-definition.png)

Press `kbstyle(Escape)` to close the Peek window.

## Hello World!

Let's update the sample application to "Hello World!". Add the link to declare a new H1 header and replace the `<App />` tag in `ReactDOM.render` with `element`.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();
```

Once you save the `index.js` file, the running instance of the server will update the web page and you'll see "Hello World!".

>**Tip**: VS Code supports Auto Save, which by default saves your files after a delay. Check the **Auto Save** option in the **File** menu to turn on Auto Save or directly configure the `files.autoSave` user [setting](/docs/getstarted/settings.md).

![hello world](images/reactjs/hello-world.png)

## Debugging React

To debug the client side React code, we'll need to install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

>Note: This tutorial assumes you have the Chrome browser installed. Microsoft also publishes a version of this extension for their [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) browser.

Open the Extensions view (`kb(workbench.view.extensions)`) and type 'chrome' in the search box. You'll see several extensions which reference Chrome.

![debugger for chrome](images/reactjs/debugger-for-chrome.png)

Press the **Install** button for **Debugger for Chrome**.

### Set a breakpoint

To set a breakpoint in `index.js`, click on the gutter to the left of the line numbers. This will set a breakpoint which will be visible as a red circle.

![set a breakpoint](images/reactjs/breakpoint.png)

### Configure the Chrome debugger

We need to initially configure the [debugger](/docs/editor/debugging.md). To do so, go to the Debug view (`kb(workbench.view.debug)`) and click on the gear button to create a `launch.json` debugger configuration file. Choose **Chrome** from the **Select Environment** drop-down list. This will create a `launch.json` file in a new `.vscode` folder in your project which includes a configuration to launch the website.

We need to make one change for our example: change the port of the `url` from `8080` to `3000`. Your `launch.json` should look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Ensure that your development server is running ("npm start"). Then press `kb(workbench.action.debug.start)` or the green arrow to launch the debugger and open a new browser instance. The source code where the breakpoint is set runs on startup before the debugger was attached so we won't hit the breakpoint until we refresh the web page. Refresh the page and you should hit your breakpoint.

![hit breakpoint](images/reactjs/hit-breakpoint.png)

You can step through your source code (`kb(workbench.action.debug.stepOver)`), inspect variables such as `element`, and see the call stack of the client side React application.

![debug variable](images/reactjs/debug-variable.png)

The **Debugger for Chrome** extension README has lots of information on other configurations, working with sourcemaps, and troubleshooting. You can review it directly within VS Code from the **Extensions** view by clicking on the extension item and opening the **Details** view.

![debugger for chrome readme](images/reactjs/chrome-debugger-readme.png)

### Live editing and debugging

If you are using [webpack](https://webpack.js.org/) together with your React app, you can have a more efficient workflow by taking advantage of webpack's HMR mechanism which enables you to have live editing and debugging directly from VS Code. You can learn more in this [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f) blog post and the [webpack Hot Module Replacement documentation](https://webpack.js.org/concepts/hot-module-replacement/).

## Linting

Linters analyze your source code and can warn you about potential problems before you run your application. The JavaScript language services included with VS Code has syntax error checking support by default which you can see in action in the **Problems** panel (**View** > **Problems** `kb(workbench.actions.view.problems)`).

Try making a small error in your React source code and you'll see a red squiggle and an error in the **Problems** panel.

![javascript error](images/reactjs/js-error.png)

Linters can provide more sophisticated analysis, enforcing coding conventions and detecting anti-patterns. A popular JavaScript linter is [ESLint](https://eslint.org/). ESLint, when combined with the ESLint VS Code [extension](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint), provides a great in-product linting experience.

First, install the ESLint command-line tool:

```bash
npm install -g eslint
```

Then install the ESLint extension by going to the **Extensions** view and typing 'eslint'.

![ESLint extension](images/reactjs/eslint-extension.png)

Once the ESLint extension is installed and VS Code reloaded, you'll want to create an ESLint configuration file `.eslintrc.json`. You can create one using the extension's **ESLint: Create ESLint configuration** command from the **Command Palette** (`kb(workbench.action.showCommands)`).

![create eslintrc](images/reactjs/create-eslintrc.png)

The command will create a `.eslintrc.json` file in your project root:

```json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
        "valid-typeof": "warn"
    }
}
```

ESLint will now analyze open files and shows a warning in `index.js` about 'App' being defined but never used.

![App is unused](images/reactjs/app-is-unused.png)

You can modify the ESLint [rules](https://eslint.org/docs/rules/) and the ESLint extension provides IntelliSense in `.eslintrc.json`.

![eslintrc IntelliSense](images/reactjs/eslintrc-intellisense.png)

Let's add an error rule for extra semi-colons:

```json
 "rules": {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
        "valid-typeof": "warn",
        "no-extra-semi":"error"
    }
```

Now when you mistakenly have multiple semicolons on a line, you'll see an error (red squiggle) in the editor and error entry in the **Problems** panel.

![extra semicolon error](images/reactjs/extra-semi-error.png)

## Popular Starter Kits

In this tutorial, we used the `create-react-app` generator to create a simple React application. There are lots of great samples and starter kits available to help build your first React application.

### VS Code React Sample

This is a [sample](https://github.com/Microsoft/vscode-react-sample) React application used for a [demo](https://channel9.msdn.com/events/Build/2017/T6078) at this year's //Build conference. The sample creates a simple TODO application and includes the source code for a Node.js [Express](https://expressjs.com/) server. It also shows how to use the [Babel](https://babeljs.io) ES6 transpiler and then use [webpack](https://webpack.js.org/) to bundle the site assets.

### MERN Starter

If you'd like to see a full MERN (MongoDB, Express, React, Node.js) stack example, look at the [MERN Starter](http://mern.io/). You'll need to install and start [MongoDB](https://docs.mongodb.com/v3.0/installation/) but you'll quickly have a MERN application running. There is helpful VS Code-specific documentation at [vscode-recipes](https://github.com/Microsoft/vscode-recipes/tree/master/MERN-Starter) which details setting up Node.js server debugging. VS Code also has great [MongoDB support](/docs/azure/mongodb.md) through the [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension.

### TypeScript React

If you're curious about TypeScript and React, you can also create a TypeScript version of the `create-react-app` application. See the details at [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter) on the [TypeScript Quick Start](https://www.typescriptlang.org/samples/index.html) site.

### Angular

[Angular](https://angular.io/) is another popular web framework. If you'd like to see an example of Angular working with VS Code, check out the [Chrome Debugging with Angular CLI](https://github.com/Microsoft/vscode-recipes/tree/master/Angular-CLI) recipe. It will walk you through creating an Angular application and configuring the `launch.json` file for the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.

## Common questions

### Can I get IntelliSense within declarative JSX?

Yes. For example, if you open the `create-react-app` project's `App.js` file, you can see IntelliSense within the React JSX in the `render()` method.

![JSX IntelliSense](images/reactjs/jsx-intellisense.png)
