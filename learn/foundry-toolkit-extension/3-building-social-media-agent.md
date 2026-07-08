---
ContentId: f5ce0269-bdf5-4f52-8765-dc9e25edad0f
DateApproved: 07/08/2026
MetaDescription: Build a social media content agent with Agent Builder, connect MCP tools, and improve quality with structured evaluations.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - agent builder
  - prompt agent
  - mcp tools
  - evaluations
  - grounded responses
  - social media agent
---

# Building a Social Media Content Agent with Agent Builder



This chapter walks through building a practical social media content agent using Agent Builder in Foundry Toolkit. The goal is not just to generate text, but to create an assistant that asks the right follow-up questions, uses trusted context, and returns output that a team can actually review and ship. By the end, you will have a repeatable workflow for moving from idea to tested prompt-agent behavior in Visual Studio Code.

## Prerequisites

Before we start building, let us confirm your setup is ready. This chapter combines agent authoring, tool grounding, and evaluation, so a missing prerequisite can break the flow halfway through. If everything below is already in place, you should be able to run the full chapter without detours.

- **Visual Studio Code setup**: Visual Studio Code with Foundry Toolkit installed.
- **Project access**: A Microsoft Foundry project connected in Foundry Toolkit.
- **Model readiness**: At least one deployed model available to power the agent.
- **GitHub Copilot support**: GitHub Copilot enabled in Visual Studio Code for guided evaluation setup.
- **Evaluation data**: A JSONL dataset (or readiness to generate a synthetic one).

With setup confirmed, we can define exactly what we are building and why the design choices matter.

## What You Will Build

The target outcome is a social content assistant for developer-focused marketing workflows. It will transform rough campaign inputs into structured draft content, while asking clarifying questions when required details are missing. Think of this as an early production prototype, not a one-off demo.

For example, if the team provides a feature note plus a screenshot but no clear channel objective, the agent should ask what audience and tone are expected before finalizing copy.

- **Content generation**: Draft LinkedIn copy, short captions, and campaign angles.
- **Input handling**: Work from brief text, feature notes, screenshots, and goals.
- **Quality guardrails**: Follow tone and structure constraints from system instructions.
- **Review readiness**: Return outputs in a format that marketers and developer advocates can validate quickly.

Before touching configuration screens, let us make explicit why this low-code pattern is valuable.

## Why This Agent Pattern Matters

Teams usually need to validate role, tone, and workflow before investing in full coded implementation. Agent Builder gives you a fast validation layer where behavior can be tested in context and improved quickly. That is especially useful when requirements are still moving.

In short, this pattern lets you answer, "Are we building the right assistant?" before asking, "How do we harden it in code?"

- **Faster validation**: Confirm behavior without writing full application code.
- **Grounded responses**: Connect to approved sources through MCP tools.
- **Operational quality**: Use evaluation metrics early instead of relying on intuition.
- **Reusable workflow**: Move from prototype to repeatable team process.

Next, we will walk the build sequence step by step.

## Step 1: Create the Agent in Agent Builder

Start in Foundry Toolkit under Developer Tools and open the build path for creating an agent. For this walkthrough, we intentionally use the low-code path first, because it lets us test behavior quickly before coding anything custom. Keep this first version simple and focused on role clarity.

For consistency with the walkthrough, use a role-specific name and pick a model already deployed in your project.

- **Navigation path**: Developer Tools -> Build -> Create an agent -> Open Agent Builder.
- **Agent identity**: Use a clear role-focused name such as Dev Social Content Assistant.
- **Model selection**: Choose a model suitable for concise writing, instruction following, and multimodal input.

Once the shell is in place, the next quality lever is instruction design.

## Step 2: Define Strong Instructions

A strong system prompt defines role, audience, boundaries, and output shape in concrete terms. This matters because vague instructions usually produce vague marketing copy and inconsistent follow-up behavior. Here, we optimize for a credible developer-first voice and reviewable output structure.

As a practical example, ask the agent to separate final copy from rationale so reviewers can quickly distinguish deliverable output from internal reasoning.

- **Role clarity**: Support a social media team producing developer-facing content.
- **Behavior rules**: Ask follow-up questions when required details are missing.
- **Tone constraints**: Avoid exaggerated claims and include clear technical value.
- **Output structure**: Separate final copy from rationale and assumptions.

After instructions look solid, save the agent so it becomes a reusable project asset.

## Step 3: Save and Register the Prompt Agent

After defining instructions, save the agent to your Foundry project so it appears in project resources. This turns a temporary editing session into a trackable artifact the team can revisit. It also gives you a clean base version before adding tools.

Checkpoint: you should be able to open your project resources and find the agent under Prompt Agents.

- **Persistence**: Save the configured prompt agent to Microsoft Foundry.
- **Resource location**: Confirm it appears under Prompt Agents in project resources.

Now we can improve factual reliability by connecting the agent to trusted sources.

## Step 4: Add MCP Tools for Grounded Context

A reliable content agent should not rely only on base-model memory. In this workflow, MCP connects the agent to authoritative Microsoft documentation through the Microsoft Learn MCP server. This is the shift from plausible output to grounded output.

For this scenario, grounding matters whenever campaign text references product capabilities, release details, or platform behavior.

- **Tool catalog action**: Add a Foundry tool and select Microsoft Learn MCP.
- **Grounding strategy**: Use docs search to locate official sources first.
- **Content retrieval**: Use fetch tools to retrieve full documentation context.
- **Reliability rule**: Instruct the agent to avoid guessing or fabricating Microsoft facts.

Adding tools alone is not enough, so the next step is to teach the agent when to use them.

## Step 5: Add Tool-Use Guidance to Instructions

Adding tools is only half the job. You also need instruction-level guidance that tells the agent when tool calls are required and how to sequence them. Without this, the agent may skip retrieval or call tools inconsistently.

In practice, you want explicit trigger logic such as: if the prompt asks about Microsoft technologies, retrieve official docs before drafting output.

- **Decision logic**: Detect when the user asks about Microsoft technologies.
- **Planning behavior**: Identify what information is required before generating copy.
- **Tool selection**: Route to the appropriate Microsoft Learn MCP tools.
- **Grounded output**: Base responses on validated sources rather than prior assumptions.

At this stage, run realistic tests in the playground.

## Step 6: Test in the Agent Playground

With instructions and tools configured, run realistic prompts directly in Agent Builder playground. Use prompts that reflect the actual campaign requests your team receives, not synthetic one-liners. Behavior quality becomes visible quickly in this step.

For example, ask for a LinkedIn post about the GitHub Copilot app for a developer audience and check whether the assistant both retrieves trusted context and asks useful follow-up questions.

- **Tool verification**: Confirm docs search is invoked against Microsoft Learn.
- **Response quality**: Check draft usefulness, structure, and call-to-action placement.
- **Follow-up behavior**: Ensure the agent asks clarifying questions when needed.
- **Transparency**: Validate that rationale is shown when requested.

Manual testing is useful, but the next step is where quality becomes measurable.

## Step 7: Scale Validation with Evaluations

Manual playground testing is useful, but it does not scale well for repeatable quality control. This step introduces built-in evaluation workflows so you can score behavior against clear metrics over multiple test rows. It is the difference between impression-based review and evidence-based review.

If you do not yet have production traces, generate a synthetic dataset first and iterate from there.

- **Evaluation setup**: Open Evaluations and select the target agent.
- **Scoring rubric**: Use metrics such as task adherence, fluency, relevance, and groundedness.
- **Dataset path**: Upload an existing JSONL dataset or generate a synthetic dataset.
- **Judge model**: Use an LLM judge to compare actual responses against expected candidates.

UI cue: when the run is done, the evaluation status changes to Completed and the report-opening action becomes available.

Once the run completes, the real value comes from diagnosis and iteration.

## Step 8: Review Results and Iterate

After the batch evaluation completes, inspect both aggregate scores and row-level details. Aggregate numbers show trend direction, but row-level analysis reveals why behavior failed. Here you find concrete fixes for instruction wording, tool routing, or output formatting.

Treat this as an iterative loop: update, re-run, compare, and document what improved.

- **Aggregate review**: Evaluate overall performance across each metric.
- **Row diagnostics**: Inspect output, numeric scores, and scoring rationale per test row.
- **Refinement loop**: Update prompt and tool guidance, then run evaluation again.
- **Version discipline**: Re-evaluate every major agent change or feature addition.

We have now completed the full loop, so let us summarize why this process is effective.

## Why This Workflow Works

This chapter demonstrates a complete low-code lifecycle: define role, ground with tools, test behavior, and evaluate systematically. The sequence is intentionally practical and repeatable, so teams can improve quality before broad rollout. It also gives you a shared language for discussing agent quality across product and engineering roles.

- **Prototype quickly**: Build useful behavior before pro-code investment.
- **Ground responsibly**: Connect to approved sources through MCP.
- **Measure objectively**: Use metrics and datasets to guide improvements.
- **Deploy confidently**: Share a better-tested agent with stakeholders.

The natural next step is deeper engineering and production hardening.

## What's Next

After validating a prompt-based social content assistant, the next step is deeper agent engineering. You can expand into richer tool orchestration, stronger datasets, and production-focused deployment and monitoring workflows. The next chapter builds on this foundation so behavior quality remains strong as complexity increases.

## Learn more

If you want to deepen this chapter after the hands-on flow, use the resources below as a guided extension path. Start with agent fundamentals, then move into implementation and deployment references so each link builds on the previous one.
This order mirrors how teams usually mature from prompt-agent prototypes to production-ready agent workflows.

- **Azure AI Foundry overview**: [Understand the broader platform and workflow surface](https://learn.microsoft.com/azure/ai-foundry/).
- **Azure AI Agents overview**: [Review core agent concepts and lifecycle guidance](https://learn.microsoft.com/azure/ai-services/agents/overview).
- **Azure AI Agents quickstart**: [Build and run a practical agent end-to-end](https://learn.microsoft.com/azure/ai-services/agents/quickstart).
- **Foundry SDK development guide**: [Explore SDK-based implementation patterns](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/sdk-overview).
- **Azure Developer CLI documentation**: [Use azd for repeatable project and deployment workflows](https://learn.microsoft.com/azure/developer/azure-developer-cli/).
- **Model deployment reference**: [Deploy OpenAI models in Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/deploy-models-openai).