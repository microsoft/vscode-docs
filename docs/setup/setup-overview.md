---
Order: 1
Area: setup
TOCTitle: Overview
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
PageTitle: Setting up Visual Studio Code
DateApproved: 7/7/2016
MetaDescription: Get Visual Studio Code up and running.
---

# Setting up Visual Studio Code

Getting up and running with VS Code is quick and easy. It is a small download so you can install in a matter of minutes and give VS Code a try.

## Cross Platform

VS Code is a free code editor which runs on the Mac OS X, Linux and Windows operating systems.

Follow the platform specific guides below:

* [OS X](/docs/setup/osx.md)
* [Linux](/docs/setup/linux.md)
* [Windows](/docs/setup/windows.md)

VS Code is lightweight and should run on most available hardware and platform versions. You can review the [System Requirements](/docs/supporting/requirements.md) to check if your computer configuration is supported.

## Additional Components

VS Code is an editor first and foremost and prides itself on a small footprint. Unlike traditional IDEs with everything but the kitchen sink, you can tune your installation to the development technologies you care about. Be sure to read the [Additional Components](/docs/setup/additional-components.md) topic after reading the platform guides to learn about customizing your VS Code installation.

## Extensions

VS Code [extensions](/docs/editor/extension-gallery.md) let third parties add support for additional:

* Languages - [C++](/docs/languages/cpp.md), [C#](/docs/languages/csharp.md), [Go](https://marketplace.visualstudio.com/items/lukehoban.Go), [Python](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python)
* Tools - [ESLint](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint), [JSHint](https://marketplace.visualstudio.com/items/dbaeumer.jshint) , [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell), [Visual Studio Team Services](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team)
* Debuggers - [Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [PHP XDebug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug).

Extensions integrate into VS Code's UI, commands, and task running systems so you'll find it easy to work with different technologies through VS Code's shared interface. Check out the VS Code extension [Marketplace](https://marketplace.visualstudio.com/vscode) to see what's available.

## Proxy Server Support

Many enterprises require that their computers run behind a proxy server and don't allow direct access to the Internet. A proxy server intermediary can limit access to the VS Code Extension [Marketplace](https://marketplace.visualstudio.com/vscode) and prevent installing VS Code [extensions](/docs/editor/extension-gallery.md). 

If you work on a machine where Internet traffic needs to go through a proxy server, then configure the proxy server in one of the following ways:

* Set the operating system environment variables ‘http_proxy’ and ‘https_proxy’

```bash
    SET http_proxy=http://10.203.0.1:5187/
```

* Configure the ‘http.proxy’ setting in your user [settings](/docs/customization/userandworkspace.md) (**File** > **Preferences** > **User Settings** or **Code** > **Preferences** > **User Settings** on Mac):

```json
    "http.proxy": "http://10.203.0.1:5187/"
```

or for an authenticating proxy

```json
    "http.proxy": "http://userid:password@10.203.0.1:5187/"
```

Additionally, use `"http.proxyStrictSSL": false` if your proxy server uses a self-signed certificate.

>**Note:** VS Code supports http and https proxies, but not SOCKS proxies.

## Next Steps

Once you have installed and set up VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [The Basics](/docs/editor/codebasics.md) - Basic orientation around VS Code
* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Go To Definition and more
* [Debugging](/docs/editor/debugging.md) - Debug your source code directly in the VS Code editor.

If you'd like to getting something running quickly, try the [Node.js runtime](/docs/runtimes/nodejs.md) walkthrough which will have you debugging a Node.js web application with VS Code in minutes.

## Common Questions

**Q: What are the system requirements for VS Code?**

**A:** We have a list of [System Requirements](/docs/supporting/requirements.md).

**Q: How big is VS Code?**

**A:** VS Code is a small download (< 100 MB) and has a disk footprint of less than 200 MB, so you can quickly install VS Code and try it out.

**Q: How do I create and run a new project?**

**A:** VS Code doesn't include a traditional **File** > **New Project** dialog or pre-installed project templates. You'll need to add [additional components](/docs/setup/additional-components.md) and scaffolders depending on your development interests. With scaffolding tools like [Yeoman](http://yeoman.io/) and the multitude of modules available through the [NPM](https://www.npmjs.com/) package manager, you're sure to find appropriate templates and tools to create your projects.

**Q: How do I know which version I'm running?**

**A:** In Linux and Windows, choose **Help** > **About**. In OS X, use **Code** > **About Visual Studio Code**.
