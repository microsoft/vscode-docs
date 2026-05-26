---
ContentId: a3f7d8e2-5c4b-49a1-b6d3-7e8f9a2c1d4b
DateApproved:
MetaDescription: Use session insights in VS Code to generate standup reports, get personalized tips, and query your Copilot chat history with natural language.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Session insights

Your GitHub Copilot sessions build a searchable history of everything you work on. Ask natural language questions about past sessions, generate standup reports, get personalized tips, and search your coding history. With [session sync](/docs/copilot/chat/session-sync.md) active by default, queries draw from sessions across Copilot CLI, coding agent, code review, and VS Code.

## Available commands

Use these commands in the Copilot Chat input to query your session history:

| Command | Description |
|---------|-------------|
| `/chronicle:standup` | Generate a standup report from recent sessions, grouped by branch and repo |
| `/chronicle:tips` | Get personalized tips based on your usage patterns over the past 7 days |
| `/chronicle:cost-tips` | Get tips to reduce token usage and Copilot cost |
| `/chronicle:search <query>` | Search sessions by keyword, file path, or PR or issue reference |
| `/chronicle:reindex` | Rebuild the local session index |

You can also ask free-form questions about your session history directly in chat. For example, type "What files did I edit yesterday?" or "Have I worked on anything related to the payments API?" and Copilot searches your synced session history to answer. Unlike `/chronicle:search` which performs a direct content search, free-form questions use semantic understanding to find relevant sessions.

## Generate standup reports

The `/chronicle:standup` command summarizes your recent coding sessions into a standup-style report. It groups work by feature branch and repository, including:

* What you worked on, derived from conversation turns
* Key files you edited
* PRs, issues, and commits you referenced
* Whether work is done or in progress

```prompt
/chronicle:standup
```

By default, the report covers the last 24 hours of sessions.

## Get personalized tips

The `/chronicle:tips` command analyzes 7 days of your session history to suggest ways to use Copilot more effectively. Tips are grounded in your actual usage patterns, not generic advice.

```prompt
/chronicle:tips
```

Tips include suggestions about tools you rarely use, prompting patterns that lead to better results, or workflow improvements based on how you interact with Copilot.

## Reduce cost with usage tips

The `/chronicle:cost-tips` command analyzes your recent sessions to identify opportunities to reduce token usage and Copilot cost.

```prompt
/chronicle:cost-tips
```

## Search your session history

Use `/chronicle:search` followed by a query to find past sessions by keyword, file path, or reference:

```prompt
/chronicle:search authentication middleware
```

The search uses full-text indexing across session summaries, conversation turns, file paths, and checkpoint notes. Results include session IDs and timestamps so you can resume relevant sessions.

## What gets tracked

For each chat session, the local session store records:

* **Session metadata**: repository, branch, working directory, timestamps, and the agent or participant used.
* **Conversation turns**: user messages (up to 1,000 characters) and assistant responses (up to 5,000 characters).
* **Files touched**: file paths from tool calls such as `replace_string_in_file`, `create_file`, `read_file`, and `apply_patch`.
* **External references**: PR numbers, issue numbers, and commit SHAs extracted from GitHub MCP tool calls and terminal commands.

Data is stored in a local SQLite database. Secrets such as tokens, API keys, passwords, and connection strings are automatically filtered before anything is written to the store.

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

* [Session sync](/docs/copilot/chat/session-sync.md) - Sync sessions to your GitHub account for cross-device access
* [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) - Create and organize chat sessions
* [Settings reference](/docs/copilot/reference/copilot-settings.md) - All Copilot settings
