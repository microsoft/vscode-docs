---
Order: 4
Area: educators
TOCTitle: Node.js and JavaScript
ContentId: 0a44fb8f-961c-4524-8fa9-c4c98618a9b5
PageTitle: Node.js and JavaScript in Visual Studio Code
DateApproved: 3/2/2021
MetaDescription: Node.js and JavaScript in Visual Studio Code
---

# Node.js and JavaScript in Visual Studio Code

Visual Studio Code is the most popular free code editor among JavaScript developers around the world according to the [State of JS 2020 survey](https://2020.stateofjs.com/other-tools/#text_editors). It is easily customizable and has a rich ecosystem of extensions to help your students learn Node.js and JavaScript.

Below is a case study of a Computer Science educator in Thailand and includes his recommendations for VS Code extensions and settings in the classroom.

## Intro to Web Development at Naresuan University

[Charles Allen](https://th.linkedin.com/in/ajahncharles) is a lecturer at [Naresuan University](https://www.nu.ac.th) in Thailand, where he teaches several Computer Science and Business courses. He teaches a project-based Web Development course, where students build a TypeScript app using the [Vue.js](https://vuejs.org) framework and [Firebase](https://firebase.google.com) platform.

### Why Visual Studio Code?

Charles has been using Visual Studio Code to teach for the past four years. In his own words:

> "The more realistic the learning environment, the more comprehensive the education. I am not just teaching code; I'm also teaching the tools, tactics, and teamwork my students will need to start building for themselves. VS Code is the first choice of web professionals, so it’s the first choice for my class!"

### Portable setup

VS Code is great for Charles because it has a [portable mode](/docs/editor/portable.md), which stores all of VS Code's application data in one location. He prepares a single "image", [available on GitHub](https://github.com/AjahnCharles/lab-image-win), containing his favorite extensions, settings, and cached versions of some libraries. This customized folder structure can be quickly copied to every lab machine without needing to run installers, download additional files, or manually configure each machine.

## Classroom extensions

The extensions he likes to have installed:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - His favorite! Auto-formatting keeps students focused on program logic and linting helps them quickly find, understand, and fix errors in their JavaScript code.
* [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) - Longer AI-driven code-snippets helps non-native English speakers avoid code-breaking typos and reduces the impact of slow typing.
* [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - Share API designs as `.http` files and simplify manual API testing within VS Code.
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Vue.js framework support for syntax highlighting, code completion, and more! This helps students focus on their Vue.js code rather than getting stuck solving syntactical errors.

These extensions are also part of the Node.js and JavaScript Education Extension Pack below!

## Classroom settings

And here are his recommended settings, which help his students have consistent formatting of their code to make his life reviewing and grading their work that much easier. You can use his settings by editing the [settings file](/docs/getstarted/settings.md) and pasting these in:

```json
{
    // Formatting and linting
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true, // hero!
    "editor.tabCompletion": "on",
    "editor.tabSize": 2,
    "eslint.format.enable": true,
    "eslint.workingDirectories": [{ "mode": "auto" }], // important for mono-repo projects
    "files.autoSave": "onFocusChange", // hero
    "prettier.endOfLine": "auto", // cross-platform
    "prettier.semi": false, // align with ESLint Standard
    "prettier.singleQuote": true, // align with ESLint Standard
    "prettier.trailingComma": "none", // align with ESLint Standard
    "tabnine.experimentalAutoImports": true,

    // Language-Specific
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false, // align with ESLint Standard
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.format.insertSpaceBeforeFunctionParenthesis": false, // align with ESLint Standard
    "typescript.updateImportsOnFileMove.enabled": "always",
    "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint" // preconfig ESLint
    },
    "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint" // preconfig ESLint
    },
    "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
    },
    "vetur.format.options.tabSize": 2,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatter.html": "prettier",
    "vetur.format.defaultFormatter.js": "vscode-typescript", // for consistency with TS option
    "vetur.format.defaultFormatter.ts": "vscode-typescript"
}
```

Thank you Charles for sharing your experiences and favorite VS Code settings! If you're interested in using VS Code for your Node.js web development classes, you can get started with the [Node.js and JavaScript Education Extension Pack](https://marketplace.visualstudio.com/items?itemName=tanhakabir.node-js-education-extension-pack) that contains Charles' favorite extensions, extensions for real-time collaboration, and more!

## Node.js and JavaScript Extension Pack

Unsure which extensions to recommend to your students? You can point your students to the [Node.js and JavaScript Education Extension Pack](https://marketplace.visualstudio.com/items?itemName=tanhakabir.node-js-education-extension-pack) that contains essential and helpful extensions for the classroom. You can download the extension pack from the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode):

[![Node.js and JavaScript Education Extension Pack](images/nodejs/node-js-extension-pack.png)](https://marketplace.visualstudio.com/items?itemName=tanhakabir.node-js-education-extension-pack)

The extension pack contains:

* [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) and [npm IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) for verifying status of npm packages(installed or not) and auto-completions.
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) for basic JavaScript, TypeScript, and Vue.js functionality like auto-completions, linting, error highlighting before compiling.
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) to enable real-time collaboration.
* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) to work on remote projects (for example, to access lab machines) through SSH with full VS Code functionality.
* [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to run REST Calls within VS Code for quick manual testing.
* [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) to run snippets (selected code) and single files of any code with a single click.
* and more!

## Free lesson: Build a Node.js app for Azure Cosmos DB

Build a database app to store and query data in Azure Cosmos DB by using Visual Studio Code and Node.js. View full details of the lessons at [Build a Node.js app for Azure Cosmos DB](https://learn.microsoft.com/training/modules/build-node-cosmos-app-vscode).

[![Build a Node.js app for Azure Cosmos DB](images/nodejs/learn-build-node-app.png)](https://learn.microsoft.com/training/modules/build-node-cosmos-app-vscode)
