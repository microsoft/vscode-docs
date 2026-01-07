---
description: Generate release notes for VS Code Insiders based on GitHub issues and PRs.
argument-hint: Provide the release version, milestone name, and label to filter issues.
agent: agent
---

If no release version is specified, ask the user for the release version.
If no milestone name is specified, ask the user for the milestone name.
If no label is specified, use the "feature-request" label by default.

DO NOT continue until you have the release version and milestone name!!

Your task is to generate release notes for the specified VS Code Insiders release version based on GitHub issues and PRs. Issues are grouped in H2 sections by their closed date. The TOC must be updated to reflect the new sections and issues added.

Follow these steps:

1. Get last update date from existing release notes for the specified release version.

1. Run a subagent to fetch all closed GitHub issues in the microsoft/vscode repo for the milestone that have the specified label and closed date as of the latest update date by using the github CLI. Save the JSON in the release note document.

1. For each issue in the JSON result, run a subagent to update the release notes and TOC with a concise technically accurate summary of the issue. Get more details from the associated PRs if needed. At the end of the summary, include a link to the GH issue which include the issue number and title (format: #12345: Issue title). Group issues under an H2 section that represents the closed date.


IMPORTANT: Make sure to format the release notes and follow [docs writing guidelines](../instructions/docs-writing.instructions.md)
