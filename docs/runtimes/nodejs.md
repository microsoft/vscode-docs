---
Order: 1
Area: runtimes
TOCTitle: Node.js
PageTitle: Node.js and Visual Studio Code End to End
DateApproved: 2/3/2016
MetaDescription: Visual Studio Code has great support for writing and debugging Node.js applications.  At the heart of VS Code is a Node server so we use these features day-in day-out.
---

# Node.js Applications with VS Code
[Node.js](https://nodejs.org/) is a platform for building fast and scalable server applications using JavaScript. Node.js is the runtime and [NPM](https://www.npmjs.com/) is the Package Manager for Node.js modules.

To get started, [install Node.js for your platform](https://nodejs.org/download/). The Node Package Manager is included in the Node distribution.

> **Tip!** You can download both the TypeScript and JavaScript versions of the sample application created in this walkthrough from the [vscode-samples](https://github.com/Microsoft/vscode-samples/archive/master.zip) repository.

## Express
[Express](http://expressjs.com/) is a very popular application framework for building and running Node.js applications. You can scaffold a new Express application using the Express Generator tool, which is typically installed globally on your computer.

```
npm install -g express-generator
```

We can now scaffold a new Express application called `myExpressApp`.
```
express myExpressApp
```
This creates a new folder called `myExpressApp` with the contents of your application.  To install all of the dependencies, execute:
```
cd myExpressApp
npm install
```

At this point we should test that our application runs. `package.json` includes a `start` script which runs `node ./bin/www`. From a terminal run
```
npm start
```
The server will start and you can browse to `http://localhost:3000` to see the running application.

![Your first Node Express App](images/nodejs/express.png)

## Great Code Editing Experiences
Close the browser and from a terminal in the `myExpressApp` folder, stop the Node.js server by pressing `kbstyle(CTRL+C)`.  Now launch VS Code.
```
code .
```
>**Tip:** You can open files or folders directly from the command line.  The period '.' refers to the current folder, therefore VS Code will start and open the `myExpressApp` folder.

The Node.js and Express documentation does a great job explaining how to build rich applications using the platform and framework. Visual Studio Code will make you more productive developing these types of applications by providing great code editing and navigation experiences.

VS Code uses the TypeScript compiler to drive its JavaScript language service, which means we can take advantage of what the compiler can infer about your code. For example, let's create a simple string variable in `app.js` and send the contents of the string to the console.
```
var msg = 'hello world';
console.log(msg);
```
Note that when you typed `console.` IntelliSense on the `console` object was automatically presented to you. When editing JavaScript files, VS Code will automatically provide you with IntelliSense for the DOM.

![Your first Node Express App](images/nodejs/consoleintellisense.png)

Also notice that VS Code knows that `msg` is a string based on the initialization to `'hello world'`.  Type `msg.` to bring up IntelliSense and you'll see all of the string functions available on `msg`.

![Your first Node Express App](images/nodejs/stringintellisense.png)

VS Code can use TypeScript definition files (for example [`node.d.ts`](https://github.com/borisyankov/DefinitelyTyped/blob/master/node/node.d.ts)) to provide metadata to VS Code about the JavaScript based frameworks you are consuming in your application. Because TypeScript definition files are written in TypeScript, they can express the data types of parameters and functions, allowing VS Code to provide not only a rich IntelliSense experience, but also warnings when an API is being used incorrectly.

The [TypeScript Definition Manager (TSD)](http://definitelytyped.org/tsd/) makes it easy to search for and install TypeScript definition files into your workspace. This tool will download the requested definition from the [DefinitelyTyped repository](https://github.com/borisyankov/DefinitelyTyped). As we did with the express generator, we will install TSD globally using NPM so that you can use the tool in any application you create.

```
npm install -g tsd
```
>**Tip:** TSD has a number of options for configuring where and how definition files are downloaded, from the terminal run `tsd --help` for more information.

Now you can pull down the Node and Express definitions.

```
tsd query node --action install
tsd query express --action install
```
>**Tip:** You can download multiple definition files by combining them on the command line, for example `tsd query node express --action install`.

Open `app.js` and notice how the warnings no longer appear for`__dirname`. This is because VS Code now understands what `__dirname` is, based on the metadata from the `node.d.ts` file. Even more exciting, you can get full IntelliSense against the Node framework. For example, you can require `http` and get full IntelliSense against the `http` class as you type in Visual Studio Code.

![Your first Node Express App](images/nodejs/intellisense.png)

If you pass an incorrect type to `createServer` VS Code will give you a warning.

![Your first Node Express App](images/nodejs/warning.png)

>**Tip:** Press `kb(editor.action.marker.next)` to navigate errors and warnings within a file.

You can give even more hints to Visual Studio Code through a configuration file for the workspace (the root folder). Add a new file and name it `jsconfig.json` with the following contents:

```json
{
	"compilerOptions": {
		"target": "ES5",
		"module": "commonjs"
	}
}
```
This file tells VS Code you are writing ES5 compliant code and the module system you want to use is the `commonjs` framework. With these options set, you can start to write code that references modules in other files. For example, in `app.js` we require the `./routes/index` module, which exports an `Express.Router` class. If you bring up IntelliSense on `routes`, you can see the shape of the `Router` class.

![Your first Node Express App](images/nodejs/moduleintellisense.png)

## Debugging your Node Application

In order to run and debug your Node application from within VS Code, you need to configure how the application will be started. To do this, click on the Debug icon in the View Bar on the left of Visual Studio Code.

![Your first Node Express App](images/nodejs/debugicon.png)

Click on the Configure gear icon at the top of the Debug view to create a default `launch.json` file; and, select "Node.js" as the Debug Environment. This configuration file lets you specify how to start the application, what arguments to pass in, the working directory, and more. When the file is first created, VS Code will look in `package.json` for a `start` script and will use that value as the `program` (which in this case is `./bin/www`) for the `Launch` configuration. A second `Attach` configuration is also created to show you how to attach to a running Node application.

![Your first Node Express App](images/nodejs/launchjson.png)

Take the defaults for everything else. If you do not have [Auto Save](/docs/editor/codebasics.md#saveauto-save) on, save the file by pressing `kb(workbench.action.files.save)`, and make sure `Launch` is selected in the configuration dropdown at the top of the Debug view. Open `app.js` and set a breakpoint on the line of code we wrote earlier `var msg = 'hello world';` by clicking in the gutter to the left of the line number. Press `kb(workbench.action.debug.start)` to start debugging the application. VS Code will start the server in a new terminal and hit the breakpoint we set. From there you can inspect variables, create watches, and step through your code.

![Your first Node Express App](images/nodejs/debugsession.png)

>**Note:** VS Code only supports local debugging at this time, we are constantly working to improve our debugging support.

## Next Steps
There is much more to explore with Visual Studio Code, please try the following topics:

* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines
* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [ASP.NET Core](/docs/runtimes/ASPnet5.md) - End to end sample showing off our ASP.NET Core and .NET Core support with a sample app
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings

