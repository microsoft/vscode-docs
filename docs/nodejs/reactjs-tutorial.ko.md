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

우리는 처음으로 [debugger](/docs/editor/debugging.md)를 구성하는 것이 필요합니다. 그렇게 하기 위해서, Debug view (`kb(workbench.view.debug)`)로 가서 Gear 버튼을 클릭하여 `launch.json`debugger구성 파일을 생성합니다. **Select Environment**의 drop-down 리스트에서 **Chrome**을 선택하십시오. 이것은 당신의 프로젝트의 `.vscode`폴더 안에  웹사이트를 시작하는 구성을 포함하는 새로운 `launch.json`파일을 생성할 것입니다.

우리는 우리의 예제를 위한 한가지 변경이 필요합니다. : `url`의 포트를 `8080`에서 `3000`로 변경하세요. 당신의 `launch.json`는 이렇게 보여질 것입니다 :

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

당신의 개발 서버가 구동중인지 확인하십시오("npm start"). 그리고 나서 `kb(workbench.action.debug.start)`나 녹색 화살표를 눌러 Debugger를 시작하고 새 브라우저 인스턴스를 여십시오. 디버거가 연결되기 전에 시작 시 중단점이 설정된 소스 코드가 실행되어 웹 페이지를 새로 고치기 전까지 중단점에 도달하지 않을 것입니다. 페이지를 새로 고치면 중단점에 도달할 수 있습니다.

![hit breakpoint](images/reactjs/hit-breakpoint.png)

당신은 당신의 소스코드 (`kb(workbench.action.debug.stepOver)`)를 움직여 `element`와 같은 변수들을 검사할 수 있고, client쪽 React 응용프로그램의 call stack을 볼수 있습니다. 

![debug variable](images/reactjs/debug-variable.png)

**Debugger for Chrome** 확장 README는 다른 구성, 소스 맵 작업 및 문제 해결에 대한 많은 정보를 가지고 있습니다. 확장 항목을 클릭하고 **Details**뷰를 여는 것으로 VS Code 내의 **Extensions**에서 직접 검토할 수 있습니다.

![debugger for chrome readme](images/reactjs/chrome-debugger-readme.png)

### 실시간 편집 및 디버깅

만약 당신이 당신의 React app과 함께 [webpack](https://webpack.js.org/)을 사용 중이라면, 당신은 VS Code로부터 실시간 편집 및 디버깅을 직접적으로 당신에게 가능하게 해주는 Webpack의 HMR 메커니즘의 이점을 취함으로서 좀더 효율적인 워크플로우를 가질수 있습니다. 당신은  [Live edit and debug your React apps directly from VS Code](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f) blog post 와 the [webpack Hot Module Replacement documentation](https://webpack.js.org/concepts/hot-module-replacement/)에서 더 많이 배울수 있습니다.

## Linting

Linters는 당신의 소스코드를 분석하고 당신의 프로그램을 구동하기 전에 잠재적인 문제에 관해서 경고할수 있습니다. VS Code에 포함된 JavaScript 언어 서비스는 기본적으로 **Problems** panel (**View** > **Problems** `kb(workbench.actions.view.problems)`)에서 확인 할 수 있는 실행중인 구문 에러(Syntax Error) 확인을 지원하고 있습니다.

당신의 React 소스코드에 작은 오류를 만들어 보면 빨간 물결모양과 **Problems**에서 에러를 볼수 있을 것입니다.

![javascript error](images/reactjs/js-error.png)

Linters는 더욱 복잡한 분석, 코딩 규칙 강제와 안티패턴 탐지 기능을 제공할 수 있습니다. 잘알려진 JavaScript linter는 [ESLint](https://eslint.org/)입니다. ESLint는 ESLint VS Code [extension](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint)와 결합될 때 내재화된 엄청난 Linting 경험을 제공합니다.

처음으로, ESLint ommand-line tool을 설치합니다.:

```bash
npm install -g eslint
```

그리고 나서 **Extensions** view에 가서 'eslint'를 치는 것으로 ESLint extension을 설치합니다. 

![ESLint extension](images/reactjs/eslint-extension.png)

ESLint extension이 설치하고 나서 VS Code를 재시작을 한번 하면, 당신은 ESLint 구성 파일`.eslintrc.json`을 생성하려고 할 것입니다. 당신은 **Command Palette** (`kb(workbench.action.showCommands)`)에서 extension의 **ESLint: Create ESLint configuration** 명령을 사용하여 생성할 수 있습니다.

![create eslintrc](images/reactjs/create-eslintrc.png)

이 명령은 당신의 프로젝트 root에서 `.eslintrc.json`을 생성할 것입니다.:

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

ESLint는 이제 열려 있는 파일을 분석하여 'App'이 정의되었지만 사용되지 않는 것에 대한 경고를 `index.js`에 표시할 것입니다.

![App is unused](images/reactjs/app-is-unused.png)

당신은 ESLint [rules](https://eslint.org/docs/rules/)를 수정할 수 있으며 ESLint extension `.eslintrc.json`에서 IntelliSense를 제공합니다.

![eslintrc IntelliSense](images/reactjs/eslintrc-intellisense.png)

여분의 세미콜론에 대한 오류 규칙을 추가합시다:

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

이제 실수로 여러 개의 세미콜론이 한 줄에 있는 경우 편집기에 오류(빨간색 물결무늬)가 표시되고 **Problems** 패널에 오류 항목이 표시됩니다.

![extra semicolon error](images/reactjs/extra-semi-error.png)

## Popular Starter Kits

본 자습서에서는, 간단한 리액트 어플리케이션을 만들기 위해 `create-react-app`을 이용했습니다. 첫 번째 React 응용 프로그램을 만드는 데 도움이 되는 많은 좋은 샘플과 스타터 키트가 있습니다.


### VS Code React 예제

이것은 올해 //Build 컨퍼런스에서 [demo](https://channel9.msdn.com/events/Build/2017/T6078)에 사용된 [sample](https://github.com/Microsoft/vscode-react-sample) React 애플리케이션입니다. 샘플은 간단한 TODO 애플리케이션을 생성하고 Node.js [Express](https://expressjs.com/) 서버에 대한 소스 코드를 포함합니다. 또한 [Babel](https://babeljs.io) ES6 transfiler를 사용한 다음 [webpack](https://webpack.js.org/)을 사용하여 사이트 자산을 묶는 방법도 보여줍니다.

### MERN Starter

전체 MERN(MongoDB, Express, React, Node.js) 스택 예를 보려면 [MERN Starter](http://mern.io/)를 참조하십시오. [MongoDB](https://docs.mongodb.com/v3.0/installation/)을 설치하고 시작해야 하지만 MERN 응용 프로그램이 빠르게 실행될 것입니다. [vscode-recipes](https://github.com/Microsoft/vscode-recipes/tree/master/MERN-Starter)에는 Node.js 서버 디버깅 설정을 자세히 설명하는 유용한 VS 코드 관련 문서가 있습니다. VS Code 역시 [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) 확장판을 통해 훌륭한 [MongoDB support](/docs/azure/mongodb.md)가 있습니다.

### TypeScript React

TypeScript 및 React에 대해 궁금한 경우, `create-react-app` 응용 프로그램의 TypeScript 버전을 만들 수도 있다. 자세한 내용은 [TypeScript Quick Start](https://www.typescriptlang.org/samples/index.html) 사이트의 [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)에서 확인하십시오.

### Angular

[Angular](https://angular.io/)은 또 다른 인기 있는 웹 프레임워크입니다. VS Code를 사용하는 Angular의 예를 보려면 [Chrome Debugging with Angular CLI](https://github.com/Microsoft/vscode-recipes/tree/master/Angular-CLI) 레시피를 확인하십시오. Angular 응용 프로그램을 만들고  [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 확장을 위한 파일을 구성하는 과정을 안내합니다.


## 일반적인 질문

### JSX선언 내에 IntelliSense를 얻을 수 있나요?

네. 예를들어, `create-react-app` 프로젝트의 `App.js`를 연다면, 당신은  `render()` method에서 React JSX 내의 IntelliSense를 확인할 수 있습니다.

![JSX IntelliSense](images/reactjs/jsx-intellisense.png)
