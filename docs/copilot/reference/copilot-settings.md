---
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
DateApproved: 06/12/2025
MetaDescription: Overview of the configuration settings for GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code settings reference

This article lists the configuration settings for GitHub Copilot in Visual Studio Code. For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/configure/settings.md), as well as the [Variables reference](/docs/reference/variables-reference.md) for information about predefined variable support.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

The team is continuously working on improving Copilot in VS Code and adding new features. Some features are still experimental. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode/issues). Get more info about the [feature lifecycle in VS Code](/docs/configure/settings.md#feature-lifecycle).

## General settings

* `setting(chat.commandCenter.enabled)`: Controls whether to show the Copilot menu in the VS Code title bar (default: `true`).
* `setting(workbench.commandPalette.experimental.askChatLocation)` _(Experimental)_: Controls where the Command Palette should ask chat questions.
* `setting(search.searchView.semanticSearchBehavior)` _(Preview)_: Configure when to run semantic search in the Search view: manually (default), when no text search results are found, or always.
* `setting(search.searchView.keywordSuggestions)` _(Preview)_: Controls whether to show keyword suggestions in the Search view. This setting is disabled by default.
* `setting(workbench.settings.showAISearchToggle)` _(Experimental)_: Enable searching settings with AI in the Settings editor. This setting is enabled by default.

## Code editing settings

* `setting(github.copilot.editor.enableCodeActions)`: Controls if Copilot commands are shown as Code Actions when available.
* `setting(github.copilot.renameSuggestions.triggerAutomatically)`: Controls whether Copilot generates suggestions for renaming.
* `setting(github.copilot.enable)`: Enable or disable code completions for specified [languages](/docs/languages/identifiers.md).
* `setting(github.copilot.nextEditSuggestions.enabled)`: Enables Copilot next edit suggestions (Copilot NES).
* `setting(editor.inlineSuggest.edits.allowCodeShifting)`: Configure if Copilot NES is able to shift your code to show a suggestion.
* `setting(editor.inlineSuggest.edits.renderSideBySide)`: Configure if Copilot NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code.

## Chat settings

* `setting(github.copilot.chat.localeOverride)`: Specify a locale that Copilot should respond in, such as `en` or `fr`.
* `setting(github.copilot.chat.useProjectTemplates)`: Use relevant GitHub projects as starter projects when using `/new`.
* `setting(github.copilot.chat.scopeSelection)`: Whether to prompt for a specific symbol scope if you use `/explain` and the active editor has no selection.
* `setting(github.copilot.chat.terminalChatLocation)`: Controls where chat queries from the terminal should be opened.
* `setting(chat.detectParticipant.enabled)`: Enable chat participant detection in the Chat view.
* `setting(chat.editor.fontFamily)`: Font family in chat codeblocks.
* `setting(chat.editor.fontSize)`: Font size in pixels in chat codeblocks.
* `setting(chat.editor.fontWeight)`: Font weight in chat codeblocks.
* `setting(chat.editor.lineHeight)`: Line height in pixels in chat codeblocks.
* `setting(chat.editor.wordWrap)`: Toggle line wrapping in chat codeblocks.
* `setting(chat.editing.confirmEditRequestRemoval)`: Ask for confirmation before undoing an edit (default: `true`)
* `setting(chat.editing.confirmEditRequestRetry)`: Ask for confirmation before performing a redo of the last edit (default: `true`)
* `setting(chat.editing.autoAcceptDelay)`: Configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0)
* `setting(github.copilot.chat.codesearch.enabled)` _(Preview)_: When using `#codebase` in the prompt, Copilot automatically discovers relevant files to be edited.
* `setting(chat.editRequests)` _(Experimental)_: Enable or disable [editing previous chat requests](/docs/copilot/chat/copilot-chat.md#edit-chat-requests-experimental).
* `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(Experimental)_: Suggest related files from git history in Copilot Edits (default: `false`)
* `setting(chat.sendElementsToChat.enabled)` _(Experimental)_: Enable sending elements from the Simple Browser to the chat view as context (default: `true`).

## Agent mode settings

* `setting(chat.agent.enabled:true)`: Enable or disable agent mode (default: `false`, requires VS Code 1.99 or later)
* `setting(chat.agent.maxRequests)`: Maximum number of requests that Copilot can make in agent mode (default: 15)
* `setting(github.copilot.chat.agent.autoFix)`: Automatically diagnose and fix issues in the generated code changes (default: `true`)
* `setting(github.copilot.chat.agent.runTasks)`: Run workspace tasks when using agent mode (default: `true`)
* `setting(chat.mcp.enabled)`: Enable Model Context Protocol (MCP) support in VS Code. This enables adding tools from MCP servers in agent mode.
* `setting(chat.tools.autoApprove)` _(Experimental)_: Automatically approve all tools (default: `false`)
* `setting(github.copilot.chat.newWorkspaceCreation.enabled)` _(Experimental)_: Enable the agent mode tool for scaffolding a new workspace in chat.
* `setting(github.copilot.chat.agent.thinkingTool:true)` _(Experimental)_: Enable the thinking tool in agent mode.
* `setting(github.copilot.chat.agent.terminal.allowList)` _(Experimental)_: A list of terminal commands that are allowed to be [run in agent mode without confirmation](/docs/copilot/chat/chat-agent-mode.md#auto-approve-terminal-commands-experimental).
* `setting(github.copilot.chat.agent.terminal.denyList)` _(Experimental)_: A list of terminal commands that are not allowed to be [run in agent mode without confirmation](/docs/copilot/chat/chat-agent-mode.md#auto-approve-terminal-commands-experimental).

## Inline chat settings

* `setting(inlineChat.finishOnType)`: Finish an editor inline chat session when typing outside of changed regions.
* `setting(inlineChat.holdToSpeech)`: Holding the editor inline chat keyboard shortcut (`kb(inlineChat.start)`) automatically enables speech recognition.
* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)`: Show syntax highlighting for code completions.
* `setting(inlineChat.lineEmptyHint)` _(Experimental)_: Show a hint for editor inline chat on an empty line.
* `setting(inlineChat.lineNaturalLanguageHint)` _(Experimental)_: Trigger editor inline chat as soon as a line mostly consists of words.
* `setting(github.copilot.chat.editor.temporalContext.enabled)` _(Experimental)_: Include recently viewed and edited files in the context for editor inline chat.

## Code review settings

* `setting(github.copilot.chat.reviewSelection.enabled)` _(Preview)_: Enable code review with AI for an editor text selection.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: Custom instructions that are added to requests for reviewing the current editor selection with AI.

## Custom instructions settings

* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`: Automatically add custom instructions from `.github/copilot-instructions.md` to chat requests.
* `setting(chat.instructionsFilesLocations)` _(Experimental)_: Locations to search for custom instructions files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_: Custom instructions for generating commit messages with AI.
* `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_: Custom instructions for generating pull request titles and descriptions with AI.

## Reusable prompt files settings

* `setting(chat.promptFiles)` _(Experimental)_: Enable or disable reusable prompt files.
* `setting(chat.promptFilesLocations)` _(Experimental)_: Locations to search for prompt files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

## Chat mode settings

* `setting(chat.modeFilesLocations)` _(Experimental)_: Locations to search for chat mode files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

## Debugging settings

* `setting(github.copilot.chat.startDebugging.enabled)` _(Preview)_: Enables the experimental `/startDebugging` intent in the Chat view to generate debugging configuration.
* `setting(github.copilot.chat.copilotDebugCommand.enabled)` _(Preview)_: Enables the `copilot-debug` terminal command.

## Testing settings

* `setting(github.copilot.chat.generateTests.codeLens)` _(Experimental)_: Show **Generate tests** code lens for symbols that are not covered by current test coverage information.
* `setting(github.copilot.chat.setupTests.enabled)` _(Experimental)_: Enables the experimental `/setupTests` intent and prompting in `/tests` generation.

## Notebook settings

* `setting(notebook.experimental.generate)` _(Experimental)_: Enable the **Generate** action to create code cells with notebook inline chat.
* `setting(github.copilot.chat.edits.newNotebook.enabled)` _(Experimental)_: Enable the notebook tool in edit mode to create a new notebook file.
* `setting(github.copilot.chat.notebook.followCellExecution.enabled)` _(Experimental)_: Show the currently executing cell in the editor.

## Accessibility settings

* `setting(inlineChat.accessibleDiffView)`: Whether the Inline Chat also renders an accessible diff viewer for its changes.
* `setting(accessibility.signals.chatRequestSent)`: Plays a signal - sound (audio cue) and/or announcement (alert) - when a chat request is made.
* `setting(accessibility.signals.chatResponseReceived)`: Plays a sound / audio cue when the response has been received.
* `setting(accessibility.signals.chatEditModifiedFile)`: Plays a sound / audio cue when the file has been modified by chat edits.
* `setting(accessibility.signals.chatUserActionRequired)`: Plays a sound / audio cue when the user needs to take an action in chat.
* `setting(accessibility.signals.lineHasInlineSuggestion)`: Plays a sound / audio cue when the cursor is on a line that has an inline suggestion.
* `setting(accessibility.signals.nextEditSuggestion)`: Plays a sound / audio cue when a next edit suggestion is available.

* `setting(accessibility.verbosity.inlineChat)`: Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused.
* `setting(accessibility.verbosity.inlineCompletions)`: Provide information about how to access the inline completions hover and Accessible View.
* `setting(accessibility.verbosity.panelChat)`: Provide information about how to access the chat help menu when the chat input is focused.
* `setting(accessibility.voice.keywordActivation)`: Controls whether the keyword phrase 'Hey Code' is recognized to start a voice chat session.
* `setting(accessibility.voice.autoSynthesize)`: Controls whether a textual response should automatically be read out aloud when speech was used as input.
* `setting(accessibility.voice.speechTimeout)`: The duration in milliseconds that voice speech recognition remains active after you stop speaking.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
