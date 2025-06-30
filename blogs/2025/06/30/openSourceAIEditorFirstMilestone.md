---
Order: 102
TOCTitle: "Open Source AI Editor: First Milestone"
PageTitle: "Open Source AI Editor: First Milestone"
MetaDescription: We are open sourcing the GitHub Copilot Chat extension. It’s the first milestone in making VS Code an open source AI editor.
MetaSocialImage: open_source_ai_editor.png
Date: 2025-06-30
Author: The VS Code team
---

# Open Source AI Editor: First Milestone

June 27th, 2025 by the VS Code Team

Last month we shared our plan to make [**VS Code an open source AI editor**]( https://code.visualstudio.com/blogs/2025/05/19/openSourceAIEditor). Today we reached the first milestone: the GitHub Copilot Chat extension is now [open source on GitHub](http://github.com/microsoft/vscode-copilot-chat) under the MIT license.

## Why open source?

As we [outlined previously](https://code.visualstudio.com/blogs/2025/05/19/openSourceAIEditor), our primary motivation is community-driven innovation and increasing data transparency. We believe AI experiences can thrive by leveraging the vibrant open-source community - just as VS Code has successfully done over the past decade. As AI is becoming an integral part of the modern coding experience, it should be developed openly alongside VS Code itself.

## Explore and contribute

Now that the code is open source, what does it mean for you? Explore the codebase and learn how agent mode is implemented, what context is sent to LLMs, and how we engineer our prompts. Everything, from our system prompts, implementation details, to the telemetry we capture, is available in all transparency. In fact, why not use agent mode itself for helping you understand and explore the codebase!

We welcome your feedback and [contributions](https://github.com/microsoft/vscode-copilot-chat/blob/main/CONTRIBUTING.md)! Feel free to [open pull requests]( https://github.com/microsoft/vscode-copilot-chat/pulls) and [file issues](https://github.com/microsoft/vscode/issues). Note, that we’re tracking issues in the [vscode repo](https://github.com/microsoft/vscode/issues), as our long-term goal is to integrate the code from `vscode-copilot-chat` into the VS Code core codebase.

Have additional questions? Check out [our FAQ]( https://code.visualstudio.com/docs/supporting/FAQ).

## What’s next?

Next, we will carefully refactor the relevant components of the extension into VS Code core. The [original GitHub Copilot extension]( https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) that provides inline completions remains closed source – but in the following months we plan to have that functionality be provided by the open sourced [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Also, we are excited to partner with the open source AI community to make sure our plan covers impactful open source scenarios.

Our core priorities remain intact: delivering great performance, powerful extensibility, and an intuitive, beautiful user interface.

We’re excited to shape the future of development as an open source AI editor, and we hope you’ll join us on this journey to build in the open.

Happy Coding!

The VS Code Team
