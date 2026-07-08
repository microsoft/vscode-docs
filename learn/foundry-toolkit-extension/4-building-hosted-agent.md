---
ContentId: 48bcead9-78df-4695-9d8e-e17a8a598a7a
DateApproved: 07/08/2026
MetaDescription: Scaffold, debug, and deploy a hosted agent with GitHub Copilot CLI, Agent Inspector, and Microsoft Foundry.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
	- hosted agent
	- github copilot cli
	- agent inspector
	- azure developer cli
	- microsoft foundry
	- agent deployment
---

# Building a Hosted Agent with GitHub Copilot and Microsoft Foundry

<!-- TODO: Replace VIDEO_ID with the actual chapter video ID when available. -->
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="Chapter 4 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Low-code agents are great for proving behavior quickly, but most teams eventually need stronger control over code, deployment, and integration. In this chapter, we move into a code-first workflow and build a hosted agent that can be developed locally, debugged with tooling, and deployed into Microsoft Foundry. By the end, you will have a practical blueprint for going from prompt idea to production-oriented hosted execution.

## Prerequisites

Before we start, make sure your environment can support both local debugging and hosted deployment. This chapter combines GitHub Copilot CLI, Foundry Toolkit, and Azure deployment assets, so missing setup usually slows things down in the middle of the workflow. If you validate these prerequisites first, the rest of the chapter stays focused on agent engineering, not environment troubleshooting.

- **Editor and extension**: Visual Studio Code with Foundry Toolkit installed.
- **GitHub Copilot access**: GitHub Copilot available in Visual Studio Code and terminal workflows.
- **Cloud context**: An Azure subscription and Microsoft Foundry project.
- **Model deployment**: A GPT-5 model instance already deployed in your project.
- **CLI readiness**: Azure Developer CLI and ability to sign in to Azure.

With the environment ready, we can define what this agent actually does and why the code-first path changes your delivery options.

## What You Will Build

In this chapter, you create a code-based social campaign assistant for developer-focused content creation. Unlike a prompt-only prototype, this version is source-controlled, inspectable, and deployable as a hosted agent. Think of it as the bridge between experimentation and production-ready team workflows.

For example, if your team wants custom business logic, repeatable deployment, and integration with app code, this architecture gives you a direct path without rebuilding everything from scratch.

- **Agent scaffold**: A coded project generated with GitHub Copilot CLI prompts.
- **Reusable tools**: A Foundry toolbox with Microsoft Learn MCP and web search.
- **Local runtime**: HTTP-based local agent service for invoke and debug loops.
- **Hosted target**: Deployment path to a managed hosted agent in Foundry.

Before we get hands-on, it helps to anchor the practical reason teams choose this model.

## Why Move to a Code-Based Agent

Teams choose coded agents when they need deeper control than a low-code builder can provide. That usually includes business-specific logic, deterministic configuration files, repeatable deployment, and direct integration with application code. In other words, code-based agents are not about complexity for its own sake, they are about control, reliability, and team-scale maintainability.

If you have ever asked, "How do we make this agent predictable across environments?" this is the workflow that answers that question.

- **Control**: Version prompts, runtime settings, and dependencies in source control.
- **Extensibility**: Add custom logic and richer tool orchestration patterns.
- **Repeatability**: Reproduce environments through config and infrastructure files.
- **Production fit**: Deploy and operate through a hosted agent lifecycle.

The rest of the chapter follows the real delivery order most teams use, from scaffold to hosted deployment.

## Step 1: Scaffold the Solution with GitHub Copilot CLI

Start by launching GitHub Copilot CLI in the terminal and describing the target solution in natural language. For this chapter, the scaffold prompt includes campaign-assistant behavior, clarifying-question behavior, retrieval tools, GPT-5 model usage, and hosted deployability. The key is to be explicit in one prompt so generation stays aligned with your intended architecture.

1. Open a terminal in your working folder.
2. Start GitHub Copilot CLI in that folder.
3. Confirm generated files are created in the intended project location.

A practical pattern is to include both functionality and operational constraints in the same request, for example, "configure toolbox tools and open the project folder when done."

- **Natural language spec**: Describe behavior, tools, model, and deployment intent.
- **Autopilot mode**: Allow GitHub Copilot to execute multi-step setup with fewer interruptions.
- **Expected output**: A generated project folder and initial implementation artifacts.

At this point, you should already have a project skeleton on disk. The immediate check is whether tool strategy was scaffolded for reuse instead of hard-coded inside one file.

## Step 2: Create and Attach a Foundry Toolbox

The scaffold includes a toolbox so tools can be reused across agents instead of being embedded ad hoc. In this workflow, the toolbox includes Microsoft Learn MCP for official documentation and web search for fresh external context. This matters because it centralizes retrieval behavior and reduces copy-paste tool wiring across projects.

1. Open your project in Foundry Toolkit.
2. Navigate to the tool configuration area.
3. Add Microsoft Learn MCP and web search.

For this scenario, one tool covers trusted product facts and one tool covers current web context, which is a practical retrieval split for campaign generation.

- **Microsoft grounding**: Use Learn MCP for validated product and docs context.
- **Freshness path**: Use web search for recent or time-sensitive information.
- **Reuse model**: Keep tool definitions portable across multiple agents.

With tools attached, spend a minute reading the generated assets so you can predict behavior before you execute anything.

## Step 3: Review What GitHub Copilot Generated

After generation, inspect the project artifacts to understand runtime behavior and deployment shape. This review step is important because it lets you verify that generation used Foundry-specific context, not generic app scaffolding patterns. You should be able to explain what each core file controls before running anything.

1. Open the generated folder in Visual Studio Code.
2. Inspect main.py.
3. Inspect agent.yaml.
4. Inspect toolbox.yaml.
5. Inspect azure.yaml.

Use this quick map as you scan the folder: one file controls runtime behavior, one defines agent metadata, one configures tools, and one drives infrastructure.

- **Main runtime**: `main.py` contains the core assistant logic and runtime wiring.
- **Agent config**: `agent.yaml` defines behavior, hosting, protocol, and runtime settings.
- **Tool config**: `toolbox.yaml` describes connected tools and tool endpoints.
- **Deployment config**: `azure.yaml` and `infra/` Bicep templates drive provisioning and deploy.

If any file role looks unclear here, stop and resolve it before deployment. Ambiguity at this step usually becomes expensive once cloud resources are involved.

## Step 4: Run and Invoke the Agent Locally

Before deploying, validate local behavior from terminal-based commands. This gives you a fast feedback loop and catches instruction or runtime issues before cloud resources are involved. In the chapter flow, local invoke confirms the expected clarifying-question behavior.

1. Run `azd ai agent run` from the project root.
2. Wait until the local runtime reports it is ready.
3. Invoke prompts only after the runtime is ready.

For example, after invoking with a campaign prompt, you should see targeted follow-up questions about audience, goals, and call-to-action details.

- **Local run**: Start the agent runtime with `azd ai agent run`.
- **Prompt test**: Invoke with `azd ai agent invoke` and a realistic campaign request.
- **Behavior check**: Confirm clarifying questions, tone control, and campaign framing.

A clean local run proves basic behavior, but it does not prove observability. The next step adds that missing visibility.

## Step 5: Configure Agent Inspector Integration

To inspect and troubleshoot deeply, configure the project for Agent Inspector. The chapter flow uses GitHub Copilot to verify HTTP serving requirements, install dependencies, and prepare Visual Studio Code debug configuration. This is where your project becomes easy to debug repeatedly, not just runnable once.

1. Open the Run and Debug panel in Visual Studio Code.
2. Confirm there is a valid launch configuration.
3. Press F5.

A practical success signal is that pressing F5 launches the local agent plus inspector workflow without manual setup steps. If F5 fails, fix launch and environment wiring now rather than diagnosing inside hosted runs later.

- **HTTP readiness**: Ensure the agent is served as an HTTP service.
- **Dependencies**: Install or reconcile required packages in the environment.
- **Debug config**: Add `.vscode/tasks.json` and `.vscode/launch.json`.
- **Runtime prep**: Select interpreter, activate virtual environment, and authenticate Azure.

Once inspector wiring is in place, you can evaluate cause and effect directly instead of guessing from final output text.

## Step 6: Debug with Agent Inspector

Start debugging and open Agent Inspector to observe live runtime behavior. This gives you direct visibility into events, streaming deltas, metadata, traces, and tool calls. In practice, this is where agent development shifts from black-box guessing to inspectable engineering.

1. Launch the debug session.
2. Submit one simple prompt.
3. Confirm a trace appears in the inspector timeline.

As you test prompts, watch the event timeline and trace views to confirm that responses are progressing as expected and not silently skipping retrieval logic.

- **Event timeline**: Inspect response lifecycle states and token progression.
- **Tool visibility**: Review each tool call input, output, and invocation reason.
- **Trace analysis**: Use tracing views to diagnose behavior divergence quickly.
- **Iteration loop**: Prompt, inspect, refine instructions, and retest.

After one clean trace, force a prompt that cannot be answered well without retrieval so tool wiring gets a real stress test.

## Step 7: Validate Tool Usage in Real Prompts

Use follow-up prompts that force retrieval behavior so integrations are actually exercised. In the chapter flow, the agent invokes web search and returns multiple structured content options with call-to-action guidance. This step confirms that tool calls are not only configured but operationally useful.

1. Submit a Microsoft product question that requires current facts.
2. Verify a tool call appears before the final response.

For validation, do not stop at final output text. Inspect tool call inputs and outputs so you can verify retrieval quality, not just generation style.

- **Tool invocation proof**: Confirm web search calls appear in inspector tooling views.
- **Output quality**: Check that response options remain technical and audience-specific.
- **Auditability**: Inspect each retrieval call and response shaping path.

When retrieval behavior is stable and traceable, you are ready to spend cloud deployment effort.

## Step 8: Deploy as a Hosted Agent

Deploy the agent through the Foundry deployment experience after local validation is complete. The flow uses a Docker image path and Azure Container Registry, then publishes as a new hosted agent. This is the handoff from local development to cloud-hosted execution.

1. Open the deployment flow from your project context.
2. Choose the Docker-based path.
3. Confirm the target Foundry project before publishing.

Keep deployment settings explicit so runtime sizing and image source are traceable when debugging production behavior later.

- **Deployment method**: Build and deploy from Docker configuration.
- **Hosting target**: Use Foundry-managed container registry defaults when appropriate.
- **Runtime sizing**: Set CPU and memory profile for the hosted agent.
- **Publish outcome**: Create the hosted agent resource in your Foundry project.

After publish completes, run the same scenario in the cloud playground and compare behavior against your local baseline.

## Step 9: Test the Cloud-Hosted Agent

Open the hosted agent in Foundry project resources and test from the cloud playground. This mirrors local testing while validating the production-like hosted path. The objective is to confirm that behavior remains consistent after deployment.

1. Run the same prompt used in local testing.
2. Compare follow-up questions between local and hosted runs.
3. Compare tool usage between local and hosted traces.

A useful check here is to run the same prompt you used locally and compare follow-up question quality, tool usage, and output structure.

- **Resource checks**: Verify status, details, and runtime health.
- **Cloud interaction**: Run campaign prompts against hosted endpoints.
- **Operational insight**: Review traces and behavior under hosted execution.

At this point, you have executed the full lifecycle from scaffold to hosted runtime, so we can summarize why this flow holds up in team settings.

## Why This Workflow Works

This chapter demonstrates how GitHub Copilot CLI, Foundry skills, Agent Framework, Agent Inspector, and hosted deployment connect into one coherent engineering loop. Instead of treating the agent as a black box, this workflow makes behavior observable, testable, and repeatable. That combination is what turns prototypes into maintainable systems.

In practical terms, each stage removes a specific risk before the next stage adds cost.

- **Engineering transparency**: Inspect tool calls, events, and traces end to end.
- **Quality control**: Catch behavioral drift before shipping to stakeholders.
- **Scalable delivery**: Move from prototype to hosted deployment with fewer manual steps.
- **Team readiness**: Produce a source-controlled agent that can be evolved safely.

From here, the next move is release hardening so future updates stay predictable.

## What's Next

After shipping a hosted code-based agent, the next step is hardening the lifecycle for ongoing releases. Focus on stronger evaluation pipelines, tracing-driven debugging practices, and automation for deployment and regression checks as agent scope grows. The next chapter should feel like an extension of this workflow, not a reset.