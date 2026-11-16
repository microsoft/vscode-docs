---
Tags: [Agents, GitHub Copilot, Engineering, Performance]
Order: 143 # Recheck ordering against the destination branch before publishing.
TOCTitle: The Copilot harness
PageTitle: "The Copilot harness: Building on a shared foundation"
MetaDescription: "Learn why {% data variables.product.prodname_vscode_shortname %} is moving from Local to the Copilot harness, guided by data and user feedback."
MetaSocialImage: TODO-social-image.png # Add the image alongside the post and update this filename.
Date: 2026-11-18
Author: Brigit Murtaugh
Keywords: [github copilot, copilot harness, local harness, copilot sdk, agent host, agent migration]
---

# The Copilot harness: Building on a shared foundation

November 18, 2026 by [Brigit Murtaugh](https://github.com/bamurtaugh)

The Copilot harness is now the default for new agent sessions in VS Code, and we've [announced the Local harness's retirement in February 2027](https://code.visualstudio.com/updates/v1_146#_copilot-harness-and-deprecation-of-the-local-harness). Here's what that transition means for your workflows, why we're making it, and how data and your feedback are helping us improve quality alongside efficiency.

## Why we're building on the Copilot harness

Some agent tasks fit into a quick conversation beside your code. Others grow into a longer investigation, a test run, or work you want to follow while moving between projects or machines.

Supporting that range of work takes more than a capable model. A **harness** is the software around the model that manages context, coordinates tools, and keeps an agent working through your task. We've been investing in the **Copilot harness**, built on the [Copilot SDK](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture) and sharing its runtime with other Copilot products, like the Copilot CLI and the Copilot app. In VS Code, these sessions run through the [Agent Host](https://code.visualstudio.com/docs/agents/concepts/agent-host), a separate process that lets you continue the same session between the editor and Agents window.

You might already be familiar with the **Local harness**, VS Code's long-standing default agent harness. It runs in VS Code's extension host (rather than the Agent Host), where you work interactively with the agent through chat to implement changes in your main workspace. Throughout its development, we worked closely with model providers and continually [refined its prompts, context handling, and tools](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode), alongside [improvements to token efficiency](https://code.visualstudio.com/blogs/2026/06/17/improving-token-efficiency-in-github-copilot) and edit review shaped by your feedback.

With a shared harness, teams across Copilot products can build on the same prompt tuning, model adaptations, and work with providers rather than duplicate that effort. That frees up more of the VS Code team's time for the features, fixes, and workflow improvements you use every day.

To make Copilot feel familiar and consistent wherever you're working, we've gradually expanded use of the Copilot harness as VS Code's new default over several months, first internally and then externally. Data and your feedback have shaped improvements every day in Insiders and weekly in Stable. The Copilot harness fully became the default for new sessions in [1.143](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). In [1.146, we announced the older Local harness's retirement in February 2027](https://code.visualstudio.com/updates/v1_146#_copilot-harness-and-deprecation-of-the-local-harness), giving three months' notice so you and your team have time to try your workflows, review customizations, and share any blockers. We'll continue following the data and your feedback throughout that transition.

As we've developed and refined the Copilot harness, we've also brought new capabilities to VS Code that aren't available in the Local harness. For example, [Copilot Fusion](https://code.visualstudio.com/docs/agent-customization/language-models#_use-copilot-fusion) can select models and coordinate drafting and review for your task. For organizations, [managed permission and sandbox controls](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) let administrators define boundaries the runtime enforces, rather than relying on model instructions.

**Copilot doesn't mean cloud.** It's the name of the harness, not the location of your workspace. For projects on your machine, the Copilot harness runs locally, editing files and running commands there.

To understand what this change means in practice, we've been measuring how the Copilot harness performs in everyday work. Here's what those results are telling us.

## What the data shows

Over several months, we progressively introduced the Copilot harness as the default in place of Local, starting with internal users. We then expanded testing and rollout across Copilot plans, VS Code Insiders and Stable, and workflows in both the editor and Agents window. At each step, we monitored a broad set of metrics, including token usage and efficiency, turn-completion success, errors, cancellations, engagement, and latency. We analyzed those signals alongside your feedback to guide product changes, decide when to expand further, and identify improvements to test in additional A/B experiments.

One of these rollout checks followed **Copilot Business and Enterprise users on VS Code Stable** over roughly two days in October, with new chats defaulting to Copilot in one group and Local in the other. The Copilot-default group used **fewer tokens and model requests per active computer**, alongside **lower estimated model-processing costs to GitHub**:

| What we measured | Change with Copilot as the default |
| --- | ---: |
| GitHub's estimated model-processing cost per active computer | **9.6% lower** |
| Tokens used per active computer | **14.2% fewer** |
| Model requests per active computer | **7.7% fewer** |
| GitHub's estimated model-processing cost per request | **2.3% lower** |

Token consumption contributes to [AI credit usage](https://code.visualstudio.com/docs/agents/guides/optimize-usage), so reducing unnecessary model work matters to users as well as to the service. The goal is to complete useful work with less processing and waiting. We evaluate usage alongside completion and responsiveness to understand whether we're achieving that balance.

**Quality alongside efficiency.** We've tracked turn completion, errors, and cancellations throughout the rollout, and continue today. Those signals, alongside response-time measurements and your feedback, help us identify where to improve next. For first requests, we've identified opportunities to reduce latency and have been actively investing in responsiveness, including [reducing delays from MCP tool loading](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). For follow-up requests, completion rates have often been close between the Copilot and Local harnesses in the comparisons we've checked.

> **TODO - Bhavya:** Confirm the cost figures and approve a public summary. Check whether a matching billed-AI-credit comparison is available from CAPI; the current readout measures service costs, not customer credits.

> **TODO - Karthik Nadig and Julia Kasper:** Do we have any matched Local-versus-Copilot task-success and latency evaluation results? Identify plans/cohorts, dates, task criteria, models and effort, repeats, and uncertainty.

## Shaping the experience with your feedback

The data helps us find patterns, while your feedback tells us what those patterns mean for the way you work, including workflows that an aggregate result can overlook. That's why we've expanded the rollout progressively and made changes along the way.

### Familiar ways to ask and review

You shared how valuable it is to have a conversation focused on understanding code or exploring an idea, without making edits. In [1.142, we brought back Ask as a built-in agent](https://code.visualstudio.com/updates/v1_142#_copilot-harness), giving you a dedicated read-only experience in the Copilot harness.

You also told us how important it is to review changes as they arrive, not only after a whole task finishes. The discussion in [#339363](https://github.com/microsoft/vscode/issues/339363) helped shape that work. The older controls depended on Local-specific edit tracking, so bringing them to the shared runtime meant rebuilding the connection between edits and review. [File-level Keep arrived in 1.143](https://code.visualstudio.com/updates/v1_143#_initial-file-level-working-set-support-experimental), followed by [Keep and Undo for files and individual changes in 1.144](https://code.visualstudio.com/updates/v1_144#_review-copilot-file-edits-with-the-working-set-experimental).

That work continues: [1.145 improved review in remote workspaces and during parallel edits](https://code.visualstudio.com/updates/v1_145#_working-set-improvements-experimental). The controls are on by default in the editor for supported agent edits. Changes from terminal commands and scripts still need separate review, as described in the [review guide](https://code.visualstudio.com/docs/agents/run/review-code-edits).

### Less time waiting

We're continuing to improve responsiveness across the whole conversation, from the first signs of progress to picking up an earlier task. One example is [1.145's improvements to reopening and browsing long chats](https://code.visualstudio.com/updates/v1_145#_chat-performance-improvements), which reuse existing content and render terminal output as you reveal it.

### Bringing your specialist integrations along

Chat participants predate today's agent loops. [Custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents), skills, and [extension tools](https://code.visualstudio.com/api/extension-guides/ai/tools) or [MCP tools](https://code.visualstudio.com/api/extension-guides/ai/mcp) offer ways to bring that expertise into agent workflows. A review agent can hold your instructions, model preference, and tool selection, while an extension tool in a connected editor supplies diagnostics or calls a service.

These aren't drop-in replacements, and not every interaction needs an agent loop. We're planning proactive outreach to participant authors, including our own extension teams. If something you need is missing, [tell us what you're trying to build](https://github.com/microsoft/vscode/issues) so we can identify the missing capabilities.

For an installed participant, look for the publisher's compatible tools or plugin; the [migration guide](https://code.visualstudio.com/docs/agent-customization/migrate-customizations#_replace-chat-participants) explains the options. A warning about a participant you don't use doesn't require action.

### Keeping your model choices

The Local-to-Copilot naming has also raised a reasonable question: does this mean giving up your own models? **BYOK and locally served models remain available in supported local setups.** The harness name isn't a requirement to use a particular hosted model.

For a workspace on your machine, **Chat: Manage Language Models** lets you add supported providers, including compatible local-model providers such as the official Ollama extension. The [BYOK guide](https://code.visualstudio.com/docs/agent-customization/language-models#_bring-your-own-language-model-key) covers setup, tool-calling, account, and policy requirements, including features that still depend on Copilot services.

**Remote BYOK in the Copilot harness is a priority.** We're actively working on Remote SSH, WSL, and Dev Container support, [aiming to have it available before Local is retired](https://github.com/microsoft/vscode/issues/332085#issuecomment-6802553573). These scenarios aren't supported yet; follow [#332085](https://github.com/microsoft/vscode/issues/332085) for updates or share the workflow you need.

## Bringing the shared foundation to your organization

For organizations, the transition needs to fit the tools, network, and safeguards your team relies on. The shared runtime gives administrators a common way to govern supported Copilot behavior across clients, including permission and sandbox controls the older Local harness cannot enforce.

We're improving that practical fit alongside the developer experience. For example, [1.146 improved enterprise proxy handling](https://code.visualstudio.com/updates/v1_146#_copilot-sessions-behind-enterprise-proxies) so the Copilot runtime follows per-destination PAC routing instead of forwarding a single proxy for every destination. Client proxy and Kerberos support also helps sessions in WSL and local Dev Containers work within organization networks.

Start with a pilot that exercises your team's model gateway, authenticated tools, extensions, and execution environments. The [transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot#_roll-out-the-copilot-harness-in-your-organization) covers rollout and verification, while the [enterprise management guide](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) explains the available controls and their client coverage. Verify the effective configuration where commands run; switching harnesses doesn't itself enable every protection.

If a blocker needs more time, administrators can review a temporary Local fallback where policy permits. It doesn't preserve Copilot runtime-only permission and sandbox enforcement, and retires with Local in February 2027.

## Keep shaping what comes next

If you're already using Copilot in the harness picker, you're on the shared foundation. You can keep working beside your code in the editor, or continue the same session in the Agents window. For sessions on your machine, keep VS Code and the Agent Host running; editor-provided tools still need their contributing client connected.

If you're moving an existing setup, the [transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot) covers continuing conversations and reviewing customizations. Try a familiar task and tell us what works, where you wait, and which integration you still need. [Issue reports](https://github.com/microsoft/vscode/issues) help us follow up; enterprise customers can use GitHub Support for private configuration.

Thank you for helping shape this work, from the measurements that reveal a pattern to the detailed report that changes a workflow. We're excited about what a shared Copilot foundation makes possible, and we're continuing to build it with your feedback.
