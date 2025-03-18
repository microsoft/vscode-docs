---
ContentId: bd3d7555-3d84-4500-ae95-6dcd39641af0
DateApproved: 04/09/2025
MetaDescription: Get Started with creating, iterating and optimizing your prompts in AI Toolkit.
---
# Prompt engineering in AI Toolkit

Prompt builder in AI Toolkit streamlines the prompt engineering workflow. It can generate starter prompts, helping you iterate and refine with each run, break down complex tasks through prompt chaining and structured outputs, and provide easy access to code for seamless Large Language Model (LLM) integration via APIs.

![Getting started with prompt builder](./images/promptbuilder/promptbuilder.gif)

## Create, edit, and test prompts

To access the prompt builder, use either of these options:

- In the AI Toolkit view, select **Prompt Builder**
- Select **Try in Prompt Builder** from a model card in the model catalog

To test a prompt in the prompt builder, follow these steps:

1. In **Models**, select a model from the dropdown list, or select **Browse models** to add another model from the model catalog.

    ![select a model](./images/promptbuilder/s1_models.png)

1. Enter a **User prompt** and optionally enter a **System prompt**.

   The *user prompt* is the input that you want to send to the model. The optional *system prompt* is used to provide instructions with relevant context to guide the model response.

   > [!TIP]
   > If you don't know how to input these prompts, you can describe your project idea in natural language and let the AI-powered feature generate prompts for you to experiment with.
   > ![generate prompts with natural language](./images/promptbuilder/generate_prompt.gif)

1. Select **Run** to send the prompts to the selected model.

1. Optionally, select **Add Prompts** to add more user and assistant prompts to the conversation, or select **Use Response as Assistant Prompt** as the history and context you send to the model to further guide the model's behavior.

1. Repeat the previous steps to iterate over your prompts by observing the model response and making changes to the prompts.

## Structured output

Structured output support helps you design prompts to deliver outputs in a structured, predictable format.

![Use structured output](./images/promptbuilder/structured_output.gif)

To test a prompt in the prompt builder, follow these steps:

1. Select the **Format** dropdown in the **Response** area, and select **json_schema**.

1. Select **Prepare schema**, and then select **Select local file** to use your own schema, or select **Use an example** to use a predefined schema.

   If you proceed with an example, you can select a schema from the dropdown list.

1. Select **Run** to send the prompts to the selected model.

1. You can also edit the schema by selecting **Edit**.

   ![edit schema](./images/promptbuilder/edit_schema.png)

## Integrate prompt engineering into your application

After experimenting with models and prompts, you can get into coding right away with the automatically generated Python code.

![view code](./images/promptbuilder/view_code.gif)

To view the Python code, follow these steps:

1. Select **View Code**.

1. For models hosted on GitHub, select the inference SDK you want to use.

   AI Toolkit generates the code for the model you selected by using the provider's client SDK. For models hosted by GitHub, you can choose which inference SDK you want to use: [Azure AI Inference SDK](https://learn.microsoft.com/python/api/overview/azure/ai-inference-readme?view=azure-python-preview) or the SDK from the model provider, such as [OpenAI SDK](https://platform.openai.com/docs/libraries) or [Mistral API](https://docs.mistral.ai/api).

1. The generated code snippet is shown in a new editor, where you can copy it into your application.

   > To authenticate with the model, you usually need an API key from the provider. To access models hosted by GitHub, [generate a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (PAT) in your GitHub settings.

## Next steps

- [Run an evaluation job](/docs/intelligentapps/evaluation.md) for the popular evaluators
