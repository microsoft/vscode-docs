---
Order:
Area: editor
TOCTitle: Voice interactions
ContentId: e3bf9098-7b2f-4b23-9e0f-3d2094bad80a
PageTitle: Using Voice in Visual Studio Code
DateApproved:
MetaDescription: Visual Studio Code voice accessibility features. Learn here about the various ways VS Code can be used with voice.
---
# Voice Support

Microsoft publishes the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension to enable various features through the power of only using your voice. Once installed, the extension enables you to dictate into the editor, or to verbally interact with [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat).

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

To enable walky-talky mode, press and hold the keybinding. Voice recognition is active until you release the keys, after which the request is submitted automatically.

## "Hey Code"

It is possible to enable a mode where VS Code will always listen for the phrase "Hey Code" to start a voice chat session. Configure the `accessibility.voice.keywordActivation` setting accordingly to enable this. When VS Code is listening for "Hey Code", a microphone icon appears in the status bar to indicate as such:

![Screenshot of a status bar entry to signal active listening to "Hey Code"](images/accessibility/hey-code.png)

## Support for multiple languages

You can select from one of the 26 supported languages by using the `accessibility.voice.speechLanguage` setting.

Each language for the speech extension comes as its own extension. When you start speech recognition for the first time, you will see an extension installation for each language you selected.

## Next steps

Read on to find out about:

* [Other VS Code accessibility features](/docs/editor/accessibility.md).
* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
