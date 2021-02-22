---
Order: 4
Area: educators
TOCTitle: Node.js and JavaScript
ContentId: 0a44fb8f-961c-4524-8fa9-c4c98618a9b5
PageTitle: Node.js and JavaScript in Visual Studio Code
DateApproved: 02/17/2021
MetaDescription: Node.js and JavaScript in Visual Studio Code
---

# Node.js and JavaScript in Visual Studio Code
TODO
Visual Studio Code is a free code editor that fully supports Python and useful features such as real-time collaboration. It's highly customizable to support your classroom the way you like to teach.

> "Visual Studio Code is the best balance of authenticity and accessibility... Visual Studio Code doesn't feel 'fake', it's what real software developers use. Plus, Visual Studio Code works on every OS!" - Professor Zachary Dodds from Harvey Mudd College

Read below for recommendations for extensions, settings, and links to free lessons that you can use in your classes.

## Intro to Web Development at Naresuan University

[Charles Allen](https://th.linkedin.com/in/ajahncharles) is a lecturer at [Naresuan University](https://www.nu.ac.th/) in Thailand and teaches several Computer Science and Business courses. He teaches a project-based Web Development course where students build a TypeScript app using the Vue.js framework and Firebase.

### Why Visual Studio Code?

Charles has been using Visual Studio Code to teach for the past 4 years since he inherited the class. In his own words:

> "The more realistic the learning environment, the more comprehensive the education. I am not just teaching code; I'm also teaching the tools, tactics, and teamwork my students will need to start building for themselves. VS Code is the first choice of web professionals, so it’s the first choice for my class!"

In 2019, [StackOverFlow found VS Code to be the most popular editor](https://insights.stackoverflow.com/survey/2019#development-environments-and-tools) amongst their community.

### Portable setup

VS Code is great for Charles because the lab machines on which students work get wiped everyday per school policy. But since VS Code has a [portable mode](/docs/editor/portable), which stores all its app data in one spot to run from a single directory, he can quickly add his configured VS Code to every lab machine. To do this, he gives their IT technician an image (a template for setting up an environment) which has a portable version of VS Code with extensions and settings configured, and an install script for npm and some node libraries.

### Classroom settings

The extensions he likes to have installed:
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - his favorite! for auto-formatting and linting to help his students find and fix errors in their JavaScript code before running their code
* [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) - smarter auto-completions that are AI driven to help his students get full code snippet suggestions
* [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) - for quick manual testing of server calls all within VS Code
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Vue.js framework support for syntax highlighting, code completion suggestions and more

These extensions are also part of the Node.js and JS Education Pack below. TODO


And here are his settings, which you can use by editing the [settings file](/docs/getstarted/settings.md) and pasting these in:

```json
{
    // Environment
    "workbench.startupEditor": "newUntitledFile",

    // Formatting & Linting
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true, // hero!
    "editor.tabCompletion": "on",
    "editor.tabSize": 2,
    "eslint.format.enable": true,
    "eslint.workingDirectories": [{ "mode": "auto" }], // important for mono-repo projects
    "files.autoSave": "onFocusChange", // hero
    "prettier.endOfLine": "auto",
    "prettier.semi": false, << alignment with ESLint Standard
    "prettier.singleQuote": true, << alignment with ESLint Standard
    "prettier.trailingComma": "none", << alignment with ESLint Standard
    "tabnine.experimentalAutoImports": true,

    // Language-Specific
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false, // alignment with ESLint Standard
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.format.insertSpaceBeforeFunctionParenthesis": false, // alignment with ESLint Standard
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
    "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
    },
    "vetur.format.options.tabSize": 2,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatter.html": "prettier",
    "vetur.format.defaultFormatter.js": "prettier", // for consistency with TS option
    "vetur.format.defaultFormatter.ts": "prettier"
}
```

Thank you Charles for sharing your experiences and favorite VS Code settings! If you're interested in using VS Code for your Node.js web development classes, you can get started with the Node.js JS Education Pack which contains Charles' favorite extensions, extensions for real-time collaboration, and more!

## Python Extension Pack
TODO
Unsure which extensions to recommend to your students? You can point your students to the [Python Education Extension Pack](https://marketplace.visualstudio.com/items?itemName=tanhakabir.python-education-extension-pack) that contains essential and helpful extensions for the classroom. You can download the extension pack from the VS Code Marketplace:

![Python Education Extension Pack](images/python/python-extension-pack.png)

The extension pack contains:

* [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for basic Python functionality like compiling, debugging support, linting, Jupyter Notebooks, unit tests, and more.
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack) to enable real-time collaboration and [Live Share Audio](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-audio) to enable audio calls as well.
* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) to work on remote projects (for example, to access lab machines) through SSH with full VS Code functionality.
* [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) for full LaTeX support in Markdown.
* [Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=LittleFoxTeam.vscode-python-test-adapter) to visualize and run Python tests in the side bar.
* [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) to run snippets (selected code) and single files of any code with a single click.

## Free lesson: Build a Node.js app for Azure Cosmos DB

Build a database app to store and query data in Azure Cosmos DB by using Visual Studio Code and Node.js. View full details of the lessons on [Microsoft Learn: Build a Node.js app for Azure Cosmos DB](https://docs.microsoft.com/learn/modules/build-node-cosmos-app-vscode/).

![NASA-inspired Python lessons](images/nodejs/learn-build-node-app.png)
