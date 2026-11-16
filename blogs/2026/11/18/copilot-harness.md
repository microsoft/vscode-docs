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

The **Copilot harness**, built on the [Copilot SDK](https://github.com/github/copilot-sdk), is now the default for new agent sessions in VS Code. We've rolled it out progressively over several months, monitoring data and your feedback at every stage and using what we learn to improve the experience. The **Local harness**, VS Code's earlier editor-specific implementation, is now deprecated. The Local harness remains available during the three-month transition before removal in February 2027 (unless your organization restricts its use). Here's why we're making this change and what it means for your workflows.

## TL;DR

- **Efficiency measured alongside quality:** We combine controlled benchmarks with data from everyday workflows to measure efficiency and outcomes. For example:
  - In one Business/Enterprise rollout comparison, the group defaulting to the Copilot harness used **14.2% fewer tokens** and **7.7% fewer model requests** per active computer, with **9.6% lower estimated processing cost**.
  - On repeatable tasks with the same model, [published benchmarks](https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/) found comparable task completion with fewer tokens in most tested configurations versus model-provider harnesses. They evaluated Copilot CLI, which shares the runtime VS Code integrates through the Copilot SDK.
- **Capabilities beyond the Local harness:** The Copilot harness brings features and protections the Local harness doesn't support, including:
  - [Copilot Fusion](https://code.visualstudio.com/docs/agent-customization/language-models#_use-copilot-fusion) for multi-model work.
  - [Runtime-enforced permission and sandbox controls](https://code.visualstudio.com/docs/enterprise/manage-ai-settings).
  - [Agent Host](https://code.visualstudio.com/docs/agents/concepts/agent-host) sessions that can keep working after their project window closes, while VS Code remains running.
- **Shared work, more user value:** One runtime lets us share optimizations, evaluations, and fixes across clients rather than maintaining multiple separate harnesses, freeing up engineering time for further features and workflow improvements.
- **Your workflow and transition:** For local projects, the Copilot harness still runs on your machine, in VS Code. In-product guidance and the [transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot) help you continue conversations and review customizations and integrations that need attention.

## Why one shared harness

An [agent harness](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses) supplies context and tools, coordinates actions such as edits and tests, and returns results to the model.

We first built the Local harness for interactive coding before a shared Copilot harness was available. That work shaped how you review agent edits and use tools supplied by VS Code extensions and MCP servers. We continually refined the harness with model providers and your feedback.

The Copilot harness uses the [Copilot SDK](https://github.com/github/copilot-sdk) to combine VS Code's supported editor integrations with the runtime shared by other Copilot products like Copilot CLI and the Copilot app. Clients can then share prompt tuning, model adaptation, provider integration, and evaluation findings instead of duplicating work across two harnesses, leaving more engineering time for the features, fixes, and workflow improvements you use.

## What the data shows

We expanded the rollout of the Copilot harness as the default over several months, starting internally, then across Copilot plans, Insiders and Stable, and editor and Agents-window workflows. At each step, we reviewed metrics such as token usage, completion, errors, cancellations, engagement, and latency alongside your feedback, then used those findings to improve the product and plan further experiments.

We combine measurements from everyday VS Code workflows with controlled benchmarks of the shared Copilot runtime. Together, they help us understand efficiency and outcomes in different settings.

### Real workflows: the VS Code rollout

#### Efficiency and processing cost

One check followed **Copilot Business and Enterprise users on VS Code Stable** over roughly two days in October. New chats defaulted to the Copilot harness in one group and the Local harness in the other. These group averages reflect varied day-to-day work, not repeated runs of the same task:

| Rollout measurement | Change with the Copilot harness as the default |
| --- | ---: |
| Tokens used per active computer | **14.2% fewer** |
| Model requests per active computer | **7.7% fewer** |
| Estimated processing cost per active computer | **9.6% lower** |
| Estimated processing cost per model request | **2.3% lower** |

**Estimated processing cost** is the cost of the AI model work behind an agent's requests: processing context and generating responses. We estimate it from token usage, accounting for the model used and cached input, with the same model-specific rates applied to both groups. The calculation uses model-usage data rather than billing records (so it doesn't report the [AI credits](https://code.visualstudio.com/docs/agents/guides/optimize-usage) charged).

#### Quality and responsiveness

To improve quality and responsiveness, we tracked signals such as successful turn completion, errors, cancellations, and latency alongside your feedback. Breaking these down by categories like model, Copilot plan, and first versus follow-up requests revealed different priorities, including:

- **First requests:** Sampled results have shown room to improve completion and the wait before visible progress. In response to reports of long initial waits, [we shipped improvements in 1.143 that reduced delays caused by MCP servers that didn't finish loading their tools](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default).
- **Follow-up requests:** Sampled completion rates have often been close between the Local harness and the Copilot harness, although errors and cancellations varied by model and plan. That helps us target remaining model-specific issues and keep checking responsiveness as conversations continue.

### Shared efficiency work across clients

The rollout is one way we measure the Copilot harness. VS Code also builds on the runtime used by Copilot CLI through the Copilot SDK, letting teams share what they learn from controlled evaluations.

Our [published evaluation of the shared Copilot harness](https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/) compares it with model-provider harnesses, holding the model and benchmark task fixed. The tests use Copilot CLI. The report's three central analyses connect efficiency to outcomes:

- **Token efficiency:** The Copilot harness used fewer tokens across most tested configurations, though not every one. The report covers coding, skills, Windows, and terminal tasks rather than a single scenario.
- **Task resolution:** The report found task completion broadly comparable with the model-provider harnesses. Lower token consumption is useful only when the agent still gets the work done.
- **TerminalBench 2.0:** A cost-per-task versus resolution chart shows the tradeoff and run-to-run variability. The analysis covers 89 tasks and at least five runs per configuration, rather than treating one run as definitive.

## Shaping the experience with your feedback

Your feedback identifies workflows that aggregate metrics can overlook. It has already changed the experience:

- **Ask without edits:** [Ask returned as a built-in agent in 1.142](https://code.visualstudio.com/updates/v1_142#_copilot-harness) after feedback about the value of a dedicated read-only conversation.
- **Review incrementally:** Feedback in [#339363](https://github.com/microsoft/vscode/issues/339363) helped bring [Keep and Undo for files and individual changes in 1.144](https://code.visualstudio.com/updates/v1_144#_review-copilot-file-edits-with-the-working-set-experimental). These controls are on by default for supported agent edits; review terminal and script changes separately.
- **Return to long conversations:** [1.145 improved reopening and browsing long chats](https://code.visualstudio.com/updates/v1_145#_chat-performance-improvements), including rendering terminal output as you reveal it.

### Bringing your specialist integrations along

For participant workflows, [custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents) can hold specialist instructions, model preferences, and tool selection, while extension or MCP tools supply editor context and service operations. These are not drop-in conversions, and not every interaction needs an agent loop.

Check for your publisher's compatible integration and use the [participant migration guide](https://code.visualstudio.com/docs/agent-customization/migrate-customizations#_replace-chat-participants). We're planning outreach to participant authors, including our extension teams; [report a missing workflow](https://github.com/microsoft/vscode/issues) so we can help identify the capabilities it needs. An unused-participant warning doesn't require action.

### Keeping your model choices

**BYOK and locally served models remain options in supported local setups.** Use **Chat: Manage Language Models** and the [BYOK guide](https://code.visualstudio.com/docs/agent-customization/language-models#_bring-your-own-language-model-key) to configure your provider.

Remote BYOK with the Copilot harness for SSH, WSL, and Dev Containers is still a gap and a priority. We're [working toward support before the Local harness is retired](https://github.com/microsoft/vscode/issues/332085#issuecomment-6802553573); follow [#332085](https://github.com/microsoft/vscode/issues/332085) for progress.

## The transition for you and your organization

The Copilot harness became the default in [1.143](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). [1.146 announced the Local harness's retirement in February 2027](https://code.visualstudio.com/updates/v1_146#_copilot-harness-and-deprecation-of-the-local-harness), giving three months' notice. The Local harness remains available where organization policy permits during the transition, but new features focus on the Copilot harness.

**For developers:** The runtime is bundled with VS Code. Your existing Copilot plan, including Free, continues to work. Individual features have their own requirements. Start a session with the Copilot harness and use **Chat: Open Customizations > Migrations** to review detected changes. The [transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot) covers supported conversions and continuing existing conversations.

**For administrators:** Pilot your model gateway, tools, extensions, proxies, and remote or container environments. Use the [organization rollout guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot#_roll-out-the-copilot-harness-in-your-organization) and [enterprise controls guide](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) to verify effective permissions and sandboxing where commands run. Selecting the Copilot harness doesn't itself enable sandboxing. Any temporary exception for the Local harness needs review: it cannot enforce Copilot runtime-only controls and expires when the Local harness is removed.

## Keep shaping what comes next

Our benchmarks and day-to-day use aren't a substitute for your workflow. If you're not seeing the efficiency improvements discussed here, or a repeatable task is less efficient with the Copilot harness than with the Local harness, [open a VS Code issue](https://github.com/microsoft/vscode/issues) with your version, model and effort settings, execution environment, and reproduction steps. Your examples help us reproduce the difference and improve the shared harness. Use GitHub Support for private enterprise details.

Thank you for helping us turn shared investment, measurements, and feedback into a better experience.
