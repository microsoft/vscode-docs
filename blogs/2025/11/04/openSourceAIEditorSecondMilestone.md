---
Order: 109
TOCTitle: "Open Source AI Editor: Second Milestone"
PageTitle: "Open Source AI Editor: Second Milestone"
MetaDescription: Ghost text suggestions are now open source as part of the Copilot Chat extension - the second milestone in making VS Code an open source AI editor.
MetaSocialImage: copilot-oct-pr.png
Date: 2025-11-06
Author: The VS Code team
---

# Open Source AI Editor: Second Milestone

November 6th, 2025 by the VS Code Team

In [May](https://code.visualstudio.com/blogs/2025/05/19/openSourceAIEditor), we announced our initial plan to make VS Code an open source AI editor, and in [June](https://code.visualstudio.com/blogs/2025/06/30/openSourceAIEditorFirstMilestone), we reached our first milestone by open sourcing the GitHub Copilot Chat extension.

While chat was a significant step forward, an important part of our AI functionality still remained: the inline suggestions that appear as you type. Today, we're reaching that next milestone in our journey: **inline suggestions are now open source**.

![PR to OSS suggestions](copilot-oct-pr.png)

## One extension, same user experience

For the past few years, GitHub Copilot in VS Code has been split across two extensions: the GitHub Copilot extension (for ghost text suggestions) and the GitHub Copilot Chat extension (for chat and next edit suggestions). **We are working towards providing all Copilot functionality in a single VS Code extension: Copilot Chat.**

To achieve this, we are now testing disabling the Copilot extension and serving all inline suggestions from Copilot Chat. We have [ported the vast majority of features into the chat extension](https://github.com/microsoft/vscode-copilot-chat/pull/1493), so the [progressive rollout](https://github.com/microsoft/vscode/issues/274783) of a single extension experience should feel consistent and transparent to everyone.

**Nothing should change in your experience.** You'll continue to get the same intelligent code suggestions as you type, plus all the chat and agent mode features you're already using. If you encounter any problems, please [report an issue](https://github.com/microsoft/vscode/issues) or see [how to use the previous experience](#troubleshooting) if needed.

As part of this refactoring, **the GitHub Copilot extension will be deprecated by early 2026**, which means it will be removed from the VS Code Marketplace.

We've also [simplified our terminology](https://github.com/microsoft/vscode-docs/pull/9000): we now use **inline suggestions** to refer to all AI-generated code suggestions that appear as you type (including ghost text and next edit suggestions). We continue working to unify the actual product experiences as well, including the UX and timing for different kinds of suggestions.

## Explore and contribute

With inline suggestions available in the [vscode-copilot-chat repository](https://github.com/microsoft/vscode-copilot-chat/tree/main/src/extension/completions-core), you can explore and contribute to how they work:

![Flow diagram displaying how inline suggestions work](inline-suggestions-chart.png)

1. **["Typing-as-suggested" detection](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/ghostText/current.ts)** - As you type, the extension first checks if you're following a previous suggestion and can continue showing it without making a new request
2. **[Caching](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/ghostText/completionsCache.ts)** - If not typing as suggested, the extension checks if cached suggestions can be reused to improve performance
3. **[Reusing ongoing requests](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/ghostText/asyncCompletions.ts)** - If no cached suggestions are available, the extension checks if there's an ongoing LLM request from the previous keystroke that hasn't finished streaming back yet. Since this ongoing request is likely similar to the current request, the extension reuses it instead of firing off a new request and canceling the ongoing one, which significantly improves performance
4. **[Prompt construction](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/prompt/prompt.ts)** - If no ongoing request can be reused, the extension gathers relevant context from your current file, open files, and workspace, then formats it into a prompt to send to the LLM
5. **[Model inference](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/inlineEdits/vscode-node/inlineCompletionProvider.ts)** - The extension requests inline suggestions from multiple providers: [ghost text suggestions](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions/vscode-node/completionsProvider.ts) for the current cursor position, and [next edit suggestions](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/inlineEdits/node/nextEditProvider.ts) that predict where you might edit next. Ghost text suggestions at the cursor are prioritized when available; otherwise, next edit suggestions are used
6. **[Post-processing](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/suggestions/suggestions.ts)** - Raw model outputs are refined to ensure they fit your code style, indentation, and syntax
7. **[Multi-line intelligence](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/extension/completions-core/vscode-node/lib/src/ghostText/blockTrimmer.ts)** - The extension decides whether to show a single line or multiple lines, based on confidence and context

### Performance improvements

Along with consolidating into a single extension, this refactoring has led to technical improvements to inline suggestions:

* **Reduced latency** - We fixed networking issues to optimize how suggestions are delivered, enabling the chat extension to serve ghost text faster
* **Quality validation** - We ran extensive experiments to ensure there are no regressions in either latency or suggestion quality

### Troubleshooting

As with all changes, despite our best efforts, there is a chance that we missed something! If you encounter any issues with the unified extension experience, you can temporarily revert to the previous two-extension behavior by unchecking the unification setting:

![VS Code setting for extension unification](unify-setting.png)

## What's next?

The next phase of our OSS journey is to refactor some AI features and components from the Copilot Chat extension into VS Code core. We're excited to continue this journey with the community and shape the future of development as an open source AI editor.

We'll continue actively improving our inline suggestions experiences - as always, you can follow along on [our iteration plans](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22iteration-plan%22) for the latest:

![Inline suggestions section of the October 2025 VS Code iteration plan](iteration-plan-oct.png)

We welcome your feedback and [contributions](https://github.com/microsoft/vscode-copilot-chat/blob/main/CONTRIBUTING.md). Feel free to [open pull requests](https://github.com/microsoft/vscode-copilot-chat/pulls) and [file issues](https://github.com/microsoft/vscode/issues).

Happy coding! 💙

The VS Code Team