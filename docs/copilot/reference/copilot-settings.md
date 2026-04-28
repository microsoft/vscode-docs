---
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
DateApproved: 4/29/2026
MetaDescription: Overview of the configuration settings for GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code settings reference

This article lists the configuration settings for GitHub Copilot in Visual Studio Code. For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/configure/settings.md).

The team is continuously working on improving Copilot in VS Code and adding new features. Some features are still experimental. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode/issues). Get more info about the [feature lifecycle in VS Code](/docs/configure/settings.md#feature-lifecycle).

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of inline suggestions and chat interactions.

> [!IMPORTANT]
> **Starting April 20, 2026**, new sign-ups for Copilot Pro, Copilot Pro+, and student plans are temporarily paused. Additionally, we are tightening weekly usage limits. See [GitHub Copilot usage limits](https://docs.github.com/copilot/concepts/usage-limits).

## General settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.commandCenter.enabled)`<br/>Controls whether to show the Chat menu in the VS Code title bar. | `true` |
| `setting(workbench.settings.showAISearchToggle)`<br/>Enable searching settings with AI in the Settings editor. | `true` |
| `setting(workbench.commandPalette.experimental.askChatLocation)` _(Experimental)_<br/>Controls where the Command Palette should ask chat questions. | `"chatView"` |
| `setting(search.searchView.semanticSearchBehavior)` _(Preview)_<br/>Configure when to run semantic search in the Search view: manually (default), when no text search results are found, or always. | `"manual"` |
| `setting(search.searchView.keywordSuggestions)` _(Preview)_<br/>Controls whether to show keyword suggestions in the Search view. | `false` |
| `setting(chat.disableAIFeatures)`<br/>Disable and hide built-in AI features in VS Code, such as chat and inline suggestions, and disable the Copilot extensions. | `false` |

## Code editing settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.editor.enableCodeActions)`<br/>Controls if Copilot commands are shown as Code Actions when available. | `true` |
| `setting(github.copilot.renameSuggestions.triggerAutomatically)`<br/>Generate symbol renaming suggestions. | `true` |
| `setting(github.copilot.enable)`<br/>Enable or disable inline suggestions for specified [languages](/docs/languages/identifiers.md). | `{ "*": true, "plaintext": false, "markdown": false, "scminput": false }` |
| `setting(github.copilot.nextEditSuggestions.enabled)`<br/>Enables [next edit suggestions](/docs/copilot/ai-powered-suggestions.md#next-edit-suggestions) (NES). | `true` |
| `setting(editor.inlineSuggest.edits.allowCodeShifting)`<br/>Configure if NES is able to shift your code to show a suggestion. | `"always"` |
| `setting(editor.inlineSuggest.edits.renderSideBySide)`<br/>Configure if NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code. | `"auto"` |
| `setting(github.copilot.nextEditSuggestions.fixes)`<br/>Enable next edit suggestions based on diagnostics (squiggles). For example, missing imports. | `true` |
| `setting(editor.inlineSuggest.edits.showCollapsed)`<br/>Show NES code changes in the editor only when you press `kbstyle(Tab)` to navigate to the suggestion or hover over the gutter arrow. | `false` |
| `setting(editor.inlineSuggest.fontFamily)`<br/>Configure the font family for inline completions. | `"default"` |
| `setting(editor.inlineSuggest.showToolbar)`<br/>Enable or disable the toolbar that appears for inline completions. | `"onHover"` |
| `setting(editor.inlineSuggest.minShowDelay)`<br/>Time in milliseconds to wait before showing inline suggestions. | `0` |

## Chat settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.localeOverride)`<br/>Specify a locale for chat responses, such as `en` or `fr`. | `"auto"` |
| `setting(github.copilot.chat.useProjectTemplates)`<br/>Use relevant GitHub projects as starter projects when using `/new`. | `true` |
| `setting(github.copilot.chat.scopeSelection)`<br/>Whether to prompt for a specific symbol scope if you use `/explain` and the active editor has no selection. | `false` |
| `setting(github.copilot.chat.terminalChatLocation)`<br/>Controls where chat queries from the terminal should be opened. | `"chatView"` |
| `setting(chat.detectParticipant.enabled)`<br/>Enable chat participant detection in the Chat view. | `true` |
| `setting(chat.artifacts.enabled)` _(Experimental)_<br/>Enable or disable the [artifacts panel](/docs/copilot/chat/chat-artifacts.md) in the chat (preview). | `false` |
| `setting(chat.artifacts.rules.byMimeType)` _(Experimental)_<br/>Rules for extracting artifacts from tool results by MIME type pattern. Maps MIME type patterns (such as `"image/*"`) to a group configuration. | `{ "image/*": { "groupName": "Screenshots", "onlyShowGroup": true } }` |
| `setting(chat.artifacts.rules.byFilePath)` _(Experimental)_<br/>Rules for extracting artifacts from written files by file path glob pattern. Maps glob patterns (such as `"**/*plan*.md"`) to a group configuration. | `{ "**/*plan*.md": { "groupName": "Plans" } }` |
| `setting(chat.artifacts.rules.byMemoryFilePath)` _(Experimental)_<br/>Rules for extracting artifacts from memory tool writes by memory file path glob pattern. Maps glob patterns to a group configuration. | `{ "**/*plan*.md": { "groupName": "Plans" } }` |
| `setting(chat.checkpoints.enabled)` <br/>Enable or disable [checkpoints](/docs/copilot/chat/chat-checkpoints.md) in the chat. | `true` |
| `setting(chat.checkpoints.showFileChanges)` <br/>Show a summary of file changes at the end of each chat request. | `false` |
| `setting(chat.editRequests)`<br/>Enable or disable [editing previous chat requests](/docs/copilot/chat/chat-checkpoints.md#edit-a-previous-chat-request). | `"inline"` |
| `setting(chat.editor.fontFamily)`<br/>Font family in chat codeblocks. | `"default"` |
| `setting(chat.editor.fontSize)`<br/>Font size in pixels in chat codeblocks. | `14` |
| `setting(chat.editor.fontWeight)`<br/>Font weight in chat codeblocks. | `"default"` |
| `setting(chat.editor.lineHeight)`<br/>Line height in pixels in chat codeblocks. | `0` |
| `setting(chat.editor.wordWrap)`<br/>Toggle line wrapping in chat codeblocks. | `"off"` |
| `setting(chat.editing.confirmEditRequestRemoval)`<br/>Ask for confirmation before undoing an edit. | `true` |
| `setting(chat.editing.confirmEditRequestRetry)`<br/>Ask for confirmation before performing a redo of the last edit. | `true` |
| `setting(chat.editing.autoAcceptDelay)`<br/>Configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept. | `0` |
| `setting(chat.editing.revealNextChangeOnResolve)`<br/>Controls whether the editor automatically reveals the next change after keeping or undoing a chat edit. | `true` |
| `setting(chat.fontFamily)`<br/>Font family for Markdown content in chat. | `"default"` |
| `setting(chat.fontSize)`<br/>Font size in pixels for Markdown content in chat. | `13` |
| `setting(chat.notifyWindowOnConfirmation)`<br/>Configure when to show an OS notification when user input is needed in a chat session: `off` to never show notifications, `windowNotFocused` (default) to show notifications only when the VS Code window is not focused, `always` to always show notifications. | `"windowNotFocused"` |
| `setting(chat.notifyWindowOnResponseReceived)`<br/>Configure when to show an OS notification when a chat response is received: `off` to never show notifications, `windowNotFocused` (default) to show notifications only when the VS Code window is not focused, `always` to always show notifications. | `"windowNotFocused"` |
| `setting(chat.requestQueuing.defaultAction)`<br/>Configure the default action for the **Send** button while a request is in progress: `queue` adds the message to the queue, `steer` signals the current request to yield. | `"queue"` |
| `setting(chat.tools.terminal.autoReplyToPrompts)` <br/>Automatically reply to terminal prompts with a default answer. | `false` |
| `setting(chat.tools.terminal.terminalProfile.<platform>)`<br/>Configure which terminal profile to use for chat terminal commands on each platform. | `""` |
| `setting(chat.hookFilesLocations)` _(Preview)_ <br/>Configure additional [hook file locations](/docs/copilot/customization/hooks.md#hook-file-locations). Specify paths to folders (loads all `*.json` files) or direct paths to `.json` files. Only relative paths and tilde paths are supported. | `{}` |
| `setting(chat.useCustomAgentHooks)` _(Preview)_ <br/>Enable [agent-scoped hooks](/docs/copilot/customization/hooks.md#agentscoped-hooks) defined in custom agent frontmatter. When enabled, hooks in `.agent.md` files run only when that agent is active. | `false` |
| `setting(chat.useAgentsMdFile)` <br/>Enable or disable using `AGENTS.md` files as context for chat requests. | `true` |
| `setting(chat.math.enabled)` <br/>Enable or disable math rendering with [KaTeX](https://katex.org) in chat. | `false` |
| `setting(chat.viewTitle.enabled)` _(Preview)_<br/>Show the title of the current chat session in the chat header. | `true` |
| `setting(github.copilot.chat.codesearch.enabled)` _(Preview)_<br/>When using `#codebase` in the prompt, Copilot automatically discovers relevant files to be edited. | `false` |
| `setting(chat.emptyState.history.enabled)` _(Experimental)_<br/>Show recent chat history in the empty state of the Chat view. | `false` |
| `setting(imageCarousel.chat.enabled)` _(Experimental)_<br/>Enable the image carousel for browsing images from chat responses. Select image pills in tool results or assistant messages to open a carousel view. | `false` |
| `setting(chat.sendElementsToChat.enabled)` _(Experimental)_<br/>Enable sending elements from the [integrated browser](/docs/debugtest/integrated-browser.md) to the chat view as context. | `true` |
| `setting(chat.sendElementsToChat.attachCSS)` _(Experimental)_<br/>Include CSS styles when adding elements from the integrated browser to chat context. | `true` |
| `setting(chat.sendElementsToChat.attachImages)` _(Experimental)_<br/>Include images when adding elements from the integrated browser to chat context. | `true` |
| `setting(workbench.browser.enableChatTools)` _(Experimental)_<br/>Enable [browser tools](/docs/debugtest/integrated-browser.md#browser-tools-for-agents) that let agents interact with pages in the integrated browser. | `true` |
| `setting(chat.useClaudeMdFile)`<br/>Enable or disable using `CLAUDE.md` files as always-on custom instructions. | `true` |
| `setting(chat.useNestedAgentsMdFiles)` _(Experimental)_<br/>Enable or disable using `AGENTS.md` files in subfolders of your workspace as context for chat requests. | `false` |
| `setting(github.copilot.chat.customOAIModels)` _(Experimental)_<br/>Configure custom OpenAI-compatible models for chat. | `[]` |
| `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(Experimental)_<br/>Suggest related files from git history in chat context. | `true` |

## Agent settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.agent.enabled:true)`<br/>Enable or disable using agents (requires VS Code 1.99 or later). | `true` |
| `setting(chat.agent.maxRequests)`<br/>Maximum number of requests that Copilot can make using agents. | `25` |
| `setting(github.copilot.chat.agent.autoFix)`<br/>Automatically diagnose and fix issues in the generated code changes. | `true` |
| `setting(chat.mcp.access)`<br/>Manage which Model Context Protocol (MCP) servers can be used in VS Code. | `true` |
| `setting(chat.mcp.discovery.enabled)`<br/>Configure automatic discovery of MCP server configuration from other applications. | `false` |
| `setting(chat.mcp.serverSampling)`<br/>Configure which models are exposed to MCP servers for sampling. | `{}` |
| `setting(chat.mcp.apps.enabled)` _(Experimental)_<br/>Enable or disable MCP Apps, which are rich user interfaces provided by MCP servers. | `true` |
| `setting(chat.tools.terminal.autoApprove)` <br/>Control which terminal commands are [auto-approved when using agents](/docs/copilot/agents/agent-tools.md#automatically-approve-terminal-commands). Commands can be set to `true` (auto-approve) or `false` (require approval). Regular expressions can be used by wrapping patterns in `/` characters. | `{ "rm": false, "rmdir": false, "del": false, "kill": false, "curl": false, "wget": false, "eval": false, "chmod": false, "chown": false, "/^Remove-Item\\b/i": false }` |
| `setting(chat.tools.terminal.enableAutoApprove)` <br/>Enable or disable automatic approval of terminal commands. | `true` |
| `setting(chat.tools.edits.autoApprove)` <br/>Configure which files require approval before edits are applied. Uses glob patterns to match file paths in your workspace. | `{}` |
| `setting(chat.tools.terminal.outputLocation)` _(Experimental)_<br/>Configure where terminal command output appears: inline in chat or in the integrated terminal. | `"chat"` |
| `setting(chat.tools.terminal.enforceTimeoutFromModel)` _(Experimental)_<br/>Control whether to enforce the timeout value that the agent specifies for terminal commands. When enabled, the agent stops tracking the command after the specified duration and returns the output collected so far. | `true` |
| `setting(chat.tools.terminal.ignoreDefaultAutoApproveRules)` <br/>Ignore the default auto-approve rules for terminal commands. | `false` |
| `setting(chat.tools.global.autoApprove)`<br/>Automatically approve all tools - this setting [disables critical security protections](/docs/copilot/security.md). | `false` |
| `setting(chat.autopilot.enabled)` _(Experimental)_<br/>Controls whether the [Autopilot permission level](/docs/copilot/agents/agent-tools.md#permission-levels) is available in the permissions picker. When enabled, Autopilot auto-approves all tool calls and continues until the task is done. | `true` |
| `setting(chat.permissions.default)` _(Experimental)_<br/>Set the default [permission level](/docs/copilot/agents/agent-tools.md#permission-levels) for new chat sessions. Options: `default` (Default Approvals), `autoApprove` (Bypass Approvals), `autopilot` (Autopilot). You can still change the permission level per session. If enterprise policy disables auto-approval, new sessions use Default Approvals. | `"default"` |
| `setting(chat.tools.urls.autoApprove)` <br/>Control which [URL requests and responses are auto-approved](/docs/copilot/agents/agent-tools.md#url-approval). | `[]` |
| `setting(chat.agent.thinking.collapsedTools)` _(Experimental)_<br/>Configure whether tool call details are collapsed or expanded by default in the chat conversation. | `always` |
| `setting(chat.agent.thinkingStyle)` _(Experimental)_<br/>Configure how thinking tokens are presented in chat. | `fixedScrolling` |
| `setting(chat.mcp.autoStart)` _(Experimental)_<br/>Automatically start MCP servers when MCP configuration changes are detected. | `newAndOutdated` |
| `setting(chat.tools.eligibleForAutoApproval)` _(Experimental)_<br/>Configure which tools require manual approval before they can be used by agents. | `[]` |
| `setting(chat.tools.terminal.blockDetectedFileWrites)` _(Experimental)_<br/>Require user approval for terminal commands that perform file writes. | `outsideWorkspace` |
| `setting(chat.agent.sandbox.enabled)` _(Preview)_<br/>Enable [sandboxing for agent commands](/docs/copilot/agents/agent-tools.md#sandbox-agent-commands) executed by the agent (macOS and Linux only). When enabled, commands are auto-approved and have restricted file system and network access. | `false` |
| `setting(chat.agent.sandbox.FileSystem.linux)` _(Preview)_<br/>Configure file system access rules for sandboxed agent commands on Linux. Supports `allowRead`, `allowWrite`, `denyRead`, and `denyWrite` properties. | `{}` |
| `setting(chat.agent.sandbox.FileSystem.mac)` _(Preview)_<br/>Configure file system access rules for sandboxed agent commands on macOS. Supports `allowRead`, `allowWrite`, `denyRead`, and `denyWrite` properties. | `{}` |
| `setting(chat.agent.networkFilter)`<br/>Enable network domain filtering for agent tools (fetch tool, integrated browser). When enabled, network access is restricted according to `setting(chat.agent.allowedNetworkDomains)` and `setting(chat.agent.deniedNetworkDomains)`. When disabled, no filtering is applied. | `false` |
| `setting(chat.agent.allowedNetworkDomains)`<br/>Configure allowed domains for network access by agent tools. Only takes effect when `setting(chat.agent.networkFilter)` is enabled. When sandboxing is also enabled, these rules additionally apply to terminal commands. When both allowed and denied lists are empty, all domains are blocked. Supports wildcards like `*.example.com`. | `[]` |
| `setting(chat.agent.deniedNetworkDomains)`<br/>Configure denied domains for network access by agent tools. Only takes effect when `setting(chat.agent.networkFilter)` is enabled. Denied domains take precedence over allowed domains. Supports wildcards like `*.example.com`. | `[]` |
| `setting(github.copilot.chat.newWorkspaceCreation.enabled)` _(Experimental)_<br/>Enable the tool for scaffolding a new workspace in chat. | `true` |
| `setting(chat.planAgent.defaultModel)` <br/>Select a default language model for the plan agent. | `"Auto (Vendor Default)"`|
| `setting(github.copilot.chat.implementAgent.model)` _(Experimental)_<br/>Select the language model used for the implementation step after planning. | `` |
| `setting(github.copilot.chat.planAgent.additionalTools)` _(Experimental)_<br/>Give the plan agent access to additional tools during research and planning phases. | `[]` |
| `setting(github.copilot.chat.additionalReadAccessFolders)`<br/>Grant read-only access to additional folders outside the current workspace for built-in agent tools. | `[]` |
| `setting(github.copilot.chat.claudeAgent.enabled)` <br/>Enable or disable support for Claude agent sessions powered by Anthropic's Claude Agent SDK. | `true` |
| `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` <br/>Bypass all permission checks for the Claude agent. Only enable this in isolated sandbox environments. | `false` |
| `setting(github.copilot.chat.agent.thinkingTool:true)` _(Experimental)_<br/>Enable the thinking tool when using agents. | `false` |
| `setting(github.copilot.chat.summarizeAgentConversationHistory.enabled)` _(Experimental)_<br/>Automatically summarize the agent conversation history when the context window is full. | `true` |
| `setting(github.copilot.chat.virtualTools.threshold)` _(Experimental)_<br/>Tool count over which virtual tools should be used. Virtual tools group similar sets of tools together and enable the model to activate them on-demand. Enables you to go beyond the limit of 128 tools for a chat request. | `128` |

## Agent sessions

The [Agents view](/docs/copilot/agents/overview.md) provides a centralized location for managing both local chat conversations and remote coding agent sessions. This view enables you to work with multiple AI sessions simultaneously, track their progress, and manage long-running tasks efficiently.

| Setting and Description | Default |
|------------------------|---------------|
| `setting(workbench.startupEditor)` <br/>Configure the VS Code welcome page to act as your agent sessions entry point. Set to `agentSessionsWelcomePage` to show the [VS Code welcome page](/docs/copilot/chat/chat-sessions.md#vs-code-welcome-page) with recent sessions, embedded chat, and quick actions. | N/A |
| `setting(chat.viewSessions.enabled)` <br/>Show the agent sessions list in the Chat view. | `true` |
| `setting(chat.viewSessions.orientation)` <br/>Control the layout orientation of the sessions list in the Chat view. | `"sideBySide"` |
| `setting(chat.editMode.hidden)` <br/>Restore the deprecated Edit mode for multi-file code edits. | `true` |
| `setting(chat.agentsControl.enabled)` _(Experimental)_<br/>Enable the [session status indicator](/docs/copilot/chat/chat-sessions.md#session-status-indicator-experimental) in the command center. Shows unread and in-progress session badges. | `true` |
| `setting(chat.agentsControl.clickBehavior)` _(Experimental)_<br/>Configure the behavior when selecting the chat icon in the agent status indicator. | `"cycle"` (Insiders)<br/>`"default"` (Stable) |
| `setting(chat.unifiedAgentsBar.enabled)` _(Experimental)_<br/>Replace the command center search box with a unified chat and search control. | `false` |

## Inline chat settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(inlineChat.defaultModel)`<br/>Configure the default language model for editor inline chat. The model you select persists during the session, but resets to this configured default after VS Code reloads. | N/A |
| `setting(inlineChat.askInChat)`<br/>When a file belongs to an active chat editing session, use "Ask in Chat" in the Chat view instead of opening regular inline chat when you press `kb(inlineChat.start)`. When disabled, always opens regular inline chat. | `true` |
| `setting(inlineChat.renderMode)` _(Experimental)_<br/>Configure how inline chat is displayed. `hover`: shows inline chat in a floating overlay, `zone`: shows inline chat in a dedicated zone in the editor. | `"hover"` |
| `setting(inlineChat.finishOnType)`<br/>Finish an editor inline chat session when typing outside of changed regions. | `false` |
| `setting(inlineChat.holdToSpeech)`<br/>Holding the editor inline chat keyboard shortcut (`kb(inlineChat.start)`) automatically enables speech recognition. | `true` |
| `setting(editor.inlineSuggest.syntaxHighlightingEnabled)`<br/>Show syntax highlighting for inline suggestions. | `true` |
| `setting(inlineChat.affordance)` _(Experimental)_<br/>Show a visual hint when you select text to help start inline chat. `off`: no hint, `gutter`: shows in line number area, `editor`: shows at cursor position with lightbulb. | `"off"` |
| `setting(inlineChat.lineEmptyHint)` _(Experimental)_<br/>Show a hint for editor inline chat on an empty line. | `false` |
| `setting(inlineChat.lineNaturalLanguageHint)` _(Experimental)_<br/>Trigger editor inline chat as soon as a line mostly consists of words. | `true` |
| `setting(github.copilot.chat.editor.temporalContext.enabled)` _(Experimental)_<br/>Include recently viewed and edited files in the context for editor inline chat. | `false` |

## Code review settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.reviewSelection.enabled)` _(Preview)_<br/>Enable code review with AI for an editor text selection. | `true` |
| `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_<br/>Custom instructions that are added to requests for reviewing the current editor selection with AI. | `[]` |

## Custom instructions settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.instructionsFilesLocations)` <br/>Locations to search for custom instructions files. Each folder is searched recursively, including subdirectories. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. | `{ ".github/instructions": true, "~/.claude/rules": false" }` |
| `setting(chat.includeApplyingInstructions)`<br/>Automatically add instruction files with a matching `applyTo` pattern to chat requests. | `true` |
| `setting(chat.includeReferencedInstructions)`<br/>Automatically add instruction files referenced via Markdown links to chat requests. | `false` |
| `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`<br/>Automatically add custom instructions from `.github/copilot-instructions.md` to chat requests. | `true` |
| `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_<br/>Custom instructions for generating commit messages with AI. | `[]` |
| `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_<br/>Custom instructions for generating pull request titles and descriptions with AI. | `[]` |
| `setting(github.copilot.chat.organizationInstructions.enabled)`<br/>Enable discovery of custom instructions defined at the GitHub organization level. | `true` |
| `setting(chat.useCustomizationsInParentRepositories)`<br/>Enable discovery of chat customizations (instructions, prompts, agents, skills, hooks) in [parent repository folders](/docs/copilot/customization/overview.md#parent-repository-discovery). Useful for monorepo setups where you open a subfolder rather than the repository root. | `false` |

## Reusable prompt files settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.promptFilesLocations)` <br/>Locations to search for prompt files. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. | `{ ".github/prompts": true }` |
| `setting(chat.promptFilesRecommendations)` <br/>Enable or disable prompt file recommendations when opening a new chat session. List of key-value pairs of prompt file name and boolean or when clause. | `[]` |

## Custom agents settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.agentFilesLocations)` <br/>Locations to search for custom agent files. Relative paths are resolved from the root folder(s) of your workspace. Supports home directory expansion (`~`) for user-specific paths. | `{ ".github/agents": true }` |
| `setting(github.copilot.chat.cli.customAgents.enabled)` _(Experimental)_<br/>Enable using custom agents from GitHub background agent sessions. | `false` |
| `setting(github.copilot.chat.organizationCustomAgents.enabled)` <br/>Enable discovery of custom agents defined at the GitHub organization level. | `true` |

## Agent skills settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.useAgentSkills)` <br/>Enable support for [agent skills](/docs/copilot/customization/agent-skills.md) in VS Code. | `true` |
| `setting(chat.agentSkillsLocations)` <br/>Locations to search for agent skills. Relative paths are resolved from the root folder(s) of your workspace. Supports home directory expansion (`~`) for user-specific paths. | `"chat.agentSkillsLocations": { ".github/skills": true,".claude/skills": true,"~/.copilot/skills": true,"~/.claude/skills": true}` |
| `setting(github.copilot.chat.skillTool.enabled)` _(Experimental)_<br/>Enable the dedicated skill tool for invoking [agent skills](/docs/copilot/customization/agent-skills.md). Required to run skills with [`context: fork`](/docs/copilot/customization/agent-skills.md#run-a-skill-in-a-forked-context-experimental) in a separate subagent context. | `false` |

## Memory settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.tools.memory.enabled)` _(Preview)_<br/>Enable or disable the built-in [memory tool](/docs/copilot/agents/memory.md), which enables agents to save and recall notes across conversations. | `true` |
| `setting(github.copilot.chat.copilotMemory.enabled)` _(Preview)_<br/>Enable [Copilot Memory](/docs/copilot/agents/memory.md#copilot-memory) integration in VS Code. Copilot Memory is a GitHub-hosted memory system that retains repository-specific insights across multiple Copilot surfaces. | `false` |

## Observability settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.otel.enabled)` <br/>Enable [OpenTelemetry](/docs/copilot/guides/monitoring-agents.md) emission for Copilot Chat agent interactions. | `false` |
| `setting(github.copilot.chat.otel.exporterType)` <br/>OTel exporter type: `otlp-http`, `otlp-grpc`, `console`, or `file`. | `"otlp-http"` |
| `setting(github.copilot.chat.otel.otlpEndpoint)` <br/>OTLP collector endpoint URL. | `"http://localhost:4318"` |
| `setting(github.copilot.chat.otel.outfile)` <br/>File path for JSON-lines output when using the `file` exporter type. | `""` |
| `setting(github.copilot.chat.otel.captureContent)` <br/>Capture full prompt and response content in OTel spans. May include sensitive information. | `false` |

## Agent plugins settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(chat.plugins.enabled)` _(Preview)_<br/>Enable or disable support for [agent plugins](/docs/copilot/customization/agent-plugins.md). | `false` |
| `setting(chat.plugins.marketplaces)` _(Experimental)_<br/>Configure additional plugin marketplace Git repositories for discovering agent plugins. | `["github/copilot-plugins", "github/awesome-copilot"]` |
| `setting(chat.pluginLocations)` _(Experimental)_<br/>Register locally cloned or downloaded agent plugins by mapping directory paths to an enabled or disabled state. | `{}` |

## Debugging settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.agentDebugLog.enabled)`<br/>Enable the [agent debug logs](/docs/copilot/chat/chat-debug-view.md) and the [`/troubleshoot`](/docs/copilot/chat/chat-debug-view.md#attach-debug-events-to-chat) slash command for inspecting chat sessions. | `false` |
| `setting(github.copilot.chat.agentDebugLog.fileLogging.enabled)`<br/>Enable file logging for agent debug logs, which writes debug events to a file on disk. | `false` |
| `setting(github.copilot.chat.startDebugging.enabled)` _(Preview)_<br/>Enables the experimental `/startDebugging` intent in the Chat view to generate debugging configuration. | `true` |
| `setting(github.copilot.chat.copilotDebugCommand.enabled)` _(Preview)_<br/>Enables the `copilot-debug` terminal command. | `true` |

## Testing settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(github.copilot.chat.generateTests.codeLens)` _(Experimental)_<br/>Show **Generate tests** code lens for symbols that are not covered by current test coverage information. | `false` |
| `setting(github.copilot.chat.setupTests.enabled)` _(Experimental)_<br/>Enables the experimental `/setupTests` intent and prompting in `/tests` generation. | `true` |

## Notebook settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(notebook.experimental.generate)` _(Experimental)_<br/>Enable the **Generate** action to create code cells with notebook inline chat. | `true` |
| `setting(github.copilot.chat.edits.newNotebook.enabled)` _(Experimental)_<br/>Enable the notebook tool in Edit mode (deprecated) to create a new notebook file. | `true` |
| `setting(github.copilot.chat.notebook.followCellExecution.enabled)` _(Experimental)_<br/>Show the currently executing cell in the editor. | `false` |

## Accessibility settings

| Setting and Description | Default |
|------------------------|---------------|
| `setting(inlineChat.accessibleDiffView)`<br/>Whether the Inline Chat also renders an accessible diff viewer for its changes. | `"auto"` |
| `setting(accessibility.signals.chatRequestSent)`<br/>Plays a signal - sound (audio cue) and/or announcement (alert) - when a chat request is made. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.chatResponseReceived)`<br/>Plays a sound / audio cue when the response has been received. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatEditModifiedFile)`<br/>Plays a sound / audio cue when the file has been modified by chat edits. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.chatUserActionRequired)`<br/>Plays a sound / audio cue when the user needs to take an action in chat. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.signals.lineHasInlineSuggestion)`<br/>Plays a sound / audio cue when the cursor is on a line that has an inline suggestion. | `{ "sound": "auto" }` |
| `setting(accessibility.signals.nextEditSuggestion)`<br/>Plays a sound / audio cue when a next edit suggestion is available. | `{ "sound": "auto", "announcement": "auto" }` |
| `setting(accessibility.verboseChatProgressUpdates)`<br/>Provide verbose updates about chat activity. | `true` |
| `setting(accessibility.verbosity.inlineChat)`<br/>Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused. | `true` |
| `setting(accessibility.verbosity.inlineCompletions)`<br/>Provide information about how to access the inline suggestions hover and Accessible View. | `true` |
| `setting(accessibility.verbosity.panelChat)`<br/>Provide information about how to access the chat help menu when the chat input is focused. | `true` |
| `setting(accessibility.voice.keywordActivation)`<br/>Controls whether the keyword phrase 'Hey Code' is recognized to start a voice chat session. | `"off"` |
| `setting(accessibility.voice.autoSynthesize)`<br/>Controls whether a textual response should automatically be read out aloud when speech was used as input. | `"off"` |
| `setting(accessibility.voice.speechTimeout)`<br/>The duration in milliseconds that voice speech recognition remains active after you stop speaking. | `1200` |

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
