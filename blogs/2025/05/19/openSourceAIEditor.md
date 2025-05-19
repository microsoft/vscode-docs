---
Order: 99
TOCTitle: Open Source AI Editor
PageTitle: "VS Code: Open Source AI Editor"
MetaDescription: We will open source the GitHub Copilot Chat extension. It’s the next step towards making VS Code an open source AI editor.
MetaSocialImage: open_source_ai_editor.png
Date: 2025-05-19
Author: The VS Code team
---

# VS Code: Open Source AI Editor

May 19th, 2025 by the VS Code team

We believe that the future of code editors should be open and powered by AI. For the last decade, VS Code has been one of the [most successful OSS projects on GitHub](https://github.blog/news-insights/octoverse/octoverse-2024/#the-state-of-open-source). We are grateful for our vibrant community of contributors and users who choose VS Code because it is open source. As AI becomes core to the developer experience in VS Code, we intend to stay true to our founding development principles: open, collaborative, and community-driven.

We will open source the code in the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) under the MIT license, then carefully refactor the relevant components of the extension into VS Code core. This is the next and logical step for us in making **VS Code an open source AI editor**. It’s a reflection that AI-powered tools are core to how we write code; a reaffirmation of our belief that working in the open leads to a better product for our users and fosters a diverse ecosystem of extensions.

## Why open source now?

Over the last few months, we’ve observed shifts in AI development that motivated us to transition our AI development in VS Code from closed to open source:

* Large language models have significantly improved, mitigating the need for “secret sauce” prompting strategies.
* The most popular and effective UX treatments for AI interactions are now common across editors. We want to enable the community to refine and build on these common UI elements by making them available in a stable, open codebase.
* An ecosystem of open source AI tools and VS Code extensions has emerged. We want to make it easier for these extension authors to build, debug, and test their extensions. This is especially challenging today without access to the source code in the Copilot Chat extension.
* We’ve gotten a lot of questions about the data that is collected by AI editors. Open sourcing the Copilot Chat extension enables you to see the data we collect, increasing transparency.
* Malicious actors are increasingly targeting AI developer tools. Throughout VS Code’s history as OSS, community issues and PRs have helped us find and fix security issues quickly.

## Next steps

In the coming weeks, we will work to open source the code in the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) and refactor AI features from the extension into VS Code core. Our core priorities remain intact: delivering great performance, powerful extensibility, and an intuitive, beautiful user interface.

Open source works best when communities build around a stable, shared foundation. Thus, our goal is to make contributing AI features as simple as contributing to any part of VS Code. The stochastic nature of large language models makes it especially challenging to test AI features and prompt changes. To ease this, we will also make our prompt test infrastructure open source to ensure that community PRs can build and pass tests.

As usual, you can follow along on [our iteration plan](https://github.com/microsoft/vscode/issues/248627), where we will provide more information on this work. We will also keep [our FAQ](https://code.visualstudio.com/docs/supporting/FAQ) updated with answers to questions from the community. [We welcome your feedback](https://github.com/microsoft/vscode/issues) as we bring this vision to life.

We’re excited to shape the future of development as an open source AI editor - and we hope you’ll join us on this journey to build in the open.

Happy coding!

The VS Code team
