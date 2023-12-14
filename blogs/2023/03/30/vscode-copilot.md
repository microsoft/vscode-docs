---
Order: 80
TOCTitle: VS Code and Copilot
PageTitle: Visual Studio Code and GitHub Copilot AI
MetaDescription: Learn about the Visual Studio Code team's experience and future with GitHub Copilot artificial intelligence
Date: 2023-03-30
Author: Chris Dias
---

# Visual Studio Code and GitHub Copilot

March 30, 2023 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

**AI did not write this blog post, but it will make your development experiences incredible.**

> **Note**: If you like to learn about the latest GitHub Copilot experience in Visual Studio Code, go to the [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/editor/github-copilot) topic, where you'll find details on the Copilot editor integration and Copilot Chat features such as inline Chat, the dedicated Chat view, and Quick Chat.

There is a lot of buzz, excitement, and some concerns around Artificial Intelligence today. Advancements are happening almost daily, it's hard to keep up. But once you give it a try, you quickly realize what more than a million Copilot users see daily, that this technology does not disappoint, especially with Large Language Models (LLMs) like OpenAI's GPT-3.5/4.

In this post, we want to give a little background on AI in VS Code, show you some exciting new experiences powered by GitHub Copilot, and give a peek into where and how we see things going forward.

## GitHub Copilot "V1"

Microsoft's Developer AI Service is [GitHub Copilot](https://github.com/features/copilot), and if you have not seen GitHub's vision for the entire development lifecycle, check out this great [blog post]( https://github.blog/2023-03-22-github-copilot-x-the-ai-powered-developer-experience).

It's been more than a year since the [Copilot extension]( https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) first launched. [Oege De Moor]( https://twitter.com/oegerikus) and his team at GitHub collaborated with OpenAI to bring the first at scale example of using LLMs for development, specifically [OpenAI's codex model]( https://openai.com/blog/openai-codex).

![Editor with Copilot generated ghost (faded) text suggestions](editor-ghost-text.png)

Copilot offers real-time hints for the code you are writing by providing suggestions as "ghost text" based on the context of the surrounding code. If you write your intentions as comments or use descriptive function names, Copilot can use these hints to automatically generate code, word by word, line by line, or even block by block.

This is a surprisingly effective experience, often the ghost text just works, and you quickly end up writing code in a smooth "Tab-Tab-Tab" development flow.

It turns out, this was just the beginning.

## In-Editor Chat

We knew it was just a matter of time before AI permeated the development process. We had been working with the GitHub Next team on Copilot and the [Copilot Labs extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-labs), but the release of ChatGPT in November 2022 significantly accelerated the timetable.

The VS Code team had an internal hackathon to explore how to integrate AI into VS Code more deeply and came up with many cool ideas such as improved renaming and refactorings, code transformations based on examples, and ways to create file glob patterns or regex expressions using natural language.

As interesting as these ideas were, we kept circling around the Chat experience. We had a healthy dose of skepticism. Did we really need yet another Chat experience in our lives? VS Code is an editor, our job is to get you into the "zone" and help you stay there by removing distractions while you crank out the next unicorn.

One exploration we did find interesting, involved building Chat directly into the editor. Here's the very first prototype:

![Prototype of a chat input in the editor](in-editor-chat-prototype.png)

As we iterated on the design, we realized this user model has advantages. It's easily invoked from the keyboard, you stay in your code, and the output is code (and only code).

In the example below, we first selected the `users` array and then pressed `kbstyle(Cmd+I)` on macOS (or `kbstyle(Ctrl+I)` on Windows/Linux) to bring up the Chat input. We then asked Copilot to split the `username` field into both `firstName` and `lastName`, and last we clicked on **Inline Diff** to see the changes Copilot made.

![Inline change with preview of update](inline-chat-preview.png)

No need to express your intentions to Copilot using a comment or an overly descriptive function name, just press `kbstyle(Cmd+I)` and describe what you want to do. Stay in the zone while the Copilot does the work.

## Embracing the Chat view

As the excitement around ChatGPT grew, so did the number of internal and external extensions with custom Chat views. We worried that these would not scale, it's hard to support the basics like key bindings and themes in a web view, and for those using the Monaco editor for code blocks, it is very hard to scale to hundreds of instances, not to mention there is no extension support in those editor instances. As a result, we partnered closely with the GitHub Copilot team to build a Chat view into the core of VS Code.

Over time and despite our initial hesitation, the full Chat view experience started to win us over. I mean, who doesn't want to start off their day with a greeting like this?

![A GitHub Copilot conversation within an extension's chat view](extension-chat-view.png)

We started to realize more and more benefits of a Chat view.

The most obvious value of an integrated experience over a browser-based chat is that we can provide context to the model, helping to ground the conversation and provide better answers. For example, you can't easily ask the browser-based ChatGPT to optimize code that spans multiple files. VS Code already knows a lot about the workspace as this is how you can do refactorings across files, **Find All References**, **Go to Definition**, and more. Key information can be responsibly embedded in the prompt so that the model can give more relevant answers, ultimately letting you ask Copilot to optimize or refactor code that has dependencies across multiple files.

Answers to many programming questions often include multiple steps. Think about how many blog posts walk you through a process - a Chat view is well suited for this type of interaction. A great example is debugging. If we're being honest (and we are), it isn't easy to configure `launch.json` and `tasks.json` for debugging. Instead of us writing more documentation or adding dialogs and wizardry to the editor, it turns out you can simply ask "/vscode add a `launch.json` and a `tasks.json`" which then provides instructions on how to create the files, content to add, and so on, until you are hitting breakpoints and inspecting variables like a boss.

![A GitHub Copilot chat asking how to add debugging support](add-debugging-support.png)

But perhaps the most important reason for integrating chat is because having a two-way conversation helps you decide what is right and what is wrong. Large language models are not perfect, and they don't "think". They simply figure out the next best word to respond with (granted, they are pretty good at this).

As the Pilot, you are always in charge, and you decide which of Copilot's suggestions to take and what code to bring into your workspace. The ability to ask clarifying questions or provide additional specifics helps you make those key decisions.

## Getting the most out of Copilot

Naming is hard (we should know, our product is called "Code"). However, "GitHub Copilot", is a great name. Rather than "pair programmer" or "auto pilot" or simply "chat", "Copilot" conveys multiple important concepts in a single word.

So, if you think of yourself as the Pilot of VS Code and GitHub Copilot as…well…the Copilot, you start to get a sense of how to think about the service and ways to interact with it to get the most from your seatmate.

* We can't repeat this enough: As the Pilot, you are in charge. You decide which suggestions to take and what code is integrated into your workspace.
* Copilot's primary job is to assist you, taking care of mundane or repetitive tasks. Let it write test cases, craft sample data, or scaffold out code based on existing patterns.
* Copilot can do more with more context. We're all accustomed to quick keyword-based web searches, but the more details you provide, the better results you will get. For example, instead of "Node Express TypeScript", ask Copilot to "scaffold out a Node.js website using the Express.js framework using TypeScript" and then iterate!
* You can scope interactions to specific topics by pressing `/` in the Chat input field. For example, to learn how to turn on or off breadcrumbs in the editor, type in `/vscode Turn off breadcrumbs`.

 ![Asking Copilot how to turn off VS Code breadcrumbs in the editor](turn-off-breadcrumbs.png)

* You can also use topics as shortcuts. Instead of typing "explain this code" in the inline chat, simply type "/" + `kbstyle(Tab)` (a shortcut to `/explain`) and hit `kbstyle(Enter)`. The Chat view will open with an explanation of the selected code.
* Know that Copilot isn't perfect and will give wrong answers. Ask clarifying questions to help decide which are right, which are wrong, and use the **Up/Down** vote buttons to help us improve the experience.
* Last and almost as important as the first tip, always greet your Copilot with a friendly "Hello" or "Good Morning", it will put both of you in a better mood.

## Getting started today

To see Copilot in action and get more tips on how to get the most out of Copilot, [check out this awesome introductory video](https://youtu.be/gDJzr9DBKTI) or dive into the full [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on Youtube.

The inline completions experience discussed above is available today. If you don't have Copilot through your organization, you can sign up [here](https://github.com/features/copilot) and start a free trial. From there:

* Open VS Code (even better, use [Insiders](https://code.visualstudio.com/insiders/)).
* Open the Extensions view (`kb(workbench.view.extensions)`), search for GitHub Copilot and install the extension.
* When prompted, authenticate with your GitHub ID.
* Open a code file and let the magic happen!

To access the chat experiences (in-editor, Chat view, Quick Chat), you'll need to install the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension:

* Open the Extensions view (`kb(workbench.view.extensions)`), search for the GitHub Copilot Chat extension.
* When prompted, authenticate with your GitHub ID.
* To open the in-editor Chat, optionally select a block of code and press `kb(inlineChat.start)`. Ask Copilot to write a Quick Sort function.
* A "Chat" icon will appear in the Activity Bar, click on it to open the Chat view. Go ahead, ask Copilot to "write a program to calculate the airspeed velocity of an unladen swallow".
* To try out Quick Chat, you can run **Chat: Open Quick Chat** or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

You can learn more about the GitHub Copilot and Copilot Chat extensions in the [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/editor/github-copilot) topic.

## Responsible AI

Monumental advancements in technology like this really are few and far between. We too believe AI is the next big shift that will transform how we think about, build, and use developer tools. It will ultimately enhance every aspect of the development process in ways we can only dream about today. We don't claim to be the first to say this, but soon we will all wonder how we ever built, debugged, deployed, and maintained applications and systems without AI powered tools.

AI is not perfect (neither are we!) and it will improve over time. Microsoft and GitHub Copilot follow [Responsible AI](https://www.microsoft.com/ai/responsible-ai) principles and employ controls to ensure that your experience with the service is appropriate, pleasant, and useful. We understand there is hesitation and concern surrounding the rapid expansion of AI's capabilities, and fully respect those who don't want or can't use Copilot.

## Connecting the dots

The combination of a Chat assistant, in-editor Chat, and inline completions let you leverage the power of Copilot no matter what coding "zone" you are in. Just getting started or have questions? Use the Chat view. Furiously writing code and want to do some refactoring, updating, or scaffolding? Smash `kbstyle(Ctrl+I)` and ask Copilot to do it for you. Working your way through a problem step by step? Use inline completions to Tab-Tab-Tab your way to success.

Integrating Chat into VS Code, powered by GitHub Copilot, is just one step on a journey. We will continue to explore additional "inner loop" scenarios such as using natural language to describe search patterns or code generation, automatic generation of commit messages and pull request descriptions, smarter code renaming, refactoring, transformations, and more.

Follow along on [GitHub](https://github.com/microsoft/vscode), [Twitter](https://twitter.com/code), and [YouTube](https://www.youtube.com/@code). Let us know what you think and what ideas you have for AI in VS Code.

Thanks,

Chris and the VS Code team

Happy **Smart** Coding!
