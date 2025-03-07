---
Order: 4
Area: intelligentapps
TOCTitle: Prompt Builder
ContentId:
PageTitle: Prompt Builder
DateApproved:
MetaDescription: Get Started with creating, iterating and optimizing your prompts in AI Toolkit.
---
# Prompt Engineering in AI Toolkit

Prompt Builder in AI Toolkit streamlines the prompt engineering workflow by generating starter prompts, helping you iterate and refine with each run, breaking down complex tasks through prompt chaining and structured outputs, and providing easy access to code for seamless LLM integration via APIs.

![PromptBuilder demo](./images/promptbuilder/promptbuilder.gif)

## Create, edit and test prompts

To access the Prompt Builder:
- In AI Toolkit view, select **Prompt Builder**
- Select **Try in Prompt Builder** from a model card in the model catalog

To test a prompt in the prompt builder, follow these steps:
1. In **Models**, select a model from the dropdown list or click **Browser models** to add another model from model catalog.
    ![select_model](./images/promptbuilder/s1_models.png)
2. Enter **System prompt** and **User prompt**
   > [!TIP]
   > - System prompt is optional, it is used to provide instructions with relevant context to guide the model response
   > - User prompt is mandatory, it is the input you want to send to the model
   > - If you don't know how to input these prompts, you can simply describe your project idea in natural language and let the AI-powered feature generate prompts for you to experiment with
   > ![generate_prompts](./images/promptbuilder/generate_prompt.gif)
3. Click **Run** to send the prompts to the selected model
4. Optionally, you can click **Add Prompts** to add more User and Assistant prompts to the conversation, or **Use Response as Assistant Prompt** as the history and context you send to the model to further guide the model's behavior
5. You can repeat the above steps to iterate over your prompts by observing the model response and making changes to the prompts

## Structured output

Structured output support helps you design prompts to deliver outputs in a structured, predictable format.
![structured_output](./images/promptbuilder/structured_output.gif)

To test a prompt in the prompt builder, follow these steps:

1. Click on **Format** dropdown In **Response** area, and select **json_schema**
2. Click on **Prepare schema**
3. From the command palette, you have two options, you can either use your own schema by selecting **Select local file**, or use a predefined schema by selecting **Use an example**
4. If you proceed with an example, you can select a schema from the dropdown list
5. Click on **Run** to send the prompts to the selected model
6. You can also edit the schema by clicking on **Edit**
   ![edit_schema](./images/promptbuilder/edit_schema.png)

## Integrate prompt engineering into your application
After experimenting with models and prompts, you can get into coding right away by viewing ready-to-use Python code automatically generated
![view_code](./images/promptbuilder/view_code.gif)

To access the code, follow these steps:
1. Click on **View Code**
2. Select the inference SDK you want to use if it's hosted by GitHub
   > [!TIP]
   > AI Toolkit will generate the code for the corresponding model you selected using the provider's client SDK. For models hosted by GitHub, you have the option to select the inference SDK you want to use: [`Azure AI Inference SDK`](https://learn.microsoft.com/python/api/overview/azure/ai-inference-readme?view=azure-python-preview) or the SDK from model provider such as [OpenAI SDK](https://platform.openai.com/docs/libraries) or [Mistral API](https://docs.mistral.ai/api).
3. You can view the generated code snippet in a new file window and copy them into your application.
   > [!TIP]
   > To authenticate with the model you will normally need API key from the provider. To access models hosted by GitHub, [generate a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (PAT) in your GitHub settings

## Next steps

- [Run a set of prompts](/docs/intelligentapps/bulkrun.md) in an imported dataset, individually or in a full batch
- [Run evaluation](/docs/intelligentapps/evaluation.md) job for the popular evaluators