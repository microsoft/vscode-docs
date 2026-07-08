---
ContentId: 9e9b38c9-a3a0-4264-8b55-325f0a10d28e
DateApproved: 07/08/2026
MetaDescription: Get started with Foundry Toolkit in Visual Studio Code, connect your project resources, and prepare for model and agent workflows.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - foundry toolkit
  - visual studio code
  - onboarding
  - setup
  - ai foundry
  - github copilot
---

# Getting Started with Foundry Toolkit in Visual Studio Code

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/aQFSDGAk9DA" title="Chapter 1 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

If you are building AI apps or agents, one of the first challenges is tool sprawl: one place for models, another for prompts, another for deployment, and yet another for monitoring. Foundry Toolkit solves that by bringing these workflows into Visual Studio Code, so your daily work can stay in one environment. In this chapter, we will walk through what Foundry Toolkit is, why this approach matters, and how to get from installation to your first connected project.

## Prerequisites

Before we install anything, let us make sure your baseline setup is ready. Most onboarding friction comes from environment gaps, not product complexity. If you validate these prerequisites first, the setup flow should complete without detours.

- **Visual Studio Code**: Installed and updated so extension installation and commands work as expected.
- **Extensions access**: You can open the Extensions view and install marketplace extensions.
- **Cloud account**: A Microsoft account and Azure subscription if you want to create Foundry resources in the cloud.
- **GitHub Copilot**: Optional, but recommended if you want guided prompts and setup automation.

With the setup baseline in place, we can look at what Foundry Toolkit actually gives you.

## What Is Foundry Toolkit?

Foundry Toolkit is a Visual Studio Code extension for building, testing, evaluating, and deploying AI solutions without leaving the editor. Instead of stitching together disconnected tools, you get one integrated workflow that spans model discovery, prompt iteration, agent development, evaluation, fine-tuning, and deployment. That integration is the key value proposition for teams moving from experimentation to repeatable delivery.

In practical terms, here is what that means for your day-to-day work:

- **Model discovery**: Browse models across providers from one catalog.
- **Prompt experimentation**: Test and iterate prompts in playground workflows.
- **Agent development**: Build agents with low-code or pro-code approaches.
- **Debugging visibility**: Inspect behavior and execution paths with Agent Inspector.
- **Quality measurement**: Evaluate outputs using built-in metrics.
- **Deployment flow**: Push solutions to production and monitor performance from the same environment.

Before we jump into setup, it is worth being explicit about what you gain from this workflow shift.

## Why It Matters

AI teams often lose momentum by bouncing between portals, scripts, notebooks, and separate deployment surfaces. That context switching is not just inconvenient, it introduces inconsistency and slows feedback loops. Foundry Toolkit helps by making the core workflow cohesive inside Visual Studio Code.

For example, imagine you are testing two prompt variants for the same campaign brief. In a fragmented workflow, you might run prompts in one tool, track results in another, and deploy from a third interface. In Foundry Toolkit, those actions stay connected, which makes iteration faster and easier to audit.

The practical benefits show up quickly:

- **Faster delivery**: Move from idea to a testable agent flow with fewer handoffs.
- **Shorter loops**: Run prompt tests, inspect behavior, and revise in one sitting.
- **Better consistency**: Keep local and cloud workflows aligned so team members can reproduce results.
- **Higher quality**: Catch weak outputs earlier by combining inspection, evaluation, and monitoring.

Next, let us open the extension and map the layout you will use most often.

## Extension Layout: What You Will See

Once Foundry Toolkit is installed, the UI is organized into sections that mirror how teams actually build. Understanding this structure early matters because it reduces discovery time and helps new team members orient quickly.

As a concrete example, if you want to compare model behavior and then move directly into agent creation, you will typically move within one extension surface rather than switching tools.

### My Resources

This section shows what is already available to you, both locally and from connected cloud environments. It is your operational inventory and your fastest way to confirm what is ready to use.

- **Recent agents**: Quick access to recently created or edited agents.
- **Local resources**: Models, tools, and assets available on your machine.
- **Foundry resources**: Cloud resources connected from your Azure-backed project.
- **Connected resources**: External providers and integrated services.

Once resources are visible, we can move to the section where you actively build.

### Developer Tools

This is where most implementation work happens. You will use it to move from model exploration to agent development and then into validation. As your project grows, this section becomes a practical day-to-day control center.

For example, a common loop is: open Model Catalog, test a prompt in Playground, then inspect behavior in Agent Inspector without leaving the same extension area.

- **Discover**: Model catalog and tool catalog, including MCP-based tool collections.
- **Build**: Agent creation, Agent Inspector, hosted agent management, and playground workflows.
- **Monitor**: Tracing, evaluations against expected behavior, and model profiling.

After building and monitoring, you still need support and feedback channels to keep improving.

### Feedback

This section helps you close the loop when something is unclear or when you want to improve the product experience. Teams benefit from this because documentation, support, and feedback are easy to find in context.

- **Documentation access**: Official guides for features and workflows.
- **Support channels**: Paths to troubleshooting and issue resolution.
- **Feedback routes**: Ways to share product feedback and improvement requests.

Let us run through the initial setup steps.

## Getting Started in Visual Studio Code

In this section, we will complete first-run setup and confirm the extension is ready for use. A clean first run saves time before model and agent work begins.

Here is a quick example outcome to aim for: you can open Foundry Toolkit from the Visual Studio Code activity area and see Resources plus Developer Tools without any missing setup prompts.
If you prefer menu navigation, the same install path starts at View > Extensions.

1. Open the Extensions panel in Visual Studio Code.
2. Search for Foundry Toolkit.
3. Install the extension.
4. Open the Foundry Toolkit view from the activity bar.
5. Confirm the key sections are visible.

Expected result: the extension view loads with My Resources, Developer Tools, and Feedback visible, and no unresolved sign-in/install warnings. At this point, you can explore local capabilities immediately, or continue into cloud-connected setup for Foundry projects.
If those three sections are visible, your chapter-1 setup target is met.

Next, we will use Copilot to speed up guided onboarding.

## Using Copilot for Guided Setup

GitHub Copilot can guide the setup workflow by asking focused follow-up questions and invoking the right actions in sequence. This reduces manual navigation, especially for first-time setup in a new subscription or resource group.

For example, if you say you already have an Azure subscription but no Foundry project yet, Copilot can route directly into project creation steps and prompt for only the missing details.

For a new cloud setup, the guided path usually looks like this:

- **Authentication**: Sign in to Azure.
- **Subscription selection**: Choose the subscription to host the project.
- **Resource group choice**: Pick an existing group or create a new one.
- **Region selection**: Select the deployment region.
- **Project creation**: Name and create the Foundry project.

After deployment completes, your project appears under My Resources so you can inspect and manage assets in one place.

Expected result: under your Foundry resources, you should see the new project entry and be able to expand it to inspect available assets.

After the project is connected, here is what you can manage right away.

## What You Can Manage After Project Creation

Once your Foundry project is connected, Visual Studio Code becomes your operational surface for core project resources. You can validate availability, inspect configuration, and move into build workflows without leaving the editor.

As a concrete example, a team member can confirm deployed models and then open prompt agents in the same session to start building campaign assistants.

- **Model deployments**: View deployed models and endpoint details.
- **Prompt agents**: Create, inspect, and manage prompt-driven agents.
- **Workflows**: Manage declarative workflows that orchestrate agents and business logic.
- **Hosted resources**: Work with hosted tools, stores, and related runtime assets.
- **Legacy compatibility**: Access classic Foundry resources where needed.

At this point, you have enough visibility to move into deeper hands-on chapters.

## What's Next

You now have the essential foundation for working effectively in Foundry Toolkit inside Visual Studio Code. The next step is to move from setup into active experimentation, where model comparison and prompt iteration shape your first real agent behavior. From there, you can expand into agent creation, evaluation, and deployment with a much smoother learning curve.

In the next chapter, we will go deeper into model catalog and playground workflows so you can compare model behavior with practical, scenario-based prompts.

## Learn more

If you want to continue learning after this chapter, the best next step is to follow the workflow in the same order you will use in real projects. Start with setup and model exploration, then move into agent building and hosted deployment.
The references below are organized to support that progression.

- **Foundry Toolkit quick start**: Explore first-run guidance and onboarding patterns in the toolkit experience.
- **Foundry Toolkit quick start**: [Watch the chapter walkthrough video](https://youtu.be/aQFSDGAk9DA) for first-run setup and onboarding flow.
- **Model catalog and playground**: [Explore the Model Catalog overview](https://learn.microsoft.com/azure/ai-foundry/how-to/model-catalog-overview) to compare and select models.
- **Agent Builder workflows**: [Follow the Azure AI Agents quickstart](https://learn.microsoft.com/azure/ai-services/agents/quickstart) to build and test agent workflows.
- **Hosted agent lifecycle**: [Review Azure AI Agents concepts and lifecycle guidance](https://learn.microsoft.com/azure/ai-services/agents/overview) for deployment and operations context.

