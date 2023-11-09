---
Order: 84
TOCTitle: Smart AI in VS Code
PageTitle: Smart AI in VS Code
MetaDescription: Smart artificial intelligence features in Visual Studio Code with GitHub Copilot
Date: 2023-11-13
Author: Chris Dias
---
# Smart AI in VS Code

November 13, 2023 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

**The pursuit of "wicked smart" AI in VS Code**

If you tuned into [GitHub Universe](https://githubuniverse.com) last week, you saw a tremendous amount of progress, innovation, and vision for AI across the entire developer workflow. What we want to do in this blog post is focus in on the advancements around Visual Studio Code over the past few months helping to realize this broader vision.

## "Wicked smart"

## Agents

### @workspace

The `@workspace` agent knows how to gather context about the code in your workspace, can help you navigate it, find relevant classes, files, etc. Let’s say I am in the [VS Code repository](https://github.com/microsoft/vscode) and I want to find out more about running extensions; I can use the agent like this:

![@workspace agent answering question about detecting running extensions](workspace-agent-example.png)

### @vscode

![@vscode agent answering question about preview editors](vscode-agent-example.png)

## Slash commands

Agents can also contribute what we call "slash commands", which are essentially shortcuts to specific functionality. One of the tasks when answering questions is to determine the intent, understanding what you want to do.

We can infer that "Node.js Express Pug TypeScript" **might** mean that I want a new project, but `@workspace /new node.js Express Pug TypeScript` is explicit.

![New slash command](new-slash-command.png)

Once the intent is clear, we have a much better chance of addressing the user’s needs, despite the inherent ambiguity of natural language. We can ask for a directory structure, you can click on the files to preview them, and we can provide a **Create Workspace** button that will generate the files in a new folder.

![@workspace /new results displaying project tree and Create Workspace button](create-workspace-tree-button.png)

When you type `/`in the Chat view, all the shortcut commands are displayed along with the agent providing those shortcuts.

![Slash command list](slash-command-list.png)

## Generate commit and pull request messages

![Source Control input box with sparkle to generate commit message](generate-commit-message.png)

Copilot fills the message in for me. Nice. Let’s keep going though and make a pull request. I have the [GitHub Pull Request and Issues extension]( GitHub Pull Requests and Issues - Visual Studio Marketplace) installed, which is aware of the presence of the Copilot Chat extension. When I make a PR, there is another sparkle icon next to the message and description. Click on it and Copilot writes a nice description automatically!

![GitHub Pull Request and Issue extension Create view with sparkle to generate title and description](generate-pr-title-description.png)

## Extensibility

## Say what?

The new [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension brings voice to text support to VS Code. Once installed, you’ll see a microphone icon in all the natural language input dialogs. Click it, ask Copilot your question, and

![Copilot chat input box with Speech extension microphone button](speech-extension-microphone.png)

How do ya like them apples!? I told you my boy’s wicked smart!

![Copilot chat answer to best code editor for node and express app](best-editor-answer.png)

The extension is still in preview and only supports English right now, but we’ll continue to update it with new languages and capabilities over the coming months.

## Work smarter, not harder

Most everything we’ve seen so far has been about code generation, understanding, and fixing. Copilot excels in these scenarios, but our [vision for AI in VS Code](https://code.visualstudio.com/blogs/2023/03/30/vscode-copilot#_connecting-the-dots) is that it permeates everything that you do day to day, but in a way that naturally fits into the product. You shouldn’t have to relearn the tools to take advantage of AI.

Thanks!

Chris and the VS Code team

Happy **Smart** Coding!
