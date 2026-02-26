# Release Work - v1.110 (February 2026)

Test plan items for the February 2026 milestone.
Source: [GitHub query](https://github.com/issues?q=org%3Amicrosoft%20AND%20is%3Aissue%20AND%20milestone%3A%22February%202026%22%20AND%20label%3Atestplan-item)

Legend — **Docs?** column:

- ✅ Yes — User-facing feature/setting likely needs documentation
- 🔶 Maybe — Might need docs depending on scope (e.g., minor UX tweak, proposed API)
- ❌ No — Internal, experimental, or infra-only change

## ✅ Yes — Likely needs doc update (23)

- [x] [Test: Memory Tool](https://github.com/microsoft/vscode/issues/296844) — Memory tool enabled by default in Plan mode with three scopes (user, repo, session). Docs: new page `docs/copilot/agents/memory.md` + updates to planning.md, copilot-vscode-features.md, overview.md, toc.json, sitemap.xml.
- [ ] [Test: model picker](https://github.com/microsoft/vscode/issues/296983) — Improved model picker UX.
- [ ] [Test usages and rename tools](https://github.com/microsoft/vscode/issues/297028) — New built-in `rename` and `usages` tools with settings `chat.tools.renameTool.enabled` / `chat.tools.usagesTool.enabled`.
- [ ] [Test: steering and queueing messages](https://github.com/microsoft/vscode/issues/297145) — New concept: steering and queuing messages while a chat session is ongoing.
- [ ] [Test: Chat Customizations Window](https://github.com/microsoft/vscode/issues/297174) — New consolidated customizations editor for all chat customizations.
- [ ] [Test: Plan Agent with Explore Subagent and Session Memory](https://github.com/microsoft/vscode/issues/297184) — Plan agent now always uses Explore subagent and session memory.
- [ ] [Test: `/yolo` and `/autoApprove`](https://github.com/microsoft/vscode/issues/297206) — New slash commands for auto approve and global approvals, plus "allow in session" for tool calls.
- [ ] [Test Plan: Hooks Loading & UX](https://github.com/microsoft/vscode-internalbacklog/issues/6772) — Hooks entrypoints and configuration menus.
- [ ] [Test Plan: Claude Hooks](https://github.com/microsoft/vscode-internalbacklog/issues/6777) — Support for repositories using Claude hooks.
- [ ] [Test Plan: Hook Behaviours](https://github.com/microsoft/vscode-internalbacklog/issues/6781) — Verify hook behaviours for each hook type.
- [ ] [Test: Slash commands background agents](https://github.com/microsoft/vscode/issues/297119) — Prompt files invoked from background agents; `/skill`, `/compact` commands.
- [ ] [Test: /create-* Guided Creation Prompts for Agent Customization](https://github.com/microsoft/vscode/issues/297188) — Five new `/create-*` slash commands (`/create-prompt`, `/create-instruction`, `/create-skill`, `/create-agent`, `/create-hook`).
- [ ] [Add Native Browser Integration to GitHub Copilot](https://github.com/microsoft/vscode/issues/297062) — Native browser integration for improved web development experience.
- [ ] [Test: Browser Tools](https://github.com/microsoft/vscode/issues/297090) — Agents can read and interact with integrated browser pages using tools.
- [ ] [Test: Share Browser with Agent](https://github.com/microsoft/vscode/issues/297103) — "Share with Agent" button in browser nav bar to share user-created browser pages.
- [ ] [Enable sandbox for locally running MCP servers](https://github.com/microsoft/vscode/issues/297115) — Sandboxing for MCP servers using stdio transport, restricting file system and network access.
- [ ] [Test: modal editors](https://github.com/microsoft/vscode/issues/296337) — Modal editor for Settings, Keybindings, Workspace Trust, AI Language Models, Extensions/MCP, Profiles.
- [ ] [Test plan: Configurable Notification Positions](https://github.com/microsoft/vscode/issues/297001) — New setting `workbench.notifications.position` to move notifications.
- [ ] [Test plan: Compact Activity Bar Layout](https://github.com/microsoft/vscode/issues/297002) — New compact layout option for the Activity Bar with context menu submenu to switch sizes.
- [ ] [Test: Kitty Graphics Protocol in VS Code Terminal](https://github.com/microsoft/vscode/issues/297073) — Kitty graphics protocol support for rendering images in the terminal.
- [ ] [Test new unified js/ts settings](https://github.com/microsoft/vscode/issues/297056) — Cleaned up and unified JavaScript/TypeScript settings to support TS-Go; modernized settings with language overridable support.
- [ ] [Git - Add 'Co-authored-by:' commit trailer for AI codegen](https://github.com/microsoft/vscode/issues/297204) — New setting to auto-include 'Co-authored-by:' trailer when AI-generated code is committed.
- [ ] [Support metered connections](https://github.com/microsoft/vscode/issues/297205) — VS Code detects metered network (Windows) and avoids automatic updates.
- [ ] [Test: agent plugins](https://github.com/microsoft/vscode/issues/297147) — Very preliminary support for agent plugins.
- [ ] [Chat Debug Panel](https://github.com/microsoft/vscode-internalbacklog/issues/6860) — Debug panel for chat customization issues.
- [ ] [Test: Claude Agent Improvements](https://github.com/microsoft/vscode/issues/297136) — Various improvements to Claude agent integration.
- [ ] [Test: Cleanup Chat UI/UX](https://github.com/microsoft/vscode/issues/297207) — Various UI/UX improvements: checkpoints hover, forking, input box, rendering.
