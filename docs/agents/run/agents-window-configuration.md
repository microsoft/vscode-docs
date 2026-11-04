---
ContentId: 8b38ebbb-831f-43ba-8285-93846b7cb135
DateApproved: 10/28/2026
MetaDescription: Configure accounts, models, layout, settings, extensions, and editors in the {% data variables.copilot.agents_window %}.
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

For account requirements, billing options, and integration setup, see [Agent harness requirements and setup](/docs/agents/run/agent-harnesses.md#requirements-and-setup).

> [!NOTE]
> Claude and Codex harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability), even with separate provider credentials. Contact the IT team that deployed the settings to discuss access.

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

### Arrange chat tabs and groups

For sessions that support [multiple chats](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session), use `setting(sessions.showChatTabs)` to choose how conversations appear:

* **Multiple**: Show each open chat as a tab, with optional split groups.
* **Single**: Show the active chat as the session view. Selecting a nested session replaces the unpinned chat pane. A chat explicitly opened to the side stays visible, and closing the last nested session pane doesn't reopen the main chat.

In **Multiple**, arrange chat groups with the mouse or keyboard:

* Drag a tab to the center of another group to move it there.
* Drag a tab to a group's left, right, top, or bottom edge to create a group in that direction.
* Run **Sessions: Split Chat Group Right**, **Sessions: Split Chat Group Down**, **Sessions: Move Chat to Previous Group**, or **Sessions: Move Chat to Next Group** from the Command Palette (`kb(workbench.action.showCommands)`).
* Press `kb(sessions.focusPreviousChatGroup)` or `kb(sessions.focusNextChatGroup)` to move focus between groups.

Moving or closing the last chat in a group closes that group and expands the remaining groups. Visible and hidden chats, their history, group assignments, active chats, and split sizes are restored when you switch sessions or reload the window.

To arrange separate top-level sessions instead, see [Arrange sessions in a grid](/docs/agents/run/agents-window.md#arrange-sessions-in-a-grid).

To hide the sessions sidebar, select **Toggle Sidebar** in the top-left corner or press `kb(workbench.action.toggleSidebarVisibility)`.

### Use the single-pane editor panel (Experimental)

The experimental single-pane layout replaces the separate editor and side panel with one docked pane. A shared tab bar spans the editor and the **Changes** or **Files** detail view. Files and diffs open in the docked editor next to the chat instead of in a modal window.

To use the single-pane layout, enable `setting(sessions.layout.singlePaneDetailPanel)` and reload the window. The setting is read when the {% data variables.copilot.agents_window %} starts.

<!-- TODO: Add a screenshot of the single-pane editor panel showing the shared tab bar, editor, and detail panel. -->

In the shared tab bar, select **New Tab** (`+`) to open **Changes**, **Files**, **Browser**, or **Search**. Use **Hide Editor**, **Toggle Details**, and **Maximize Editor Area** or **Restore Editor Area** to adjust the layout. **Toggle Details** is available only for tabs that support a detail panel.

Each session restores its side-pane width, open editors, active editor, and per-file collapsed state when you switch sessions or reload the window.

### Automatically collapse the sessions sidebar (Experimental)

When you enable `setting(sessions.layout.autoCollapseSessionsSidebar)`, the {% data variables.copilot.agents_window %} hides the sessions sidebar on narrow windows when both the editor area and side panel are open. The sidebar appears again when there is room. The {% data variables.copilot.agents_window %} preserves a sidebar that you closed manually and suspends auto-collapse while multiple sessions are open side by side.

## View and edit Markdown files

`feature(markdown-editor)`

The {% data variables.copilot.agents_window %} supports Markdown Preview and the Markdown Editor for `.md` files. Which editor opens by default depends on `setting(workbench.editor.markdownDefaultEditorInAgentsWindow)`.

* When enabled, `.md` files open with **Markdown Editor**.
* When disabled, `.md` files open with **Markdown Preview**.

This setting changes the default only in the {% data variables.copilot.agents_window %}. Learn how to open and use the editor in any window in [Markdown Editor](/docs/languages/markdown.md#markdown-editor).

## Use {% data variables.product.prodname_vscode_shortname %} extensions in the {% data variables.copilot.agents_window %}

Choose which installed {% data variables.product.prodname_vscode_shortname %} extensions run in the {% data variables.copilot.agents_window %} without changing their enablement in the editor window. Extensions must be installed in your default {% data variables.product.prodname_vscode_shortname %} profile.

Extensions that contribute only static content, such as themes, grammars, languages, and keybindings, activate automatically.

### Manage extensions (Experimental)

Use the **Extensions** section of the Agent Customizations editor to turn installed extensions on or off for the {% data variables.copilot.agents_window %}. This experimental section requires `setting(extensions.experimental.agentsWindowManagement)`. If the section isn't visible, turn on this setting.

1. In the {% data variables.copilot.agents_window %}, select **Customizations** in the sidebar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Extensions**.

1. Find an extension in the list, or use the search field, and turn it on or off.

1. If **Restart Required** or **Reload Required** appears, select **Restart Extensions** or **Reload Window** to apply the change.

The list groups extensions by their support for the {% data variables.copilot.agents_window %}:

* **AI Features**: extensions that contribute AI features, such as tools, MCP servers, or skills, but haven't declared support for the {% data variables.copilot.agents_window %}.
* **Supported**: extensions that support the {% data variables.copilot.agents_window %}. These extensions are enabled by default.
* **Other Extensions**: other installed extensions that haven't declared support for the {% data variables.copilot.agents_window %}.

The `setting(extensions.experimental.agentsWindowSuggestions)` setting controls whether extension suggestions appear for the {% data variables.copilot.agents_window %}.

Extensions that haven't declared support might not work as expected, especially if they rely on editor views or debugging.

### Override extension support by ID

As an alternative to the **Extensions** section, use `setting(extensions.supportAgentsWindow)` to override support for individual extension IDs:

```json
"extensions.supportAgentsWindow": {
    "myextension.id": true
}
```

Set an extension ID to `true` to enable it even when it would otherwise be disabled, or to `false` to disable it even when it is supported by default. Reload the {% data variables.copilot.agents_window %} after changing this setting. These overrides don't affect editor windows.

Extension support is still evolving. If an extension doesn't behave as expected, [file an issue](https://github.com/microsoft/vscode/issues).

## Personalize chat

Add a decorative chat background, use the interactive VS Code pet, or adjust how chat content appears. Learn how to [personalize chat](/docs/chat/chat-overview.md#personalize-chat).

### Set a group icon and color

Give [custom session groups](/docs/agents/run/sessions/manage-sessions.md#create-a-custom-group) distinct icons and colors to recognize related work in a busy list.

Right-click a group header and select **Change Icon...** to search for an icon, or **Change Color...** to choose a color from the theme-aware palette.

To restore either default, open its picker and select **Reset to default**. Resetting one doesn't change the other. Both choices persist after reload.

<!-- TODO: Add a screenshot showing a custom group containing workspace sessions and quick chats, with a custom icon and color and the group context menu showing Change Icon and Change Color. -->

## Monitor sessions from the application icon (Preview)

Enable `setting(sessions.showApplicationBadge)` to show how many unarchived sessions need attention on the macOS dock, Linux launcher, or Windows taskbar icon. The setting defaults to `true` in Insiders and `false` in Stable.

![Screenshot showing the {% data variables.product.prodname_vscode_shortname %} application icon with a badge count of one in the Windows taskbar.](../images/agents-overview/application-icon-session-badge.png)

The badge counts sessions that:

* Have unread results and are no longer in progress.
* Are waiting for input.
* Have failing CI checks on an open, non-draft pull request and are no longer in progress.

Unread sessions still in progress aren't counted. Reading or archiving a session removes it from the count when it no longer needs attention.

## Next steps

* [Choose an agent harness](/docs/agents/run/agent-harnesses.md) - compare options, select a harness, and review its setup requirements.
* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - start, monitor, review, and finish agent sessions across workspaces.
* [AI settings reference](/docs/agents/reference/ai-settings.md) - review settings for agents and chat.
