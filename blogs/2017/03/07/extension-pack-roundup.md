---
Order: 26
TOCTitle: Extension Packs
PageTitle: Visual Studio Code Extension Packs
MetaDescription: Learn how to create and use Extension Packs in Visual Studio Code.
Date: 2017-03-07
ShortDescription: Learn how to create and use Extension Packs in Visual Studio Code.
Author: Wade Anderson
---
# Extension Packs

March 07, 2017 Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

If you have followed our blog for the last year, you'll notice I write an Extension Roundup blog once a month. I like to write these blogs to let you know about the cool extensions being created in the community and to inspire you to create your own. I often put a theme around the Roundup blog: something like JavaScript extensions or CodeLens extensions (last month).

Creating a theme for this blog is a natural fit for a relatively new part of the extension API, Extension Packs. Last month I created my [first Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.code-lens-roundup) to bring together all of my favorite CodeLens extensions. In this month's Roundup, I want to teach you how to make your own pack and give you some examples of why you would want to.

> **Tip** Refer to the [Extension Pack documentation](https://code.visualstudio.com/docs/extensionAPI/extension-manifest#_extension-packs) for more details.

## How do I make an Extension Pack?

It is very easy to make your own Extension Pack. Follow the instructions on installing the Yeoman VS Code [extension generator](https://code.visualstudio.com/docs/extensions/yocode).

Once the Yeoman generator is installed, run the following command:

```zsh
yo code
```

Choose `New Extension Pack` as shown in the image below.

![new extension pack](create_extension_pack.png)

Fill out the options as given by Yeoman. One of the options is to create an Extension Pack based on the extensions you currently have installed. This will fill out much of the Extension Pack's details for you!

To include an extension, your extension manifest file (`package.json`) needs the following attribute:

```js
"extensionDependencies": [
        "publisherid.extensionName"
    ]
```

> **Tip** You can see the publisherid.extensionName at the end of the URL of an extension on the Marketplace.

For my CodeLens Roundup, this is what my extension manifest file looked like:

```json
"extensionDependencies": [
    "eamodio.gitlens",
    "VisualStudioOnlineApplicationInsights.application-insights",
    "kisstkondoros.vscode-codemetrics",
    "chrmarti.regex",
    "pflannery.vscode-versionlens"
]
```

## Why would I want to create an Extension Pack?

There are many reasons to create an Extension Pack:

- Want to create a list of your favorite extensions to share with your friends? Use an Extension Pack.
- Want to bundle your Python extensions, so you can easily disable and enable when you are working on a Python project? Use an Extension Pack.
- Want to create a curated list of extensions for a blog post on VS Code's website? Use an Extension Pack.

## Recommended Extension Packs

You can find the Extension Packs that others have created by querying using the Extension Pack category: click [here](https://marketplace.visualstudio.com/search?target=vscode&category=Extension%20Packs&sortBy=Downloads) for the Marketplace or type `category:"Extension Packs"` into the Extension View search bar in VS Code.

Some of my favorite extensions are:

* **[Azure Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-azureextensionpack)** by [Microsoft](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%22&target=VSCode&sortBy=Relevance). If you use Azure resources, this is a must. We created this pack to group the various Azure extensions into one installation.
* **[React Native iOS Pack](https://marketplace.visualstudio.com/items?itemName=bierner.react-native-ios-pack)** by [Matt Bierner](https://marketplace.visualstudio.com/search?term=publisher%3A%22Matt%20Bierner%22&target=VSCode). Matt has put together good tools for working with React Native, Objective-C, and Swift.
* **[PHP Extension Pack](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-pack)** by [Felix Becker](https://marketplace.visualstudio.com/search?term=publisher%3A%22Felix%20Becker%22&target=VSCode). Felix has created a couple popular PHP extensions for VS Code. This is a simple pack he made to bundle them together.
* **[Node.js Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)** by [waderyan](https://marketplace.visualstudio.com/search?term=publisher%3A%22Wade%20Anderson%22&target=VSCode). Disclaimer: Shameless self-promotion 😊. I created this extension to pull together my favorite Node.js extensions from previous blog posts.

## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next Roundup? Ping me on [Twitter](https://twitter.com/waderyan_)!

Wade Anderson, VS Code Team Member 
[@waderyan_](https://twitter.com/waderyan_)