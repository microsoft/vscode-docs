---
Order:
TOCTitle: Extensions Roundup
PageTitle: Visual Studio Code Extensions Roundup
MetaDescription: New, useful, and interesting extensions in Visual Studio Code.
Date: 2016-03-17
ShortDescription: New, useful, and interesting extensions in Visual Studio Code.
Author: Wade Anderson
---

# VS Code Extensions

March 17, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

In November 2015, we open sourced Visual Studio Code and introduced the [extensions API](https://code.visualstudio.com/docs/extensionAPI/vscode-api). The VS Code extensions [Marketplace](https://marketplace.visualstudio.com/VSCode) has over 850 extensions. Many new languages (Go, PowerShell, PHP, Python) and frameworks (Apache Cordova, React Native) are now supported.

We will continue to iterate on improving the API and we would love your [feedback](https://github.com/Microsoft/vscode/issues). If you are new to VS Code extensions, check out the [docs](https://code.visualstudio.com/docs/editor/extension-gallery) for instructions on finding and installing new extensions. We are invested in empowering the community to make VS Code the world's greatest code editor.

In the spirit of a great [curated extensions list](https://github.com/viatsko/awesome-vscode), we wanted to give you regular updates on what is happening in the VS Code extensions [Marketplace](https://marketplace.visualstudio.com/VSCode).

## Ruby by Peng Lv

Ruby language support is a popular request on [UserVoice](https://visualstudio.uservoice.com/forums/293070-visual-studio-code?query=ruby), with a handful of extensions
in the [Marketplace](https://marketplace.visualstudio.com/search?term=ruby&target=VSCode&sortBy=UpdatedDate). We've enjoyed playing with this [Ruby extension](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) that provides language and debugging support. The setup is simple and is contained in the extension's [README](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby).

### Install Ruby Dependencies

Here are the instructions for various Ruby versions. I am using Ruby v2.0.x.

1. In the terminal, type `gem install ruby-debug-ide -v 0.4.32`.
2. In the terminal, type `gem install debase -v 0.2.1`.

### Configure Launch.json in VS Code

Create a `launch.json` file in `.vscode` folder and add the following:

```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "name": "Ruby Debug",
          "type": "Ruby",
          "request": "launch",
          "program": "${workspaceFolder}/hello_world.rb",
          "stopOnEntry": false
      }
  ]
}
```

### Write Code and Debug

Below is an example session debugging a simple Hello World Ruby script. You can see setting a breakpoint, starting the debugger, hitting the breakpoint, and single stepping through the code.

![Ruby Debugging](ruby_debugging.gif)

## yo by Sam Verschueren

This extension lets you use the Yeoman scaffolding tool from within VS Code in the Command Palette. Your installed Yeoman generators are displayed in a drop down and you answer the Yeoman terminal prompts right from within VS Code. [See more details at the Marketplace](https://marketplace.visualstudio.com/items?itemName=samverschueren.yo).

![Yo Demo](yo_demo.gif)

## change-case by wmaurer

Change the case of the currently selected word or selection. This [extension](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case) is implemented as a wrapper around the [node-change-case](https://github.com/blakeembrey/node-change-case) npm module.

![change-case demo](change-case_demo.gif)

## Subscribe

Subscribe to the VS Code [RSS feed](feed.xml) to get more updates on extensions.

And if you have an extension you really like and want to see it featured here, send us a [Tweet](https://twitter.com/code).

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)
