---
ContentId: a3f7d8e2-5c4b-49a1-b6d3-7e8f9a2c1d4b
DateApproved: 6/10/2026
MetaDescription: Use chronicle commands in VS Code to generate standup reports, get personalized tips, and query your Copilot session history with natural language.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# Query session history with chronicle

Your GitHub Copilot sessions build a searchable history of everything you work on. Ask natural language questions about past sessions, generate standup reports, get personalized tips, and search your coding history. With [session sync](/docs/agents/sessions/session-sync.md) active by default, queries draw from sessions across Copilot CLI, coding agent, code review, and VS Code.

## Chronicle commands

Use these commands in the chat input to query your session history:

| Command | Description |
|---------|-------------|
| `/chronicle:standup` | Summarize recent coding sessions into a standup report, grouped by branch and repository. Covers the last 24 hours by default. Includes files edited, PRs or issues referenced, and whether work is done or in progress. |
| `/chronicle:tips` | Analyze your recent session history (typically 7 days) and suggest ways to use Copilot more effectively. Tips are grounded in your actual usage patterns: tools you rarely use, prompting patterns that lead to better results, or workflow improvements. |
| `/chronicle:cost-tips` | Analyze recent sessions to identify opportunities to reduce token usage and Copilot cost. |
| `/chronicle:search <query>` | Search sessions by keyword, file path, or PR or issue reference. Uses full-text indexing across session summaries, conversation turns, file paths, and checkpoint notes. Results include session IDs and timestamps so you can resume relevant sessions. |
| `/chronicle:reindex` | Rebuild the local session index and sync session data to your account. |

## Free-form questions

You can also ask free-form questions about your session history directly in chat. For example, type "What files did I edit yesterday?" or "Have I worked on anything related to the payments API?" and Copilot searches your synced session history to answer. Unlike `/chronicle:search` which performs a direct content search, free-form questions use semantic understanding to find relevant sessions.

## What gets tracked

For each chat session, the local session store records:

* **Session metadata**: repository, branch, working directory, timestamps, and the agent or participant used.
* **Conversation turns**: user messages (up to 1,000 characters) and assistant responses (up to 5,000 characters).
* **Files touched**: file paths from tool calls such as `replace_string_in_file`, `create_file`, `read_file`, and `apply_patch`.
* **External references**: PR numbers, issue numbers, and commit SHAs extracted from GitHub MCP tool calls and terminal commands.

Data is stored in a local SQLite database. Secrets such as tokens, API keys, passwords, and connection strings are automatically filtered before data is synced to the cloud.

## Reindex the session store

If sessions appear missing or the database becomes corrupted, rebuild the index. Reindexing also syncs your session data to your account.

```prompt
/chronicle:reindex
```

You can also run the **Reindex Sessions** command (`github.copilot.chronicle.reindex`) from the Command Palette.

Situations where reindexing helps:

* After restoring session files from a backup
* After an unexpected crash that prevented data from flushing to the store
* After manually deleting session directories
* After opting back into session sync

## Related content

* [Session sync](/docs/agents/sessions/session-sync.md) - Sync sessions to your GitHub account for cross-device access
* [Manage chat sessions](/docs/chat/chat-sessions.md) - Create and organize chat sessions
* [Settings reference](/docs/agents/reference/ai-settings.md) - All AI and agent settings
