
Visual Studio Code에서 React의 사용
React는 웹 Application UI(user interfaces)를 위해 Facebook에서 개발한 잘알려진 JavaScript library입니다. Visual Studio Code editor는 React.js IntelliSense와 code navigation을 즉시 사용가능하도록 해줍니다.


React 입문
우리는 튜토리얼을 위해 create-react-app generator를 사용할 것입니다. 이 Generator를 설치 및 사용하고 React Application Server를 구동하기 위해서 Node.js JavaScript runtime과 npm (Node.js package manager)이 설치되어져 있어야 합니다. npm이 탑재된 Node.js는 Node.js downloads로부터 다운로드 하실수 있습니다. 

Tip: 당신의 설비에 Node.js 와 npm이 정확히 설치되어 있는지 테스트 하기 위해서, Terminal 또는 Command Prompt에 node --version 와 npm --version를 쳐볼수 있습니다.

Create-react-app generator를 설치하기 위해서 terminal 또는 command prompt에 입력 :

npm install -g create-react-app



인스톨을 위해 몇 분 정도 소요될 것입니다. 이제 입력하는 것으로 새로운 React application을 생성할 수 있습니다.

create-react-app my-app



여기서 my-app은 당신의 Application 폴더 이름입니다. React Application 생성과 dependency들을 설치하기 위해 몇 분 정도 소요될 것입니다.







새폴더로 찾아서 npm start를 입력하는 것으로 웹 서버를 시작하고 브라우저에서 application을 여는 것으로 React application을 빠르게 실행해 봅시다:

cd my-app npm start



당신의 브라우져의 http://localhost:3000에서 "Welcome to React"를 볼 수 있어야 합니다. 우리가 VS Code를 사용하여 application을 보는 동안 웹서버는 Running으로 남겨둡니다. 

VS Code에서 당신의 React application을 열기 위해서 새로운 terminal 또는 command prompt 창을 열고 my-app 폴더를 찾아서 입력합니다:

cd my-app code .

마크다운 미리보기(Markdown Preview)
파일탐색기에서 볼 수 있는 파일 중 하나는 application README.md Markdown 파일입니다.  여기에는 application과 React 에 관한 많은 일반적인 정보를 담고 있습니다. README를 검토하기 좋은 방법은 VS Code 마크다운 미리보기(Markdown Preview)를 사용하는 것입니다. 현재 편집기 그룹(Markdown: Open Preview Ctrl+Shift+V)이나 측면에 새 편집기 그룹(Markdown: Open Preview to the Side Ctrl+K V)에 미리보기를 열수 있습니다. 좋은 포멧팅(formatting), 하이퍼링크(hyperlink) navigation to headers와 코드블럭에서 구문 강조(syntax highlighting)에 대한 정보를 얻을수 있습니다.


구문 강조와 괄호 매칭
이제 src폴더를 확장하고 index.js파일을 선택하십시오. VS Code는 다양한 소스코드 요소에 대한 구문 강조되며, 괄호 위에 커서를 놓으면 일치하는 브라켓이 선택 된다는 것을 알 수 있을 것입니다.


IntelliSense
index.js에 타이핑하기 시작하면 스마트 제안이나 완성을 볼 수 있습니다.


제안을 선택하고 .을 입력한 후에, IntelliSense를 통해 오브젝트(Object)의 타입(Type)과 메소드(Method)를 볼 수 있습니다. 


VS Code는 JavaScript code intelligence와 Automatic Type Acquisition (ATA)라고 불리는 기능을 가지는 TypeScript language service를 사용합니다. ATA는 package.json에서 참조하는 npm 모듈에 대한 npm 유형 선언 파일(*.d.ts)을 가져 옵니다.

만약 한 method를 선택하면 parameter 도움말을 얻을 수 있습니다:


Go to Definition, Peek definition
TypeScript 언어 서비스를 통해서, VS Code는 editor의 Go to Definition (F12)이나 Peek Definition (Alt+F12)을 통해서 Type 정의(definition) 정보 또한 제공할 수 있습니다. 커서를 App위에 놓고, 우 클릭을 하고 Peek Definition을 선택합니다.  App.js의 App 정의를 보여주는 Peek window가 열릴 것입니다.


Escape키를 눌러 Peek 창을 닫습니다.

Hello World!
Let's update the sample application to "Hello World!". Add the link to declare a new H1 header and replace the <App /> tag in ReactDOM.render with element.

import React from 'react'; import ReactDOM from 'react-dom'; import App from './App'; import registerServiceWorker from './registerServiceWorker'; import './index.css'; var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!'); ReactDOM.render(element, document.getElementById('root')); registerServiceWorker();

Once you save the index.js file, the running instance of the server will update the web page and you'll see "Hello World!".

Tip: VS Code supports Auto Save, which by default saves your files after a delay. Check the Auto Save option in the File menu to turn on Auto Save or directly configure the files.autoSave user setting.


Debugging React
To debug the client side React code, we'll need to install the Debugger for Chrome extension.

Note: This tutorial assumes you have the Chrome browser installed. Microsoft also publishes a version of this extension for their Edge browser.

Open the Extensions view (Ctrl+Shift+X) and type 'chrome' in the search box. You'll see several extensions which reference Chrome.


Press the Install button for Debugger for Chrome.

Set a breakpoint
To set a breakpoint in index.js, click on the gutter to the left of the line numbers. This will set a breakpoint which will be visible as a red circle.


Configure the Chrome debugger
We need to initially configure the debugger. To do so, go to the Debug view (Ctrl+Shift+D) and click on the gear button to create a launch.json debugger configuration file. Choose Chrome from the Select Environment drop-down list. This will create a launch.json file in a new .vscode folder in your project which includes a configuration to launch the website.

We need to make one change for our example: change the port of the url from 8080 to 3000. Your launch.json should look like this:

{ "version": "0.2.0", "configurations": [ { "type": "chrome", "request": "launch", "name": "Launch Chrome against localhost", "url": "http://localhost:3000", "webRoot": "${workspaceFolder}" } ] }

Ensure that your development server is running ("npm start"). Then press F5 or the green arrow to launch the debugger and open a new browser instance. The source code where the breakpoint is set runs on startup before the debugger was attached so we won't hit the breakpoint until we refresh the web page. Refresh the page and you should hit your breakpoint.


You can step through your source code (F10), inspect variables such as element, and see the call stack of the client side React application.


The Debugger for Chrome extension README has lots of information on other configurations, working with sourcemaps, and troubleshooting. You can review it directly within VS Code from the Extensions view by clicking on the extension item and opening the Details view.


Live editing and debugging
If you are using webpack together with your React app, you can have a more efficient workflow by taking advantage of webpack's HMR mechanism which enables you to have live editing and debugging directly from VS Code. You can learn more in this Live edit and debug your React apps directly from VS Code blog post and the webpack Hot Module Replacement documentation.

Linting
Linters analyze your source code and can warn you about potential problems before you run your application. The JavaScript language services included with VS Code has syntax error checking support by default which you can see in action in the Problems panel (View > Problems Ctrl+Shift+M).

Try making a small error in your React source code and you'll see a red squiggle and an error in the Problems panel.


Linters can provide more sophisticated analysis, enforcing coding conventions and detecting anti-patterns. A popular JavaScript linter is ESLint. ESLint, when combined with the ESLint VS Code extension, provides a great in-product linting experience.

First, install the ESLint command-line tool:

npm install -g eslint

Then install the ESLint extension by going to the Extensions view and typing 'eslint'.


Once the ESLint extension is installed and VS Code reloaded, you'll want to create an ESLint configuration file .eslintrc.json. You can create one using the extension's ESLint: Create ESLint configuration command from the Command Palette (Ctrl+Shift+P).


The command will create a .eslintrc.json file in your project root:

{ "env": { "browser": true, "commonjs": true, "es6": true, "node": true }, "parserOptions": { "ecmaFeatures": { "jsx": true }, "sourceType": "module" }, "rules": { "no-const-assign": "warn", "no-this-before-super": "warn", "no-undef": "warn", "no-unreachable": "warn", "no-unused-vars": "warn", "constructor-super": "warn", "valid-typeof": "warn" } }

ESLint will now analyze open files and shows a warning in index.js about 'App' being defined but never used.


You can modify the ESLint rules and the ESLint extension provides IntelliSense in .eslintrc.json.


Let's add an error rule for extra semi-colons:

"rules": { "no-const-assign": "warn", "no-this-before-super": "warn", "no-undef": "warn", "no-unreachable": "warn", "no-unused-vars": "warn", "constructor-super": "warn", "valid-typeof": "warn", "no-extra-semi":"error" }

Now when you mistakenly have multiple semicolons on a line, you'll see an error (red squiggle) in the editor and error entry in the Problems panel.


Popular Starter Kits
In this tutorial, we used the create-react-app generator to create a simple React application. There are lots of great samples and starter kits available to help build your first React application.

VS Code React Sample
This is a sample React application used for a demo at this year's //Build conference. The sample creates a simple TODO application and includes the source code for a Node.js Express server. It also shows how to use the Babel ES6 transpiler and then use webpack to bundle the site assets.

MERN Starter
If you'd like to see a full MERN (MongoDB, Express, React, Node.js) stack example, look at the MERN Starter. You'll need to install and start MongoDB but you'll quickly have a MERN application running. There is helpful VS Code-specific documentation at vscode-recipes which details setting up Node.js server debugging. VS Code also has great MongoDB support through the Azure Cosmos DB extension.

TypeScript React
If you're curious about TypeScript and React, you can also create a TypeScript version of the create-react-app application. See the details at TypeScript-React-Starter on the TypeScript Quick Start site.

Angular
Angular is another popular web framework. If you'd like to see an example of Angular working with VS Code, check out the Chrome Debugging with Angular CLI recipe. It will walk you through creating an Angular application and configuring the launch.json file for the Debugger for Chrome extension.

Common questions
Can I get IntelliSense within declarative JSX?
Yes. For example, if you open the create-react-app project's App.js file, you can see IntelliSense within the React JSX in the render() method.




이 페이지는 아래 페이지의 내용을 번역한 것으로 일부 번역에 오류가 있을 수 있습니다. 댓글을 달아 주시면 번역에 참고하도록 하겠습니다.
