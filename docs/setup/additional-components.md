---
ContentId: 243B79C2-819F-4257-B80D-2CD9CCB04C84
DateApproved: 9/9/2026
MetaDescription: Setting up additional components to use with {% data variables.product.prodname_vscode %}.
---
# Additional components and tools

{% data variables.product.prodname_vscode %} is a small download by design and only includes the minimum number of components shared across most development workflows. Basic functionality like the editor, file management, window management, and preference settings are included. A JavaScript/TypeScript language service and Node.js debugger are also part of the base install.

If you are used to working with larger, monolithic development tools (IDEs), you may be surprised that your scenarios aren't completely supported out of the box.  For example, there isn't a **File** > **New Project** dialog with pre-installed project templates.  Most {% data variables.product.prodname_vscode_shortname %} users will need to install additional components depending on their specific needs.

## Commonly used components

Here are a few commonly installed components:

* [Git](https://git-scm.com/download) - {% data variables.product.prodname_vscode_shortname %} has built-in support for source code control using Git but requires Git to be installed separately.
* [Node.js (includes npm)](https://nodejs.org/) - A cross platform runtime for building and running JavaScript applications.
* [TypeScript](https://www.typescriptlang.org) - The TypeScript compiler, `tsc`, for transpiling TypeScript to JavaScript.

You'll find the components above mentioned often in our documentation and walkthroughs.

## {% data variables.product.prodname_vscode_shortname %} extensions

You can extend the {% data variables.product.prodname_vscode_shortname %} editor itself through [extensions](/docs/configure/extensions/extension-marketplace.md). The {% data variables.product.prodname_vscode_shortname %} community has built thousands of useful extensions available on the {% data variables.product.prodname_vscode_shortname %} [Marketplace](https://marketplace.visualstudio.com/VSCode).

The following list shows some of the popular extensions in the {% data variables.product.prodname_vscode_shortname %} Marketplace. Select an extension tile to view the extension details.

<div class="marketplace-extensions-top"></div>

## Additional tools

{% data variables.product.prodname_vscode %} integrates with existing tool chains.  We think the following tools will enhance your development experiences.

* [Yeoman](https://yeoman.io/) - An application scaffolding tool, a command line version of **File** > **New Project**.
* [generator-hottowel](https://github.com/johnpapa/generator-hottowel) - A Yeoman generator for quickly creating AngularJS applications.
* [Express](https://expressjs.com/) - An application framework for Node.js applications using the Pug template engine.
* [Gulp](https://gulpjs.com/) - A streaming task runner system which integrates easily with {% data variables.product.prodname_vscode_shortname %} tasks.
* [Mocha](https://mochajs.org/) - A JavaScript test framework that runs on Node.js.
* [Yarn](https://yarnpkg.com/) - A dependency manager and alternative to npm.

>**Note:** Most of these tools require Node.js and the npm package manager to install and use.

## Next steps

* [User Interface](/docs/editing/getting-started/userinterface.md) - A quick orientation around {% data variables.product.prodname_vscode_shortname %}.
* [User/Workspace Settings](/docs/configure/settings.md) - Learn how to configure {% data variables.product.prodname_vscode_shortname %} to your preferences through settings.
* [Languages](/docs/languages/overview.md) - {% data variables.product.prodname_vscode_shortname %} supports many programming languages out-of-the-box as well as many more through community created extensions.
