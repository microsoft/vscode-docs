---
Tags: [Agents, GitHub Copilot, Engineering, Performance]
Order: 143 # Recheck ordering against the destination branch before publishing.
TOCTitle: The Copilot harness
PageTitle: "The Copilot harness: Building on a shared foundation"
MetaDescription: "Learn why {% data variables.product.prodname_vscode_shortname %} is moving from the Local harness to the Copilot harness, guided by data and user feedback."
MetaSocialImage: TODO-social-image.png # Add the image alongside the post and update this filename.
Date: 2026-11-18
Author: Brigit Murtaugh
Keywords: [github copilot, copilot harness, local harness, copilot sdk, agent host, agent migration]
---

# The Copilot harness: Building on a shared foundation

November 18, 2026 by [Brigit Murtaugh](https://github.com/bamurtaugh)

The **Copilot harness**, built on the [Copilot SDK](https://github.com/github/copilot-sdk), is now the default for new agent sessions in VS Code. We've rolled it out progressively over several months, monitoring data and your feedback at every stage to improve the experience. The **Local harness**, VS Code's earlier editor-specific harness, is now deprecated. The Local harness remains available during a [three-month transition period](https://code.visualstudio.com/updates/v1_146#_copilot-harness-and-deprecation-of-the-local-harness) before removal in February 2027 (unless your organization restricts its use). Here's why we're making this change and what it means for your workflows.

## TL;DR

- **A more efficient harness:** We combine controlled benchmarks with data from everyday workflows to measure efficiency and outcomes:
  - In one Business/Enterprise rollout comparison, the group defaulting to the Copilot harness used **14.2% fewer tokens** and **7.7% fewer model requests** per active computer when compared to the Local harness, with **9.6% lower estimated processing cost**.
  - On repeatable tasks with the same model, [published benchmarks](https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/) found comparable task completion with fewer tokens in most tested configurations versus model-provider harnesses. They evaluated Copilot CLI, which shares the runtime VS Code integrates through the Copilot SDK.
- **Faster fixes, more focus on your workflows:** A shared runtime helps fixes and optimizations reach you sooner across Copilot clients. Less duplicated maintenance means we can spend more time tackling pressing bugs, closing workflow gaps, and exploring new ways to help you work.
- **Capabilities beyond the Local harness:** That shared foundation also enables features and protections the Local harness doesn't support, including:
  - [Copilot Fusion](https://code.visualstudio.com/docs/agent-customization/language-models#_use-copilot-fusion) for multi-model work.
  - [Runtime-enforced permission and sandbox controls](https://code.visualstudio.com/docs/enterprise/manage-ai-settings).
  - [Agent Host](https://code.visualstudio.com/docs/agents/concepts/agent-host) sessions that can keep working after their project window closes, while VS Code remains running.
- **Your workflow and transition:** For local projects, the Copilot harness still runs on your machine, in VS Code. See [what we've shipped based on your feedback](#_improvements-shaped-by-your-feedback) and [what's in progress or may need your attention](#_migration-guidance-and-work-underway) below.

## Why one shared harness

An [agent harness](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses) supplies context and tools, coordinates actions such as edits and tests, and returns results to the model.

We first built the Local harness for interactive coding before a shared Copilot harness was available. That work shaped how you review agent edits and use tools supplied by VS Code extensions and MCP servers. We continually refined the harness with model providers and your feedback.

The Copilot harness uses the [Copilot SDK](https://github.com/github/copilot-sdk) to combine VS Code's supported editor integrations with the runtime shared by other Copilot products like Copilot CLI and the Copilot app. The runtime is included in VS Code and works with existing Copilot plans. Clients can then share prompt tuning, model adaptation, provider integration, and evaluation findings instead of duplicating work across two harnesses, leaving more engineering time for the features, fixes, and workflow improvements you use.

## What the data shows

We expanded the rollout of the Copilot harness as the default over several months, starting internally, then across Copilot plans, VS Code Insiders and Stable, and editor and Agents-window workflows. At each step, we reviewed key metrics alongside your feedback, and then used those findings to improve the product and plan further experiments.

We combine measurements from everyday VS Code workflows with controlled benchmarks of the shared Copilot runtime. Together, they help us understand efficiency and task outcomes in different settings.

### Real workflows: the VS Code rollout

#### Efficiency and processing cost

One analysis followed **Copilot Business and Enterprise users on VS Code Stable** over roughly two days in October. New chats defaulted to the Copilot harness in one group and the Local harness in the other. These group averages reflect varied day-to-day work, not repeated runs of the same task:

| Rollout measurement | Change with the Copilot harness as the default |
| --- | ---: |
| Tokens used per active computer | **14.2% fewer** |
| Model requests per active computer | **7.7% fewer** |
| Estimated processing cost per active computer | **9.6% lower** |
| Estimated processing cost per model request | **2.3% lower** |

> **Note:** **Estimated processing cost** is the cost of the AI model work behind an agent's requests: processing context and generating responses. We estimate it from token usage, accounting for the model used and cached input, with the same model-specific rates applied to both groups. The calculation uses model-usage data rather than billing records (it doesn't report the [AI credits](https://code.visualstudio.com/docs/agents/guides/optimize-usage) charged).

#### Quality and responsiveness

To gauge and improve quality, we tracked signals such as successful turn completion, errors, cancellations, and latency. Breaking these down by categories, like first requests versus follow-up requests, revealed different opportunities.

For example, sampled results from first requests have shown room to improve latency. This data has helped shape ongoing investigations and shipped improvements, such as [changes in VS Code version 1.143 that reduced delays caused by MCP servers that didn't finish loading their tools](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). Responsiveness matters when you return to earlier conversations, too. [1.145 improved reopening and browsing long chats](https://code.visualstudio.com/updates/v1_145#_chat-performance-improvements), including rendering terminal output as you reveal it.

### Shared efficiency work across clients

Alongside rollout data, we can use controlled benchmarks to measure performance of the Copilot harness. As one example: a [published evaluation of the shared Copilot harness](https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/) compared the Copilot harness in the Copilot CLI with model-provider harnesses. VS Code's Copilot harness uses that same runtime through the Copilot SDK, so the findings can guide improvements in VS Code too.

Findings included:
- **Token efficiency:** The Copilot harness used fewer tokens across most tested configurations.
- **Task resolution:** Task completion was broadly comparable with the model-provider harnesses. This is important since lower token consumption is useful only when the agent still gets the work done.

## Improvements shaped by your feedback

Thank you for taking the time to share your experiences and workflows - it has helped us prioritize a variety of improvements. Here are a few of the themes we heard most often:

- **Ask: explore without edits**
	- **What we heard:** It can be helpful to have a dedicated read-only option to understand code and discuss an approach before making changes.
	- **What shipped:** [Ask returned as a built-in agent in 1.142](https://code.visualstudio.com/updates/v1_142#_copilot-harness). Select **Ask** in the agent picker to explore a question without making code changes.

- **Keep and Undo: review incrementally**
	- **What we heard:** Depending on the task, you may want to review individual edits as an agent works, rather than accepting everything at once.
	- **What shipped:** [Keep and Undo for files and individual changes shipped in 1.144](https://code.visualstudio.com/updates/v1_144#_review-copilot-file-edits-with-the-working-set-experimental), so you can review edits as the agent works. This required new work since the Local harness's edit tools applied changes through VS Code's editor. The Copilot harness writes edits directly to disk from a separate Agent Host process, so [we rebuilt edit tracking and review support](https://github.com/microsoft/vscode/issues/339363#issuecomment-6346982654).

## Migration guidance and work underway

We've been actively working to make the transition to the Copilot harness as smooth as possible. You may not need to change your workflow very much to use the new harness, and as described above, we continue to actively ship improvements based on your feedback.

Where some workflows may require updates to your setup, we aim to update our documentation and in-product guidance to help you identify any steps to take.

Our [transition guide on moving to the Copilot harness](https://code.visualstudio.com/docs/agents/run/move-to-copilot) is a great starting point to explore what changes. Below are a few areas to check based on themes we've heard most often, including where your organization's administrator may need to help.

### Customizations: review what needs to migrate

Switching harnesses doesn't automatically migrate every customization. For example, recurring prompt files may need conversion to skills.

As another example, chat participants need adaptation. Tthe Chat Participant API predates VS Code's agent loops, and today, custom agents, skills, and tools let integrations contribute directly to the agent's workflow instead. Participant authors can use the [participant migration guide](https://code.visualstudio.com/docs/agent-customization/migrate-customizations#_replace-chat-participants).

In VS Code, you can use command **Chat: Open Customizations**, select **Migrations**, and review detected items that may need your action. The [harness transition guide's full checklist](https://code.visualstudio.com/docs/agents/run/move-to-copilot#_review-customizations-and-integrations) covers hooks, MCP setup and authentication, file locations, and other compatibility checks.

### BYOK and locally served models

**BYOK and locally served models remain options in supported local setups.** Use **Chat: Manage Language Models** and the [BYOK guide](https://code.visualstudio.com/docs/agent-customization/language-models#_bring-your-own-language-model-key) to configure your provider.

We're actively [working toward remote BYOK support with the Copilot harness for SSH, WSL, and Dev Containers before the Local harness is fully retired](https://github.com/microsoft/vscode/issues/332085#issuecomment-6802553573).

### Organization rollouts and enterprise benefits

The Copilot harness supports additional runtime-managed controls that the Local harness can't enforce, including:

- [**Managed permissions**](https://code.visualstudio.com/docs/enterprise/manage-ai-settings#_manage-permission-levels) to block prohibited agent operations and control which approval levels developers can use.
- [**Managed sandboxing**](https://code.visualstudio.com/docs/enterprise/manage-ai-settings#_configure-agent-sandboxing) to set file-system and network boundaries for agent commands.

Your administrator may need to coordinate some of the transition with required integrations and security policies. The [organization rollout guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot#_roll-out-the-copilot-harness-in-your-organization) provides more information.

## Keep shaping what comes next

Thank you for helping us turn shared investment, measurements, and feedback into a better experience. We'd love to continue to hear how the Copilot harness fits your workflows: what's working well and what would make it more useful. Please [share a suggestion or report an issue](https://github.com/microsoft/vscode/issues).
