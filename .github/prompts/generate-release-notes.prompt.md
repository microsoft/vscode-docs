---
mode: 'agent'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'githubRepo', 'search', 'searchResults', 'vscodeAPI', 'getCurrentMilestone', 'getReleaseFeatures']
---

> **Prerequisite:** This command requires the **VS Code Doc AI Assistant** workspace extension to provide the `getCurrentMilestone` and `getReleaseFeatures` tools. If these tools are not available, ask the user to install the workspace extension by running `Extensions: Show Recommended Extensions` from the Command Palette, or by manually installing the extension located at `.vscode/extensions/doc-assistant/`.

Generate release notes for the features I worked in the current release and update them in the release notes file. Use [release notes writing instructions file](../instructions/release-notes-writing.instructions.md) as a guide.
