---
Order: 6
Area: setup
TOCTitle: Additional Components
ContentId: 243B79C2-819F-4257-B80D-2CD9CCB04C84
PageTitle: Setting up additional components to use with Visual Studio Code
DateApproved: 11/8/2017
MetaDescription: Setting up additional components to use with Visual Studio Code.
---

# Additional Components and Tools

VS Code is a small download by design and only includes the minimum number of components shared across most development workflows. Basic functionality like the editor, file management, window management, and preference settings are included. A JavaScript/TypeScript language service and Node.js debugger are also part of the base install.

If you are used to working with larger, monolithic development tools (IDEs), you may be surprised that your scenarios aren't completely supported out of the box.  For example, there isn't a **File** > **New Project** dialog with pre-installed project templates.  Most VS Code users will need to install additional components depending on their specific needs.

## Commonly Used Components

Here are a few commonly installed components:

- [Git](https://git-scm.com/download) - VS Code has built-in support for source code control using Git but requires Git to be installed separately.
- [Node.js (includes NPM)](https://nodejs.org/) - A platform and runtime for building and running JavaScript applications.
- [TypeScript](https://typescriptlang.org) - The TypeScript compiler, `tsc`, for transpiling TypeScript to JavaScript.

You'll find the components above mentioned often in our documentation and walkthroughs.

## VS Code Extensions

You can extend the VS Code editor itself through [extensions](/docs/editor/extension-gallery.md). The VS Code community has built hundreds of useful extension available on the VS Code [Marketplace](https://marketplace.visualstudio.com/VSCode).

<div class="marketplace-extensions-top"></div>

The extensions shown above are the current most popular on Marketplace. Click on an extension tile above to read the description and reviews of the extension.

## Additional Tools

Visual Studio Code integrates with existing tool chains.  We think the following tools will enhance your development experiences.

- [Yeoman](http://yeoman.io/) - An application scaffolding tool, a command line version of **File** > **New Project**.
- [generator-aspnet](https://www.npmjs.com/package/generator-aspnet) - A Yeoman generator for scaffolding **ASP.NET Core** applications.
- [generator-hottowel](https://github.com/johnpapa/generator-hottowel) - A Yeoman generator for quickly creating **AngularJS** applications.
- [Express](https://expressjs.com/) - An application framework for Node.js applications using the **Jade** template engine.
- [Gulp](http://gulpjs.com/) - A streaming task runner system which integrates easily with VS Code tasks.
- [Mocha](https://mochajs.org/) - A JavaScript test framework that runs on Node.js.
- [Bower](https://bower.io/) - A client side package manager.

>**Note:** Most of these tools require Node.js and the NPM package manager to install and use.

## Next Steps

* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation around VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.
* [Languages](/docs/languages/overview.md) - VS Code supports many programming languages out-of-the-box as well as many more through community created extensions.
