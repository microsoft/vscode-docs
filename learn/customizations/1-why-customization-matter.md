---
ContentId: b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e
DateApproved: 04/17/2026
MetaDescription: Learn why agent customization matters for getting the most out of GitHub Copilot in VS Code.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---

# Why agent customization matters

<!-- IMAGE PLACEHOLDER - YouTube thumbnail embed showing the Customization UI -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/AZzCk-WGks4?si=pzfh99aDDFODSrG_" title="The Agent Customizations UI Nobody Knows About" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Most developers are using VS Code the same way: open chat, type something, and hope for a good result. Sometimes it works. Sometimes it doesn't.

But here's the problem. They never configure it.

VS Code is no longer just an editor. It's an environment where you can define how AI works across your entire workflow. And if you're not doing that, you're essentially starting from scratch every time.

This guide covers what agent customization is, why it matters, and how to use the Customization UI in VS Code. 

## Prerequisites
Before you start: you'll need VS Code Insiders installed and the GitHub Copilot and GitHub Copilot Chat extensions set up and signed in.
- [Download VS Code](https://code.visualstudio.com/)
- [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## What is agent Customization?

Agent customization in VS Code Copilot Chat lets you define how the AI behaves, responds, and operates within your workflow.

Instead of relying on one-off prompts, you can create reusable building blocks:

- **Agents** - specialized modes for different tasks
- **Skills** - domain-specific capabilities and workflows
- **Instructions** - persistent rules and coding conventions
- **Prompts** - reusable prompt templates
- **Hooks** - automated actions triggered by events

We'll cover the above in depth in later guides, but for now, just note that together these allow you to shape Copilot into a context-aware assistant that follows your standards, understands your project, and automates repetitive work.

## Why customization matters

You may ask yourself: Is customization really needed? Why not just jump into doing the work without it? Without customization, every interaction looks like this:

- You restate context
- You restate expectations
- You restate how you want things done

This leads to:

- Inconsistent results
- More effort
- More trial and error

Customization changes that. It allows you to:

- Define behavior once
- Reuse it across your workflow
- Get consistent, higher-quality outputs

Instead of prompting better, you're building a system that works for you.

## The Customization UI

VS Code provides a single place to manage all customization features.

To get started:

1. Open the Chat view (select the chat icon in the VS Code title bar).  
2. Select the Configure (gear) icon in the Chat panel header.

<!-- IMAGE PLACEHOLDER - Chat screenshot -->
![Screenshot showing the Copilot Chat view with the Configure gear icon in the Chat panel header.](../images/customizations/chat-icon-gear.png)

This opens the Customization UI.

<!-- IMAGE PLACEHOLDER - Customization UI screenshot -->
![Screenshot showing the Customization UI in VS Code.](../images/customizations/chat-customizations.png)
From here, you can create and manage:

- Agents
- Skills
- Custom instructions
- Prompt files
- Hooks

Instead of searching across folders, everything is centralized for easier discovery and management.

The Customization UI brings everything into one place. It makes it easier to define how your development environment behaves, not just what it generates. That's the shift.

Instead of interacting with AI one prompt at a time, you're building a system that consistently works the way you want.

## What's Next

You now understand what customization is and how the Customization UI brings it all together.

To learn more about each customization type and how to use them effectively, continue with the customization guides and videos in this series.


## Learn more 
- [Customize AI in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/overview) 
- [Choosing an AI model for Copilot Chat](https://code.visualstudio.com/docs/copilot/language-models) 
- [Community contributed customization features](https://github.com/github/awesome-copilot) 
