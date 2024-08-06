---
Order: 24
Area: editor
TOCTitle: Voice interactions
ContentId: e3bf9098-7b2f-4b23-9e0f-3d2094bad80a
PageTitle: Using Voice in Visual Studio Code
DateApproved:
MetaDescription: Visual Studio Code voice accessibility features. Learn here about the various ways VS Code can be used with voice.
---
# Voice Support

The [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension enables various features by using your voice. Once installed, the extension enables you to dictate into the editor, or to verbally interact with [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat).

![Screenshot of the VS Code Speech extension marketplace details](images/accessibility/speech-extension.png)

**Note:** voice support in VS Code does not require you to be online. Recordings are never sent to any online service but computed local on your machine.

## Editor dictation

You can dictate into the editor via these commands: **Voice: Start Dictation in Editor** (`kb(workbench.action.editorDictation.start)`) and **Voice: Stop Dictation in Editor** (`kb(workbench.action.editorDictation.stop)`). Once started, a little microphone icon appears where the cursor is, awaiting your voice input:

![Editor Dictation Mode](images/accessibility/editor-dictate.png)

You can press and hold the keybinding for the voice start command (`kb(workbench.action.editorDictation.start)`) to enable **walky-talky mode**. Voice recognition is active until you release the keys, after which the request is submitted automatically.

**Note:** dictation even works in other places where a rich editor is used, such as the SCM commit input box and the comments input field when reviewing pull requests.

## Voice in GitHub Copilot Chat

You can use your voice to talk to [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) easily. The command **Voice: Start Voice Chat** (`kb(workbench.action.chat.startVoiceChat)`) brings up a voice chat, regardless of where the current focus is. If the focus is in the editor, inline chat is started, otherwise the Chat view is opened.

![Screenshot of the chat input field showing an active microphone icon to enter a voice chat message](images/accessibility/voice-chat.png)

**Note:** when using voice for GitHub Copilot Chat, the chat prompt will automatically submit when you pause. You can configure the time to wait before submitting via the `accessibility.voice.speechTimeout` setting, or disable this functionality when you configure the setting to `0`.

Copilot Chat also supports text-to-speech capabilities. When you enable the `accessibility.voice.autoSynthesize` setting, Copilot Chat responses are automatically read out aloud when voice was also used as input. To interrupt the synthesis, select the icon or press `kb(workbench.action.speech.stopReadAloud)`.

Each chat response also shows a new speaker icon, so that you can selectively read out a response aloud.

![Text to Speech for a Chat Response](images/accessibility/text-to-speech.png)

## Walky talky mode

When using keyboard shortcuts to start voice (`kb(workbench.action.editorDictation.start)` or `kb(workbench.action.chat.startVoiceChat)`), either in the editor or chat, you can press and hold the keybinding to start the voice recognition. When you release the keybinding, voice recognition will stop. In addition, when used in chat, the prompt will be submitted.

## "Hey Code"

It is possible to enable a mode where VS Code will always listen for the phrase "Hey Code" to start a voice chat session. Configure the `accessibility.voice.keywordActivation` setting accordingly to enable this. When VS Code is listening for "Hey Code", a microphone icon appears in the status bar to indicate as such:

![Screenshot of a status bar entry to signal active listening to "Hey Code"](images/accessibility/hey-code.png)

## Support for multiple languages

You can select from one of the 26 supported languages by using the `accessibility.voice.speechLanguage` setting. If you set the value to `auto` (default value), the VS Code Speech extension uses the [VS Code display language](/docs/getstarted/locales.md), if that language is available.

Each language for the speech extension comes as its own extension. When you start speech recognition for the first time, you will see an extension installation for each language you selected.

## Next steps

Read on to find out about:

* [Other VS Code accessibility features](/docs/editor/accessibility.md).
* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
