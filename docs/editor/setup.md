---
Order: 1
Area: editor
TOCTitle: Setup
PageTitle: Setting up Visual Studio Code
DateApproved: 11/18/2015
MetaDescription: Get Visual Studio Code up and running on Mac OS X, Linux or Windows.
---

# Setting up Visual Studio Code

Getting up and running with VS Code is quick and easy.  Follow the platform specific guides below as well as the list of handy tools.

## Mac OS X
1. [Download Visual Studio Code](http://go.microsoft.com/fwlink/?LinkID=534106) for Mac OS X.
2. Double-click on `VSCode-osx.zip` to expand the contents.
3. Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the `Launchpad`.
4. Add VS Code to your Dock by right-clicking on the icon and choosing `Options`, `Keep in Dock`.

>**Tip:** If you want to run VS Code from the terminal, append the following to your `~/.bash_profile` file (`~/.zshrc` in case you use `zsh`).

```bash
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```
Now, you can simply type `code .` in any folder to start editing files in that folder.

## Linux
1. [Download Visual Studio Code](http://go.microsoft.com/fwlink/?LinkID=534108) for Linux.
2. Make a new folder and extract `VSCode-linux-x64.zip` inside that folder.
3. Double click on `Code` to run Visual Studio Code.

>**Tip:** If you want to run VS Code from the terminal, create the following link substituting `/path/to/vscode/Code` with the absolute path to the `Code` executable

```
sudo ln -s /path/to/vscode/Code /usr/local/bin/code
```
Now, you can simply type `code .` in any folder to start editing files in that folder.

## Windows
1. [Download Visual Studio Code](http://go.microsoft.com/fwlink/?LinkID=534107) for Windows.
2. Double-click on `VSCodeSetup.exe` to launch the setup process. This will only take a minute.

>**Tip:** Visual Studio Code will be added to your path, so from the console you can simply type `code .` to open VS Code on that folder!

>**Tip:** You might need to log off after the installation for the change to the `PATH` environmental variable to take effect.

## Additional Tools
Visual Studio Code integrates with existing tool chains.  We think the following tools will enhance your development experiences.

- [ASP.NET 5](https://github.com/aspnet/home) - a lean and composable framework for building web and cloud applications, fully open source and available on GitHub
- [Node.js (includes NPM)](http://nodejs.org/) - a platform for easily building fast, scalable network applications
- [Git](http://git-scm.com/download) - VS Code has built-in support for source code control using Git
- [Yeoman](http://yeoman.io/) - an application scaffolding tool, you can think of this as `File | New Project` for VS Code
- [generator-aspnet](https://www.npmjs.com/package/generator-aspnet) - a yeoman generator for scaffolding ASP.NET 5 applications, run `npm install -g generator-aspnet` to install
- [hottowel](https://github.com/johnpapa/generator-hottowel) - a yeoman generator for quickly creating AngularJS applications, run `npm install -g generator-hottowel` to install
- [Express](http://expressjs.com/) - an application framework for Node.js applications, uses the Jade template engine
- [gulp](http://gulpjs.com/) - a streaming task runner system, integrates with VS Code tasks
- [mocha](http://mochajs.org/) - a JavaScript test framework that runs on Node.js
- [bower](http://bower.io/) - a client side package manager
- [TypeScript](http://typescriptlang.org) - brings structure and strong typing to your JavaScript code, without compromising the good parts
- [TypeScript definition manager](http://definitelytyped.org/tsd/) - search and download 100's of TypeScript definition files for popular JavaScript frameworks, providing great IntelliSense in VS Code


## Next Steps
Now you have installed and set up VS Code. Let's get going...

* [The Basics](/docs/editor/codebasics.md) - Basic orientation around VS Code
* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines



## Common Questions

**Q: What are the system requirements for VS Code?**

**A:** We have a list of [System Requirements](/docs/supporting/requirements.md).

