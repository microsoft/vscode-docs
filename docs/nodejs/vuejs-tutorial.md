---
Order: 8
Area: nodejs
TOCTitle: Vue Tutorial
ContentId: 85ce0bcc-d2b8-4b7c-b744-5eddce9a8d00
PageTitle: Vue JavaScript Tutorial in Visual Studio Code
DateApproved: 9/1/2022
MetaDescription: Vue JavaScript tutorial showing IntelliSense, debugging, and code navigation support in the Visual Studio Code editor.
---
# Using Vue in Visual Studio Code

[Vue.js](https://vuejs.org/) is a popular JavaScript library for building web application user interfaces and  Visual Studio Code has built-in support for the Vue.js building blocks of [HTML](https://code.visualstudio.com/docs/languages/html), [CSS](https://code.visualstudio.com/docs/languages/css), and [JavaScript](https://code.visualstudio.com/docs/languages/javascript). For a richer Vue.js development environment, you can install the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension which supports Vue.js IntelliSense, formatting, and more.

---

![welcome to vue](./images/vuejs/welcome-to-vue.png)

---

## Welcome to Vue

We'll be using the [official Vue scaffolding tool](https://vuejs.org/guide/quick-start.html#with-build-tools) for this tutorial. If you are new to the Vue.js framework, you can find great documentation and tutorials on the [vuejs.org](https://vuejs.org/) website.

To use the scaffolding tool as well as run the Vue application server, you'll need the [Node.js](https://nodejs.org/) JavaScript runtime and [npm](https://www.npmjs.com/) (the Node.js package manager) installed. npm is included with Node.js which you can install from [Node.js downloads](https://nodejs.org/en/download/).

> Tip: To test that you have Node.js and npm correctly installed on your machine, you can type node --version and npm --version.
>

You can now create a new Vue.js application by typing:

```
npm init vue@3
```

You will be prompted with several questions to setup the project. For our purposes you can answer the prompts as follows:

```jsx
Project name: … my-app
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … No
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit testing? … No
✔ Add Cypress for both Unit and End-to-End testing? … No
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … No
```

Let's quickly run our Vue application by navigating to the new folder, installing the dependencies, and typing `npm run dev` to start the web server and open the application in a browser:

```
cd my-app
npm install
npm run dev
```

You should see the Vue.js welcome page that says “You did it!” on [http://localhost:5173/](http://localhost:5173/) in your browser.

![screenshot of vue app up and running](./images/vuejs/vue-boilerplate-running-in-browser.png)

You can press Ctrl+C to stop the dev server.

To open your Vue application in VS Code, from a terminal (or command prompt), navigate to the `my-app` folder and type `code .`:

```
cd my-app
code .
```

VS Code will launch and display your Vue application in the File Explorer.

## Volar extension

Now expand the `src` folder and select the `App.vue` file. You'll notice that VS Code doesn't show any syntax highlighting and it treats the file as **Plain Text** as you can see in the lower right Status Bar. You’ll also see a notification recommending you install a couple extensions.

![Volar extension recommended](./images/vuejs/volar-recommended.png)

The Volar extension supplies Vue.js language features (syntax highlighting, IntelliSense, formatting) to VS Code. The TypeScript Vue Plugin is not necessary for this tutorial.

![Volar extension](./images/vuejs/volar-extension.png)

From the notification, press **Install** to download and install the Volar extension.

Now you should see that `.vue` is a recognized file type for the Vue language and you have language features such as syntax highlighting, bracket matching, and hover descriptions.

![Volar syntax highlighting](./images/vuejs/syntax-highlighting.png)

You can learn more about Volar [with this FREE video lesson from Vue School](https://vueschool.io/lessons/volar-the-official-language-feature-extension-for-vs-code?friend=vscode).

## IntelliSense

As you start typing in `App.vue`, you'll see smart suggestions or completions both for HTML and CSS but also for Vue.js specific items like declarations (`v-bind`, `v-for`) in the Vue `template` section:

![vue directive suggestions](./images/vuejs/directive-suggestions.png)

and some Vue compiler micros in the script setup section:

![vue macro suggestions](./images/vuejs/macro-suggestions.png)

## Hello World

Let's update the sample application to "Hello World!". In `App.vue` replace the HelloWorld component `msg` custom attribute text with "Hello World!".

```
<HelloWorld msg="Hello World" />
```

Once you save the `App.vue` file (⌘S), the page will auto update in the browser via Hot Module Reloading.

> Tip: VS Code supports Auto Save, which by default saves your files after a delay. Check the Auto Save option in the File menu to turn on Auto Save or directly configure the files.autoSave user setting.
>

![page updates with HMR](./images/vuejs/hmr-hello-world.png)

## Linting

Linters analyze your source code and can warn you about potential problems before you run your application. The Vue ESLint plugin ([eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)) checks for Vue.js specific syntax errors which are shown in the editor as red squigglies and are also displayed in the **Problems** panel (**View** > **Problems** ⇧⌘M).

Below you can see an error when the Vue linter detects the use of v-for without a key defined:

![lint with ESLint](./images/vuejs/linting-with-eslint.png)

## Debugging

You can debug client side Vue.js code with the built-in JavaScript debugger. You can learn more about debugging Vue.js apps with this [FREE video lesson from Vue School](https://vueschool.io/lessons/debugging-vue-apps-in-vs-code?friend=vscode).

Another popular tool for debugging Vue.js is the [vue-devtools](https://github.com/vuejs/vue-devtools) plug-in.

## Other extensions

Volar is only one of many Vue.js extensions available for VS Code. You can search in the Extensions view (⇧⌘X) by typing 'vue'.

![other vue extensions](./images/vuejs/vue-extensions.png)

There are also Extension Packs which bundle extensions that other people have found useful for Vue.js development.