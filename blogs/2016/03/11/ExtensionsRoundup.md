---
Order: 4
TOCTitle: Extensions Roundup
PageTitle: Visual Studio Code Extensions
MetaDescription: New, useful, and interesting extensions in Visual Studio Code. 
Date: 2016-03-11
ShortDescription: New, useful, and interesting extensions in Visual Studio Code.
Author: Wade Anderson
---

# VS Code Extensions

Three months have passed since we open sourced VS Code and introduced the [extensions API](http://code.visualstudio.com/docs/extensionAPI/vscode-api). 
The [Extensions Marketplace](https://marketplace.visualstudio.com/VSCode) has over 850 extensions. Many new languages and frameworks are now supported.

We will continue to iterate on improving the API and we would love your [feedback](https://github.com/Microsoft/vscode/issues). If extensions are new to 
you, check out the [docs](http://code.visualstudio.com/docs/editor/extension-gallery) for instructions on finding and installing new extensions. We are invested
in empowering the community to make VS Code the world's greatest code editor.

In the spirit of one of our [favorite curated extensions list](https://github.com/viatsko/awesome-vscode), we want to give you regular updates on what is happening in the [VS Code Extensions Marketplace](https://marketplace.visualstudio.com/VSCode). 

## Ruby - Provides Ruby language and debugging support

[Extension details in Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby). 

Ruby is a popular request on [User Voice](https://visualstudio.uservoice.com/forums/293070-visual-studio-code?query=ruby), with a handful of extensions
in the [marketplace](https://marketplace.visualstudio.com/search?term=ruby&target=VSCode&sortBy=UpdatedDate). We've enjoyed playing with one of the latest
Ruby extensions that provides debugging support. The setup is simple and is contained
in the extension's README. 

**Install Ruby Dependencies**

Instructions for various Ruby versions. I am using Ruby v2.0.x.
1. In the terminal type `gem install ruby-debug-ide -v 0.4.32`
2. In the terminal type `gem install debase -v 0.2.1`

**Configure Launch.json in VS Code**

1. Create .vscode folder under the root directory of your project (if its not already there).
2. Create launch.json in .vscode/ like below

```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "name": "Ruby Debug",
          "type": "Ruby",
          "request": "launch",
          "program": "${workspaceRoot}/hello_world.rb",
          "stopOnEntry": false
      }
  ]
}
```

**Write Code and Debug**

Below is a simple Hello World script. I set a break point, start the debugger, and hit the breakpoint. I can then step through the code and use the Debug Console. 

![Ruby Debugging](2016_03_11_ruby_debugging.gif)

## yo - Scaffold projects using Yeoman

Use Yeoman within VS Code's command palette. [See more details in Marketplace](https://marketplace.visualstudio.com/items?itemName=samverschueren.yo). 

![Yo Demo](2016_03_11_yo_demo.gif)

## change-case - Quickly change the case of the current selection

Change the case of the currently selected word or selection. Implemented as a wrapper around
[node-change-case](https://github.com/blakeembrey/node-change-case). [See more details in Marketplace](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case). 

![change-case demo](2016_03_11_change-case_demo.gif)

Subscribe to the RSS feed to get more updates on extensions. If you have an extension you 
really like and want to see it featured here, send us a [tweet](https://twitter.com/code). 

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)