---
Order: 28
TOCTitle: Build 2017 Demo
PageTitle: Build 2017 Demo
MetaDescription: Build 2017 Demo Visual Studio Code - Conquering the Cloud with an editor and a CLI
Date: 2017-05-10
ShortDescription: Build 2017 Demo Visual Studio Code - Conquering the Cloud with an editor and a CLI
Author: Chris Dias
---
# Build 2017 Demo

May 10, 2017 Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

## Watch the video

[Visual Studio Code: Conquering the Cloud with an Editor and a CLI](https://channel9.msdn.com/Events/Build/2017/B8094)

Below are links to the samples, tools, and extensions demonstrated in the Build 2017 VS Code talk.

## Samples

* [StickerApp](https://github.com/glimpse/stickerapp) is a full featured version of the app used in the demo.

## Tools

* [NPM (Node Package Manager) Support](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) provides support for running `npm install` and `npm uninstall` commands from within VS Code.

* [Auto Close HTML tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) automatically adds HTML and XML closing tags.

* [CSS IntelliSense (Completions)](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) provides CSS class name completion for the HTML class attribute based on the CSS files in your workspace as well as React's `className` attribute.

## React

* A new [React Tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial) shows you how to set up a React app from scratch, IntelliSense, Debugging, Linters, and more.

## Angular

* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) provides a rich editing experience for Angular templates, both inline and external templates including completions lists, AOT diagnostic messages, quick info, and even Go To Definition.

## Debugging

* VS Code's [Node.js Debugging documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) explains how to configure VS Code for a variety of application types.

* [Chrome Debugger](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) lets you debug your JavaScript code running in the Google Chrome browser or other targets that support the Chrome Debugging Protocol.

* [Debugging configuration recipes](https://github.com/Microsoft/vscode-recipes)

## Linters

* [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) integrates the [tslint](https://github.com/palantir/tslint) linter for the TypeScript language into VS Code.

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) integrates [ESLint](http://eslint.org/) (a pluggable linting utility for JavaScript and JavaScript React (JSX) into VS Code.

## NoSQL MongoDB

* The [MongoDB Extension](https://github.com/microsoft/vscode-mongodb) lets you connect to both local and hosted MongoDB databases, create and drop databases and collections, run queries, and more. To use the extension simply clone the repository, run `npm install`, and then press `F5` to run the extension in the development host. Alternatively, you can build the extension locally and then install it:

``` javascript
npm install -g vsce
vsce package
code --install-extension vscode-mongodb-0.0.1.vsix
```

## Docker and Micro-Services

* Install and learn more about [Docker](https://www.docker.com/).

* The [Docker Tools for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) make it easy to develop and deploy containerized micro-service based applications using Docker containers.

* [Docker multi-stage builds](https://codefresh.io/blog/node_docker_multistage/)

## Azure

**Note:** If you do not have an Azure subscription, [sign up today](https://azure.microsoft.com/en-us/free/?b=16.48) for a **free** 30 day account and get **$200** in Azure Credits to try out any combination of Azure services.

* The new cross platform [Azure CLI 2.0](https://aka.ms/GetTheAzureCLI).

* [Azure CLI Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli) provides a rich editing experience in VS Code for the  [Azure CLI 2.0](https://aka.ms/GetTheAzureCLI).

* [Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction) let's you host your MongoDB databases in Azure.

* [Kubernetes](https://kubernetes.io/) and [Kubernetes in Azure](https://docs.microsoft.com/en-us/azure/container-service/container-service-kubernetes-walkthrough).
