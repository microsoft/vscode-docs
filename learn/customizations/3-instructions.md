---
ContentId: d3e4f5a6-b7c8-9d0e-1f2a-3b4c5d6e7f8a
DateApproved: 04/17/2026
MetaDescription: Learn how to use instructions to customize GitHub Copilot behavior in VS Code.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---

# **Introduction to Custom Instructions**

IMAGE PLACEHOLDER — YouTube thumbnail embed showing Custom Instructions concept

You’ve probably been lied to about custom instructions.

If you’re not using them properly, they’re far more powerful than most people think.

This guide breaks down what custom instructions really are, how they’re meant to be used, and how they can transform your workflow in VS Code.

---

## **What Are Custom Instructions?**

A [custom instruction](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) is like a rulebook for your AI.

It’s a markdown file where you define:

- coding style
- conventions
- preferences

Once defined, the AI automatically follows these rules in every interaction.

Instead of repeating expectations in every prompt, you define them once and let the system enforce them.

---

##

## **Where to Find Them**

Custom instructions can easily be accessed inside the Agent Customizations UI.

To access them:

- Open Copilot Chat
- Click the gear icon
- Navigate to Instructions  
  ![Customization UI](../images/customizations/ep%203.1%20Cust%20UI.png)

![chat icon gear](../images/customizations/ep%203.2%20chat-icon-gear.png)

From here, you can view, edit, and manage all instruction files tied to your workflow.

---

## **Example: Enforcing SOLID Principles**

![SOLID principles](../images/customizations/ep%203.3%20%20SOLID.png)

One example of custom instructions is enforcing coding principles like SOLID.

In this setup, an instruction file defines rules that ensure:

- code follows SOLID principles
- refactoring aligns with best practices
- confirmations are shown when rules are applied

When the AI is asked to refactor code, it automatically:

- analyzes the code against SOLID principles
- explains what changes are needed
- applies those changes

<img src="../images/customizations/ep%203.4%20%20SOLID%20APPLIED.png" alt="SOLID applied" width="80%">

The key benefit is consistency.

You don’t need to remember to ask for best practices every time. The system enforces them automatically.

---

## **Why Custom Instructions Matter**

Without custom instructions:

- you repeat standards manually
- outputs vary across interactions
- enforcement happens after the fact

With custom instructions:

- rules are applied automatically
- outputs stay consistent
- quality is built in from the start

Instead of correcting AI output later, you guide it upfront.

---

## **Creating Custom Instructions**

You can create custom instructions directly from the Customization UI.

![Generate custom instructions](../images/customizations/ep%203.5%20%20Generate%20Cust%20Intstruct.png)

There are two approaches:

### **Manual Creation**

You define:

- the purpose
- the rules
- the expected behavior

This gives you full control but requires more effort.

---

###

### **AI-Assisted Creation**

![Slash custom instructions](../images/customizations/ep%203.6%20%20Slash%20Cust%20Intstruct%20.png)

A faster approach is to let Copilot generate the instruction file.

For example, you can ask it to:

- **/create-instructions** to enforce accessibility standards
- **/create-instructions** to apply specific design rules
- **/create-instructions** to confirm when rules are used

The AI creates the instruction file for you, which you can then review and refine.

---

## **Example: Accessibility (WCAG)**

IMAGE PLACEHOLDER — WCAG instruction file contents

In this example, a custom instruction ensures all UI code meets WCAG accessibility standards.

Once created, the instruction:

- applies accessibility rules automatically
- confirms in chat when they are used

Now, even if you ask for unrelated changes, like updating UI design, accessibility is still enforced.

---

## **Example: UI Transformation with Rules Applied**

If you ask the AI to redesign your UI, for example:

- making it look like an 80s arcade

| Before                                                                                                 | After                                                                        |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| <img src="../images/customizations/ep%203.7%20%20Calc%20Norm.png" alt="Calculator normal" width="85%"> | ![Calculator retro](../images/customizations/ep%203.8%20%20Calc%20Retro.png) |

The AI will:

- apply your design request
- enforce accessibility rules at the same time

This shows how instructions persist across tasks, not just specific prompts.

---

## **Individual vs Team Impact**

Custom instructions are powerful for individuals, but even more impactful for teams.

Across a team, they ensure:

- consistent naming conventions
- consistent formatting
- consistent architecture

Instead of reviewing and correcting inconsistencies later, everything is aligned from the start.

---

## **The Bigger Shift**

Custom instructions represent a shift from:

**reactive prompting → proactive control**

You’re no longer adjusting outputs after they’re generated.

You’re defining how the system behaves before generation even happens.

---

## **What’s Next**

Custom instructions give you control over behavior.

If you want to go further and define reusable capabilities, the next step is exploring agent skills.

---

## **Learn more**

- [Download VS Code](https://code.visualstudio.com/)
- [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/setup)
- [Copilot Chat panel docs](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [Choosing an AI model for Copilot Chat](https://docs.github.com/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat)
