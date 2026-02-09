---
name: release-note-writer
description: Guidelines for writing and reviewing Insiders and Stable release notes for Visual Studio Code.
---
# Visual Studio Code Release Note Writer Guidelines

This skill is designed to help you write release notes for Visual Studio Code Insiders and Stable releases. It provides structured guidelines and examples to ensure consistency and clarity in the release notes.

There are two main types of release notes you can generate using this skill:

1. **Insiders Release Notes**: These notes cover the latest features and updates in the Insiders build of VS Code. They are updated frequently as new features are added. Their format includes sections grouped by the date of the updates. The content is generated based on closed GitHub issues and PRs for a specific milestone.

2. **Stable Release Notes**: These notes summarize the key features and improvements in a stable release of VS Code. They follow a more structured format with predefined sections for different feature areas. The release is intially created using a template and then updated by the engineering team.

Your task is help generate these release notes based on the provided guidelines, examples, and templates.

## General writing guidelines for release notes

Follow the guidelines in this order of priority:

1. [Release notes writing instructions](../../instructions/release-notes-writing.instructions.md)
2. [Visual Studio Code documentation writing guidelines](../../instructions/docs-writing.instructions.md)

## Insiders Release Notes

Insiders release notes cover the latest features and updates in the Insiders build of VS Code. They are updated frequently as new features are added. Their format includes sections grouped by the date of the updates. The content is generated based on closed GitHub issues and PRs for a specific milestone.

Your task is to generate release notes for the specified VS Code Insiders release version based on GitHub issues and PRs.

### Input parameters

If no release version is specified, ask the user for the release version.
If no milestone name is specified, check if the milestone name is in the frontmatter, otherwise ask the user for the milestone name.
If no label is specified, use the "feature-request" label by default.

DO NOT continue until you have the release version and milestone name!!

### File format

Issues are grouped in H2 sections by their closed date. The TOC must be updated to reflect the new sections and issues added.

Use [this template](template-release-note-insiders.md) for the Insiders release notes.

The [1.109 release notes](./examples/v1_109.md) are a concrete example of an Insiders release note.

### Generation steps

1. If there is not an existing Insiders release note for the specified version, create a new release note file using the Insiders release note template and replace the placeholders.

    Release notes are stored in the `/release-notes` folder with the filename format `v<version>.md`, e.g., `v1_109.md`.

1. Make sure to copy the following images to the appropriate images folder (`/release-notes/images/<version with underscores>`, e.g. `1_110`) for the release version:

    - `vscode-insiders-header.webp`
    - `vscode-insiders-banner-medium.png`

1. Get last update date from existing release notes for the specified release version. If no existing release notes, disregard last update date.

1. Run a subagent to fetch all closed GitHub issues in the microsoft/vscode repo for the milestone that have the specified label and closed date as of the latest update date by using the github CLI. Save the JSON in the release note document.

    Use this CLI command: `gh search issues --repo microsoft/vscode --label <label name> --milestone <milestone name> --state closed "closed:>=<latest update date>" -L 100`

1. Ignore issues that are marked as duplicate or not planned.

1. For each issue in the JSON result, run a subagent to update the release notes and TOC with a concise technically accurate summary of the issue. Get more details from the associated PRs if needed. At the end of the summary, include a link to the GH issue which include the issue number and title (format: #12345: Issue title). Group issues under an H2 section that represents the closed date.

## Stable Release Notes

Stable release notes summarize the key features and improvements in a stable release of VS Code. They follow a more structured format with predefined sections for different feature areas. The release is intially created using a template and then updated by the engineering team.

### Input parameters

If no release version is specified, ask the user for the release version.
If no release month and year are specified, ask the user for the release month and year.
DO NOT continue until you have the release version and release month and year!!

### File format

Use [this template](template-release-note-endgame.md) for generating the initial Stable release notes.

### Generation steps

1. If there is not an existing release note for the specified version, create a new release note file using the Stable release note template.

    Release notes are stored in the `/release-notes` folder with the filename format `v<version>.md`, e.g., `v1_109.md`.

1. If there is an existing release note for the specified version, and it's an Insiders release note, replace the content with the Stable release note template content.

1. If there is an existing Stable release note for the specified version, perform a code review of the existing release note to ensure it adheres to the writing guidelines. Suggest improvements as needed.
