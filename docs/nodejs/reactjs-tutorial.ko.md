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

### 구문 강조와 괄호 매칭

이제 `src`폴더를 확장하고 `index.js`파일을 선택하십시오. VS Code는 다양한 소스코드 요소에 대한 구문 강조되며, 괄호 위에 커서를 놓으면 일치하는 브라켓이 선택 된다는 것을 알 수 있을 것입니다. 

![react bracket matching](images/reactjs/bracket-matching.png)

### IntelliSense

`index.js`에 타이핑하기 시작하면 스마트 제안이나 완성을 볼 수 있습니다.

![react suggestions](images/reactjs/suggestions.png)

제안을 선택하고 `.`을 입력한 후에, [IntelliSense](/docs/editor/intellisense.md)를 통해 오브젝트(Object)의 타입(Type)과 메소드(Method)를 볼 수 있습니다.

![react intellisense](images/reactjs/intellisense.png)

VS Code는 JavaScript code intelligence와 [Automatic Type Acquisition](/docs/languages/javascript.md#automatic-type-acquisition) (ATA)라고 불리는 기능을 가지는 TypeScript language service를 사용합니다. ATA는 `package.json`에서 참조하는 npm 모듈에 대한 npm 유형 선언 파일(`*.d.ts`)을 가져 옵니다.

만약 한 method를 선택하면 parameter 도움말을 얻을 수 있습니다:

![react parameter help](images/reactjs/parameter-help.png)

### Go to Definition, Peek definition

VS Code는 TypeScript 언어 서비스를 통해 **Go to Definition** (`kb(editor.action.revealDefinition)`)나**Peek Definition** (`kb(editor.action.peekDefinition)`)로 이동함으로써 에디터에서 타입 정의 정보를 제공할 수 있습니다. `App` 위에 커서를 놓고 마우스 오른쪽 버튼을 클릭한 후 **Peek Definition**을 선택하십시오. 
app.js의 app 정의를 보여주는 [Peek window](/docs/editor/editingevolved.md#peek)가 열립니다.

![react peek definition](images/reactjs/peek-definition.png)

Peek window를 닫기 위해 `kbstyle(Escape)`를 누르세요.

## Hello World!

샘플 프로그램을 "Hello World!"로 업데이트 합시다. 링크를 추가하여 새 H1 헤더를 선언하고 `ReactDOM.render`의 `<App />` 태그를 `element`로 교체하세요.

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

`index.js` 파일을 저장하면 서버의 실행 중인 인스턴스가 웹 페이지를 업데이트하고 "Hello World!"를 볼 수 있습니다.

>**Tip**: VS 코드는 Auto Save를 지원하므로, 기본으로 delay 후에 파일이 저장됩니다.  to  나 . Auto Save를 켜기 위해 **File** menu의 **Auto Save**옵션을 체크하거나 직접 `files.autoSave` user [setting](/docs/getstarted/settings.md)를 구성하세요.

![hello world](images/reactjs/hello-world.png)

## Debugging React

사이드에서 React code를 디버그 하기 위해서 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension이 필요할 것입니다.

>Note: 이 튜토리얼은 당신이 Chrome 브라우저를 설치했다고 가정한다. 마이크로소프트는 또한 그들의 [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) 브라우저를 위해 이 확장 버전을 발행한다.

확장 보기(`kb(workbench.view.extensions)`)를 열고 검색 상자에 '크롬'을 입력하십시오. Chrome을 참조하는 몇 개의 확장자를 보게 될 것이다.

![debugger for chrome](images/reactjs/debugger-for-chrome.png)

**Debugger for Chrome**하기 위해 **Install** button을 누릅니다.

### breakpoint 설정

`index.js`에서 Breakpoint를 설정하기 위해서는, 줄번호의 왼쪽편에 있는 홈통(gutter)를 클릭하세요. 빨간 원형으로 보이게 될 breakpoint를 놓을 것입니다.

![set a breakpoint](images/reactjs/breakpoint.png)

### Chrome debugger 구성

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
