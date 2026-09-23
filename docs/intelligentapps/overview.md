---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 03/12/2026
MetaDescription: Build, test, and deploy AI applications with Foundry Toolkit for {% data variables.product.prodname_vscode %}. Features model playground, prompt engineering, batch evaluation, fine-tuning, and multi-modal support for LLMs and SLMs.
---
# Foundry Toolkit for {% data variables.product.prodname_vscode %}

Foundry Toolkit for {% data variables.product.prodname_vscode %} helps developers and AI engineers build, test, and deploy AI apps with generative AI models. You can use it locally or in the cloud to manage your full AI app workflow in one place.

Foundry Toolkit offers seamless integration with popular AI models from providers like OpenAI, Anthropic, and Google, while also supporting local models through ONNX and Ollama. From model discovery and experimentation to prompt engineering and deployment, Foundry Toolkit streamlines your AI development workflow within {% data variables.product.prodname_vscode_shortname %}.

## Key features

| Feature | Description | Screenshot |
|---------|-------------|------------|
| [Create agents](/docs/intelligentapps/create-agents.md) | Use different techniques to create Prompt Agents utilizing tools and vectors or Hosted Agents with custom code. | ![Screenshot showing the Create Agents interface with various starting points for creating a new agent](./images/overview/create-agent.png) |
| [Model Catalog](/docs/intelligentapps/models.md) | Discover and access AI models from multiple sources including Microsoft Foundry, Foundry Local, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the perfect fit for your use case. | ![Screenshot showing the Foundry Toolkit Model Catalog interface with various AI model options](./images/overview/model-catalog.png) |
| [Playground](/docs/intelligentapps/playground.md) | Interactive chat environment for real-time model testing. Experiment with different prompts, parameters, and multi-modal inputs including images and attachments. | ![Screenshot showing the Foundry Toolkit Playground interface with chat messaging and model parameter controls](./images/overview/model-playground.png) |
| [Agent Builder](/docs/intelligentapps/agentbuilder) | Streamlined prompt engineering and agent development workflow. Create sophisticated prompts, integrate MCP tools, and generate production-ready code with structured outputs. | ![Screenshot showing the Agent Builder interface for creating and managing AI agents](./images/overview/agent-builder.png) |
| [Agent Inspector](/docs/intelligentapps/agent-inspector) | Debug, visualize, and iterate on AI agents directly within {% data variables.product.prodname_vscode_shortname %}. | ![Screenshot showing the Agent Inspector interface for debugging and visualizing AI agents](./images/overview/agent-inspector.png) |
| [Model Evaluation](/docs/intelligentapps/evaluation) | Comprehensive model assessment using datasets and standard metrics. Measure performance with built-in evaluators (F1 score, relevance, similarity, coherence) or create custom evaluation criteria. | ![Screenshot showing the Model Evaluation interface with metrics and performance analysis tools](./images/overview/model-evaluation.png) |
| [Tool Catalog](/docs/intelligentapps/tool-catalog) | Connect Foundry tools and local MCP server tools using the Tool Catalog in {% data variables.product.prodname_vscode %} and add them to agents with Agent Builder | ![Screenshot showing the tool catalog with a list of many tools hosted in Foundry](./images/overview/tool-catalog.png) |
| [Fine-tuning](/docs/intelligentapps/finetune) | Customize and adapt models for specific domains and requirements. Train models locally with GPU support or use Azure Container Apps for cloud-based fine-tuning. | ![Screenshot showing the Fine-tuning interface with model adaptation and training controls](./images/overview/fine-tuning.png) |
| [Model Conversion](/docs/intelligentapps/modelconversion) | Convert, quantize, and optimize machine learning models for local deployment. Transform models from Hugging Face and other sources to run efficiently on Windows with CPU, GPU, or NPU acceleration. | ![Screenshot showing the Model Conversion interface with tools for optimizing and transforming AI models](./images/overview/model-conversion.png) |
| [Tracing](/docs/intelligentapps/tracing) | Monitor and analyze the performance of your AI applications. Collect and visualize trace data to gain insights into model behavior and performance. | ![Screenshot showing the Tracing interface with tools for monitoring AI applications](./images/overview/tracing.png) |
| [Profiling (Windows ML)](/docs/intelligentapps/profiling) | Diagnose the CPU, GPU, NPU resource usages of the process, ONNX model on different execution providers, and Windows Machine Learning events. | ![Screenshot showing the Profiling tool](./images/overview/profiling.png) |

## Who is Foundry Toolkit for?

Foundry Toolkit is for anyone building AI-powered apps in {% data variables.product.prodname_vscode_shortname %}. Use it to discover and evaluate models, run models locally, build and test agents, connect tools and knowledge, and deploy AI resources to Microsoft Foundry.

## Install and setup

### Quick installation

Install the [.NET Runtime](https://learn.microsoft.com/en-us/dotnet/core/install/) before installing or first running Foundry Toolkit for {% data variables.product.prodname_vscode %}.

The fastest way to get started is by installing the extension through the Visual Studio Marketplace:

> <a class="install-extension-btn" href="vscode:extension/ms-windows-ai-studio.windows-ai-studio">Install Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %}</a>

After successful installation, the Foundry Toolkit icon appears in the Activity Bar.

### Manual installation

You can also install Foundry Toolkit extension manually from the {% data variables.product.prodname_vscode %} Marketplace. Follow the steps detailed in [Install an extension](/docs/configure/extensions/extension-marketplace.md#install-an-extension).

> [!TIP]
   Alternatively, select the Extensions icon in the Activity Bar.

* Search for **Foundry Toolkit** and select **Install** from search results.

   ![Screenshot showing the Foundry Toolkit extension in the {% data variables.product.prodname_vscode_shortname %} Marketplace with the install button](./images/overview/install.png)

> [!TIP]
> Check the **What's New** page after installation to see detailed features for each version.

* After successful installation, the Foundry Toolkit icon appears in the Activity Bar.

### Verify and install local model prerequisites

Foundry Toolkit provides local LLM running capabilities via [Foundry Local](https://www.foundrylocal.ai/). To use these capabilities, complete the Foundry Local setup by running the `Foundry Toolkit: Install environment prerequisites` command.

You can verify prerequisite installation status with the `Foundry Toolkit: Validate environment prerequisites` command:

![Screenshot showing the Foundry Toolkit Validate environment prerequisites status report"](./images/overview/validate-prerequisites.png)

## Explore Foundry Toolkit

Foundry Toolkit opens in its own view, with the Foundry Toolkit icon displayed on the {% data variables.product.prodname_vscode_shortname %} Activity Bar. The extension has three main sections: My Resources, Developer Tools, and Help and Feedback.

If you plan to use Microsoft Foundry cloud resources, sign in when prompted and select a Foundry project from **My Resources**. To set up a Microsoft Foundry project in {% data variables.product.prodname_vscode_shortname %}, see [Set up a Microsoft Foundry project in {% data variables.product.prodname_vscode_shortname %}](https://learn.microsoft.com/azure/ai-foundry/how-to/develop/set-up-foundry-project-visual-studio-code).

![Screenshot showing the Foundry Toolkit Extension with highlighted sections."](./images/overview/initial-view.png)

- **My Resources**: This section contains the local resources and Microsoft Foundry resources you have access to in Foundry Toolkit. It contains the following subsections:
  - **Your Foundry project**: Manage project resources such as models, agents, tools, knowledge, and evaluations.
  - **Recent**: Open recently used resources.
  - **Local Resources**: Manage local models, agents, and tools.
  - **Classic**: Access classic Foundry resources.
- **Developer Tools**: This section contains the tools you can use to build and deploy your AI applications. The **Developer Tools** view is where you can find the tools available to deploy and then work with your deployed models and agents. It contains the following subsections:
  - **Discover**: This section contains tools to help you discover and manage AI models and tools. It contains the following subsections:
    - **Model Catalog**: The model catalog lets you discover and access AI models from multiple sources including Microsoft Foundry, Foundry Local, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the right model for your use case.
    - **Tool Catalog**: Browse and manage the tools available in Foundry Toolkit.
- **Build**: This section is where you can find the tools available to deploy and then work with your deployed agents in Foundry Toolkit. It contains the following subsections:
  - **Create Agent**:  Create and deploy agents easily.
  - **Agent Inspector**: Debug, visualize, and iterate on AI agents directly within {% data variables.product.prodname_vscode_shortname %}.
  - **Deploy to Microsoft Foundry**: Deploy your local agent to Microsoft Foundry as a hosted agent.
  - **Hosted Agent Playground**: The hosted agent playground provides an interactive environment to experiment with your hosted agents.
  - **Model Playground**: The model playground provides an interactive environment to experiment with generative AI models.
  - **Model Conversion**: The model conversion tool helps you convert, quantize, optimize, and evaluate the prebuilt machine learning models on your local Windows platform.
  - **Fine-tuning**: This tool allows you to use your custom dataset to run fine-tuning jobs on a pre-trained model in a local computing environment with GPU or in the cloud (Azure Container Apps) with GPU.
- **Monitor**: This section is where you monitor and analyze the performance of your AI applications. It contains the following subsections:
  - **Tracing**: Trace capabilities to help you monitor and analyze the performance of your AI applications.
  - **Evaluation**: Evaluate models, prompts, and agents by comparing their outputs to ground truth data and computing evaluation metrics.
  - **Model Profiling (Windows ML) (Preview)**: This tool allows you to diagnose the CPU, GPU, NPU resource usages of the process, ONNX model on different execution providers, and Windows Machine Learning events.
- **Help and Feedback**: This section contains links to Foundry Toolkit assistance, documentation, feedback, and support. It contains the following subsections:
  - **Ask Copilot**: Ask GitHub Copilot questions about Foundry Toolkit.
  - **Get Started**: Open getting started resources.
  - **View Documentation**: The link to the Foundry Toolkit documentation.
  - **What's New**: The link to the Foundry Toolkit release notes.
  - **Report Issues**: The link to the Foundry Toolkit GitHub repository issues page.
  - **Join Community**: Join the Foundry Toolkit community to share feedback and connect with other users and the Foundry Toolkit team.

## Next steps

- Get more information about [adding generative AI models](/docs/intelligentapps/models.md) in Foundry Toolkit
- Use the [model playground](/docs/intelligentapps/playground.md) to interact with models
- Develop agents with the [Agent Builder](/docs/intelligentapps/agentbuilder) and debug them with the [Agent Inspector](/docs/intelligentapps/agent-inspector)
