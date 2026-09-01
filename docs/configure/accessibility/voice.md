---
ContentId: e3bf9098-7b2f-4b23-9e0f-3d2094bad80a
DateApproved: 9/2/2026
MetaDescription: Use built-in dictation and Voice Mode in {% data variables.product.prodname_vscode %} for local speech recognition and spoken agent conversations.
---
# Voice support

{% data variables.product.prodname_vscode %} has built-in voice features for two workflows. Voice Mode lets you have a spoken conversation with an agent while it works on your code. Dictation converts your speech to text in chat, the {% data variables.copilot.agents_window %}, editors, and terminals.

## Use Voice Mode

`feature(voice-mode)`

Voice Mode lets you speak with an agent and hear its responses. To start a voice conversation, enable `setting(agents.voice.enabled)` and select the **Voice Mode** button in the chat input.

While the agent is speaking, start speaking or press `kb(agentsVoice.pushToTalk)` to interrupt the response and continue the conversation.

You can customize Voice Mode in the following ways:

* Enable `setting(agents.voice.showTranscript)` to show the conversation transcript in the chat input. Use the Voice Mode controls to show or hide the transcript and mute or unmute your microphone without ending the voice session.
* Run **Chat: Dictate: Select Microphone** from the Command Palette to choose the input device used by both dictation and Voice Mode.
* Use `setting(agents.voice.voice)` to select the voice that reads responses aloud.
* Run **Voice Mode: Show Introduction** from the Command Palette to reopen the introduction, where you can select a microphone and preview the available voices.

Right-click the **Voice Mode** button in the chat input to access its configuration, instructions, introduction, microphone selection, and transcript controls.

## Use built-in dictation

`feature(built-in-dictation)`

Dictation uses an on-device speech recognition model by default, so you can dictate without sending audio to an online service.

Built-in dictation is available when AI features are enabled and is turned on by default with the `setting(dictation.enabled)` setting. On first use, {% data variables.product.prodname_vscode_shortname %} downloads the default `nemotron-3.5-asr-streaming-0.6b` speech recognition model. After the download completes, speech recognition works locally and offline.

The on-device model is available on these desktop platforms:

* Windows on x64 and Arm64.
* macOS on Apple silicon.
* Linux on x64 and Arm64 with glibc 2.34 or later.
* Remote workspaces, because speech recognition runs on the local {% data variables.product.prodname_vscode_shortname %} client.

{% data variables.product.prodname_vscode_shortname %} asks for microphone access when you start dictation. Only one dictation session can be active at a time.

### Dictate in chat or the {% data variables.copilot.agents_window %}

To dictate a chat prompt, select the microphone button in the chat input or press `kb(workbench.action.chat.toggleSpeechToText)`. Select the button or press the keyboard shortcut again to stop dictation and keep the transcribed text. Dictation inserts text in the input but does not submit the request.

![Screenshot showing text entered by dictation in the chat input.](images/accessibility/chat-dictation-text.png)

![Screenshot showing active dictation listening for speech in the chat input.](images/accessibility/chat-dictation-listening.png)

Press `kb(workbench.action.chat.cancelSpeechToText)` to cancel dictation and remove the text from the current dictation session.

On first use, {% data variables.product.prodname_vscode_shortname %} shows an introduction next to the chat input. To view it again, run **Chat: Dictate: Show Introduction** from the Command Palette.

### Dictate in an editor

To dictate in a writable editor, run **Voice: Start Dictation in Editor** or press `kb(workbench.action.editorDictation.start)`. A microphone control appears at the cursor while dictation is active. Run **Voice: Stop Dictation in Editor** or use the microphone control to stop.

Editor dictation also works in other inputs that use a rich editor, such as the Source Control commit input and pull request comment fields.

> [!NOTE]
> Press and hold a dictation keyboard shortcut to use push-to-talk. Speech recognition remains active until you release the keys.

### Dictate in a terminal

To dictate at a terminal prompt, run **Voice: Start Dictation in Terminal** from the Command Palette. Run **Voice: Stop Dictation in Terminal** or use the microphone control to stop and insert the final text.

Terminal dictation adapts speech for command-line input. For example, it removes ordinary punctuation, converts spoken symbol names, and adjusts initial capitalization. Set `setting(accessibility.voice.speechTimeout)` to a value greater than zero to stop dictation automatically after the specified period of silence.

## Configure dictation

Use these settings to configure built-in dictation:

| Setting | Description | Default |
|---------|-------------|---------|
| `setting(dictation.enabled)` | Controls whether built-in dictation is available. | `true` |
| `setting(dictation.model)` | Selects the speech recognition model. | `"nemotron-3.5-asr-streaming-0.6b"` |
| `setting(dictation.showTranscript)` | Shows interim transcription while you speak. Final text is still inserted when this setting is off. | `true` |
| `setting(dictation.experimental.llmCleanup)` | Uses a language model to improve punctuation, capitalization, paragraphs, lists, and number formatting in the final transcript. | `true` |
| `setting(agents.voice.language)` | Provides a language hint for dictation and Voice Mode. Use `auto` to use the system language. | `"auto"` |
| `setting(accessibility.voice.speechTimeout)` | Stops terminal dictation after the specified number of milliseconds of silence. Set to `0` to keep listening. | `0` |

To choose an input device, run **Chat: Dictate: Select Microphone** from the Command Palette. The microphone selection applies to all dictation surfaces and Voice Mode.

### Add dictation instructions

You can provide instructions for how the language model cleans up a transcript. For example, you can specify preferred terminology or formatting. Run **Voice: Configure Dictation Instructions** from the Command Palette to create an instructions file:

* User instructions apply across all workspaces and are stored in `~/.copilot/dictation.md`.
* Workspace instructions are stored in `.github/dictation.md` and apply only when the workspace is trusted.

Dictation instructions apply when `setting(dictation.experimental.llmCleanup)` is enabled.

### Install the model from a local package

If network restrictions prevent {% data variables.product.prodname_vscode_shortname %} from downloading the on-device model, download the official CPU model package separately. Then run **Chat: Install Dictation Model from Local Package...** and select the ZIP file or prepared model folder.

## Understand dictation privacy

The default speech recognition model processes microphone audio on your device. After the initial model download, speech recognition does not require an internet connection.

When `setting(dictation.experimental.llmCleanup)` is enabled, {% data variables.product.prodname_vscode_shortname %} sends the transcript text, but not the audio, to a Copilot language model for cleanup. Turn off this setting to keep transcript processing local.

Organizations can enforce these privacy choices with enterprise policies:

* `DictationModel` controls whether dictation uses the on-device model or streams audio to the cloud transcription service.
* `DictationLLMCleanup` controls whether the final transcript is sent to a Copilot language model for cleanup.

To keep both audio and transcript processing on the device, administrators must require the on-device model and turn off language-model cleanup. Learn more about [managing AI settings in enterprise environments](/docs/enterprise/ai-settings.md#control-dictation-data).

## {% data variables.product.prodname_vscode_shortname %} Speech extension

Built-in dictation is not available on these platforms:

* {% data variables.product.prodname_vscode_shortname %} for the Web.
* Intel-based Mac computers.
* 32-bit and Arm32 systems.
* Linux distributions that use musl, such as Alpine Linux.

On these platforms, install the [{% data variables.product.prodname_vscode_shortname %} Speech extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech). The extension also provides voice chat, text-to-speech for chat responses, and the "Hey Code" keyword activation feature.

## Next steps

Read on to find out about:

* [Other {% data variables.product.prodname_vscode_shortname %} accessibility features](/docs/configure/accessibility/accessibility.md).
* [{% data variables.product.prodname_vscode %} User Interface](/docs/editing/getting-started/userinterface.md) - A quick orientation to {% data variables.product.prodname_vscode_shortname %}.
* [Basic Editing](/docs/editing/codebasics.md) - Learn about the powerful {% data variables.product.prodname_vscode_shortname %} editor.
* [Code Navigation](/docs/editing/editingevolved.md) - Move quickly through your source code.
