---
ContentId: d3e4f5a6-b7c8-9d0e-1f2a-3b4c5d6e7f8a
DateApproved: 04/17/2026
MetaDescription: Learn how to create and use custom instructions in VS Code to guide GitHub Copilot behavior, enforce coding standards, and get consistent chat results.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---

# Introduction to custom instructions

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dk2biPguo_E?si=O15sDX8Jf18pXZFr" title="Custom Instructions: How I Really Made Copilot Listen!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

You’ve probably been lied to about custom instructions.

If you’re not using them properly, they’re far more powerful than most people think.

This guide breaks down what custom instructions really are, how they’re meant to be used, and how they can transform your workflow in VS Code.

## Prerequisites

Before you start: you'll need VS Code Insiders installed and the GitHub Copilot and GitHub Copilot Chat extensions set up and signed in.

- [Download VS Code](https://code.visualstudio.com/)
- [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## What are custom instructions?

A [custom instruction](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) is like a rulebook for your AI.

It’s a Markdown file where you define:

- coding style
- conventions
- preferences

Once defined, the AI automatically follows these rules in every interaction.

Instead of repeating expectations in every prompt, you define them once and let the system enforce them.

## Where to find them

Custom instructions can easily be accessed inside the Agent Customizations view.

To access them:

1. Open the Chat view (select the chat icon in the VS Code title bar).
2. Select the Configure (gear) icon in the Chat view header.
3. Navigate to Instructions

![Screenshot of the chat icon and gear icon in the VS Code title bar](../images/shared/chat-icon-gear.png)

![Screenshot of the Agent Customizations view showing the Instructions section](../images/customizations/ep-2-1-cust-ui.png)

From here, you can view, edit, and manage all instruction files tied to your workflow.

## Example: enforcing SOLID principles

![Screenshot of a custom instruction file enforcing SOLID principles](../images/customizations/ep-2-3-solid.png)

One example of custom instructions is enforcing coding principles like SOLID.

In this setup, an instruction file defines rules that ensure:

- code follows SOLID principles
- refactoring aligns with best practices
- confirmations are shown when rules are applied

When the AI is asked to refactor code, it automatically:

- analyzes the code against SOLID principles
- explains what changes are needed
- applies those changes

<img src="../images/customizations/ep-2-4-solid-applied.png" alt="SOLID applied" width="80%">

The key benefit is consistency.

You don’t need to remember to ask for best practices every time. The system enforces them automatically.

## Why custom instructions matter

Without custom instructions:

- you repeat standards manually
- outputs vary across interactions
- enforcement happens after the fact

With custom instructions:

- rules are applied automatically
- outputs stay consistent
- quality is built in from the start

Instead of correcting AI output later, you guide it upfront.

## Creating custom instructions

You can create custom instructions directly from the Agent Customizations view.

![Screenshot of the Agent Customizations view showing the option to generate custom instructions](../images/customizations/ep-2-5-generate-cust-instruct.png)

There are two approaches:

### Manual creation

You define:

- the purpose
- the rules
- the expected behavior

This gives you full control but requires more effort.

### AI-assisted creation

![Screenshot of the Copilot Chat view showing the /create-instructions slash command](../images/customizations/ep-2-6-slash-cust-instruct.png)

A faster approach is to let Copilot generate the instruction file.

For example, you can ask it to:

- **/create-instructions** to enforce accessibility standards
- **/create-instructions** to apply specific design rules
- **/create-instructions** to confirm when rules are used

The AI creates the instruction file for you, which you can then review and refine.

## Example: accessibility (WCAG)

IMAGE PLACEHOLDER — WCAG instruction file contents

In this example, a custom instruction ensures all UI code meets WCAG accessibility standards.

Once created, the instruction:

- applies accessibility rules automatically
- confirms in chat when they are used

Now, even if you ask for unrelated changes, like updating UI design, accessibility is still enforced.

## Example: UI transformation with rules applied

If you ask the AI to redesign your UI, for example:

- making it look like an 80s arcade

| Before                                                                                                                                        | After                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img src="../images/customizations/ep-2-7-calc-norm.png" alt="Screenshot of the calculator app before applying the arcade theme" width="85%"> | ![Screenshot of the calculator app after applying the 80s arcade theme](../images/customizations/ep-2-8-calc-retro.png) |

The AI will:

- apply your design request
- enforce accessibility rules at the same time

This shows how instructions persist across tasks, not just specific prompts.

## Individual vs team impact

Custom instructions are powerful for individuals, but even more impactful for teams.

Across a team, they ensure:

- consistent naming conventions
- consistent formatting
- consistent architecture

Instead of reviewing and correcting inconsistencies later, everything is aligned from the start.

## The bigger shift

Custom instructions represent a shift from:

**reactive prompting → proactive control**

You’re no longer adjusting outputs after they’re generated.

You’re defining how the system behaves before generation even happens.

## What’s next

Custom instructions give you control over behavior.

If you want to go further and define reusable capabilities, the next step is exploring agent skills.

## Learn more

- [Customize AI in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Use custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Community contributed customization features](https://github.com/github/awesome-copilot)
