# The Copilot harness: Building on a shared foundation

Some agent tasks fit into a quick conversation beside your code. Others grow into a longer investigation, a test run, or work you want to follow while moving between projects or machines.

Supporting that range of work takes more than a capable model. A **harness** is the software around the model that manages context, coordinates tools, and keeps an agent working through your task. We've been investing in the **Copilot harness**, built on the [Copilot SDK](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture) and sharing its runtime with other Copilot products, like the Copilot CLI and the Copilot app.

You might already be familiar with the **Local harness**, VS Code's long-standing default agent harness. It runs in VS Code's extension host, where you work interactively with the agent through chat to implement changes in your main workspace. We've learned a great deal from investing in that experience: refining prompts and context handling, building tools, and improving edit review with your feedback.

To make Copilot feel familiar and consistent wherever you're working, we've gradually expanded use of the Copilot harness as VS Code's new default over several months, first internally and then externally. Data and your feedback have shaped improvements every day in Insiders and weekly in Stable. The Copilot harness became the default for new sessions in [1.143](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). In [1.146, we announced the older Local harness's retirement in February 2027](https://code.visualstudio.com/updates/v1_146#_copilot-harness-and-deprecation-of-the-local-harness), giving three months' notice so you and your team have time to try your workflows, review customizations, and share any blockers. We'll continue following the data and your feedback throughout that transition.

As we've developed and refined the Copilot harness, we've also brought new capabilities to VS Code that aren't available in Local. For example, [Copilot Fusion](https://code.visualstudio.com/docs/agent-customization/language-models#_use-copilot-fusion) can select models and coordinate drafting and review for your task. For organizations, [managed permission and sandbox controls](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) let administrators define boundaries the runtime enforces, rather than relying on model instructions. Availability and supported controls depend on your account and environment.

**Copilot doesn't mean cloud-only.** The Copilot harness can run on your machine, editing local files and running commands locally. Choosing a harness is separate from choosing a model provider or a cloud execution environment.

Let's look at the work behind this transition to the Copilot harness, starting with what we're learning from data and then the changes your feedback has helped shape. Along the way, we'll cover what the move means for your existing workflows and for teams bringing that shared experience to their organizations.

## What the data shows

Our work on VS Code's **Local harness** taught us how much context handling and tool use can shape an agent's efficiency, as we explored in our posts on [the Local harness](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode) and [token efficiency](https://code.visualstudio.com/blogs/2026/06/17/improving-token-efficiency-in-github-copilot). We're applying those lessons to the shared **Copilot harness**.

Over several months, we progressively introduced the Copilot harness as the default harness in place of Local, starting with internal users. We then expanded testing and rollout across Copilot plans and VS Code Insiders and Stable, covering workflows in both the Agents window and editor window. We monitored many key metrics, including token usage and efficiency, turn-completion success, errors, cancellations, engagement, and latency. At each step, we analyzed those signals alongside your feedback to guide product changes, decide when to expand further, and identify improvements to test in additional A/B experiments.

One of these rollout checks followed **Copilot Business and Enterprise users on VS Code Stable** over roughly two days in October. New chats defaulted to the Copilot harness for one group and the Local harness for the other. The Copilot-default group showed **about 10% lower estimated model-usage cost per active computer**.

> Note: The figures below estimate our model-serving cost per active computer, not customer billing.

| What we measured | Change with Copilot as the default |
| --- | ---: |
| Average model-usage cost per active computer | **9.6% lower** (95% confidence interval: 8.2% to 11.3% lower) |
| Tokens used per active computer | **14.2% fewer** |
| Model requests per active computer | **7.7% fewer** |
| Model-usage cost per request | 2.3% lower |

The lower cost came alongside **fewer model requests and fewer tokens per active computer**. For users, the goal is to complete the same useful work with less model processing, which can reduce waiting and help a given budget go further.

**Quality alongside efficiency.** We've tracked turn completion, errors, and cancellations throughout the rollout, and continue today. Those signals, alongside response-time measurements and your feedback, help us identify where to improve next. For first requests, we've identified opportunities to reduce latency and have been actively investing in responsiveness, including [reducing delays from MCP tool loading](https://code.visualstudio.com/updates/v1_143#_copilot-harness-as-the-default). For follow-up requests, completion rates have often been close between the Copilot and Local harnesses in the comparisons we've checked.

> **TODO - Bhavya:** Confirm the cost figures and approve a public summary.

> **TODO - Karthik Nadig and Julia Kasper:** Do we have any matched Local-versus-Copilot task-success and latency evaluation results? Identify plans/cohorts, dates, task criteria, models and effort, repeats, and uncertainty.

> **TODO - Other thoughts on latest data check:** Fresh aKusto checks covered November 12 and a six-hour window on November 13, split by plan, selected model, and request position.

## Shaping the experience with your feedback

The data helps us find patterns, while your feedback tells us what those patterns mean for the way you work, including workflows that an aggregate result can overlook. That's why we've expanded the rollout progressively and made changes along the way.

### Familiar ways to ask and review

You shared how valuable it is to have a conversation focused on understanding code or exploring an idea, without making edits. In [1.142, we brought back Ask as a built-in agent](https://code.visualstudio.com/updates/v1_142#_copilot-harness), giving you a dedicated read-only experience in the Copilot harness.

You also told us how important it is to review changes as they arrive, not only after a whole task finishes. The discussion in [#339363](https://github.com/microsoft/vscode/issues/339363) helped shape that work. The older controls depended on Local-specific edit tracking, so bringing them to the shared runtime meant rebuilding the connection between edits and review. [File-level Keep arrived in 1.143](https://code.visualstudio.com/updates/v1_143#_initial-file-level-working-set-support-experimental), followed by [Keep and Undo for files and individual changes in 1.144](https://code.visualstudio.com/updates/v1_144#_review-copilot-file-edits-with-the-working-set-experimental).

That work continues: [1.145 improved review in remote workspaces and during parallel edits](https://code.visualstudio.com/updates/v1_145#_working-set-improvements-experimental). The controls are on by default in the editor for supported agent edits. Changes from terminal commands and scripts still need separate review, as described in the [review guide](https://code.visualstudio.com/docs/agents/run/review-code-edits).

### Less time waiting

Responsiveness matters when you return to an earlier conversation, too. [1.145 made long chats smoother to reopen and browse](https://code.visualstudio.com/updates/v1_145#_chat-performance-improvements) by reusing existing content and rendering terminal output as you reveal it.

### Bringing your specialist integrations along

Chat participants predate today's agent loops. [Custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents), skills, and [extension tools](https://code.visualstudio.com/api/extension-guides/ai/tools) or [MCP tools](https://code.visualstudio.com/api/extension-guides/ai/mcp) offer ways to bring that expertise into agent workflows. A review agent can hold your instructions, model preference, and tool selection, while an extension tool in a connected editor supplies diagnostics or calls a service.

These aren't drop-in replacements, and not every interaction needs an agent loop. We're planning proactive outreach to participant authors, including our own extension teams. If something you need is missing, [tell us what you're trying to build](https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting#_report-an-unresolved-issue) so we can identify the missing capabilities.

For an installed participant, look for the publisher's compatible tools or plugin; the [migration guide](https://code.visualstudio.com/docs/agent-customization/migrate-customizations#_replace-chat-participants) explains the options. A warning about a participant you don't use doesn't require action.

### Keeping your model choices

The Local-to-Copilot naming has also raised a reasonable question: does this mean giving up your own models? **BYOK and locally served models remain available in supported local setups.** The harness name isn't a requirement to use a particular hosted model.

For a workspace on your machine, **Chat: Manage Language Models** lets you add supported providers, including compatible local-model providers such as the official Ollama extension. The [BYOK guide](https://code.visualstudio.com/docs/agent-customization/language-models#_bring-your-own-language-model-key) covers setup, tool-calling, account, and policy requirements, including features that still depend on Copilot services.

**Remote BYOK in the Copilot harness is a priority.** We're actively working on Remote SSH, WSL, and Dev Container support, [aiming to have it available before Local is retired](https://github.com/microsoft/vscode/issues/332085#issuecomment-6802553573). These scenarios aren't supported yet; follow [#332085](https://github.com/microsoft/vscode/issues/332085) for updates or share the workflow you need.

## Bringing the shared foundation to your organization

For a team, a familiar experience also means carrying approved tools, network access, and guardrails into daily work. The shared runtime gives organizations a common place to govern supported Copilot behavior across clients, including permission and sandbox controls that the older Local harness cannot enforce.

We've been improving that experience alongside the developer workflows. [1.142 added independent controls for permission modes](https://code.visualstudio.com/updates/v1_142#_manage-copilot-permission-modes-independently), so administrators can permit assisted approvals while restricting unrestricted access. [1.145 made required plugins clearer in the UI](https://code.visualstudio.com/updates/v1_145#_organization-required-plugins-cant-be-uninstalled), replacing an Uninstall action that would fail with an explanation that the plugin is organization-managed.

In [1.146, Copilot sessions gained support for enterprise proxy configurations](https://code.visualstudio.com/updates/v1_146#_copilot-sessions-behind-enterprise-proxies), including PAC and Kerberos when running locally, in WSL, or in a local Dev Container. The release also added [organization-provided help links](https://code.visualstudio.com/updates/v1_146#_organization-help-links-for-policy-restrictions), so someone encountering a restriction can find their own administrator's guidance.

A good rollout brings those pieces together on representative projects: your model gateway, authenticated tools, extensions, and remote or container environments. The [Local-to-Copilot transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot#_roll-out-the-copilot-harness-in-your-organization) walks through piloting and verification. The [enterprise management guide](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) explains how runtime-managed settings, editor device policies, and GitHub organization settings fit together. Coverage varies by control and client; verify the effective configuration where commands run, using **Developer: Policy Diagnostics** and `/sandbox policy`.

Where policy permits, administrators can use the temporary Local fallback while validating a blocker. It doesn't enforce Copilot runtime-only permission and sandbox restrictions, so that exception needs an administrator's review. The temporary `vscode.temporaryDefaultToLocalHarness` setting retires with Local in February 2027.

## Keep shaping what comes next

If you're already using Copilot in the harness picker, you're on the shared foundation. You can keep working beside your code in the editor, or continue the same session in the Agents window. For sessions on your machine, keep VS Code and the Agent Host running; editor-provided tools still need their contributing client connected.

If you're moving an existing setup, the [transition guide](https://code.visualstudio.com/docs/agents/run/move-to-copilot) covers continuing conversations and reviewing customizations. Try a familiar task and tell us what works, where you wait, and which integration you still need. [Issue reports](https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting#_report-an-unresolved-issue) help us follow up; enterprise customers can use GitHub Support for private configuration.

Thank you for helping shape this work, from the measurements that reveal a pattern to the detailed report that changes a workflow. We're excited about what a shared Copilot foundation makes possible, and we're continuing to build it with your feedback.
