---
Order: 
Area: copilot
TOCTitle: @workspace overview
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: @workspace Copilot chat participant
DateApproved: 02/28/2024
MetaDescription: Overview of how the @workspace Copilot chat participants works and how it manages context.
---
# How the @workspace Copilot chat participant works

- what is the @workspace -> chat participant, knows about your workspace, also provides slash commands

- what do you use it for: ask about contents of your workspace and codebase
  - Find something in your code base
  - How do I sort an array
  - How do I build this project

## What context does @workspace have?

## How does @workspace work?

Problem: workspaces can be large, too large for handing as-is to Copilot (limited token size)
Solution: extract only the relevant info from the workspace and pass this as context to Copilot

1. Determine which info would be relevant to answer user's question -> ask Copilot what would be relevant info
1. Gather relevant info
    1. GitHub Code search
    1. TF-IDF
    1. Local embeddings
1. Pass user request to Copilot, and provide the relevant info

## @workspace slash commands

- `/fix`
- `/explain`
- `/new`
- `/newNotebook`
- `/tests`

## Chat context variables

- `#codebase`

## Related resources

- Chat tutorial
- Copilot Chat features
