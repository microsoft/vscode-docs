---
Order: 14
Area: copilot
TOCTitle: Settings Reference
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
PageTitle: GitHub Copilot in VS Code settings reference
DateApproved: 12/11/2024
MetaDescription: Overview of the configuration settings for GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code settings reference

This article lists the configuration settings for GitHub Copilot in Visual Studio Code. For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/getstarted/settings.md), as well as the [Variables reference](/docs/editor/variables-reference.md) for information about predefined variable support.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

The team is continuously working on improving Copilot in VS Code and adding new features. Items marked with <i class="codicon codicon-beaker"></i> are experimental features. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode-copilot-release/issues). Get more info about the [feature lifecycle in VS Code](/docs/getstarted/settings.md#feature-lifecycle).

## General settings

* `setting(github.copilot.editor.enableAutoCompletions)`: Automatically show inline completions.
* `setting(github.copilot.enable)`: Enable or disable Copilot completions for specified [languages](/docs/languages/identifiers.md).
* `setting(github.copilot.editor.enableCodeActions)`: Controls if Copilot commands are shown as Code Actions when available.
* `setting(github.copilot.renameSuggestions.triggerAutomatically)`: Controls whether Copilot generates suggestions for renaming.
* `setting(chat.commandCenter.enabled)` <i class="codicon codicon-beaker"></i>: Controls whether the command center shows a menu for chat actions.
* `setting(workbench.commandPalette.experimental.askChatLocation)` <i class="codicon codicon-beaker"></i>: Controls where the Command Palette should ask chat questions.
* `setting(github.copilot.chat.search.semanticTextResults)` <i class="codicon codicon-beaker"></i>: Enables semantic search results in the Search view.

## Chat settings

* `setting(github.copilot.chat.followUps)`: Controls whether Copilot should suggest follow-up questions in chat.
* `setting(github.copilot.chat.localeOverride)`: Specify a locale that Copilot should respond in, such as `en` or `fr`.
* `setting(github.copilot.chat.runCommand.enabled)`: Enables the `/runCommand` intent in the Chat view to run VS Code commands.
* `setting(github.copilot.chat.useProjectTemplates)`: Use relevant GitHub projects as starter projects when using `/new`.
* `setting(github.copilot.chat.scopeSelection)`: Whether to prompt for a specific symbol scope if you use `/explain` and the active editor has no selection.
* `setting(github.copilot.chat.terminalChatLocation)`: Controls where chat queries from the terminal should be opened.
* `setting(chat.experimental.detectParticipant.enabled)` <i class="codicon codicon-beaker"></i>: Enable chat participant detection in the Chat view.
* `setting(chat.editor.fontFamily)`: Font family in chat codeblocks.
* `setting(chat.editor.fontSize)`: Font size in pixels in chat codeblocks.
* `setting(chat.editor.fontWeight)`: Font weight in chat codeblocks.
* `setting(chat.editor.lineHeight)`: Line height in pixels in chat codeblocks.
* `setting(chat.editor.wordWrap)`: Toggle line wrapping in chat codeblocks.

## Edits settings

* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`)
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`)
* `setting(chat.editing.alwaysSaveWithGeneratedChanges)` - automatically save generated changes from Copilot Edits to disk (default: `false`)

## Inline Chat settings

* `setting(inlineChat.acceptedOrDiscardBeforeSave)`: Controls whether pending Inline Chat sessions in an editor prevent saving the file.
* `setting(inlineChat.finishOnType)`: Whether to finish an Inline Chat session when typing outside of changed regions.
* `setting(inlineChat.holdToSpeech)`: Whether holding the Inline Chat keybinding will automatically enable speech recognition.
* `setting(inlineChat.inlineChat.lineEmptyHint)` <i class="codicon codicon-beaker"></i>: Controls whether to show a hint for Inline Chat on an empty line.
* `setting(inlineChat.mode)`: Configure if changes crafted with Inline Chat are applied directly to the document or are previewed first.
* `setting(inlineChat.lineNaturalLanguageHint)` <i class="codicon codicon-beaker"></i>: Experimental suggestion that triggers Inline Chat as soon as a line mostly consists of words.
* `setting(github.copilot.chat.temporalContext.enabled)` <i class="codicon codicon-beaker"></i>: Whether to include recently viewed and edited files with Copilot requests in Inline Chat.

## Customize Copilot prompts

* `setting(github.copilot.chat.codeGeneration.instructions)` <i class="codicon codicon-beaker"></i>: A set of instructions that will be added to Copilot requests that generate code.
* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` _(Preview)_: Controls whether code instructions from `.github/copilot-instructions.md` are added to Copilot requests.
* `setting(github.copilot.chat.testGeneration.instructions)` <i class="codicon codicon-beaker"></i>: A set of instructions that will be added to Copilot requests that generate tests.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: A set of instructions that will be added to Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` <i class="codicon codicon-beaker"></i>: A set of instructions that will be added to Copilot requests that generate commit messages.

## Debugging settings

* `setting(github.copilot.chat.startDebugging.enabled)` _(Preview)_: Enables the experimental `/startDebugging` intent in the Chat view to generate debugging configuration.

## Testing settings

* `setting(github.copilot.chat.generateTests.codeLens)` <i class="codicon codicon-beaker"></i>: Show **Generate tests** code lens for symbols that are not covered by current test coverage information.
* `setting(github.copilot.chat.setupTests.enabled)` <i class="codicon codicon-beaker"></i>: Enables the experimental `/setupTests` intent and prompting in `/tests` generation.
* `setting(github.copilot.chat.fixTestFailure.enabled)`: Enables the preview `/fixTestFailure` intent in chat and delegates certain `/fix` invocations automatically if no testing setup is found.
* `setting(github.copilot.chat.testGeneration.instructions)` <i class="codicon codicon-beaker"></i>: A set of instructions that will be added to Copilot requests that generate tests.

## Notebook settings

* `setting(notebook.experimental.generate)` <i class="codicon codicon-beaker"></i>: Enable the **Generate** action to create code cells with Inline Chat enabled in the notebook editor.

## Accessibility settings

* `setting(inlineChat.accessibleDiffView)`: Whether the Inline Chat also renders an accessible diff viewer for its changes.
* `setting(accessibility.signals.chatRequestSent)`: Plays a signal - sound (audio cue) and/or announcement (alert) - when a chat request is made.
* `setting(accessibility.signals.chatResponseReceived)`: Plays a sound / audio cue when the response has been received.
* `setting(accessibility.verbosity.inlineChat)`: Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused.
* `setting(accessibility.verbosity.inlineCompletions)`: Provide information about how to access the inline completions hover and Accessible View.
* `setting(accessibility.verbosity.panelChat)`: Provide information about how to access the chat help menu when the chat input is focused.
* `setting(accessibility.voice.keywordActivation)`: Controls whether the keyword phrase 'Hey Code' is recognized to start a voice chat session.
* `setting(accessibility.voice.autoSynthesize)`: Controls whether a textual response should automatically be read out aloud when speech was used as input.
* `setting(accessibility.voice.speechTimeout)`: The duration in milliseconds that voice speech recognition remains active after you stop speaking.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/copilot-vscode-features.md)
