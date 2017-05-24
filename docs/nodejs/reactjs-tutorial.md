---
Order: 
Area: nodejs
TOCTitle: React Tutorial
ContentId: 2dd2eeff-2eb3-4a0c-a59d-ea9a0b10c468
PageTitle: React JavaScript Tutorial in VS Code
DateApproved: 3/10/2017
MetaDescription: React JavaScript tutorial showing IntelliSense, debugging, and code navigation support in Visual Studio Code.
MetaSocialImage: nodejs_javascript_vscode.png
---
# React Tutorial in VS Code

[React](https://facebook.github.io/react/).js is a popular JavaScript library for building web application user interfaces developed by Facebook. VS Code supports React.js IntelliSense and code navigation out of the box.

## Hello World

We'll be using the `create-react-app` [generator](https://facebook.github.io/react/docs/installation.html#creating-a-new-application) for this tutorial. To install and use the generator as well as run the React application server, you'll need the [Node.js](https://nodejs.org/) JavaScript runtime and [npm](https://www.npmjs.com/) (the Node.js package manager) installed. You can install Node.js from [here](https://nodejs.org/en/download/ and npm is included.

>**Tip**: To test that you have Node.js and npm correctly install on your machine, you can type `node --version` and `npm --version`.

To install the `create-react-app` generator, in a terminal or command prompt type:

```bash
npm install -g create-react-app
```

This may take a few minutes to install. You can now create a new React application by typing:

```bash
create-react-app my-app
```

where `my-app` is the name of the folder for your application. This may also take a few minutes to create the React application and install it's dependencies.

Let's quickly run our React application by navigating to the new folder and typing `npm start` to start the web server and open the application in a browser:

```bash
cd my-app
npm start
```

You should see "Welcome to React" on `http:localhost:3000` in your browser. We'll leave the web server running while we look at the application with VS Code.

To open your React application in VS Code, open another terminal (or command prompt) and navigate to the `my-app` folder and type `code .`:

```bash
cd my-app
code .
```

### Markdown Preview

In the File Explorer, on file you'll see is the application `README.md`. This has lots of create information about the application and React in general. A great way to review the README is by using the VS Code Markdown Preview. You can open the preview in either the current editor group (**Markdown: Open Preview** `kb(markdown.showPreview)`) or in a new editor group to the side (**Markdown: Open Preview to the Side** `kb(markdown.showPreviewToSide)`). You'll get nice formatting, hyperlink navigation to headers, and syntax highlighting in code blocks.

### Syntax highlighting and bracket matching

open src\Index.js
Syntax highlighting, bracket matching

### IntelliSense

Automatic Type Acquisition (ATA)

Go to Definition, Peek definition

## Debug Hello World

Install Chrome Debug extension

Configuration

shutdown localhost:3000, F5, refresh

## Linting

get js errors by default

```bash
npm install -g eslint
```

## [Popular Starter Kit]