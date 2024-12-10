---
Order: 7
Area: intelligentapps
TOCTitle: FAQ
ContentId:
PageTitle: FAQ for AI Toolkit
DateApproved:
MetaDescription: Find answers to frequently asked questions (FAQ) using AI Toolkit. Get troubleshooting recommendations.
MetaSocialImage:
---

# AI Toolkit FAQ

## Models

### How can I find my remote model endpoint and authentication header?

Here are some examples about how to find your endpoint and authentication headers in common OpenAI service providers. For other providers, you can check out their documentation about the chat completion endpoint and authentication header.

#### Example 1: Azure OpenAI

1. Go to the `Deployments` blade in Azure OpenAI Studio and select a deployment, for example, `gpt-4o`. If you don't have a deployment yet, you can checkout [the documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) about how to create a deployment.

    ![Select model deployment](./images/faq/6-aoai-deployments.png)

    ![Find model endpoint](./images/faq/7-aoai-model.png)

2. As in the last screenshot, you can retrieve your chat completion endpoint in the `Target URI` property in the `Endpoint` section.

3. You can retrieve your API key from the `Key` property in the `Endpoint` section. After you copy the API key, **fill it in the format of `api-key: <YOUR_API_KEY>` for authentication header** in AI Toolkit. See [Azure OpenAI service documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#request-header-2) to learn more about the authentication header.

#### Example 2: OpenAI

1. For now, the chat completion endpoint is fixed as `https://api.openai.com/v1/chat/completions`. See [OpenAI documentation](https://platform.openai.com/docs/api-reference/chat/create) to learn more about it.

2. Go to [OpenAI documentation](https://platform.openai.com/docs/api-reference/authentication) and click `API Keys` or `Project API Keys` to create or retrieve your API key. After you copy the API key, **fill it in the format of `Authorization: Bearer <YOUR_API_KEY>` for authentication header** in AI Toolkit. See the OpenAI documentation for more information.

    ![Find model access key](./images/faq/8-openai-key.png)


### How to edit endpoint URL or authentication header?

If you enter the wrong endpoint or authenticatin header, you may encounter errors when inferencing. Click `Edit settings.json` to open Visual Studio Code settings. You may also type the command `Open User Settings (JSON)` in Visual Studio Code command palette to open it and go to the `windowsaistudio.remoteInfereneEndpoints` section.

![Edit](./images/faq/9-edit.png)

Here, you can edit or remove existing endpoint URLs or authentication headers. After you save the settings, the models list in tree view or playground will automatically refresh.

![Edit nedpoint in settings](./images/faq/10-edit-settings.png)

### How can I join the waitlist for OpenAI o1-mini or OpenAI o1-preview?

The OpenAI o1 series models are specifically designed to tackle reasoning and problem-solving tasks with increased focus and capability. These models spend more time processing and understanding the user's request, making them exceptionally strong in areas like science, coding, math and similar fields. For example, o1 can be used by healthcare researchers to annotate cell sequencing data, by physicists to generate complicated mathematical formulas needed for quantum optics, and by developers in all fields to build and execute multi-step workflows.

IMPORTANT: o1-preview model is available for limited access. To try the model in the playground, registration is required, and access will be granted based on Microsoft’s eligibility criteria.

You can visit the [GitHub model market](https://aka.ms/github-model-marketplace) to find OpenAI o1-mini or OpenAI o1-preview and join the waitlist.

### Can I use my own models or other models from Hugging Face?

If your own model supports OpenAI API contract, you can host the model in the cloud and add it to AI Toolkit as custom model. You need to provide key information such as model endpoint url, access key and model name.

## Finetune

### There are too many fine-tune settings do I need to worry about all of them?

No, you can just run with the default settings and our current dataset in the project to test. If you want you can also pick your own dataset but you will need to tweak some setting see [this](walkthrough-hf-dataset.md) tutorial for more info.

### AI Toolkit would not scaffold the fine-tuning project

Make sure to check for the prerequisites before installing the extension. More details at [Prerequisites](README.md#prerequisites).

### I have the NVIDIA GPU device but the prerequisites check fails

If you have the NVIDIA GPU device but the prerequisites check fails with "GPU is not detected", make sure that the latest driver is installed. You can check and download the driver at [NVIDIA site](https://www.nvidia.com/Download/index.aspx?lang=en-us).
Also, make sure that it is installed in the path. To check, run run nvidia-smi from the command line.

### I generated the project but Conda activate fails to find the environment

There might have been an issue setting the environment you can manually initialize the environment using `bash /mnt/[PROJECT_PATH]/setup/first_time_setup.sh` from inside the workspace.

### When using a Hugging Face dataset how do I get it?

Make sure before you start the `python finetuning/invoke_olive.py` command you run `huggingface-cli login` this will ensure the dataset can be downloaded on your behalf.

## Environment

### Does the extension work in Linux or other systems?

Yes, AI Toolkit runs on Windows, Mac and Linux.

### How can I disable the Conda auto activation from my WSL

To disable the conda install in WSL you can run `conda config --set auto_activate_base false` this will disable the base environment.

### Do you support containers today?

We are currently working on the container support and it will be enable in a future release.

### Why do you need GitHub and Hugging Face credentials?

We host all the project templates in GitHub and the base models are hosted in Azure or Hugging Face which requires accounts to get access to them from the APIs.

### I am getting an error downloading Llama2

Please ensure you request access to Llama through this form [Llama 2 sign up page](https://github.com/llama2-onnx/signup) this is needed to comply with Meta's trade compliance.

### Can't save project inside WSL instance
Because the remote sessions are currently not supported when running the AI Toolkit Actions, you cannot save your project while being connected to WSL. To close remote connections, click on "WSL" at the bottom left of the screen and choose "Close Remote Connections".

### Error: GitHub API forbidden

We host the project templates in GitHub repositry *microsoft/windows-ai-studio-templates*, and the extension will call GitHub API to load the repo content. If you are in Microsoft, you may need to authorize Microsoft organization to avoid such forbidden issue.

See [this issue](https://github.com/microsoft/vscode-ai-toolkit/issues/70#issuecomment-2126089884) for workaround. The detailed steps are:
- Sign out GitHub account from VS Code
- Reload VS Code and AI Toolkit and you will be asked to sign in GitHub again
- [Important] In browser's authorize page, make sure to authorize the app to access "Microsoft" org
  ![Authorize Access](./images/faq/faq-github-api-forbidden.png)

### Cannot list, load, or download ONNX model

Check the 'AI Toolkit' log from output panel. If seeing *Agent* error or something like:

![Agent Failure](./images/faq/faq-onnx-agent.png)

Please close all VS Code instances and reopen VS Code.

(*It's caused by underlying ONNX agent unexpectedly closed and above step is to restart the agent.*)