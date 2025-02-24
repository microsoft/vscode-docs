---
Order: 93
TOCTitle: Copilot Agent Mode (preview)
PageTitle: Copilot Agent Mode (preview)
MetaDescription: Announcing the GitHub Copilot agent mode in Visual Studio Code.
Date: 2024-02-24
Author: Isidor Nikolic
---

# Introducing GitHub Copilot agent mode (preview)

February 24, 2025 by [Isidor Nikolic](https://github.com/isidorn)

Copilot agent mode is the next evolution in AI-assisted coding. Acting as an autonomous peer programmer, it performs multi-step coding tasks at your command — scanning your workspace, finding relevant files, proposing file edits, and running terminal commands. It responds to compile and lint errors, monitors terminal output, and auto-corrects in a loop until the task is completed. Available to all [VS Code Insiders](https://code.visualstudio.com/insiders/) users today, and soon in VS Code Stable.

<video src="agent-mode.mp4" title="Copilot Edits video" autoplay muted controls></video>

## How to use Copilot agent mode

In VS Code Insiders, open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`), select **Agent** from the mode dropdown, and enter your prompt.

Copilot agent mode can create apps from scratch, perform refactorings across multiple files, write and run tests, and migrate legacy code to modern frameworks. It can automatically generate documentation, integrate new libraries, or help answer questions about a complex codebase. Copilot agent mode helps you be super-productive by having an AI collaborator that understands the workspace. It can orchestrate your inner development flow while keeping you in control.

Copilot agent mode operates in a more autonomous and dynamic manner to achieve the desired outcome. To process a request, Copilot loops over the following steps and iterates multiple times as needed:
* Determines the relevant context and files to edit autonomously.
* Offers both code changes and terminal commands to complete the task. For example, Copilot might compile code, install packages, run tests, and more.
* Monitors the correctness of code edits and terminal command output and iterates to remediate issues.

Copilot agent mode uses a set of tools to accomplish these tasks.

![Screenshot of the Copilot agent mode, and the proposed inline changes](full-agent-mode.png)

In an ideal world, you would just care about the final output of Copilot agent mode, but it can sometimes make mistakes and go off track. To easily intervene and undo in those situations, every tool invocation is transparently displayed in the UI, terminal tool requires approval, and we support rich undo capabilities. Instead of relying on one long, detailed prompt to yield a perfect solution, you should iterate with Copilot – the UI is built for iterations, giving you full control over the process ensuring the final result is better.

Copilot agent mode automatically finds the precise context and sets the working set of files by calling the right workspace tools. To more precisely guide Copilot, you can always explicitly reference context with `#file`, using drag and drop or by clicking on the **Add Files** button. For example, you can create a `specifications.md` file and add it as context to better control Copilot, or you can set [custom instructions](/docs/copilot/copilot-customization.md) - so Copilot respects your coding guidelines or other preferences.

Keep in mind that because Copilot agent mode may send multiple requests per prompt, it won’t be as fast as regular edits mode and can quickly use up your free Copilot quota. For tasks that are well-defined and scoped, stick to edits mode. When you need multiple edits or more open-ended tasks, switch to agent mode.

## How it works

![Diagram showing the inner works of agent mode and how it interacts with context, LLM and tools](diagram.png)

When you send a request to Copilot in agent mode, we make a prompt to the LLM you picked from the model dropdown. This prompt includes:
* Your query
* A summarized structure of the workspace (instead of the full codebase to preserve tokens)
* Machine context (e.g. what OS you are using)
* Tool description (optionally tool call result)

We define a set of tools for the LLM to call, each tool has its own capabilities that help Copilot get the job done. Using these tools Copilot can search the workspace, read the contents of files, run commands in the terminal, get compile or lint errors from the editor and apply proposed changes via a speculative decoder endpoint (performance improvements underway). The list of tools is ever-expanding, as we are experimenting what other tools could improve Copilot’s capabilities in agent mode.

![Screenshot Copilot agent mode proposing a terminal tool to "npm run dev"](terminal-tool.png)

Each tool has detailed instructions for the LLM on how and when to use it. Here’s the `read_file` tool description as an example:

```json
{
    "name": "read_file",
    "description": "Read the contents of a file. You must specify the line range you're interested in, and if the file is larger, you will be given an outline of the rest of the file. If the file contents returned are insufficient for your task, you may call this tool again to retrieve more content.",
    "parameters": {
        "type": "object",
        "properties": {
            "filePath": {
                "description": "The absolute paths of the files to read.",
                "type": "string"
            },
            "startLineNumberBaseZero": {
                "type": "number",
                "description": "The line number to start reading from, 0-based."
            },
            "endLineNumberBaseZero": {
                "type": "number",
                "description": "The inclusive line number to end reading at, 0-based."
            }
        },
        "required": [
            "filePath",
            "startLineNumberBaseZero",
            "endLineNumberBaseZero"
        ]
    }
}
```

A lot of our development time went into refining these tool descriptions and the system prompt so the LLM uses tools accurately. We have our automated evaluations, but there is still a lot of back-and-forth between updating the prompts and descriptions and seeing how they behave in real world use cases.

We see different behaviors across GPT 4o and Claud 3.5 Sonnet, but for now, we send a similar system prompt to those models. Going forward, as we expand support of Copilot agent mode to more LLMs, we’ll specifically tailor prompts for each model.

## We love self-hosting

Since day one of VS Code, we have been strong believers in self-hosting. If the team is not using a new feature for making production ready changes, then there is something wrong with the feature. It’s as simple as that for us.

Our team owns more than 200 GitHub repositories, and we’ve seen Copilot agent mode excel in smaller repos, where it’s already driving productivity gains. The ability to ask Copilot open ended questions works great on repos of any size – for example, where and how a specific feature is implemented. Refactorings across multiple files in large codebases - like [vscode](https://github.com/microsoft/vscode) - is a tough challenge for any software engineering agent today. Improving Copilot agent mode in complex repos will unlock more self-hosting opportunities for our team, as well as useful interactions for you.

Apart from self-hosting, VS Code team members enjoy using Copilot agent mode for their hobby projects, like apps for weather forecasting, meal planning, [coffee consumption](https://www.youtube.com/watch?v=pUK7MRzoTDc) or [gym workouts](https://www.youtube.com/watch?v=gKEWB0vg_Cs).

Today, the VS Code team prefers Claude 3.5 Sonnet over GPT-4o for our Copilot agent mode use cases.

## Available today

Copilot agent mode is in preview and available today to all [VS Code Insiders](https://code.visualstudio.com/insiders/) users. We literally push code every day to improve Copilot, so the experience in VS Code Insiders is getting better every day (e.g. today we pushed the ability to edit the proposed terminal command). We look forward to getting your feedback in [our repo](http://github.com/microsoft/vscode-copilot-release/issues/). Let us know how you want to use Copilot agent mode, so we can make sure the features we are delivering will be impactful to you.

Next, we plan to work on:
* Fine-grained undo capability
* Simplifying the context UI (working set)
* Notebook support (right now edit sessions only work on text editors)
* Ability to auto-approve specific terminal commands
* Improve the terminal tool UI (e.g. show terminal command output inline)
* Exploring [tool extensibility](/api/extension-guides/tools.md) for agent mode (if you have extension ideas [tell us](https://github.com/microsoft/vscode-discussions/discussions/2411))
* Unifying the chat and edits experience
* In parallel, we are improving the quality and performance with the goal of shipping Copilot agent mode to all VS Code Stable users.

For a detailed overview of Copilot agent mode please read the [official docs](/docs/copilot/copilot-edits.md#use-agent-mode-preview).

We’re thrilled about Copilot agent mode — try it today and let us know what you think.

Happy vibe coding!

Isidor and the VS Code team
