---
Order: 26
TOCTitle: Extension Packs
PageTitle: Visual Studio Code Extension Packs
MetaDescription: Learn how to create and use extension packs in Visual Studio Code. 
Date: 2017-03-07
ShortDescription: Learn how to create and use extension packs in Visual Studio Code. 
Author: Wade Anderson
---
# Extension Packs

March 07, 2017 Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

If you have followed our blog for the last year, you'll notice I write an extension roundup blog once a month. I like to write these blogs to let you know about the cool extensions being created in the community and to inspire you to create your own. I often put a theme around the roundup blog: something like extensions or code lens extensions (last month). 

Creating a theme for this blog is a natural fit for a relatively new part of the extension API: extension packs. Last month I created my [first extension pack](https://marketplace.visualstudio.com/items?itemName=waderyan.code-lens-roundup) to bring together all of my favorite code lens extensions. In this month's roundup I want to teach you how to make your own pack and give you some examples of why you would want to. 

> **Tip** Refer to the [extension pack documentation](https://code.visualstudio.com/docs/extensionAPI/extension-manifest#_extension-packs) for more details. 

## How do I make an extension pack? 

You can make your own extension packs. They are insanely easy to make. Follow the instructions on installing the [extension generator](https://code.visualstudio.com/docs/tools/yocode) for VS Code. Then run the following command:

```zsh
yo code 
```

Choose `New Extension Pack` as shown in the image below. 

![new extension pack](2017_03_07_create_extension_pack.png)

Fill out the options as given by Yeoman. One of the options is to create a pack based on what you currently have installed. This will fill out many of the extension pack's details for you! 

In your extension manifest file (`package.json`) and the following attribute:

```js
"extensionDependencies": [
        "publisherid.extensionName"
    ]
```

> **Tip** You can see the publisherid.extensionName at the end of the URL of an extension you want to add to your pack. 

For my Code Lens roundup, this is what mine looked like:

```json
"extensionDependencies": [
    "eamodio.gitlens",
    "VisualStudioOnlineApplicationInsights.application-insights",
    "kisstkondoros.vscode-codemetrics",
    "chrmarti.regex",
    "pflannery.vscode-versionlens"
]
```

## Why would I want to create an extension pack? 

There are many reasons to create an extension pack. 
- Want to create a list of your favorite extensions to share with your friends? Use an extension pack. 
- Want to bundle your Python extensions, so you can easily disable and enable when you are working on a Python project? Use an extension pack. 
- Want to create a curated list of extensions for a blog on VS Code's website? Use an extension pack. 

## What are good extension packs to try?

You can find the extension packs that others have created by querying using the Extension Pack category: click [here](https://marketplace.visualstudio.com/search?target=vscode&category=Extension%20Packs&sortBy=Downloads) for the Marketplace or type `categories:"Extension Pack"` into the Extension search bar in VS Code. 

Some of my favorite extensions are:

* **[Azure Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-azureextensionpack)** by [Microsoft](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%22&target=VSCode&sortBy=Relevance). If you use Azure resources this is a must. We created this to organize the various Azure extensions into one place.  
* **[React Native iOS Pack](https://marketplace.visualstudio.com/items?itemName=bierner.react-native-ios-pack)** by [Matt Bierner](https://marketplace.visualstudio.com/search?term=publisher%3A%22Matt%20Bierner%22&target=VSCode). Matt has put together good tools for working with React Native, Objective-C, and Swift.  
* **[PHP Extension Pack](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-pack)** by [Felix Becker](https://marketplace.visualstudio.com/search?term=publisher%3A%22Felix%20Becker%22&target=VSCode). Felix has created a couple popular PHP extensions for VS Code. This is a simple pack he put together bundling them together. 
* **[Node Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)** by [waderyan](https://marketplace.visualstudio.com/search?term=publisher%3A%22Wade%20Anderson%22&target=VSCode). Disclaimer: shameless self promotion 😊. I created this extension to pull together my favorite Node.js extensions from previous blog posts. 

## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next roundup? Ping me on [Twitter](https://twitter.com/waderyan_)!

Wade Anderson, VS Code Team Member 
[@waderyan_](https://twitter.com/waderyan_)