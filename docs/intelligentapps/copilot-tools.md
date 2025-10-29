---
ContentId: fb94d678-70e5-49e9-9192-a1294a2bc14d
DateApproved: 10/28/2025
MetaDescription: Get Started using the AI Toolkit Copilot tools to streamline and enhance the development of AI Agent Applications.
---
# Use AI Toolkit Copilot tools for AI agent development

The AI Toolkit Copilot tools help you build AI Agent Applications faster. These tools give you ready-made features, templates, and best practices. You can create smart applications that use AI more quickly.

The AI Toolkit Copilot tools include four main tools:

- Agent Code Gen
- AI Model Guide
- Evaluation Code Gen
- Tracing Code Gen

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/) - Latest version to support MCP Server development.
1. [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) Visual Studio Code extension
1. [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) Visual Studio Code extension
1. [AI Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-ai.vscode-ai-toolkit) Visual Studio Code extension

## Using Copilot tools in AI Toolkit

After installing the prerequisites, you can use the tools AI Toolkit provides in agent mode:

1. Open the Chat view (`Ctrl+Alt+I`), and select Agent mode from the dropdown.

1. Select the **Tools** button to view the list of available tools.
    Optionally, select or deselect the tools you want to use. You can search tools by typing in the search box.
    ![Screenshot showing the Chat view in Visual Studio Code with Agent mode selected. The Tools button is highlighted, displaying a list of available tools including Agent Code Gen, AI Model Guide, Evaluation Code Gen, and Tracing Code Gen.](./images/copilottools/select-tools.png)

## Agent Code Gen tool

The **Agent Code Gen** tool helps developers create agent code more easily. Use this tool to quickly make code snippets and templates that work well for AI agents. This approach makes development faster and ensures your code follows best practices for AI agent development.

### Key Features of Agent Code Gen tool

The **Agent Code Gen** tool has several important features:

- **Intelligent Agent Code Generation:** The tool creates agent code based on what you need.
- **Default Framework Selection:** If you don't choose a framework, the tool picks Microsoft Agent Framework SDK for you.

    Example requirement:

    ```text
    Create an AI app that helps me to manage travel queries.
    ```

- **Integrated Model Guidance:** The tool uses the **AI Model Guide** to give you model details while building agents. It picks **gpt4.1** as the default model unless you choose another.

    Example requirement:

    ```text
    Create an AI app to manage travel queries, use Azure AI Foundry models.
    ```

- **Various Agent Framework functionality support:** The tool supports many features like function calling, MCP, and streaming responses.

    Example requirement:

    ```text
    Create an AI app to check the CNN headline, use local MCP playwright to fetch CNN web page.
    ```

- **Workflow support:** The tool supports many workflows in Agent Framework, like Sequential, Switch-case, Loop, and Human-In-The-Loop.

    Example requirement:

    ```text
    Build a conditional routing workflow based on email classification:
     - "Email Classifier": determines if email is spam or legitimate.
     - "Spam Handler": processes spam emails (if spam detected).
     - "Email Assistant": drafts responses for legitimate emails (if not spam).
    ```

## AI Model Guide Tool

The AI Model Guide tool helps developers pick the best AI models for their apps. It recommends Azure AI Foundry and GitHub models, including the latest and most popular ones. The tool provides details like input types, context length, cost, and metrics (quality, speed, safety). It also explains how to connect to models, such as GitHub endpoints and tokens.

This tool supports:

-Basic model recommendation:

    Example information prompt:

    ```text
    Which models are specifically designed for reasoning or math tasks?
    ```

    For this example, Copilot gathers model information from this tool and recommends o-series models for reasoning/math tasks.

- Working together with the Code Gen tool to provide model selection during agent code generation:

    Example requirement prompt:

    ```text
    Create a quick demo AI Chat app
    ```

    For this example, Copilot selects a model like the free GitHub gpt-4.1 for the chat app.

- Model selection based on specific requirements:

    Example requirement prompt:

    ```text
    Create an AI app to manage travel queries using a cheap and fast azure model.
    ```

    For this example, Copilot selects a model like Azure AI Foundry gpt-4.1-mini model.

## Evaluation Code Gen Tool

The Evaluation Code Gen Tool helps you add evaluation to your AI apps or agents. It uses a Plan tool to gather details and prepare assets before generating code.

### Key Features of the Evaluation Code Gen Tool

The Evaluation Code Gen Tool has four main features:

- **Analysis and Metric Suggestion:** This feature reviews your AI app and suggests the best tests.
- **Synthetic Query Generation:** This feature creates test questions based on your testing goals.
- **Batch Application Execution:** This feature runs your app multiple times with test questions and collects results.
- **Evaluation Code Generation:** This feature generates test code using the Azure AI Eval SDK.

These tools are helpful for everyone. New developers get guidance on tests and tools. Experienced developers save time. The Plan Tool finds your test files or asks where they are, making it easy to add testing to your app.

Example requirement prompts:

- Example 1:
    ```text
    Create an evaluation for my AI travel assistant application that assesses response accuracy and user satisfaction.
    ```
- Example 2:
    ```text
    Measure the tool call accuracy of the agent.
    ```

## Tracing Code Gen Tool

The **Tracing Code Gen** tool shares best practices for adding tracing to AI apps. It helps developers monitor and debug AI agents and workflows with ease.
This tool supports local tracing for these languages and SDKs:

- (**Python**) agent-framework, azure-ai-inference, azure-ai-agents, azure-ai-projects, openai, openai-agents, langchain, google-genai, anthropic
- (**JS/TS**) azure-ai-inference, azure-ai-projects, openai, langchain, anthropic

Example requirement prompt:

```text
Enable tracing for my AI travel assistant application built with the agent-framework SDK in Python.
```

## What you learned

In this article, you learned how to:
- Use AI tools to speed up app development.
- Add tracing to monitor and debug your AI apps.
- Pick the best AI models for your tasks.
- Include evaluation and testing in your AI workflow.

# Next steps
