---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 12/11/2024
MetaDescription: Build, test, and deploy AI applications with AI Toolkit for Visual Studio Code. Features model playground, prompt engineering, batch evaluation, fine-tuning, and multi-modal support for LLMs and SLMs.
---
# AI Toolkit for Visual Studio Code

AI Toolkit for Visual Studio Code is a comprehensive extension that empowers developers and AI engineers to build, test, and deploy intelligent applications using generative AI models. Whether you're working locally or in the cloud, AI Toolkit provides an integrated development environment for the complete AI application lifecycle.

The toolkit offers seamless integration with popular AI models from providers like OpenAI, Anthropic, Google, and GitHub, while also supporting local models through ONNX and Ollama. From model discovery and experimentation to prompt engineering and deployment, AI Toolkit streamlines your AI development workflow within VS Code.

## Key features

| Feature | Description | Screenshot |
|---------|-------------|------------|
| [Model Catalog](/docs/intelligentapps/models.md) | Discover and access AI models from multiple sources including GitHub, ONNX, Ollama, OpenAI, Anthropic, and Google. Compare models side-by-side and find the perfect fit for your use case. | ![catalog](./images/overview/catalog.png) |
| [Playground](/docs/intelligentapps/playground.md) | Interactive chat environment for real-time model testing. Experiment with different prompts, parameters, and multi-modal inputs including images and attachments. | ![playground](./images/overview/Playground.png) |
| [Agent Builder](/docs/intelligentapps/agentbuilder) | Streamlined prompt engineering and agent development workflow. Create sophisticated prompts, integrate MCP tools, and generate production-ready code with structured outputs. | ![agentBuilder](./images/overview/AgentBuilder.png) |
| [Bulk Run](/docs/intelligentapps/bulkrun) | Execute batch prompt testing across multiple models simultaneously. Ideal for comparing model performance and testing at scale with various input scenarios. | ![bulkrun](./images/overview/BulkRun.png) |
| [Model Evaluation](/docs/intelligentapps/evaluation) | Comprehensive model assessment using datasets and standard metrics. Measure performance with built-in evaluators (F1 score, relevance, similarity, coherence) or create custom evaluation criteria. | ![evaluate](./images/overview/Eval.png) |
| [Fine-tuning](/docs/intelligentapps/finetune) | Customize and adapt models for specific domains and requirements. Train models locally with GPU support or leverage Azure Container Apps for cloud-based fine-tuning. | ![fine-tune](./images/overview/Fine-tune.png) |
| [Model Conversion](/docs/intelligentapps/modelconversion) | Convert, quantize, and optimize machine learning models for local deployment. Transform models from Hugging Face and other sources to run efficiently on Windows with CPU, GPU, or NPU acceleration. | ![conversion](./images/overview/Conversion.png) |

## Who is AI Toolkit for?

AI Toolkit is designed for anyone working with generative AI, from beginners to experts:

### Developers
* **App developers** building AI-powered applications who need to integrate language models
* **Full-stack developers** looking to add intelligent features to web and desktop applications
* **Mobile developers** prototyping AI functionality before production deployment

### AI Engineers & Data Scientists
* **AI engineers** fine-tuning models for specific domains and deploying to production
* **Data scientists** evaluating model performance and comparing different approaches
* **ML engineers** converting and optimizing models for efficient local deployment

### Researchers & Educators
* **AI researchers** experimenting with different models and prompt engineering techniques
* **Educators** teaching AI concepts and demonstrating model capabilities
* **Students** learning about generative AI and hands-on model interaction

### Key Use Cases
* Explore and evaluate models from providers like Anthropic, OpenAI, and GitHub
* Run models locally using ONNX and Ollama for privacy and cost control
* Build and test agents with prompt generation and MCP tool integrations
* Convert and optimize models for deployment across different hardware configurations

## Install and setup

### Quick Installation

The fastest way to get started is through the VS Code Extensions marketplace:

> <a class="install-extension-btn" href="vscode:extension/ms-windows-ai-studio.windows-ai-studio">Install the AI Toolkit for VS Code</a>

### Manual Installation

1. Launch Visual Studio Code.
2. Open the Extensions view by selecting **View** > **Extensions** or pressing **Ctrl+Shift+X**.

   Alternatively, select the Extensions icon from the VS Code Activity Bar.

3. Search for **AI Toolkit** in the search box.

   ![install](./images/overview/install_1.png)

4. Select **AI Toolkit for Visual Studio Code** from the search results and select **Install**.

   ![install](./images/overview/install_2.png)

5. After successful installation, the AI Toolkit icon appears in the VS Code Activity Bar.

   ![install](./images/overview/install_4.png)

> [!TIP]
> Choose between the **Release** version for stable features or the **Pre-Release** version for early access to new capabilities. You can switch between versions anytime after installation.


### Version Management

#### Switch to a Specific Version

By default, VS Code automatically updates AI Toolkit. To install a specific version:

1. Open the **Extensions** view from the VS Code Activity Bar.
2. Search for **AI Toolkit**.
3. On the AI Toolkit page, select the dropdown arrow next to **Uninstall**.
4. Choose **Install Specific Version...** from the dropdown.
5. Select your desired version from the list.

   ![install](./images/overview/install_5.png)

> [!TIP]
> Check the **What's New** section during installation to see detailed features for each version.

#### Install Pre-Release Version

To access the latest features in development:

1. Open the **Extensions** view in VS Code.
2. Search for **AI Toolkit**.
3. Select the dropdown arrow next to **Install**.
4. Choose **Install Pre-Release Version**.

> [!WARNING]
> Pre-release versions may contain experimental features and could be less stable than the main release.

## Get started with AI Toolkit

The AI Toolkit has a getting started walkthrough that you can use to learn the basics of the AI Toolkit. The walkthrough takes you through the playground, where you can use chat to interact with AI models.

1. Select the AI Toolkit view in the Activity Bar

1. In the **Help and Feedback** section, select **Get Started** to open the walkthrough

    ![Screenshot showing the AI Toolkit view in the Side Bar, and the getting started walkthrough.](./images/overview/get_started.png)

## Next steps

- Get more information about [adding generative AI models](/docs/intelligentapps/models.md) in AI Toolkit
- Use the [model playground](/docs/intelligentapps/playground.md) to interact with models
