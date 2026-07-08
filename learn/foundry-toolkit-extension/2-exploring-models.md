---
ContentId: 63378e8d-67e5-4a11-8480-aee7b7e5078f
DateApproved: 07/08/2026
MetaDescription: Learn how to shortlist, filter, deploy, and compare models in Model Catalog using Foundry Toolkit and GitHub Copilot.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
	- model catalog
	- model selection
	- foundry toolkit
	- github copilot
	- azure ai foundry
	- playground comparison
---

# Exploring Models with Model Catalog

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/92tKoJOTays" title="Chapter 2 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

When building AI applications, one of the biggest challenges is not implementation, it is model choice. You can have great prompts and solid workflow design, but if the model is mismatched to your scenario, quality and speed will both suffer. In this chapter, we will use Foundry Toolkit in Visual Studio Code to walk a practical selection path from recommendation to side-by-side validation.

## Prerequisites

Before we start comparing anything, let us ensure the environment is ready. This chapter depends on both local tooling and cloud availability, so checking setup first prevents noisy failures later. If these prerequisites are in place, every step in the chapter will map cleanly to what you see in the UI.

- **Visual Studio Code**: Installed and updated so extension workflows and command surfaces are available.
- **Foundry Toolkit extension**: Installed and visible in the activity bar.
- **GitHub Copilot**: Enabled for recommendation-driven model shortlisting.
- **Azure subscription and region**: Selected for deployment checks and quota-aware filtering.
- **Connected Foundry project**: Available in Foundry Toolkit under your resources.

With setup clarified, let us define exactly what this chapter teaches and how it connects to your day-to-day model work.

## What You Will Learn

This chapter is about building a repeatable model selection process, not making one-off guesses. We will combine GitHub Copilot recommendations, Model Catalog filtering, model-card review, deployment, and Playground comparison into one loop you can reuse for future scenarios. By the end, you should be able to justify why a model was chosen, not just that it "felt better."

- **Shortlist generation**: Use GitHub Copilot to produce an initial set of realistic candidates.
- **Catalog refinement**: Use filters to reduce model options to a relevant subset.
- **Capability validation**: Check model cards before deployment.
- **Deployment readiness**: Push selected candidates into your Foundry project.
- **Behavior comparison**: Evaluate outputs side by side in Playground.

Before we run the workflow, let us be explicit about why this structure matters.

## Why Model Selection Matters

Model selection can become overwhelming very quickly when you have multiple providers, families, sizes, and capability flags. A structured process keeps decisions grounded in evidence and prevents teams from optimizing on preference alone. It also creates traceability, which is important when results need to be explained to stakeholders.

For example, if your scenario requires image input and deployment in Sweden Central, a model that is excellent in general but unavailable in that region is not a practical choice. This is exactly where a disciplined filter-and-validate workflow saves time.

In practice, this chapter workflow gives you:

- **Faster narrowing**: Reduce large candidate sets before deep testing.
- **Higher confidence**: Validate capabilities and availability before committing.
- **Cleaner trade-off analysis**: Compare speed, style, and quality with identical prompts.
- **Better production fit**: Select models that align with quota, region, and deployment constraints.

At this point, we can begin with GitHub Copilot recommendations.

## Step 1: Start with GitHub Copilot Recommendations

Before browsing Model Catalog manually, ask GitHub Copilot for candidate models tied to your specific scenario. This is useful because GitHub Copilot can combine capability requirements with subscription and regional constraints when shaping recommendations.

1. Open GitHub Copilot Chat in Visual Studio Code.
2. Paste your recommendation prompt.
3. Run the prompt in chat rather than in the terminal.

A practical prompt from the walkthrough looks like this in spirit: recommend two models for a marketing scenario, with image input support, available in Foundry Toolkit, and deployable in my subscription and region.

When you run this, GitHub Copilot can evaluate:

- **Toolkit support**: Whether models are accessible through your current Foundry flow.
- **Regional deployability**: Whether your target region supports the model.
- **Capability fit**: Whether image processing or other required features are present.

Result: you receive a shortlist, a few viable alternative pairs, and guidance on what to test next.

From there, move into catalog-level refinement.

## Step 2: Explore the Model Catalog

Model Catalog is your central discovery surface for model exploration in Foundry Toolkit. It is where recommendation output turns into actionable filtering and inspection. The key value here is that models from multiple sources are visible through one interface.

1. Open Foundry Toolkit.
2. Go to Developer Tools.
3. Select Model Catalog before reviewing any specific model.

In the walkthrough, the ecosystem includes hosted and local options so you are not locked into a single provider strategy.

- **Microsoft Foundry hosted models**: Cloud-managed options integrated with project workflows.
- **Provider models**: Options from OpenAI, Anthropic, Google, and others.
- **GitHub-hosted models**: Additional candidates for comparison flows.
- **Local models**: ONNX and Ollama-backed runs on your machine.
- **Custom integrations**: Bring-your-own-model extensions where needed.

Once the catalog is open, reduce noise with focused filters.

## Step 3: Use Filters to Narrow Candidates

Filtering is where broad discovery turns into targeted comparison. Instead of scanning dozens of irrelevant options, you define constraints that match your scenario and deployment path. This is especially useful when business requirements include capability-specific needs such as vision input.

1. Open the filter panel in Model Catalog.
2. Set hosting source, publisher, and image support.
3. Click into individual models only after filters are applied.

In the video flow, filters are applied for hosting target, publisher, and image support before selecting exact models by name.

- **Hosting source**: Limit to the hosting path you actually plan to deploy.
- **Publisher**: Compare models within a provider or across providers intentionally.
- **Feature support**: Require capabilities such as image attachment.
- **Runtime type**: Include local CPU, GPU, or NPU options when relevant.
- **Fine-tuning support**: Keep only models that match adaptation requirements.

What you should see next: your candidate list drops to a manageable set you can inspect in minutes instead of scanning dozens of entries.

At that point, the next step is model-card validation.

## Step 4: Review the Model Card

Before deployment, open each model card and verify what the provider actually guarantees. This prevents hidden mismatch later, especially for pricing, input constraints, or capability assumptions. Think of this as your pre-deployment contract check.

1. Select one filtered model.
2. Open its model card page.
3. Check capabilities and pricing before moving to deployment.

In practice, model-card review should answer: can this model do what we need, at acceptable cost, with the expected behavior profile?

- **Capabilities**: Confirm required modalities and strengths.
- **Use cases**: Check whether your scenario aligns with intended usage.
- **Pricing**: Understand expected token-cost behavior.
- **Technical specs**: Review limits, context details, and operational constraints.

After validation is complete, deploy shortlisted candidates.

## Step 5: Deploy Shortlisted Models

Deployment moves model comparison from theory to hands-on testing. In the walkthrough, two OpenAI candidates are deployed into the same Foundry project so they can be evaluated under identical prompt conditions.

1. Choose Deploy from the model card.
2. Select your connected Foundry project as the deployment target.

During deployment, configure only what you need for controlled comparison and keep naming clear so you can track outputs cleanly in Playground.

- **Deployment name**: Use a name that clearly identifies the model variant.
- **Token throughput settings**: Adjust tokens-per-minute for practical test runs.
- **Project target**: Confirm deployment goes to the intended Foundry project.

Result: both candidates appear in project resources and are ready for Playground testing.

When both deployments are ready, run the actual head-to-head comparison.

## Step 6: Compare Models in Playground

This section is where model selection becomes evidence-based. Open compare view in Playground and run the same prompt against both models so differences are attributable to model behavior, not prompt drift.

1. Open Playground.
2. Enable Compare mode.
3. Assign one deployed model to each response pane.

The walkthrough uses two prompt types to surface different strengths: a marketing-text prompt and a vision extraction prompt.

In the UI, compare mode is active when you can see two model-labeled response panes side by side under the same prompt input area.

- **Text prompt**: Generate a short LinkedIn post for developer productivity with AI tools.
- **Vision prompt**: Extract text from an attached image.

When you inspect outputs, evaluate a consistent set of dimensions:

- **Latency**: Which model returns usable output faster?
- **Style**: How different are tone, fluency, and structure?
- **Verbosity**: Is the response concise or overly expansive for the task?
- **Scenario fit**: Which output is closer to what the business actually needs?

Validation target: you can justify model selection based on observed behavior, not preference.

After choosing a candidate, one important step remains: prompt and parameter refinement.

## Step 7: Refine Behavior with Prompt and Parameters

Model choice is only part of quality. You still need to shape output behavior with system instructions and generation controls. This step lets you align responses with voice, audience, and channel constraints before moving deeper into agent workflows.

1. Add a system prompt in Playground.
2. Tune one generation setting at a time.
3. Evaluate each change before adjusting the next setting.

A typical refinement pass adds a system prompt and tunes generation controls in small increments, then re-tests with the same scenario prompts.

- **System prompt**: Set role, tone, and output boundaries.
- **Max response tokens**: Control response length.
- **Temperature**: Tune creativity versus determinism.
- **Top-p**: Adjust token sampling behavior.

Validation target: selected model outputs become more consistent with your intended style and business constraints.

Let us recap why this process works.

## Why This Workflow Works

The strength of this chapter flow is sequence discipline: shortlist, refine, validate, deploy, compare, and tune. Each stage removes uncertainty before the next stage adds effort. That keeps the process efficient and easier to explain when teams ask why one model was selected over another.

Instead of relying on intuition, you now have a repeatable selection loop grounded in capability checks, regional constraints, and real prompt outcomes.

## What's Next

You are now ready to move from model selection into agent development. In the next chapter, we will use this model-evaluation foundation to build agents that can ask better questions, use tools effectively, and produce outputs that are easier to evaluate and ship.

## Learn more

If you want to reinforce this chapter, the best next step is to review the same workflow from three angles: walkthrough, product guidance, and deployment details. This combination helps you move from understanding concepts to applying them in real projects.
Use the links below in order, and you will see the same recommendation-to-comparison flow from both tutorial and reference perspectives.

- **Chapter video walkthrough**: [Watch the full video for this chapter](https://youtu.be/92tKoJOTays).
- **Model Catalog overview**: [Review the official Model Catalog documentation](https://learn.microsoft.com/azure/ai-foundry/how-to/model-catalog-overview).
- **Foundry SDK development guide**: [Explore SDK-based development guidance for Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/sdk-overview).
- **Model deployment reference**: [See how to deploy OpenAI models in Azure AI Foundry](https://learn.microsoft.com/azure/ai-foundry/how-to/deploy-models-openai).
- **Next-step agent quickstart**: [Continue into Azure AI Agents quickstart](https://learn.microsoft.com/azure/ai-services/agents/quickstart).
