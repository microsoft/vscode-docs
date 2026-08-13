---
ContentId: b4e8c9f3-6d5a-4b2e-c7a4-8f9e1b3d2c5a
DateApproved: 8/5/2026
MetaDescription: Sync, share, and query Copilot session history in {% data variables.product.prodname_vscode %} with GitHub sync, privacy controls, Chronicle reports, and natural-language search.
MetaSocialImage: ../../../images/shared/github-copilot-social.png
---
# Sync and query session history

{% data variables.product.prodname_vscode_shortname %} maintains a searchable history of your Copilot sessions. By default, it syncs local agent sessions to your GitHub account so you can access them across devices, share selected sessions, and query work from {% data variables.product.prodname_vscode_shortname %}, Copilot CLI, coding agent, code review, and the GitHub Copilot Desktop app.

Synced sessions are private unless you explicitly share them.

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
* **{% data variables.product.prodname_vscode_shortname %} group policy** (`CopilotSessionSync`): when disabled, the `setting(chat.sessionSync.enabled)` setting is forced to `false` and sessions stay local only.

> [!IMPORTANT]
> Enabling the policy does not give administrators access to your session data. Synced sessions are tied to your personal account and are accessible only to you by default.

When disabled by policy, the session sync status shows **Disabled by policy** and users cannot override the setting.

## Share a session

Sessions are not shared by default. On GitHub.com, you can share a synced session for view-only access to anyone who has access to the repository:

1. Open the **Agents** tab on GitHub.com.
1. Select a session and open **Sharing settings** from the `...` menu.
1. Enable sharing to give repository collaborators view-only access.

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

## Query session history with Chronicle

Use Chronicle commands or natural-language questions to search past sessions, generate standup reports, and get personalized usage tips.

### Chronicle commands

Enter these commands in the chat input:

| Command | Description |
|---------|-------------|
| `/chronicle:standup` | Summarize recent coding sessions into a standup report, grouped by branch and repository. Covers the last 24 hours by default. |
| `/chronicle:tips` | Analyze recent session history and suggest ways to use Copilot more effectively. |
| `/chronicle:cost-tips` | Identify opportunities to reduce token usage and Copilot cost. |
| `/chronicle:search <query>` | Search sessions by keyword, file path, or pull request or issue reference. |
| `/chronicle:reindex` | Rebuild the local session index and sync session data to your account. |

### Ask questions about session history

Ask free-form questions such as "What files did I edit yesterday?" or "Have I worked on anything related to the payments API?" Copilot uses semantic understanding to find relevant sessions. Use `/chronicle:search` when you want a direct content search.

### What gets tracked

The local session store records:

* **Session metadata**: repository, branch, working directory, timestamps, and the agent or participant.
* **Conversation turns**: user messages and assistant responses.
* **Files touched**: file paths from tool calls.
* **External references**: pull request numbers, issue numbers, and commit SHAs.

Data is stored in a local SQLite database. Secrets such as tokens, API keys, passwords, and connection strings are filtered before data is synced.

### Reindex the session store

If sessions are missing or the database becomes corrupted, rebuild the index:

```prompt
/chronicle:reindex
```

You can also run **Reindex Sessions** (`github.copilot.chronicle.reindex`) from the Command Palette.

Reindex after restoring session files from a backup, an unexpected crash, manually deleting session directories, or opting back into session sync.

## Settings reference

| Setting | Default | Description |
|---------|---------|-------------|
| `setting(github.copilot.chat.localIndex.enabled)` | `true` | Enable local session tracking (prerequisite for sync) |
| `setting(chat.sessionSync.enabled)` | `true` | Sync sessions to your GitHub account |
| `setting(chat.sessionSync.excludeRepositories)` | `[]` | Repository patterns to exclude from sync |

## Related content

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - Create and organize agent sessions
* [Security](/docs/agents/run/security.md) - Copilot security and privacy
* [Diagnose prompt caching with the Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) - Find where sessions waste tokens
