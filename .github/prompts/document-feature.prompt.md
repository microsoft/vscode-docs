---
agent: Plan
description: Document a new or updated VS Code feature in the project documentation.
argument-hint: Feature to document or link to relevant issue/PR.
model: Claude Opus 4.6 (copilot)
tools: ['github/*', 'read','search','web','agent','web/githubRepo', 'vscode/askQuestions']
---
Analyze the feature description and related code updates, and suggest updates to the vs code docs (docs/ folder). It is acceptable to say that no documentation update is needed. Ask the user for confirmation if you think no updates are needed.

If needed, check the source code in #tool:web/githubRepo microsoft/vscode and microsoft/vscode-copilot-chat to understand the feature implementation.

Ask clarifying questions if the feature description is ambiguous or lacks details.

Ensure the documentation changes align with existing doc style guidelines.

Don't update release notes or API docs unless explicitly asked.

When screenshots need to be added or updated, add a TODO comment in the doc for a human to capture and insert the screenshot later.
