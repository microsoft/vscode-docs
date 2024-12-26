---
Order: 89
TOCTitle: Introducing Copilot Edits
PageTitle: Introducing Copilot Edits
MetaDescription: Copilot Edits allows you to get to the changes you need in your workspace, across multiple files, using a UI designed for fast iteration. You can specify a set of files to be edited, and then use natural language to simply ask Copilot what you need. You stay in the flow of your code while reviewing the suggested changes, accepting what works, and iterating with follow-up asks.
Date: 2024-11-12
Author: Isidor Nikolic
---

# Introducing Copilot Edits (preview)

November 12th, 2024 by [Isidor Nikolic](https://x.com/isidorn)

Until recently, you could use GitHub Copilot in VS Code in two separate ways. You could modify code inside the editor using completions or Inline Chat. Or you could use Copilot to ask questions about your code in the Chat view. Copilot Edits, a preview feature, is a brand new way of using Copilot in VS Code. It combines the best of Chat and Inline Chat: the conversational flow and the ability to make inline changes across of set of files that you manage. And it just works.

<video src="blog-video-demo.mp4" title="Copilot Edits video" autoplay muted controls></video>

## Designed for iteration across multiple files

In Copilot Edits you specify a set of files to be edited, and then use natural language to ask Copilot what you need. Copilot Edits makes inline changes in your workspace, across multiple files, using an UI designed for fast iteration. You stay in the flow of your code while reviewing the suggested changes, accepting what works, and iterating with follow-up asks.

![Screenshot of the Copilot edits, and the proposed inline changes](copilot-edits.png)

Copilot Edits works because it puts you in control, from setting the right context to accepting changes, and not because it relies on an advanced model that never makes a mistake. And the experience is iterative: when the model gets it wrong, you can review changes across multiple files, accept good ones and iterate until, together with Copilot, you arrive at the right solution. When accepting changes, you can run the code to verify the changes and, when needed, Undo in Copilot Edits to get back to a previous working state.

## Stay in control

There is a new UI concept – the Working Set - that puts you in control and allows you to define on what files the edits need to be applied. You can also add files to the working set by dragging and dropping files or editor tabs, or by pressing `#` to explicitly add them. Copilot Edits automatically adds your active editors across editor groups to the Working Set.

![Screenshot of the Working Set, showing the user adding index.js](working-set.png)

Working Sets, together with the Undo and Redo functionality, gives you precise control over changes and allows you to decide exactly where and how to apply them. Copilot Edits shows the generated edits in-place right in your code and provides you with a code review flow, where you can accept or discard each of the AI-generated edits. Copilot Edits will not make changes outside of the Working Set – the only exception being when it proposes to create a new file.

![Screenshot of the inline changes, showing the Accept / Discard widget](changes.png)

Copilot Edits is in the Secondary Side Bar (default on the right) so that you can interact with views in the Primary Side Bar, such as the Explorer, Debug, or Source Control view, while you’re reviewing proposed changes. For example, you can have unit tests running in the [Testing](https://code.visualstudio.com/docs/editor/testing) view on the left, while using the Copilot Edits view on the right, so that in every iteration you can verify if the changes Copilot Edits proposed are passing the unit tests.

Using your [voice](https://code.visualstudio.com/docs/editor/voice) is a natural experience while using Copilot Edits. Just talking to Copilot makes the back-and-forth smooth and conversational. It almost feels like interacting with a colleague that is an area expert, using the same kind of iterative flow that you would use in real life pair programming.

Copilot Edits makes code editing with AI accessible to users with varying skills. As a product manager at Microsoft, I can quickly iterate on early ideas with Copilot Edits without much coding. For my VS Code engineering colleagues, Copilot Edits helps them to easily create complex refactorings across multiple files in the [vscode repo](https://github.com/microsoft/vscode). For example, one team member who had zero Swift experience, created a custom macOS app from scratch using Copilot Edits – after each iteration they ran the app, identified what was not working, and gave Copilot Edits appropriate follow-up instructions.

## Under the covers

Copilot Edits leverages a dual-model architecture to enhance editing efficiency and accuracy. First, a foundation language model considers a full context of the Edits session to generate initial edit suggestions. You can choose the foundation language model that you prefer between: GPT-4o, o1-preview, o1-mini, and Claude 3.5 Sonnet. For a performant experience, the team developed a speculative decoding endpoint, optimized for fast application of changes in files. The proposed edits from the foundation model are sent to the speculative decoding endpoint that will then propose those changes inline in the editor. The speculative decoding endpoint is faster than a regular model, but the team knows it can be even faster and is working on improving this, so stay tuned.

## Available today

Copilot Edits is in preview and available to all [GitHub Copilot]( https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) users today! The feedback that you provided in the past [#1](https://github.com/microsoft/vscode-copilot-release/issues/95) and [#2](https://github.com/microsoft/vscode-copilot-release/issues/1098), was instrumental in shipping this feature, so a big thank you!

For a detailed overview of Copilot Edits please read the [official docs](https://code.visualstudio.com/docs/copilot/copilot-edits).

Next, the team plans to improve the performance of the apply changes speculative decoding endpoint, support transitions into Copilot Edits from Copilot Chat by preserving context, suggest files to the Working Set, and to allow Undo of suggested chunks.
If you want to be among the first to get your hands on these improvements make sure to use [VS Code Insiders]( https://code.visualstudio.com/insiders/) and the pre-release version of the [GitHub Copilot Chat]( https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension. To help improve the feature, please file issues in [our repo](https://github.com/microsoft/vscode-copilot-release).

Ultimately, it’s not just about the Copilot Edits itself but what it helps you build.

Happy coding!

Isidor
