---
Order: 84
TOCTitle: Pursuit of wicked smartness in VS Code
PageTitle: Pursuit of wicked smartness in VS Code
MetaDescription: Smart artificial intelligence features in Visual Studio Code with GitHub Copilot
Date: 2023-11-13
Author: Chris Dias
---
# Pursuit of "wicked smartness" in VS Code

November 13, 2023 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

If you tuned into [GitHub Universe](https://githubuniverse.com) last week, you saw a tremendous amount of progress, innovation, and vision for artificial intelligence across the entire developer workflow. What we want to do in this blog post is focus in on the advancements around Visual Studio Code over the past few months helping to realize this broader vision.

## "Wicked smart"

One of my favorite lines in Matt Damon and Ben Affleck's seminal film "Good Will Hunting" is ["my boy's wicked smaaahtt"](https://www.youtube.com/watch?v=hIdsjNGCGz4) (read it with a Boston accent for the full effect).

The line is delivered by Morgan (Casey Affleck, Ben's brother) after Will (Matt Damon) breaks up a confrontation between Chuckie (Ben Affleck) and an overly confident "1st year grad student" by recalling facts about American history page by page, word for word. You could say Will was trained by all the books he read and was able to recall them based on the conversation.

AI is similar to Will – it knows about a lot of text. But what is missing from AI – what humans have that AI does not - is the context of a particular interaction in order to give the best possible answer. And in Will's case, because he can also "read the room", he can use his book smarts to return a carefully crafted takedown.

Large language models (LLM) are trained on public repository data at a point in time. That means that they know nothing about your current code. They know about code in general, but they don't have the necessary context to accurately answer questions about it, or to suggest new code that follows the form and function of your workspace.

To work around this, [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) sends snippets of code that help the model better answer questions (this is called Retrieval Augmented Generation, or "RAG"). Answers get better by seeing the most relevant code. But there are limits in the amount of code (and guidance through the prompt) that can be sent to the LLM. For a small project, this usually isn't a problem. But consider any large source code repository out there, and you'll quickly realize it's impossible to send the contents of every file to the model. The solution to getting better answers is to send the relevant context using the right amount of resources in a reasonable amount of time. To help with this and to unlock many other scenarios, we added the concept of **participants** to Copilot Chat.

## Participants

Chat participants are domain experts that can answer the user query however they want - by fully using AI in the query processing or in a traditional way by forwarding it to a backend service. Participants can also provide the large language model access to domain specific tools. With the help of the LLM, the participant may select a tool and define how to invoke it. One example of such a chat participant is `@workspace`. The `@workspace` participant knows about your workspace and can answer questions about it. Internally, the participant is powered by different tools: GitHub's knowledge graph combined with semantic search, local code indexes, and VS Code's language services.

Chat participants can be contributed by the client or the service. At GitHub Universe, there was a demo of a service-side participant, a "Docs Agent" in the github.com Chat experience that knows how to search documentation found in repositories (coming soon to VS Code).

Client-side participants can be contributed through traditional VS Code extensions. More on that in the [Extensibility](#extensibility) section, but let's take a look at two chat participants that are available in VS Code today: `@workspace` and `@vscode`.

### @workspace

The `@workspace` participant knows how to gather context about the code in your workspace, can help you navigate it, find relevant classes, files, etc. Imagine you are in the [VS Code repository](https://github.com/microsoft/vscode) and you want to find out more about the service in charge of the current ICodeEditor; you can use the participant like this:

![@workspace participant answering question about detecting running extensions](workspace-agent-example.png)

Natural language is used to ask the `@workspace` participant "what service class do I use to get the current ICodeEditor". From there, the participant does the following to get just the right amount of context to send to the LLM:

* The vscode repo has been indexed by the [GitHub Search Blackbird service]( https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search). The `@workspace` participant uses this index as a tool to tap into the repository knowledge graph. The `@workspace` participant runs a semantic search that returns relevant code snippets and meta data. GitHub search service has indexed the top 10K GitHub repositories, with plans to add more.

* The next tool that the `@workspace` participant uses is the lexical text search over the local index to find extra code such as local, uncommitted changes, and the Copilot conversation history.

* Then `@workspace` uses a final tool - VS Code"s language intelligence to add crucial details like function signatures, parameters, and even in-line documentation.

All of these pieces of context are ranked, sliced, and summarized by the `@workspace` participant and then sent off to the LLM to answer the question.

Because it has all of the necessary context, the `@workspace` participant can answer the kinds of questions that developers are much more likely to ask. For example, questions that pertain to how different parts of the code interact:

* "`@workspace` how are notifications scheduled?"

Or questions that require knowledge of related code, dependencies, and design patterns:

* "`@workspace` add form validation, similar to the newsletter page"

### @vscode

VS Code can be customized in so many ways that even the members of the VS Code team get pleasantly surprised when they discover some hidden functionality. To help our users and team members alike to unlock the full power of VS Code, we created the `@vscode` participant.

This participant knows all about VS Code and can help you bridge the gap between natural language and VS Code commands and customizations. `@vscode` participant internally uses tools that give it access to the index of all the settings and commands and we are in the process of adding a tool so that this participant can also use the VS Code [documentation](https://code.visualstudio.com/docs). Now you can ask vague questions like "`@vscode` the name of that thing when vscode fake opens a file? And how to disable it?".

![@vscode participant answering question about preview editors](vscode-agent-example.png)

Note that there is a **Show in Settings Editor** button in the response. This is because the `@vscode` participant knows not only about how VS Code works, but also has a tool to invoke the Settings editor or the Command Palette.

In addition, the Command Palette now supports similarity search, so you no longer need to know the exact name of the command when you search for it. You no longer need to speak the unique VS Code jargon to unlock all the goodness the team ships month over month.

This is just the beginning of the `@vscode` participant. We plan to support more and more scenarios that will allow users to better understand and fully control VS Code.

### Slash commands

Chat participants can also contribute what we call **slash commands**, which are shortcuts to specific functionality provided by the participant. One of the tasks when answering questions is to determine the intent, understanding what you want to do.

We can infer that "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project, but "`@workspace /new` Node.js Express Pug TypeScript" is explicit, concise, and saves you time typing.

![New slash command](new-slash-command.png)

Once the intent is clear, the `@workspace` participant has a much better chance of addressing the user's needs, despite the inherent ambiguity of natural language. `@workspace` can propose a directory structure and users can click on the proposed files to preview them. There is a **Create Workspace** button that will generate these files in a new folder.

![@workspace /new results displaying project tree and Create Workspace button](create-workspace-tree-button.png)

## Extensibility

"VS Code is just a shell, you need extensions to make it shine!" – the usual meeting anthem of Microsoft teams working on VS Code extensions, proudly flaunting their role in VS Code's success. We, as the VS Code core team, totally agree with them – VS Code would not be the product it is today without the rich extension ecosystem! AI is no different, and while the Core AI experience lights up with Copilot, our vision is that all the extensions from our ecosystem can participate and allow the LLM models to have the best context and grounding possible. Today we lay the foundation for this vision by adding the [chat participant API](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatParticipant.d.ts) in [a proposed state](https://code.visualstudio.com/api/advanced-topics/using-proposed-api).

The chat participant API allows extensions to contribute participants that can answer specific questions by the user. Both the `@workspace` and `@vscode` participants are implemented using this API. With chat participants, users can bring rich and up-to-date information from their inner and outer loop tools into AI conversations while staying in the editor flow. Participants are like experts for an area, and when a user explicitly mentions an @participant in their prompt, that prompt is forwarded to the extension that contributed that specific participant.

Participants can respond using Markdown for simple text and image responses, or they can respond with a file tree or with buttons for a more interactive experience. For example, a file tree can be used as a preview when a participant is proposing to create a new workspace for the user. Participants can provide follow-ups for each response, imagine them as proposals on how to take the conversation further. To provide a smooth user experience, the whole API is streaming based. As already mentioned, participants can bring in slash commands - shortcuts to specific functionality. For example, the `@docker` participant might contribute a `/generate` slash command, resulting in the following example user prompt "`@docker /generate` a DOCKERFILE for workspace". The current syntax being explicit and concise can be a convenient time saver. Still, we are working on intent detection to allow VS Code core to automatically pick the correct participant and slash command based on the user's natural language prompt.

Imagine installing a chat participant that knows all about Azure or Docker right in VS Code. Or you just might need a [DALL-E participant that uses image generation as a tool](https://github.com/roblourens/chat-agent-dalle) to present a cute animal that affirms you are doing a great job.

![DALL-E generated image of cute cat providing an affirmation](dall-e-affirmation-image.png)

Participants can bring any domain specific content while accessing the tools for that domain. For example, 1ES stands for One Engineering System and is the internal Microsoft engineering system. The 1ES VS Code extension contributes an `@1es` participant that can answer specific questions for internal Microsoft engineers. The `@1es` participant is dynamically planning and showing what it is actually doing. It uses some of the public data available in LLM models, but it also recognizes Microsoft internal specifics and combines both to provide the best answer.

![@1es participant answering a question about CFS, a Microsoft internal initiative](1es-agent-first.png)

And because a participant has the current context, it can continue the discussion:

![@1es participant providing more details about using CFS](1es-agent-second.png)

We are also adding an API that allows extensions to get access to the LLM and can choose to use the LLM to process and answer the user query. Today this API is limited to those extensions that implement a participant. The chat participant API passes the exact user prompts to contributed participants, and with the LLM access - participants can conveniently transition those language prompts into specific backend API calls. We will handle the usage of this API with care and transparency so that users are aware how many requests and tokens have been used by a participant.

The chat participant API is still [proposed](https://code.visualstudio.com/api/advanced-topics/using-proposed-api), and we are looking for feedback on how to improve it, with the goal of finalizing the API in the near future. You can already try out things today, and the best way to start is from our [chat participant extensibility sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample). We can't wait to see the AI-driven innovations for developers that you create.

## Convenience

We are very excited about participants and the endless possibilities they bring, but we also want to talk about the convenient little Copilot-powered interactions that we are adding to VS Code right in your regular workflow. You shouldn't have to relearn your editor to take advantage of AI.

### Smart actions

Smart actions are seamlessly integrated in your VS Code flow (for example, in Quick Fix and context menus) and they do not require you to write any prompt at all. The most powerful smart action is `/fix`. Here is a relatively simple TypeScript quick sort algorithm with an error noting that "Argument of type 'number' is not assignable to parameter of type 'never'". Click on the light bulb and choose **Fix using Copilot**.

![Quick Fix light bulb menu with Fix using Copilot selected](fix-using-copilot.png)

This option opens inline chat populated with `/fix` and also the error message. Behind the scenes, we bring in additional VS Code's diagnostic context that then lets Copilot provide a fix – updating the `left` and `right` arrays to use the right type declaration.

![Copilot proposed fix shown in a diff view](proposed-fix.png)

We have noticed that `/fix` is particularly useful for languages like shells, where traditional tooling is sometimes lacking.

![Copilot proposed fix for a shell command](shell-proposed-fix.png)

To help make its suggestions clearer, Copilot will try to explain why it proposed a specific fix. We have been pleased to learn that users accept suggested Copilot fixes around 60% of the time. Sometimes the fix may not be related to the source code near the light bulb and what is needed is to install a missing dependency – in that case, `/fix` proposes a command that can be run in the integrated terminal.

Similar to `/fix`, the `/doc` smart action is popular with users. To use `/doc`, select a block of code, right-click, and choose **Copilot** > **Generate Docs**. Copilot will generate a documentation comment for your code and we think you'll be surprised by the doc quality.

![/doc command with a generated JSDoc comment](generate-docs.png)

### Generate commit and pull request messages

Sometimes the intent is crystal clear. When that's the case, experiences with AI can feel almost magical. My favorite right now is the ability to have Copilot generate commit messages automatically. In the Source Code view with Copilot installed, you'll see a new sparkle icon next to the commit message field. Select the sparkle and Copilot will fill in the message!

![Source Control input box with sparkle to generate commit message](generate-commit-message.png)

>I'm so excited about this experience, I even made this commit the other day when editing Markdown using vscode.dev/github because the Copilot extension isn't yet [web enabled](https://code.visualstudio.com/api/extension-guides/web-extensions).

>![Commit message wishing that Copilot worked in VS Code for the Web](wish-copilot-web.png)

Back to our flow, let's keep going and make a pull request. I have the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension installed, which is aware of the presence of the Copilot Chat extension. When I make a PR, there is another sparkle icon next to the title and description. Select it and Copilot writes a nice description automatically!

![GitHub Pull Request and Issue extension Create view with sparkle to generate title and description](generate-pr-title-description.png)

This is another area where AI can help you be more productive by automatically taking care of the simple yet tedious tasks you do 10s or 100s of times a week.

## Say what?!

And finally, making a truly smart AI means making interactions as effortless as possible.

We've gotten very good as an industry at voice recognition technology over the past few years. We know a lot of folks have been longing for the combination of voice assistants with advanced LLMs. Now, you can use the two together in VS Code.

The new [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension brings voice to text support to VS Code. Once installed, you'll see a microphone icon in all the natural language input dialogs. Select it, ask Copilot your question, and enjoy the magic.

![Copilot chat input box with Speech extension microphone button](speech-extension-microphone.png)

How do ya like them apples!? I told you my boy's wicked smart!

![Copilot chat answer to best code editor for node and express app](best-editor-answer.png)

The extension is still in preview and only supports English right now, but we'll continue to update it with new languages and capabilities over the coming months.

## Work smarter, not harder

All of the above and more is available in VS Code today! You just have to install the [GitHub Copilot]( https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. And you can learn more about Copilot Chat features in our [documentation](https://code.visualstudio.com/docs/copilot/copilot-chat)

Thanks!

Chris and the VS Code team

Happy **Smart** Coding!
