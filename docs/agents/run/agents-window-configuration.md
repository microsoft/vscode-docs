---
ContentId: 8b38ebbb-831f-43ba-8285-93846b7cb135
DateApproved: 10/7/2026
MetaDescription: Configure accounts, models, layout, settings, extensions, and editors in the {% data variables.copilot.agents_window %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Configure the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} uses the AI providers and accounts configured in {% data variables.product.prodname_vscode_shortname %}. It shares settings and the default profile with the main {% data variables.product.prodname_vscode_shortname %} window. This article describes the shared account options and the window-specific layout, editor, setting, and extension configuration.

For instructions about starting and working with sessions, see [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

## Manage AI providers and accounts

The {% data variables.copilot.agents_window %} uses the accounts and model credentials available in {% data variables.product.prodname_vscode_shortname %}:

* **GitHub Copilot**: select the account icon in the top-right corner, and then sign in to GitHub. To switch accounts, sign out and then authenticate with a different GitHub account.
* **Claude**: configure a Claude API key or another supported bring-your-own-key (BYOK) option for Claude.
* **Codex**: select the account icon, and then select **Sign in to ChatGPT**.
* **Bring your own key (BYOK)**: add a model in the Language Models editor and enable `setting(chat.agentHost.byokModels.enabled)` to make it available in the desktop {% data variables.copilot.agents_window %}. Learn how to [configure BYOK models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

For complete authentication, billing, and capability information, see [Configure a harness or Cloud target](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target).

Claude, ChatGPT-backed Codex, and BYOK models can run in the desktop {% data variables.copilot.agents_window %} without GitHub sign-in when you enable `setting(chat.agentHost.allowSignedOutWhenUsable)`. This option is experimental. Features that require GitHub authentication prompt you to sign in when needed. The browser-based {% data variables.copilot.agents_window %} always requires GitHub sign-in.

## Configure settings for the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} shares all of your {% data variables.product.prodname_vscode_shortname %} settings. To use different behavior in the {% data variables.copilot.agents_window %} and the editor window, override individual settings for the {% data variables.copilot.agents_window %} without affecting the main {% data variables.product.prodname_vscode_shortname %} setup.

To override a setting for the {% data variables.copilot.agents_window %} only, edit your settings file and scope the value under the {% data variables.copilot.agents_window %} section. Open the Settings editor (`kb(workbench.action.openSettings)`) from the {% data variables.copilot.agents_window %} to see which scope a setting applies to.

![Screenshot showing the Settings editor open in the {% data variables.copilot.agents_window %}, with the different scopes for settings highlighted.](../images/agents-window/agents-window-settings.png)

### Configure word wrap for code editors

`feature(agents-window-word-wrap)`

Control how code editors in the {% data variables.copilot.agents_window %} wrap long lines with `setting(sessions.editor.wordWrap)`. This setting has the following values:

* `inherit` (default): Follow the `setting(editor.wordWrap)` setting.
* `on`: Wrap lines at the editor viewport width.
* `off`: Never wrap lines.

To change this setting from a code editor, select **More Actions** (**...**) > **Word Wrap**. To temporarily override word wrapping for the current file, use `kb(editor.action.toggleWordWrap)`. This keyboard shortcut doesn't change `setting(sessions.editor.wordWrap)`.

This setting doesn't affect diff editors in the **Changes** view. To configure word wrapping in those editors, see [Configure word wrap in diff editors](/docs/agents/run/review-code-edits.md#configure-word-wrap-in-diff-editors).

## Configure the new-session experience

### Personalize the welcome heading (Experimental)

Enable `setting(sessions.chat.experimental.welcomePhrases)` to show a rotating welcome phrase above the new-session composer in the {% data variables.copilot.agents_window %}.

To personalize the heading, select the pencil icon (**Customize Welcome Message...**), and then choose one of the following options:

* **Name**: Set the name used in welcome phrases. Clear the name to use the first name from your GitHub profile when available, or omit the name when your profile doesn't include one. You can also set the name with `setting(sessions.chat.experimental.welcomeName)`. The name syncs across devices.
* **Phrases**: Open `setting(sessions.chat.experimental.welcomeMessages)` to add custom phrases or replace the default phrases.

The following example adds two custom phrases to the default phrases:

```json
"sessions.chat.experimental.welcomeMessages": {
    "mode": "append",
    "phrases": ["Ready, {name}?", "Let's ship it"]
}
```

Set `mode` to `append` to use your phrases and the default phrases, or set it to `replace` to use only your phrases. Use `{name}` anywhere in a phrase to insert the configured or GitHub profile name. If no name is available, {% data variables.product.prodname_vscode_shortname %} removes the placeholder and its adjoining separator.

To hide the heading, right-click it and select **Hide Welcome Message**. This action turns off `setting(sessions.chat.experimental.welcomePhrases)`. Re-enable the setting to show the heading again.

When screen reader optimized mode is active, the heading is announced once when the composer appears. Turn off `setting(accessibility.verbosity.newSessionWelcome)` to omit the announcement.

### Group the composer controls (Experimental)

Enable `setting(sessions.chat.experimental.newSessionComposerLayout)` to group the workspace, branch, worktree, and harness controls above the new-session chat input. This layout requires `setting(sessions.chat.unifiedWorkspacePicker.enabled)`.

With the unified workspace picker enabled, use `kb(sessions.focusNewSessionWorkspacePicker)` to focus the workspace picker or `kb(sessions.focusNewSessionHarnessPicker)` to focus the harness picker. These commands don't require the experimental composer layout. To assign a keybinding, use the **Configure Keybinding** action in the picker's context menu.

## Adjust the window layout

### Use the single-pane editor panel (Experimental)

The experimental single-pane layout replaces the separate editor and side panel with one docked pane. A shared tab bar spans the editor and the **Changes** or **Files** detail view. Files and diffs open in the docked editor next to the chat instead of in a modal window.

To use the single-pane layout, enable `setting(sessions.layout.singlePaneDetailPanel)` and reload the window. The setting is read when the {% data variables.copilot.agents_window %} starts.

<!-- TODO: Add a screenshot of the single-pane editor panel showing the shared tab bar, editor, and detail panel. -->

In the shared tab bar, select **New Tab** (`+`) to open **Changes**, **Files**, **Browser**, or **Search**. Use **Hide Editor**, **Toggle Details**, and **Maximize Editor Area** or **Restore Editor Area** to adjust the layout. **Toggle Details** is available only for tabs that support a detail panel.

Each session restores its side-pane width, open editors, active editor, and per-file collapsed state when you switch sessions or reload the window.

### Automatically collapse the sessions sidebar (Experimental)

When you enable `setting(sessions.layout.autoCollapseSessionsSidebar)`, the {% data variables.copilot.agents_window %} hides the sessions sidebar on narrow windows when both the editor area and side panel are open. The sidebar appears again when there is room. The {% data variables.copilot.agents_window %} preserves a sidebar that you closed manually and suspends auto-collapse while multiple sessions are open side by side.

## View and edit Markdown files

The {% data variables.copilot.agents_window %} supports rendered Markdown preview and an experimental Markdown editor for `.md` files. Which editor opens by default depends on `setting(workbench.editor.markdownDefaultEditorInAgentsWindow)`.

* When enabled, `.md` files open with **Markdown Editor (Experimental)**.
* When disabled, `.md` files open with **Markdown Preview**.

In **Markdown Editor (Experimental)**, switch between **Editing** and **Locked** modes while keeping the rendered Markdown context. In **Editing** mode, edit content directly. In **Locked** mode, the document remains rendered and read-only.

When you edit a Markdown file, the editor shows Git change markers in the margin. Green indicates added content, blue indicates modified content, and red indicates deleted content. The markers reflect the current Git changes and disappear when you undo or revert the corresponding changes.

## Use {% data variables.product.prodname_vscode_shortname %} extensions in the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} can run {% data variables.product.prodname_vscode_shortname %} extensions. Extensions that contribute only static content, such as themes, grammars, languages, and keybindings, activate automatically.

For other extensions, opt them in by ID with the `setting(extensions.supportAgentsWindow)` setting:

```json
"extensions.supportAgentsWindow": {
    "myextension.id": true
}
```

The extension must be installed in your default {% data variables.product.prodname_vscode_shortname %} profile. Extension support is still evolving. If an extension doesn't behave as expected, [file an issue](https://github.com/microsoft/vscode/issues).

## Personalize chat

Add a decorative chat background, use the interactive VS Code pet, or adjust how chat content appears. Learn how to [personalize chat](/docs/chat/chat-overview.md#personalize-chat).

## Next steps

* [Choose an agent harness](/docs/agents/run/agent-harnesses.md) - compare providers, execution environments, permissions, and isolation.
* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - start, monitor, review, and finish agent sessions across workspaces.
* [AI settings reference](/docs/agents/reference/ai-settings.md) - review settings for agents and chat.
