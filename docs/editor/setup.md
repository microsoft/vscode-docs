---
Order: 1
Area: editor
TOCTitle: Setup
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
PageTitle: Setting up Visual Studio Code
DateApproved: 3/7/2016
MetaDescription: Get Visual Studio Code up and running on Mac OS X, Linux or Windows.
---

# Setting up Visual Studio Code

Getting up and running with VS Code is quick and easy.  Follow the platform specific guides below.

VS Code is lightweight and should run on most available hardware and platform versions. You can review the [System Requirements](/docs/supporting/requirements.md) to check if your computer configuration is supported.

## Mac OS X

1. [Download Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534106) for Mac OS X.
2. Double-click on the downloaded archive to expand the contents.
3. Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the `Launchpad`.
4. Add VS Code to your Dock by right-clicking on the icon and choosing `Options`, `Keep in Dock`.

>**Tip:** If you want to run VS Code from the terminal by simply typing 'code', VS Code has a command, **Shell Command: Install 'code' command in PATH**, to add 'code' to your `$PATH` variable list.
>
>After installation, launch VS Code. Now open the **Command Palette** (`kb(workbench.action.showCommands)`) and type `shell command` to find the **Shell Command: Install 'code' command in PATH** command.
>
>![OS X shell commands](images/setup/shell-command.png)
>
>After executing the command, restart the terminal for the new `$PATH` value to take effect. You'll be able to simply type 'code .' in any folder to start editing files in that folder.

## Linux

1. Download Visual Studio Code for your distribution, [.deb](http://go.microsoft.com/fwlink/?LinkID=760868) for Debian-based distributions such as Ubuntu or [.rpm](http://go.microsoft.com/fwlink/?LinkID=760867) for Red Hat-based distributions such as Fedora or CentOS. Note that 32-bit binaries are also available on the [download page](/Download).
2. Install the package through a GUI package manager by double clicking on the package file, or through the command line:

 ```bash
 # For .deb
 sudo dpkg -i <file>.deb

 # For .rpm
 sudo dnf install <file>.rpm
 ```

3. VS Code should now be available to run through the launcher or the command line by running `code`.

>**Tip:** Run `code .` in any folder to start editing files in that folder.

## Windows

1. [Download Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534107) for Windows.
2. Double-click on `VSCodeSetup.exe` to launch the setup process. This will only take a minute.

>**Tip:** The Setup will optionally add Visual Studio Code to your `%PATH%`, so from the console you can simply type `code .` to open VS Code on that folder.

>**Tip:** You might need to log off after the installation for the change to the `%PATH%` environmental variable to take effect.

## Additional Tools

Visual Studio Code integrates with existing tool chains.  We think the following tools will enhance your development experiences.

- [ASP.NET Core](https://github.com/aspnet/home) - a lean and composable framework for building web and cloud applications, fully open source and available on GitHub
- [Node.js (includes NPM)](https://nodejs.org/) - a platform for easily building fast, scalable network applications
- [Git](http://git-scm.com/download) - VS Code has built-in support for source code control using Git
- [Yeoman](http://yeoman.io/) - an application scaffolding tool, you can think of this as **File** > **New Project** for VS Code
- [generator-aspnet](https://www.npmjs.com/package/generator-aspnet) - a yeoman generator for scaffolding ASP.NET Core applications, run `npm install -g generator-aspnet` to install
- [hottowel](https://github.com/johnpapa/generator-hottowel) - a yeoman generator for quickly creating AngularJS applications, run `npm install -g generator-hottowel` to install
- [Express](http://expressjs.com/) - an application framework for Node.js applications, uses the Jade template engine
- [gulp](http://gulpjs.com/) - a streaming task runner system, integrates with VS Code tasks
- [mocha](http://mochajs.org/) - a JavaScript test framework that runs on Node.js
- [bower](http://bower.io/) - a client side package manager
- [TypeScript](http://typescriptlang.org) - brings structure and strong typing to your JavaScript code, without compromising the good parts
- [Typings](https://github.com/typings/typings) - TypeScript definition manager to search and download 100's of TypeScript definition files for popular JavaScript frameworks, providing great IntelliSense in VS Code

## Next Steps

Now you have installed and set up VS Code. Let's get going...

* [The Basics](/docs/editor/codebasics.md) - Basic orientation around VS Code
* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines

## Common Questions

**Q: What are the system requirements for VS Code?**

**A:** We have a list of [System Requirements](/docs/supporting/requirements.md).