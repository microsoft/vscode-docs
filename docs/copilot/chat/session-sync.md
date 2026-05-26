---
ContentId: b4e8c9f3-6d5a-4b2e-c7a4-8f9e1b3d2c5a
DateApproved:
MetaDescription: Sync your Copilot chat sessions to GitHub for cross-device access, enterprise policy controls, and sharing with teammates.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Session sync

By default, VS Code syncs your GitHub Copilot chat sessions to your GitHub account. Synced sessions appear on github.com alongside other agent sessions in the **Agents** tab of your repository. This enables [session insights](/docs/copilot/chat/session-insights.md) to query across all your sessions, including those from Copilot CLI, coding agent, code review, and the GitHub Copilot Desktop app.

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

For Copilot Business and Copilot Enterprise users, the "Store local sessions in the Cloud" policy controls whether session sync is available.

* **Organization-level policy** (unconfigured by default): organization owners can set this to "View from cloud" (sync only) or "View and control" (sync plus remote control). If the policy is disabled or unconfigured, sessions are stored locally only for the organization's users.
* **Enterprise-level policy**: enterprise owners can enforce a setting across all organizations, or select "Let organizations decide" to allow each organization to choose its own level. If the enterprise enforces "View and control," all organizations under it receive that setting.

> [!IMPORTANT]
> Enabling the policy does not give administrators access to your session data. Synced sessions are tied to your personal account and are accessible only to you by default.

When disabled by policy, the session sync status shows **Disabled by policy** and users cannot override the setting.

## Share a session

Sessions are unshared by default. You can share a synced session for view-only access to anyone who has access to the repository:

1. Open the **Agents** tab on github.com.
2. Select a session and open **Sharing settings** from the `...` menu.
3. Enable sharing to give repository collaborators view-only access.

Recipients can view the session's prompts, responses, and file changes, but cannot steer or modify the session. Shared sessions are not indexed for other users' session queries.

## Session sync status

The session sync status appears in the Copilot status bar in the Chat view. It shows the current state of cloud sync:

| State | Description |
|-------|-------------|
| **Not enabled** | Session sync is off. Data stays local to this device. |
| **Enabled** | Sessions are syncing to your GitHub account. |
| **N sessions synced** | Shows how many sessions have been uploaded. Select to view sessions on github.com. |
| **Syncing N session(s)** | Upload is in progress. |
| **Disabled by policy** | Your organization's policy prevents session sync. |
| **Sync error** | Something went wrong during the last sync. Try again later. |

## Privacy and data control

* Sessions are private to you by default. Synced sessions are tied to your personal GitHub account and are accessible only to you unless you explicitly share them.
* Secrets such as tokens, API keys, and credentials are automatically stripped before data leaves your machine.
* You can opt out at any time by setting `setting(chat.sessionSync.enabled)` to `false`. Existing synced sessions remain on github.com until you delete them.
* **Managing synced data**: you can delete or hide synced sessions from github.com. Hiding a session removes it from your session index so it no longer appears in query results. Deleting local session files does not affect synced data.

## Settings reference

| Setting | Default | Description |
|---------|---------|-------------|
| `setting(github.copilot.chat.localIndex.enabled)` | `true` | Enable local session tracking (prerequisite for sync) |
| `setting(chat.sessionSync.enabled)` | `true` | Sync sessions to your GitHub account |
| `setting(chat.sessionSync.excludeRepositories)` | `[]` | Repository patterns to exclude from sync |

## Related content

* [Session insights](/docs/copilot/chat/session-insights.md) - Query your session history for standup reports, tips, and search
* [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) - Create and organize chat sessions
* [Security](/docs/copilot/security.md) - Copilot security and privacy
