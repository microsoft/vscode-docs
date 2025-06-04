---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 06/04/2025
MetaDescription: Build, test, and deploy AI applications with AI Toolkit for Visual Studio Code. Features model playground, prompt engineering, batch evaluation, fine-tuning, and multi-modal support for LLMs and SLMs.
---
# AI Toolkit for Visual Studio Code

AI Toolkit for Visual Studio Code is a comprehensive extension that empowers developers and AI engineers to build, test, and deploy intelligent applications using generative AI models. Whether you're working locally or in the cloud, AI Toolkit provides an integrated development environment for the complete AI application lifecycle.

The toolkit offers seamless integration with popular AI models from providers like OpenAI, Anthropic, Google, and GitHub, while also supporting local models through ONNX and Ollama. From model discovery and experimentation to prompt engineering and deployment, AI Toolkit streamlines your AI development workflow within VS Code.

## Key features

| Feature | Description | Screenshot |
|---------|-------------|------------|
| [Model Catalog](/docs/intelligentapps/models.md) | Discover and access AI models from multiple sources including GitHub, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the perfect fit for your use case. | ![Screenshot showing the AI Toolkit Model Catalog interface with various AI model options](./images/overview/catalog.png) |
| [Playground](/docs/intelligentapps/playground.md) | Interactive chat environment for real-time model testing. Experiment with different prompts, parameters, and multi-modal inputs including images and attachments. | ![Screenshot showing the AI Toolkit Playground interface with chat messaging and model parameter controls](./images/overview/playground.png) |
| [Agent (Prompt) Builder](/docs/intelligentapps/agentbuilder) | Streamlined prompt engineering and agent development workflow. Create sophisticated prompts, integrate MCP tools, and generate production-ready code with structured outputs. | ![Screenshot showing the Agent (Prompt) Builder interface for creating and managing AI agents](./images/overview/agent_builder.png) |
| [Bulk Run](/docs/intelligentapps/bulkrun) | Execute batch prompt testing across multiple models simultaneously. Ideal for comparing model performance and testing at scale with various input scenarios. | ![Screenshot showing the Bulk Run interface for batch testing prompts across multiple AI models](./images/overview/bulk_run.png) |
| [Model Evaluation](/docs/intelligentapps/evaluation) | Comprehensive model assessment using datasets and standard metrics. Measure performance with built-in evaluators (F1 score, relevance, similarity, coherence) or create custom evaluation criteria. | ![Screenshot showing the Model Evaluation interface with metrics and performance analysis tools](./images/overview/eval.png) |
| [Fine-tuning](/docs/intelligentapps/finetune) | Customize and adapt models for specific domains and requirements. Train models locally with GPU support or leverage Azure Container Apps for cloud-based fine-tuning. | ![Screenshot showing the Fine-tuning interface with model adaptation and training controls](./images/overview/fine-tune.png) |
| [Model Conversion](/docs/intelligentapps/modelconversion) | Convert, quantize, and optimize machine learning models for local deployment. Transform models from Hugging Face and other sources to run efficiently on Windows with CPU, GPU, or NPU acceleration. | ![Screenshot showing the Model Conversion interface with tools for optimizing and transforming AI models](./images/overview/conversion.png) |

## Who is AI Toolkit for?

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

You can also install the AI Toolkit extension manually from the Visual Studio Code Marketplace. Follow the steps detailed in [Install an extension](/docs/configure/extensions/extension-marketplace#_install-an-extension).

> [!TIP]
   Alternatively, select the Extensions icon in the Activity Bar.

* Search for **AI Toolkit for Visual Studio Code** and select **Install** from search results.

   ![Screenshot showing the AI Toolkit extension in the VS Code Marketplace with the install button](./images/overview/install_2.png)

> [!TIP]
> Check the **What's New** page after installation to see detailed features for each version.
* After successful installation, the AI Toolkit icon appears in the Activity Bar.

   ![Screenshot showing the AI Toolkit icon in the VS Code Activity Bar after installation](./images/overview/install_4.png)

## Get started with AI Toolkit

The AI Toolkit has a getting started walkthrough that you can use to learn the basics of the AI Toolkit. The walkthrough takes you through the playground, where you can use chat to interact with AI models.

1. Select the AI Toolkit view in the Activity Bar

1. In the **Help and Feedback** section, select **Get Started** to open the walkthrough

    ![Screenshot showing the AI Toolkit view in the Side Bar, and the getting started walkthrough.](./images/overview/get_started.png)

## Next steps

- Get more information about [adding generative AI models](/docs/intelligentapps/models.md) in AI Toolkit
- Use the [model playground](/docs/intelligentapps/playground.md) to interact with models
