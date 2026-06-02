---
ContentId: b4e8c9f3-6d5a-4b2e-c7a4-8f9e1b3d2c5a
DateApproved:
MetaDescription: Sync your Copilot chat sessions to GitHub for cross-device access, enterprise policy controls, and sharing with teammates.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Sync Copilot sessions to GitHub

By default, VS Code syncs your chat sessions to your GitHub account, including all local agent sessions. Synced sessions are private to you and are not visible to anyone else unless you explicitly share them. They appear on GitHub.com in the **Agents** tab of your repository, enabling [session insights](/docs/agents/sessions/session-insights.md) to query across all your sessions, including those from Copilot CLI, coding agent, code review, and the GitHub Copilot Desktop app.

## Opt out of session sync

To keep session data local only, set `setting(chat.sessionSync.enabled)` to `false`. When you opt out, session data stays on your machine and you can only query it locally.

## Exclude repositories from sync

Use `setting(chat.sessionSync.excludeRepositories)` to prevent sessions in specific repositories from syncing to the cloud. The setting accepts exact `owner/repo` names or glob patterns:

```json
"chat.sessionSync.excludeRepositories": [
    "my-org/private-repo",
    "my-org/secret-*"
]
```

Sessions from matching repositories are stored locally only.

## Enterprise policy

For Copilot Business and Copilot Enterprise users, two policies control session sync:

* **GitHub.com enterprise policy** ("Store local sessions in the Cloud"): enterprise and organization owners configure this on GitHub.com to enable or disable cloud sync for their users.
* **VS Code group policy** (`CopilotSessionSync`): when disabled, the `setting(chat.sessionSync.enabled)` setting is forced to `false` and sessions stay local only.

> [!IMPORTANT]
> Enabling the policy does not give administrators access to your session data. Synced sessions are tied to your personal account and are accessible only to you by default.

When disabled by policy, the session sync status shows **Disabled by policy** and users cannot override the setting.

## Share a session

Sessions are not shared by default. On GitHub.com, you can share a synced session for view-only access to anyone who has access to the repository:

1. Open the **Agents** tab on GitHub.com.
2. Select a session and open **Sharing settings** from the `...` menu.
3. Enable sharing to give repository collaborators view-only access.

Recipients can view the session's prompts, responses, and file changes, but cannot steer or modify the session. Shared sessions are not indexed for other users' session queries.

## Session sync status

The session sync status appears in the Copilot status bar in the Chat view. It shows the current state of cloud sync:

| State | Description |
|-------|-------------|
| **Not enabled** | Session sync is off. Data stays local to this device. |
| **Enabled** | Sessions are syncing to your GitHub account. |
| **N sessions synced** | Shows how many sessions have been uploaded. Select to view sessions on GitHub.com. |
| **Syncing N sessions** | Upload is in progress. |
| **Disabled by policy** | Your organization's policy prevents session sync. |
| **Sync error** | Something went wrong during the last sync. Try again later. |

## Privacy and data control

* Sessions are private to you by default. Synced sessions are tied to your personal GitHub account and are accessible only to you unless you explicitly share them.
* Secrets such as tokens, API keys, and credentials are automatically stripped before data leaves your machine.
* You can opt out at any time by setting `setting(chat.sessionSync.enabled)` to `false`. Existing synced sessions remain on GitHub.com until you delete them.

## Delete synced sessions

To delete synced session data, run the **Delete Session Sync Data** command (`github.copilot.sessionSync.deleteSessions`) from the Command Palette. The command shows a picker where you select which sessions to remove. After selecting sessions, you choose the deletion scope:

* **Delete from local and cloud**: removes session data from your machine and from GitHub.com. This action cannot be undone.
* **Delete from cloud only**: removes session data from GitHub.com but keeps local data intact.

You can also hide or delete individual synced sessions from the **Agents** tab on GitHub.com. Hiding a session removes it from your session index so it no longer appears in query results.

## Settings reference

| Setting | Default | Description |
|---------|---------|-------------|
| `setting(github.copilot.chat.localIndex.enabled)` | `true` | Enable local session tracking (prerequisite for sync) |
| `setting(chat.sessionSync.enabled)` | `true` | Sync sessions to your GitHub account |
| `setting(chat.sessionSync.excludeRepositories)` | `[]` | Repository patterns to exclude from sync |

## Related content

* [Session insights](/docs/agents/sessions/session-insights.md) - Query your session history for standup reports, tips, and search
* [Manage chat sessions](/docs/agents/sessions/chat-sessions.md) - Create and organize chat sessions
* [Security](/docs/agents/security.md) - Copilot security and privacy
