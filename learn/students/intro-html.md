---
Order: 1
Area: students
TOCTitle: HTML Intro
ContentId: 683595d8-cf1f-4b24-a206-317b0855f284
PageTitle: Get Started with HTML in Visual Studio Code
DateApproved:
MetaDescription: Overview of resources for using HTML in Visual Studio Code.
---

# Get Started with HTML in Visual Studio Code

Websites are everywhere, and accessible on all devices. They can be as simple or elaborate with media content and application logic as a person wants. Making web development a create entry point for learning programming.

VS Code has everything you need to create your own website, and the extensions to learn and take it as advanced as you would like to go.

In this lesson you utilize VS Code to:

* Create your first website
* Learn and use HTML, CSS and JavaScript to personalize your site
* Deploy your web site so anyone can view

## Create an HTML Page

Websites are made up of many files, each built in a language called hypertext markup language (HTML). This is the base language that all web pages use. Each adding in cascading style sheets (CSS), and JavaScript to create the fully designed and usable websites (like this) that you use ach day.

HTML uses tags to identify elements on the page for the browser. Certain tags, and structure, are required for an HTML page to render properly. VS Code does all this for you.

To create your first HTML page:

1. Open VS Code.

1. From the **Get Started** page, or **File** menu options, select to **Open Folder**.

1. Navigate to the location where you want to create the new folder for your website, select **New Folder** and name it **my-site**.

1. From the **File** menu options, select **New File** and enter `index.html` for the file name.

1. In the `index.html` file, type `html:5` and press `kb(tab)` or `kb(editor.action.replaceOne)` for VS Code to create your base HTML page and save the file.

You now have your first HTML page ready for you to customize. To get started, within `index.html` update "Document" to "This is my web site", and within the body tags (`<body> </body>`) add "Here I will add more detail to my site" and save your changes. so you have:

![Azure Static Web Apps extention](images/intro-html/html-customized-base.png)

## View in the Browser

With your HTML page created, let's open it in the browser by using the VS Code extension **open in browser**.

![Azure Static Web Apps extention](images/intro-html/html-open-in-browser.png)

> 💡 **VS Code Extensions**
>
> Extensions are community-developed resources that extend the functionality of VS Code. [Learn more here](https://code.visualstudio.com/docs/editor/extension-marketplace) on extensions and the Extension Marketplace for you to customize your VS Code installation.

With the **open in browser** extension installed, right-click on `index.html` in the Explorer file list and select **Open In Default Browser**.

This will open your web page (index.html) in your default browser. In the browser window you will see your reminder text of, "Here I will add more detail to my site" with the tab label of "This is my site".

## Deploy

To this point, your `index.html` page is saved locally, and only visible to you on your machine. For others to view it we need to deploy it to a website hosting provider. For this example, let's use the free tier of Azure Static Web Apps.

To deploy you will need to have:

* [GitHub](https://github.com/) account
* [Azure](https://azure.microsoft.com/) account, or you can create one during the deploy process

Install the [Static Web Apps extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) into VS Code. Follow the prompts and instructions provided by Azure Static Web Apps extension (_Note: you can also find these extension instructions within VS Code when selected the Azure Static Web Apps extension), using the values of:

* Name: **my-site**
* Name of GitHub repository: **my-site**
* Region: *select closest region to you*
* Build preset: **Custom**
* Location of application code: **/**
* Build location: **/**

This will create a GitHub repository called **my-site** for your website, commit your files, and then create and deploy your website to Static Web Apps through a GitHub Action.

When GitHub action completes successfully your site will be deployed. Click the Azure logo in the the Activity Bar on the left-sided of VS Code. Select **Static Web Apps** and right-click on **my-site** selecting **Browse site** to open your hosted website in the browser.

> 💡 **Deploying Azure Static Web Apps**
>
> This lesson uses one of the three ways you can deploy an Azure Static Web App. You can also create and deploy a website to Azure Static Web Apps using:
> * [Static Web Apps (SWA) CLI](https://azure.github.io/static-web-apps-cli/)
> * [Azure Portal](https://portal.azure.com/)

## Continue Learning and Customizing Your Website

With your website created and deployed, you now have a URL you can share publicly for anyone to view your site. VS Code and its extensions are built to optimize the development process for you. Here is where you can continue learning more about VS Code as well as customizing your website.

### Learn more about VS Code

* [HTML in Visual Studio Code](https://code.visualstudio.com/docs/languages/html)
* [CSS, SCSS and Less](https://code.visualstudio.com/docs/languages/css)
* [Working with GitHub is VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)

### Learn More to Customize Your Website

* [Build a simple website using HTML, CSS, and JavaScript](https://learn.microsoft.com/en-us/training/modules/build-simple-website/)
* [Web Development for Beginners](https://github.com/microsoft/Web-Dev-For-Beginners)
* [Beginner's Series to: JavaScript](https://learn.microsoft.com/en-us/shows/beginners-series-to-javascript/)