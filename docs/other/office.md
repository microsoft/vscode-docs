---
Order: 4
Area: other
TOCTitle: Office
ContentId: 8661D491-297F-4778-B10B-588005CCD443
PageTitle: Office Add-ins with Visual Studio Code
DateApproved: 6/22/2022
MetaDescription: See how to use the features of Visual Studio Code to develop Office Add-ins.
---
# Office Add-ins with Visual Studio Code

[Office Add-ins](https://learn.microsoft.com/office/dev/add-ins/overview/office-add-ins) run inside an Office application and can interact with contents of the Office document using the rich [JavaScript API](https://learn.microsoft.com/office/dev/add-ins/develop/understanding-the-javascript-api-for-office).

![An Office add-in is composed of a manifest.xml file and your web app.](images/office/officeaddinoverview.png)

Under the hood, an Office Add-in is just a web app that you can host anywhere. Using a `manifest.xml` file, you tell the Office application where your web app is located and how you want it to appear. The Office application takes care of hosting it within Office.

## Create a new Office Add-in project

Before you can create an Office Add-in, you must set up your development environment. To assist you with tool installation, see [Set up your development environment](https://learn.microsoft.com/office/dev/add-ins/overview/set-up-your-dev-environment).

Once you have your tools installed, you can create a basic add-in for Excel, OneNote, Outlook, PowerPoint, Project, or Word by completing a [5-minute quick start](https://learn.microsoft.com/office/dev/add-ins/). These quick starts use the [Yeoman Generator for Office Add-ins (also called "Yo Office")](https://learn.microsoft.com/office/dev/add-ins/develop/yeoman-generator-overview) to create a Node.js Office Add-in project that can be managed with Visual Studio Code (VS Code).

## Use Visual Studio Code to develop your Office Add-in

Visual Studio Code is a great tool to help you develop your custom Office Add-ins, regardless of whether the add-ins run in web clients, Windows, mobile platforms, or on macOS!

### Get started

To open your add-in project in VS Code, navigate to the root directory of your add-in project and enter the following on the command line.

```bash
code .
```

![The manifest.xml file of an Office Add-ins project in Visual Studio Code](images/office/office-add-in-manifest.png)

Within your project, you can view and configure your [manifest](https://learn.microsoft.com/office/dev/add-ins/develop/add-in-manifests), HTML, JavaScript or TypeScript, and CSS files to define your add-in. To learn more about developing Office Add-ins in VS Code, refer to [Develop Office Add-ins with Visual Studio Code](https://learn.microsoft.com/office/dev/add-ins/develop/develop-add-ins-vscode).

### Debug your add-in

Debugging your add-in's client-side JavaScript code varies based on your development environment. To assist you with debugging on certain platforms, see [Overview of debugging Office Add-ins](https://learn.microsoft.com/office/dev/add-ins/testing/debug-add-ins-overview).

If you are using [Node.js](https://nodejs.org/) or [ASP.NET Core](https://asp.net) for server-side logic to support your Office Add-in, refer to the [Debugging](/docs/editor/debugging.md) page to configure VS Code for debugging either of these runtimes.

### Sideload your add-in for testing

Sideloading allows you to test your add-in to see how it will appear and operate. Yo Office takes care of building your add-in project and sideloading it in Office. To sideload your add-in, navigate to the root directory of your project and run the following from a command line.

```bash
npm start
```

You can also manually sideload your add-in by using one of the following options:

- For Excel, OneNote, PowerPoint, and Word, follow the instructions in [Sideload an Office Add-in in Office on the web manually](https://learn.microsoft.com/office/dev/add-ins/testing/sideload-office-add-ins-for-testing#sideload-an-office-add-in-in-office-on-the-web-manually).
- For Outlook, follow the instructions in [Sideload Outlook add-ins for testing](https://learn.microsoft.com/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing?tabs=windows#sideload-manually).

### Publish your add-in

Deploying and publishing your add-in allows you to distribute it to users publicly or within your organization. Once you're ready to publish your add-in for others to use, you can publish it directly through VS Code using the [Azure Storage extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage). For guidance on this process, refer to [Publish an add-in developed with Visual Studio Code](https://learn.microsoft.com/office/dev/add-ins/publish/publish-add-in-vs-code).

To learn more about the various Office Add-ins deployment methods, see [Deploy and publish Office Add-ins](https://learn.microsoft.com/office/dev/add-ins/publish/publish).

## Next steps

Check out the other pages on the VS Code site to find out how you can use more capabilities of the editor when creating custom Office Add-ins:

- [Language Overview](/docs/languages/overview.md) - You can write Office Add-ins in many languages. Find out what VS Code has to offer.
- [User Interface](/docs/getstarted/userinterface.md) - Just starting out with VS Code? This is worth reviewing.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.

## Common questions

### Can I create an Office Add-in with the generator and use VS Code regardless of the language or client-side framework?

Yes, you can. You can use pure HTML, Angular, Ember, React, Aurelia... anything you like!

### Can I use TypeScript to create my Office Add-in?

Absolutely, VS Code has great support for [TypeScript](/docs/languages/typescript.md)!
