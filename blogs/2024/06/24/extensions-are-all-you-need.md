---
Order: 88
TOCTitle: Copilot extensions are all you need
PageTitle: GitHub Copilot Extensions are all you need
MetaDescription: Learn how to extend GitHub Copilot by using the Chat and Language Model APIs in your Visual Studio Code extension. Get inspired by early adopters and their extensions.
Date: 2024-06-24
Author: Isidor Nikolic
---

# GitHub Copilot Extensions are all you need

June 24, 2024 by Isidor Nikolic, [@isidorn](https://x.com/isidorn)

In 2017, Google researchers introduced the concept of *transformers* in their seminal paper, ["Attention is All You Need"](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf). These types of models, which prioritize information similarly to human focus, are the foundation of today’s modern language models, such as the ones that power GitHub Copilot.

The same way that transformers were transformative (sorry) for AI, we believe GitHub Copilot Extensions will ultimately deliver on the full promise of AI for developers.

VS Code is one of the most widely used developer tools in history. This popularity is largely due to the vast ecosystem of extensions that have been contributed by the community. If you’re a VS Code user, you can probably list right off the top of your head a handful of extensions that you cannot live without. Imagine the possibilities if those extensions would leverage the power of AI and GitHub Copilot.

The true power of AI is unlocked when it knows about your specific context. And VS Code has that knowledge. Extensions can use the VS Code API to harness this context and deliver the best, most relevant AI-driven answers and interactions right in VS Code where all the developers are already.

In this post, we’ll look at the new APIs that empower extensions to interact directly with Language Models and the Chat experience contributed by GitHub Copilot. We’ll look at how you can start building with these APIs today, and we’ll showcase a few early adopters that have started to take advantage of these APIs to enrich their extension.

## Chat and Language Model APIs

This year at Build, we announced a new set of APIs for GitHub Copilot in VS Code:

* [Chat API](https://code.visualstudio.com/api/extension-guides/chat)

* [Language Model API](https://code.visualstudio.com/api/extension-guides/language-model)

Make sure to watch our Build session about [Enhancing VS Code extensions with GitHub Copilot](https://www.youtube.com/watch?v=YI7kjWzIiTM) to learn all about these APIs.

You might be most familiar with using LLMs through a chat interface. One way for your extension to leverage the power of GitHub Copilot is to build a **chat participant** that users can interact with in the Chat view inside VS Code. You can create a chat participant with the [Chat API](https://code.visualstudio.com/api/extension-guides/chat), and use the Language Model API to process natural language and formulate a response to the user query. Learn more about the [Chat API](https://code.visualstudio.com/api/extension-guides/chat) in our extension guide that uses a `@cat` code mentor as an example for the new API concepts.

![Screenshot of the Chat view in VS Code, showing the cat sample participant.](chat-extension-sample.png)

With the [Language Model API](https://code.visualstudio.com/api/extension-guides/language-model), you can now directly access and take advantage of large language models (or LLMs, for short) contributed by GitHub Copilot in your own extensions. Just select the model you want to use, build a prompt, and fire off a request to the chosen model. And by using the VS Code APIs, you can add the relevant context to the prompt. For example, by including the content of the current file or the technology stack being used.

The Language Model API   can also be used to enhance the developer experience in all parts of the editor, not just the Chat view. You can contribute an action that uses the Language Model API to all the contributable surfaces of VS Code, such as the editor context menu. For example, the Source Control view uses the Language Model API to allow users to [generate a commit message](https://code.visualstudio.com/updates/v1_84#_commit-message-generation), based on source code changes. Another example is the Copilot-powered rename functionality, where the language model provides symbol rename suggestions based on the context of the code .

![Screenshot of the Copilot-powered rename functionality in the VS Code editor.](copilot-powered-rename.png)

Learn more about the [Language Model API](https://code.visualstudio.com/api/extension-guides/language-model) in our extension guide.

We believe that the most delightful user experiences will arise from combining Chat and Language Model APIs with the robust suite of VS Code APIs. Extension authors should leverage these tools creatively, going beyond simple question-answer bots to develop rich, integrated interactions within VS Code that use the right user context. Users appreciate seamless and powerful interactions within their workflows. These new APIs enable extensions to boost their user’s productivity by integrating AI features directly into VS Code.

## GitHub Apps

Alternatively, you can extend GitHub Copilot by creating a GitHub App that contributes  a chat participant in the Chat view. A GitHub App is backed by a service and works across all GitHub Copilot surfaces, such as github.com, Visual Studio, or VS Code. GitHub Apps do not have full access to the VS Code API. To extend GitHub Copilot through a GitHub App, you should join the [Copilot Partner Program](https://github.com/features/preview/copilot-partner-program).

We announced GitHub Copilot Extensions via GitHub Apps at the Microsoft Build conference, and we are already seeing some great extensions on the [GitHub Marketplace](https://github.com/marketplace?type=apps&copilot_app=true).

Watch our Build session about [extending GitHub Copilot](https://www.youtube.com/watch?v=RXaLlCeaBIA) to see it in action.

## VS Code Extensions Showcase

We are excited to showcase what the VS Code extension community has built with the Language Model and Chat APIs.  So far, we have seen over 100 extensions build on top of GitHub Copilot in a wide spectrum of scenarios. Here are some that we found particularly compelling.

### Stripe

Stripe enables developers to accept payments and move money online. The new `@stripe` chat participant brings the knowledge of Stripe’s documentation, code examples, and best practices to your fingertips, so you can build and maintain your Stripe integration without leaving VS Code.

> “We’re constantly working to make it easier for developers to integrate Stripe, which is why we’re excited to extend Copilot with Stripe-specific context and functionality. The new extensibility APIs are well-crafted and easy to build on, so we were able to move very quickly.” - Ian McCrystal (EM, Stripe Developer AI team)

The `@stripe` participant helps you to:

* Generate and debug Stripe API code and insert it into your project
* Get answers to your questions, grounded in Stripe documentation
* Step through building and eventually upgrading your API integration

![Screenshot of the Stripe chat participant in the Chat view in VS Code.](stripe-chat-participant.png)

The `@stripe` participant will be available to all Stripe VS Code extension users by mid-July.

### MongoDB

MongoDB developers love the [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode) extension that enables seamless data navigation, query building, prototyping with playgrounds, and exporting to popular languages. The `@mongodb` chat participant deeply integrates with the extension, enabling developers to leverage the powerful combination of GitHub Copilot and the extension to make application development with MongoDB even faster within VS Code.

The `@mongodb` chat participant:

* Generates MongoDB queries from natural language
* Offers insights into query performance and error patterns from database logs
* Provides database and collection schema information
* Answers questions directly in VS Code with references to the official documentation

![Screenshot of the MongoDB chat participant in the Chat view in VS Code.](mongodb-chat-participant.png)

If you are interested in using the MongoDB chat participant, you can sign up to get access to the [private preview](https://www.mongodb.com/products/tools/vs-code#github-copilot-promo).

### Parallels

Parallels, the popular macOS virtualization software, recently unveiled a new [Parallels Desktop](https://marketplace.visualstudio.com/items?itemName=ParallelsDesktop.parallels-desktop) VS Code extension to elevate the Parallels Desktop experience. They have improved it further by integrating with GitHub Copilot.

> "Easy and Powerful APIs with good examples allowed us to quickly create a powerful copilot participant that would have otherwise required considerable effort and time.” – Carlos Lapao (Solutions Architect, Parallels)

Through the new `@parallels` chat participant, you can effortlessly execute most virtual machine operations using natural language. You can, for instance, say "@parallels start the Windows 11 VM" and have the chat participant act on your behalf.

![Screenshot of the Parallels chat participant in the Chat view in VS Code.](parallels-chat-participant.png)

### PostgreSQL

PostgreSQL is an extremely popular relational database platform that you can now chat with directly by using the [PostgreSQL Chat Participant](https://marketplace.visualstudio.com/items?itemName=robconery.pg-chat) extension. The `@pg` chat participant will learn your database schema and provide answers for you, grounded in the database schema. You can also use it to generate schema, get help on SQL queries, and even generate code for interacting with your database.

![Screenshot of the PostgreSQL chat participant in the Chat view in VS Code.](postgresql-chat-participant.png)

## Next steps

We are just getting started. As with all product initiatives in VS Code, we will expand our AI extensibility capabilities over time. We expect the following features to land later this year:

* Intent detection so chat participants are automatically invoked
* GPT-4o language model support
* Increased token limit for model requests (current limit is 4K tokens)
* Chat participants in editor inline chat, terminal and notebooks
* Variable Resolving API - allows extensions to contribute chat variables, which provide context from the extension's domain
* Tools API – converts natural language into tool calling with arguments; allow extensions to register tools that can be called by other participants

## Available today to everyone!

Chat and Language Model APIs are available in VS Code Insiders today and will be in VS Code Stable at the start of July. It is easy to start building powerful AI extensions with our [documentation](https://code.visualstudio.com/api/extension-guides/chat) and [sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample). If you questions or feedback, you can open an issue in our repository.

Already today, you can publish your extensions that depends on the Language Model and Chat API to the VS Marketplace. The real question is: what incredible extensions will you create? The possibilities are endless, and only you can bring these innovative ideas to life. So, dive into our great extension development flow, harness the power of AI with the right user context, and let your creativity shape the future of development! The building part is fun – go and enjoy yourself!

Thanks,

Isidor and the VS Code team
