---
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
DateApproved: 10/09/2025
MetaDescription: Overview of the configuration settings for GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code settings reference

This article lists the configuration settings for GitHub Copilot in Visual Studio Code. For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/configure/settings.md).

The team is continuously working on improving Copilot in VS Code and adding new features. Some features are still experimental. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode/issues). Get more info about the [feature lifecycle in VS Code](/docs/configure/settings.md#feature-lifecycle).

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## General settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.commandCenter.enabled)`<br/>Controls whether to show the Chat menu in the VS Code title bar. | `true` |
| `setting(workbench.settings.showAISearchToggle)`<br/>Enable searching settings with AI in the Settings editor. | `true` |
| `setting(workbench.commandPalette.experimental.askChatLocation)` _(Experimental)_<br/>Controls where the Command Palette should ask chat questions. | `"chatView"` |
| `setting(search.searchView.semanticSearchBehavior)` _(Preview)_<br/>Configure when to run semantic search in the Search view: manually (default), when no text search results are found, or always. | `"manual"` |
| `setting(search.searchView.keywordSuggestions)` _(Preview)_<br/>Controls whether to show keyword suggestions in the Search view. | `false` |

## Code editing settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.editor.enableCodeActions)`<br/>Controls if Copilot commands are shown as Code Actions when available. | `true` |
| `setting(github.copilot.renameSuggestions.triggerAutomatically)`<br/>Generate symbol renaming suggestions. | `true` |
| `setting(github.copilot.enable)`<br/>Enable or disable code completions for specified [languages](/docs/languages/identifiers.md). | `{ "*": true, "plaintext": false, "markdown": false, "scminput": false }` |
| `setting(github.copilot.nextEditSuggestions.enabled)`<br/>Enables [next edit suggestions](/docs/copilot/ai-powered-suggestions.md#next-edit-suggestions) (NES). | `true` |
| `setting(editor.inlineSuggest.edits.allowCodeShifting)`<br/>Configure if NES is able to shift your code to show a suggestion. | `"always"` |
| `setting(editor.inlineSuggest.edits.renderSideBySide)`<br/>Configure if NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code. | `"auto"` |
| `setting(github.copilot.nextEditSuggestions.fixes)`<br/>Enable next edit suggestions based on diagnostics (squiggles). For example, missing imports. | `true` |
| `setting(editor.inlineSuggest.minShowDelay)`<br/>Time in milliseconds to wait before showing inline suggestions. | `0` |

## Chat settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.localeOverride)`<br/>Specify a locale for chat responses, such as `en` or `fr`. | `"auto"` |
| `setting(github.copilot.chat.useProjectTemplates)`<br/>Use relevant GitHub projects as starter projects when using `/new`. | `true` |
| `setting(github.copilot.chat.scopeSelection)`<br/>Whether to prompt for a specific symbol scope if you use `/explain` and the active editor has no selection. | `false` |
| `setting(github.copilot.chat.terminalChatLocation)`<br/>Controls where chat queries from the terminal should be opened. | `"chatView"` |
| `setting(chat.detectParticipant.enabled)`<br/>Enable chat participant detection in the Chat view. | `true` |
| `setting(chat.checkpoints.enabled)` <br/>Enable or disable [checkpoints](/docs/copilot/chat/chat-checkpoints.md) in the chat. | `true` |
| `setting(chat.checkpoints.showFileChanges)` <br/>Show a summary of file changes at the end of each chat request. | `false` |
| `setting(chat.editRequests)`<br/>Enable or disable [editing previous chat requests](/docs/copilot/chat/chat-checkpoints.md#edit-a-previous-chat-request). | `"inline"` |
| `setting(chat.editor.fontFamily)`<br/>Font family in chat codeblocks. | `"default"` |
| `setting(chat.editor.fontSize)`<br/>Font size in pixels in chat codeblocks. | `14` |
| `setting(chat.editor.fontWeight)`<br/>Font weight in chat codeblocks. | `"default"` |
| `setting(chat.editor.lineHeight)`<br/>Line height in pixels in chat codeblocks. | `0` |
| `setting(chat.editor.wordWrap)`<br/>Toggle line wrapping in chat codeblocks. | `"off"` |
| `setting(chat.editing.confirmEditRequestRemoval)`<br/>Ask for confirmation before undoing an edit. | `true` |
| `setting(chat.editing.confirmEditRequestRetry)`<br/>Ask for confirmation before performing a redo of the last edit. | `true` |
| `setting(chat.editing.autoAcceptDelay)`<br/>Configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept. | `0` |
| `setting(chat.fontFamily)`<br/>Font family for Markdown content in chat. | `"default"` |
| `setting(chat.fontSize)`<br/>Font size in pixels for Markdown content in chat. | `13` |
| `setting(chat.notifyWindowOnConfirmation)`<br/>Enable or disable showing a OS notification window when user input is needed. | `true` |
| `setting(chat.notifyWindowOnResponseReceived)`<br/>Enable or disable showing a OS notification window when a chat response is received. | `true` |
| `setting(chat.tools.terminal.autoReplyToPrompts)` <br/>Automatically reply to terminal prompts with a default answer. | `false` |
| `setting(chat.tools.terminal.terminalProfile.<platform>)`<br/>Configure which terminal profile to use for chat terminal commands on each platform. | `""` |
| `setting(chat.useAgentsMdFile)` <br/>Enable or disable using `AGENTS.md` files as context for chat requests. | `true` |
| `setting(chat.math.enabled)` _(Preview)_<br/>Enable or disable math rendering with [KaTeX](https://katex.org) in chat. | `false` |
| `setting(github.copilot.chat.codesearch.enabled)` _(Preview)_<br/>When using `#codebase` in the prompt, Copilot automatically discovers relevant files to be edited. | `false` |
| `setting(chat.emptyState.history.enabled)` _(Experimental)_<br/>Show recent chat history in the empty state of the Chat view. | `false` |
| `setting(chat.sendElementsToChat.enabled)` _(Experimental)_<br/>Enable sending elements from the Simple Browser to the chat view as context. | `true` |
| `setting(chat.useNestedAgentsMdFiles)` _(Experimental)_<br/>Enable or disable using `AGENTS.md` files in subfolders of your workspace as context for chat requests. | `false` |
| `setting(github.copilot.chat.customOAIModels)` _(Experimental)_<br/>Configure custom OpenAI-compatible models for chat. | `[]` |
| `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(Experimental)_<br/>Suggest related files from git history in chat context. | `true` |

## Agent settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.agent.enabled:true)`<br/>Enable or disable using agents (requires VS Code 1.99 or later). | `true` |
| `setting(chat.agent.maxRequests)`<br/>Maximum number of requests that Copilot can make using agents. | `25` |
| `setting(github.copilot.chat.agent.autoFix)`<br/>Automatically diagnose and fix issues in the generated code changes. | `true` |
| `setting(chat.mcp.access)`<br/>Manage which Model Context Protocol (MCP) servers can be used in VS Code. | `true` |
| `setting(chat.mcp.discovery.enabled)`<br/>Configure automatic discovery of MCP server configuration from other applications. | `false` |
| `setting(chat.mcp.gallery.enabled)`<br/>Enable browsing and installing MCP servers via the Extensions view in VS Code. | `false` |
| `setting(chat.tools.terminal.autoApprove)` <br/>Control which terminal commands are [auto-approved when using agents](/docs/copilot/chat/chat-tools.md#automatically-approve-terminal-commands). Commands can be set to `true` (auto-approve) or `false` (require approval). Regular expressions can be used by wrapping patterns in `/` characters. | `{ "rm": false, "rmdir": false, "del": false, "kill": false, "curl": false, "wget": false, "eval": false, "chmod": false, "chown": false, "/^Remove-Item\\b/i": false }` |
| `setting(chat.tools.global.autoApprove)`<br/>Automatically approve all tools - this setting [disables critical security protections](/docs/copilot/security.md). | `false` |
| `setting(chat.agent.thinkingStyle)` _(Experimental)_<br/>Configure how thinking tokens are presented in chat. | `fixedScrolling` |
| `setting(chat.mcp.autoStart)` _(Experimental)_<br/>Automatically start MCP servers when MCP configuration changes are detected. | `newAndOutdated` |
| `setting(chat.agent.todoList.position)` _(Experimental)_<br/>Configure the visibility and position of the todo list control in chat. | `"default"` |
| `setting(github.copilot.chat.newWorkspaceCreation.enabled)` _(Experimental)_<br/>Enable the tool for scaffolding a new workspace in chat. | `true` |
| `setting(github.copilot.chat.agent.thinkingTool:true)` _(Experimental)_<br/>Enable the thinking tool when using agents. | `false` |
| `setting(github.copilot.chat.virtualTools.threshold)` _(Experimental)_<br/>Tool count over which virtual tools should be used. Virtual tools group similar sets of tools together and enable the model to activate them on-demand. Enables you to go beyond the limit of 128 tools for a chat request. | `128` |

## Agent sessions

The [Chat Sessions view](/docs/copilot/copilot-coding-agent.md) provides a centralized location for managing both local chat conversations and remote coding agent sessions. This view enables you to work with multiple AI sessions simultaneously, track their progress, and manage long-running tasks efficiently.

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.agentSessionsViewLocation)` _(Experimental)_<br/>Enable or disable the Chat Sessions view. | `disabled` |

## Inline chat settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(inlineChat.finishOnType)`<br/>Finish an editor inline chat session when typing outside of changed regions. | `false` |
| `setting(inlineChat.holdToSpeech)`<br/>Holding the editor inline chat keyboard shortcut (`kb(inlineChat.start)`) automatically enables speech recognition. | `true` |
| `setting(editor.inlineSuggest.syntaxHighlightingEnabled)`<br/>Show syntax highlighting for code completions. | `true` |
| `setting(inlineChat.lineEmptyHint)` _(Experimental)_<br/>Show a hint for editor inline chat on an empty line. | `false` |
| `setting(inlineChat.lineNaturalLanguageHint)` _(Experimental)_<br/>Trigger editor inline chat as soon as a line mostly consists of words. | `true` |
| `setting(github.copilot.chat.editor.temporalContext.enabled)` _(Experimental)_<br/>Include recently viewed and edited files in the context for editor inline chat. | `false` |

## Code review settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.reviewSelection.enabled)` _(Preview)_<br/>Enable code review with AI for an editor text selection. | `true` |
| `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_<br/>Custom instructions that are added to requests for reviewing the current editor selection with AI. | `[]` |

## Custom instructions settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`<br/>Automatically add custom instructions from `.github/copilot-instructions.md` to chat requests. | `true` |
| `setting(chat.instructionsFilesLocations)` _(Experimental)_<br/>Locations to search for custom instructions files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. | `{ ".github/instructions": true }` |
| `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_<br/>Custom instructions for generating commit messages with AI. | `[]` |
| `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_<br/>Custom instructions for generating pull request titles and descriptions with AI. | `[]` |

## Reusable prompt files settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.promptFilesLocations)` <br/>Locations to search for prompt files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. | `{ ".github/prompts": true }` |
| `setting(chat.promptFilesRecommendations)` <br/>Enable or disable prompt file recommendations when opening a new chat session. List of key-value pairs of prompt file name and boolean or when clause. | `[]` |

## Debugging settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.startDebugging.enabled)` _(Preview)_<br/>Enables the experimental `/startDebugging` intent in the Chat view to generate debugging configuration. | `true` |
| `setting(github.copilot.chat.copilotDebugCommand.enabled)` _(Preview)_<br/>Enables the `copilot-debug` terminal command. | `true` |

## Testing settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.generateTests.codeLens)` _(Experimental)_<br/>Show **Generate tests** code lens for symbols that are not covered by current test coverage information. | `false` |
| `setting(github.copilot.chat.setupTests.enabled)` _(Experimental)_<br/>Enables the experimental `/setupTests` intent and prompting in `/tests` generation. | `true` |

## Notebook settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(notebook.experimental.generate)` _(Experimental)_<br/>Enable the **Generate** action to create code cells with notebook inline chat. | `true` |
| `setting(github.copilot.chat.edits.newNotebook.enabled)` _(Experimental)_<br/>Enable the notebook tool in edit mode to create a new notebook file. | `true` |
| `setting(github.copilot.chat.notebook.followCellExecution.enabled)` _(Experimental)_<br/>Show the currently executing cell in the editor. | `false` |

## Accessibility settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(inlineChat.accessibleDiffView)`<br/>Whether the Inline Chat also renders an accessible diff viewer for its changes. | `"auto"` |
| `setting(accessibility.signals.chatRequestSent)`<br/>Plays a signal - sound (audio cue) and/or announcement (alert) - when a chat request is made. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.chatResponseReceived)`<br/>Plays a sound / audio cue when the response has been received. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatEditModifiedFile)`<br/>Plays a sound / audio cue when the file has been modified by chat edits. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatUserActionRequired)`<br/>Plays a sound / audio cue when the user needs to take an action in chat. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.lineHasInlineSuggestion)`<br/>Plays a sound / audio cue when the cursor is on a line that has an inline suggestion. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.nextEditSuggestion)`<br/>Plays a sound / audio cue when a next edit suggestion is available. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.verboseChatProgressUpdates)`<br/>Provide verbose updates about chat activity. | `true` |
| `setting(accessibility.verbosity.inlineChat)`<br/>Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused. | `true` |
| `setting(accessibility.verbosity.inlineCompletions)`<br/>Provide information about how to access the inline completions hover and Accessible View. | `true` |
| `setting(accessibility.verbosity.panelChat)`<br/>Provide information about how to access the chat help menu when the chat input is focused. | `true` |
| `setting(accessibility.voice.keywordActivation)`<br/>Controls whether the keyword phrase 'Hey Code' is recognized to start a voice chat session. | `"off"` |
| `setting(accessibility.voice.autoSynthesize)`<br/>Controls whether a textual response should automatically be read out aloud when speech was used as input. | `"off"` |
| `setting(accessibility.voice.speechTimeout)`<br/>The duration in milliseconds that voice speech recognition remains active after you stop speaking. | `1200` |

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
