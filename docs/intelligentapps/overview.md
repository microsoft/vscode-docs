---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 10/03/2025
MetaDescription: Build, test, and deploy AI applications with AI Toolkit for Visual Studio Code. Features model playground, prompt engineering, batch evaluation, fine-tuning, and multi-modal support for LLMs and SLMs.
---
# AI Toolkit for Visual Studio Code

AI Toolkit for Visual Studio Code is a comprehensive extension that empowers developers and AI engineers to build, test, and deploy intelligent applications using generative AI models. Whether you're working locally or in the cloud, AI Toolkit provides an integrated development environment for the complete AI application lifecycle.

AI Toolkit offers seamless integration with popular AI models from providers like OpenAI, Anthropic, Google, and GitHub, while also supporting local models through ONNX and Ollama. From model discovery and experimentation to prompt engineering and deployment, AI Toolkit streamlines your AI development workflow within VS Code.

## Key features

| Feature | Description | Screenshot |
|---------|-------------|------------|
| [Model Catalog](/docs/intelligentapps/models.md) | Discover and access AI models from multiple sources including GitHub, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the perfect fit for your use case. | ![Screenshot showing the AI Toolkit Model Catalog interface with various AI model options](./images/overview/catalog.png) |
| [Playground](/docs/intelligentapps/playground.md) | Interactive chat environment for real-time model testing. Experiment with different prompts, parameters, and multi-modal inputs including images and attachments. | ![Screenshot showing the AI Toolkit Playground interface with chat messaging and model parameter controls](./images/overview/playground.png) |
| [Agent Builder](/docs/intelligentapps/agentbuilder) | Streamlined prompt engineering and agent development workflow. Create sophisticated prompts, integrate MCP tools, and generate production-ready code with structured outputs. | ![Screenshot showing the Agent Builder interface for creating and managing AI agents](./images/overview/agent-builder.png) |
| [Bulk Run](/docs/intelligentapps/bulkrun) | Execute batch prompt testing across multiple models simultaneously. Ideal for comparing model performance and testing at scale with various input scenarios. | ![Screenshot showing the Bulk Run interface for batch testing prompts across multiple AI models](./images/overview/bulk-run.png) |
| [Model Evaluation](/docs/intelligentapps/evaluation) | Comprehensive model assessment using datasets and standard metrics. Measure performance with built-in evaluators (F1 score, relevance, similarity, coherence) or create custom evaluation criteria. | ![Screenshot showing the Model Evaluation interface with metrics and performance analysis tools](./images/overview/eval.png) |
| [Fine-tuning](/docs/intelligentapps/finetune) | Customize and adapt models for specific domains and requirements. Train models locally with GPU support or leverage Azure Container Apps for cloud-based fine-tuning. | ![Screenshot showing the Fine-tuning interface with model adaptation and training controls](./images/overview/fine-tune.png) |
| [Model Conversion](/docs/intelligentapps/modelconversion) | Convert, quantize, and optimize machine learning models for local deployment. Transform models from Hugging Face and other sources to run efficiently on Windows with CPU, GPU, or NPU acceleration. | ![Screenshot showing the Model Conversion interface with tools for optimizing and transforming AI models](./images/overview/conversion.png) |
| [Tracing](/docs/intelligentapps/tracing) | Monitor and analyze the performance of your AI applications. Collect and visualize trace data to gain insights into model behavior and performance. | ![Screenshot showing the Tracing interface with tools for monitoring AI applications](./images/overview/tracing.png) |

## Who is the AI Toolkit for?

AI Toolkit is designed for anyone working with generative AI, from beginners to experts:

### Developers
* **App developers** building AI-powered applications who need to integrate language models
* **Full-stack developers** looking to add intelligent features to web and desktop applications
* **Mobile developers** prototyping AI functionality before production deployment

### AI engineers & data scientists
* **AI engineers** fine-tuning models for specific domains and deploying to production
* **Data scientists** evaluating model performance and comparing different approaches
* **ML engineers** converting and optimizing models for efficient local deployment

### Researchers and educators
* **AI researchers** experimenting with different models and prompt engineering techniques
* **Educators** teaching AI concepts and demonstrating model capabilities
* **Students** learning about generative AI and hands-on model interaction

### Key use cases
* Explore and evaluate models from providers like Anthropic, OpenAI, and GitHub
* Run models locally using ONNX and Ollama for privacy and cost control
* Build and test agents with prompt generation and MCP tool integrations
* Convert and optimize models for deployment across different hardware configurations

## Install and setup

### Quick installation
The fastest way to get started is by installing the extension through the Visual Studio Marketplace:

> <a class="install-extension-btn" href="vscode:extension/ms-windows-ai-studio.windows-ai-studio">Install the AI Toolkit for VS Code</a>

After successful installation, the AI Toolkit icon appears in the Activity Bar.

### Manual installation

You can also install AI Toolkit extension manually from the Visual Studio Code Marketplace. Follow the steps detailed in [Install an extension](/docs/configure/extensions/extension-marketplace#_install-an-extension).

> [!TIP]
   Alternatively, select the Extensions icon in the Activity Bar.

* Search for **AI Toolkit for Visual Studio Code** and select **Install** from search results.

   ![Screenshot showing the AI Toolkit extension in the VS Code Marketplace with the install button](./images/overview/install-2.png)

> [!TIP]
> Check the **What's New** page after installation to see detailed features for each version.
* After successful installation, the AI Toolkit icon appears in the Activity Bar.


## Explore Azure AI Toolkit

Azure AI Toolkit opens in its own view, with the Azure AI Toolkit icon now displayed on the VS Code Activity Bar. The extension has several main sections: My Resources, Model Tools, Agent and Workflow Tools, MCP Workflow, and Help and Feedback.

![Screenshot showing the AI Toolkit Extension with highlighted sections."](./images/overview/initial-view.png)

- **My Resources**: This section contains the resources you have access to in AI Toolkit. The **My Resources** section is the main view for interacting with your Azure AI resources. It contains the following subsections:
  - **Models**: This section contains the models you can use to build and deploy for your AI applications. The **Models** view is where you can find your deployed models in AI Toolkit.
  - **Agents**: This section contains your AI Toolkit deployed agents.
  - **MCP Servers**: This section contains the MCP Servers you're working with in AI Toolkit.

- **Model Tools**: This section contains the model tools you can use to build and deploy your AI applications. The **Model Tools** view is where you can find the tools available to deploy and then work with your deployed models. It contains the following subsections:
    - **Model Catalog**: The model catalog lets you discover and access AI models from multiple sources including GitHub, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the right model for your use case.
    - **Model Playground**: The model playground provides an interactive environment to experiment with generative AI models. Test various prompts, adjust model parameters, compare responses from different models and explore multi-modal capabilities by attaching different types of input files.
    - **Conversion**: The model conversion tool helps you convert, quantize, optimize, and evaluate the pre-built machine learning models on your local Windows platform.
   - **Fine-tuning**: This tool allows you to use your custom dataset to run fine-tuning jobs on a pre-trained model in a local computing environment with GPU or in the cloud (Azure Container Apps) with GPU.

- **Agent and Workflow Tools**: This section is where you can find the tools available to deploy and then work with your deployed agents in AI Toolkit. It contains the following subsections:
    - **Agent Builder**:  Create and deploy agents easily.
    - **Bulk Run**: Test agents and prompts against multiple test cases in batch mode.
    - **Evaluation**: Evaluate models, prompts, and agents by comparing their outputs to ground truth data and computing evaluation metrics.
    - **Tracing**: Trace capabilities to help you monitor and analyze the performance of your AI applications.

- **MCP Workflow**: This section contains tools you use to add an existing MCP server or to create a new one. It contains the following subsections:
    - **Add MCP Server**: The link for adding and working with an existing MCP server.
    - **Create new MCP Server**: The link for creating and deploying new MCP servers in AI Toolkit.

- **Help and Feedback**: This section contains links to the Azure AI Foundry documentation, feedback, support, and the Microsoft Privacy Statement. It contains the following subsections:
    - **Documentation**: The link to the Azure AI Foundry Extension documentation.
    - **Resources**: The link to the AI Toolkit Tutorials Gallery, a collection of tutorials to help you get started with AI Toolkit.
    - **Get Started**: The link to the getting started walkthrough to help you learn the basics of AI Toolkit.
    - **What's New**: The link to the AI Toolkit release notes.
    - **Report Issues on GitHub**: The link to the Azure AI Foundry extension GitHub repository issues page.

## Get started with AI Toolkit

The AI Toolkit has a getting started walkthrough that you can use to learn the basics of the AI Toolkit. The walkthrough takes you through the playground, where you can use chat to interact with AI models.

1. Select the AI Toolkit view in the Activity Bar

1. In the **Help and Feedback** section, select **Get Started** to open the walkthrough

    ![Screenshot showing the AI Toolkit view in the Side Bar, and the getting started walkthrough.](./images/overview/get-started.png)

## Next steps

- Get more information about [adding generative AI models](/docs/intelligentapps/models.md) in AI Toolkit
- Use the [model playground](/docs/intelligentapps/playground.md) to interact with models
