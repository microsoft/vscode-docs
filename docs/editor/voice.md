---
Order:
Area: editor
TOCTitle: Accessibility
ContentId:
PageTitle: Using Voice in Visual Studio Code
DateApproved:
MetaDescription: Visual Studio Code voice accessibility features. Learn here about the various ways VS Code can be used with voice.
---
# Voice Support

Microsoft publishes the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension to enable various features through the power of just using your voice. Once installed, it allows you to dictate into the editor, or use your voice to talk directly into the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) feature.

![VS Code Speech Extension](images/accessibility/speech-extension.png)

## Editor Dictation

You can dictate into the editor via these commands: **Voice: Start Dictation in Editor** (`kb(workbench.action.editorDictation.start)`) and **Voice: Stop Dictation in Editor** (`kb(workbench.action.editorDictation.stop)`). Once started, a little microphone icon appears where the cursor is, awaiting your voice input:

![Editor Dictation Mode](images/accessibility/editor-dictate.png)

You can press and hold the keybinding for the start command (`kb(workbench.action.editorDictation.start)`) to enable walky-talky mode, where the voice recognition stops as soon as you release the keys.

**Note:** dictation even works in other places where a rich editor is used, such as the SCM commit input box and the comments input field when reviewing pull requests.

## Voice in GitHub Copilot Chat

You can use your voice to talk to [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) easily. The command **Voice: Start Voice Chat** (`kb(workbench.action.chat.startVoiceChat)`) works everywhere and brings up a voice chat, depending on where your focus is (inline chat in the editor, panel chat otherwise).

![Voice Chat](images/accessibility/voice-chat.png)

To enable walky-talky mode, press and hold the keybinding. Voice recognition is active until you release the keys, after which the request is submitted automatically.

## Using Other Languages

You can select from one of the 26 supported languages by using the `accessibility.voice.speechLanguage` setting.

Each language for the speech extension comes as its own extension. When you start speech recognition for the first time, you will see an extension installation for each language you selected.

## Next steps

Read on to find out about:

* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
