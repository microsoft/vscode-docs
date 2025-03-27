
# Agent mode

Use Copilot Edits to start an AI-powered code editing session and iterate quickly on code changes across multiple files by using natural language. Copilot Edits applies the edits directly in the editor, where you can review them in-place, with the full context of the surrounding code.

Copilot Edits can function in two modes:

* [_Edit mode_](#use-edit-mode): select which files to edit, provide the relevant context and prompt, and Copilot will suggest code edits.
* [_Agent mode_](#use-agent-mode-preview) (preview): let Copilot autonomously plan the tasks and relevant files that are needed to implement the request. Copilot will apply code edits and suggest terminal commands, and will continuously iterate to resolve any issues that arise.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.



## Use agent mode (preview)

In agent mode, Copilot Edits operates in a more autonomous and dynamic manner to achieve the desired outcome. Copilot agent mode determines the relevant context, offers both code changes and terminal commands, and iterates to remediate issues.

To perform these tasks, agent mode uses a set of task-specific [_tools_](#agent-mode-tools), for example to read files, access databases, or APIs. Copilot has a set of built-in tools, and you can configure additional tools by adding [MCP servers](/docs/copilot/mcp-servers.md) or VS Code extensions.

> [!IMPORTANT]
> If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of Copilot Editor Preview Features. Learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

To use agent mode in Copilot Edits:

1. Open your project in [VS Code Insiders](https://code.visualstudio.com/insiders).

    > [!NOTE]
    > Agent mode is in preview and currently available in [VS Code Insiders](https://code.visualstudio.com/insiders/). The gradual roll-out to VS Code Stable is ongoing and once agent mode is enabled for you, you will see a mode dropdown in the Copilot Edits view.

1. Open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`)

    * Select **Open Copilot Edits** from the Copilot menu in the VS Code title bar (`kb(workbench.action.chat.openEditSession)`).

    * Alternatively, select the **View** > **Appearance** > **Secondary Side Bar** (`kb(workbench.action.toggleAuxiliaryBar)`) to open the Secondary Side Bar, and then select the **Copilot Edits** view.

1. Select **Agent** from the mode dropdown

    ![Screenshot showing the Copilot Edits view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

1. Enter a prompt to request code edits.

    You don't have to specify which files to work on. In agent mode, Copilot Edits determines the relevant context and files to edit autonomously.

    ![Screenshot showing the Copilot Edits view, highlighting that Copilot searched the codebase for relevant files.](images/copilot-edits/copilot-edits-agent-search-codebase.png)

    Copilot Edits streams the edits in the editor and updates the list of changed files. In addition, Copilot might also suggest terminal commands to run. For example, to run tests or build the application.

1. Review the suggested code edits and confirm if Copilot can run the proposed terminal commands.

    As a user, you stay in control of the changes that are made to your project and can [review the generated edits](#accept-or-discard-edits).

    Copilot requests for confirmation before running a terminal command or non-builtin tool. Optionally, you can modify the proposed terminal command or tool parameters, and then select **Continue** to run it.

    If your project has configured [tasks](/docs/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. Copilot Edits detects issues and problems in code edits and terminal commands, and will iterate and perform additional actions to resolve them.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, Copilot uses the test outcome to resolve the issue.

1. Optionally, select the **Tools** icon in the chat input to view and select which tools agent mode can use for responding to your request.

    ![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-tools.png)

    Get more details about [agent mode tools](#agent-mode-tools).

1. Continue to ask follow-up questions and iterate on the code changes that Copilot Edits provides.

Copilot Edits agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

## Interrupt an agent mode request

To interrupt an ongoing request, you can either **Pause** it or **Cancel** it. When you pause a request, Copilot stops processing the request and waits for your input.

When you pause a request, you can either choose to enter a new prompt, which cancels the current request, or you can choose to resume the current request.

When you cancel a request, Copilot interrupts and ends the active request. You can still [review and accept or reject](#accept-or-discard-edits) the changes that were made up to that point.

## Agent mode tools

To complete a request, Copilot Edits uses a set of _tools_ to accomplish the individual tasks. Consider these tools as specialized utilities that Copilot can use to perform a specific task. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

Based on the outcome of a tool, Copilot might invoke other tools to accomplish the overall request. For example, if a code edit results in syntax errors in the file, Copilot might explore another approach and suggest different code changes.

Copilot has a set of built-in tools and you can configure additional tools by adding [MCP servers](/docs/copilot/mcp-servers.md) or by installing VS Code extensions that contribute tools.

You can view and manage the tools that can be used for responding to a request. Select the **Tools** icon in the Chat view to view and select which tools to use.

Although agent mode can operate in an autonomous manner, you maintain control over the generated edits and the terminal commands that are run.

## Settings

The following list contains the settings related to Copilot Edits. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.agent.maxRequests)` - maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.agent.runTasks)` - run workspace tasks when using agent mode in Copilot Edits (default: `true`)
