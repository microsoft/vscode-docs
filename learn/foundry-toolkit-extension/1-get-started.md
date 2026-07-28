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

You know that moment when a prototype looks great, but the team still feels slow? Usually it is not the model quality. It is workflow sprawl: model lookup in one place, prompt testing in another, deployment checks somewhere else.

In this chapter, we'll make that into one flow inside Visual Studio Code so day-to-day work feels clear, fast, and honestly more fun.

No more jumping between disconnected tools.

By the end, you will have Foundry Toolkit installed, connected, and ready for real model and agent work. You will not just know where to click, you will understand why this setup order works and why the next chapters feel lighter because of it.

> The goal is simple: less setup friction, more building.

Each setup step is useful on its own.
The real magic shows up when they all work together.

## What You Will Learn

Before we jump in, let's set a concrete target. This is not a random feature tour. It is a practical build path to a workspace you can trust for the rest of the series.

In this chapter, you will learn to:

- **Set up a ready workspace**: Install Foundry Toolkit and confirm key surfaces are visible.
- **Connect a cloud project**: Attach a Foundry project so you can move from local exploration to real cloud assets.
- **Run a repeatable first flow**: Follow a sequence your team can reuse for future contributors.

Now that the destination is clear, here is the one idea that makes everything else click.

A quick map helps you see the chapter flow before we zoom in. Think of it as your "you are here" sign while you move through setup.

![Chapter 1 journey diagram](../images/foundry-toolkit/ch1-fig01-journey.png)

**Fig 01: Chapter 1 journey from first install to model-ready workspace.**

## Problem Framing: Why One Workspace Changes Learning Speed

A useful way to think about Foundry Toolkit is as a feedback-loop accelerator, not just an extension with more buttons. When discovery, prompt testing, agent setup, and deployment checks live in one place, you spend less time tab-hopping and more time improving results.

Small shift, big payoff. Especially once more people join the project.

**Try this**

If you want a quick test, compare two workflows: one where you bounce between portals and docs, and one where you stay in Visual Studio Code for most tasks. The second flow usually means faster iteration, fewer handoff mistakes, and much clearer ownership when multiple people touch the same project.

## Prerequisites

Before we install anything, let's do a quick readiness check. Most first-run friction comes from environment gaps, not product complexity.

If you validate these now, you avoid the annoying detours later.

- **Visual Studio Code**: Installed and updated so extension installation and commands work as expected.
- **Extensions access**: You can open the Extensions view and install marketplace extensions.
- **Cloud account**: A Microsoft account and Azure subscription if you want to create Foundry resources in the cloud.
- **GitHub Copilot**: Optional, but highly recommended if you want guided prompts and setup automation.

With that baseline in place, we can look at what Foundry Toolkit actually gives you.

Quick confidence check: if you can open Extensions, install tooling, and sign in when prompted, you are already through the hardest part.

## What Is Foundry Toolkit?

Foundry Toolkit is a Visual Studio Code extension for building, testing, evaluating, and deploying AI solutions without leaving the editor. Instead of stitching together disconnected tools, you get one integrated flow for model discovery, prompt iteration, agent development, evaluation, fine-tuning, and deployment.

To get you excited, here is a quick list of the core capabilities you will use in this chapter and beyond:

- **Model discovery**: Browse models across providers from one catalog.
- **Prompt experimentation**: Test and iterate prompts in playground workflows.
- **Agent development**: Build agents with low-code or pro-code approaches.
- **Debugging visibility**: Inspect behavior and execution paths with Agent Inspector.
- **Quality measurement**: Evaluate outputs using built-in metrics.
- **Deployment flow**: Push solutions to production and monitor performance from the same environment.

Here's the extension you're about to install. It is the one surface you will keep coming back to for most of the series.

![Foundry Toolkit](../images/foundry-toolkit/ch1-foundry-toolkit.png)

**Fig 1: Foundry Toolkit Extension in Visual Studio Code**

## Exercise - install Foundry Toolkit

Let's install Foundry Toolkit so we can get started on the next steps. You can install it from the Visual Studio Code marketplace or directly from the Extensions view.

1. Open Visual Studio Code and then open the Extensions view from the activity bar.

2. Search for "Foundry Toolkit" in the search bar.
3. Click "Install" on the Foundry Toolkit extension.

That's it, you now have the extension installed and ready to use. Next, we will explore the layout and key sections of the extension.

## Extension Layout: What You Will See

Once you've installed Foundry Toolkit, you should know the layout and where to find the tools you need. The extension is organized into three main sections: My Resources, Developer Tools, and Feedback. These sections mirror how teams actually build. Learning this layout early saves discovery time and helps new teammates get oriented much faster.

Here's a diagram showing the three main sections and how they relate to each other.

![Foundry Toolkit architecture diagram](../images/foundry-toolkit/ch1-fig03-toolkit-architecture.png)

**Fig 02: Foundry Toolkit information architecture and core working areas.**

You should now see one clean mental model: resources on one side, building tools in the middle, and support routes on demand. Once that clicks, the next steps feel way less heavy.

### My Resources

This section shows what is already available to you, both locally and from connected cloud environments. Think of it as your inventory and your fastest "am I good to go?" check.

If you are unsure whether setup worked, start here first. A quick look in My Resources usually tells you whether you can continue or still need one more connection.

If this section looks right, you are in great shape.

- **Recent agents**: Quick access to recently created or edited agents.
- **Local resources**: Models, tools, and assets available on your machine.
- **Foundry resources**: Cloud resources connected from your Azure-backed project.
- **Connected resources**: External providers and integrated services.

Once resources are visible, we can move to the section where you actively build.

![Foundry Toolkit resources](../images/foundry-toolkit/ch1-foundry-toolkit-resources.png)

**Fig 03: Foundry Toolkit My Resources section showing local and cloud assets.**

### Developer Tools

This is where most implementation work happens. You will use it to move from model exploration to agent development and then into validation.

As your project grows, this becomes your day-to-day control center.

Think of this as your execution lane. Most of your chapter-to-chapter work starts here, so getting comfortable with it early pays off quickly.

- **Discover**: Model catalog and tool catalog, including MCP-based tool collections.
- **Build**: Agent creation, Agent Inspector, hosted agent management, and playground workflows.
- **Monitor**: Tracing, evaluations against expected behavior, and model profiling.

As you build and test your solution, you might need support. and feedback channels to keep improving.

![Foundry Toolkit developer tools](../images/foundry-toolkit/ch1-foundry-toolkit-developer-tools.png)

**Fig 04: Foundry Toolkit Developer Tools section showing Discover, Build, and Monitor areas.**

### Feedback

This section helps you close the loop when something is unclear or when you want to improve the product experience. It keeps docs, support, and feedback easy to find in context.

It is easy to ignore this section when everything works. Keep it in your routine anyway, because it shortens troubleshooting time and improves team handoffs.

- **Documentation access**: Official guides for features and workflows.
- **Support channels**: Paths to troubleshooting and issue resolution.
- **Feedback routes**: Ways to share product feedback and improvement requests.

Let's run through the initial setup steps together.


## Quick Question

If your team can only improve one thing this week, where will you get the biggest immediate benefit: model discovery speed, prompt iteration speed, or deployment consistency?

## Answer

For most teams early in the lifecycle, prompt iteration speed gives the fastest visible return because it affects daily output quality almost immediately. If your team is already producing stable prompts, deployment consistency often becomes the next bottleneck to tackle. The key is to pick the slowest repeated step in your current flow and optimize that first.

## What's Next

You now have the foundation for working effectively in Foundry Toolkit inside Visual Studio Code. Next, you'll move from setup into active experimentation, where model comparison and prompt iteration shape your first real agent behavior. From there, you can grow into agent creation, evaluation, and deployment with a much smoother learning curve.

In the next chapter, we'll go deeper into model catalog and playground workflows so you can compare model behavior with practical, scenario-based prompts. That is where the really fun trade-offs begin: quality, speed, and cost.

## Learn more

If you want to continue learning after this chapter, the best next step is to follow the workflow in the same order you will use in real projects. Start with setup and model exploration, then move into agent building and hosted deployment.
The references below are organized to support that progression.

- **Visual Studio Code AI app overview**: [Review the Intelligent Apps overview in Visual Studio Code docs](https://code.visualstudio.com/docs/intelligentapps/overview) for product-level context and capabilities.
- **Foundry Toolkit quick start**: [Review the Azure AI Foundry overview and onboarding guidance](https://learn.microsoft.com/azure/ai-foundry/) for first-run setup context.
- **Model catalog and playground**: [Explore the Model Catalog overview](https://learn.microsoft.com/azure/ai-foundry/how-to/model-catalog-overview) to compare and select models.
- **Agent Builder workflows**: [Follow the Azure AI Agents quickstart](https://learn.microsoft.com/azure/ai-services/agents/quickstart) to build and test agent workflows.
- **Hosted agent lifecycle**: [Review Azure AI Agents concepts and lifecycle guidance](https://learn.microsoft.com/azure/ai-services/agents/overview) for deployment and operations context.

