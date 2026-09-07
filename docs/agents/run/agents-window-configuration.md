---
ContentId: 8b38ebbb-831f-43ba-8285-93846b7cb135
DateApproved: 9/9/2026
MetaDescription: Configure AI providers, accounts, layout, settings, extensions, and editors in the {% data variables.copilot.agents_window %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Configure the {% data variables.copilot.agents_window %} (Preview)

The {% data variables.copilot.agents_window %} uses the AI providers and accounts configured in {% data variables.product.prodname_vscode_shortname %}. It shares settings and the default profile with the main {% data variables.product.prodname_vscode_shortname %} window. This article describes how to manage providers and accounts, adjust the layout and editors, and configure window-specific settings and extensions.

For instructions about starting and working with sessions, see [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

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

## Manage AI providers and accounts

The {% data variables.copilot.agents_window %} supports multiple authentication and billing options:

* **GitHub Copilot**: select the account icon in the top-right corner, and then sign in to GitHub. To switch accounts, sign out and then authenticate with a different GitHub account.
* **Claude**: use an Anthropic API key or Claude Code OAuth token.
* **Codex**: select the account icon, and then select **Sign in to ChatGPT**.
* **Bring your own key (BYOK)**: add a model in the Language Models editor and enable `setting(chat.agentHost.byokModels.enabled)` to make it available to Agent Host sessions. Learn how to [configure BYOK models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

For complete Claude and Codex setup instructions, see [Configure a harness or Cloud target](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target).

Claude, ChatGPT-backed Codex, and BYOK models can run in the desktop {% data variables.copilot.agents_window %} without GitHub sign-in. This signed-out experience is experimental and requires `setting(chat.agentHost.allowSignedOutWhenUsable)`. Features that require GitHub authentication prompt you to sign in when needed. The browser-based {% data variables.copilot.agents_window %} always requires GitHub sign-in.

## Configure settings for the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} shares all of your {% data variables.product.prodname_vscode_shortname %} settings. To use different behavior in the {% data variables.copilot.agents_window %} and the editor window, override individual settings for the {% data variables.copilot.agents_window %} without affecting the main {% data variables.product.prodname_vscode_shortname %} setup.

To override a setting for the {% data variables.copilot.agents_window %} only, edit your settings file and scope the value under the {% data variables.copilot.agents_window %} section. Open the Settings editor (`kb(workbench.action.openSettings)`) from the {% data variables.copilot.agents_window %} to see which scope a setting applies to.

![Screenshot showing the Settings editor open in the {% data variables.copilot.agents_window %}, with the different scopes for settings highlighted.](../images/agents-window/agents-window-settings.png)

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

* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - start, monitor, review, and finish agent sessions across workspaces.
* [Customize agents](/docs/agent-customization/overview.md) - configure instructions, agents, skills, tools, and hooks.
* [AI settings reference](/docs/agents/reference/ai-settings.md) - review settings for agents and chat.
