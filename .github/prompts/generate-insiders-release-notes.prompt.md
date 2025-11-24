---
description: Generate release notes for VS Code Insiders based on GitHub issues and PRs.
argument-hint: Provide the release version, milestone name, and label to filter issues.
agent: agent
---

If no release version is specified, ask the user for the release version.
If no milestone name is specified, ask the user for the milestone name.
If no label is specified, use the "feature-request" label by default.

DO NOT continue until you have the release version and milestone name!!

Your task is to generate release notes for the specified VS Code Insiders release version based on GitHub issues and PRs.

Follow these steps:

1. Run a subagent to fetch all closed GitHub issues in the microsoft/vscode repo for the milestone that have the specified label.

    - Don't remove any issues. If you think an issue is not relevant, still include it and add a note that it might not be relevant.

    - Add the list of issues to the release notes, right after the TOC

1. Run a subagent for each issue and perform the following steps:

  1. Verify that the issue not yet described in the release notes for the specified version.

  1. If not yet included, analyze the issue and its associated PRs (if any) to extract the key features and changes introduced in the release. Return a concise summary for each issue. This is a release note, so aim for technically accuracy and conciseness. When referring to a setting, include it.

  1. Update the release notes for the specified version to include the summary description of the feature request in the correct section.

      IMPORTANT: Add a link to the GH issue which include the issue number and title.

Make sure to format the release notes and follow [docs writing guidelines](../instructions/docs-writing.instructions.md)
