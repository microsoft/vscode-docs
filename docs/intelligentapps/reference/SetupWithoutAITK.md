---
ContentId: 8493ea9e-061a-4519-b807-57bd320cc60c
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about setup environment.
---
# Set up the environment manually

This article describes how to manually set up Python environments for model conversion and model inference across different hardware targets.

## Set up the environment for model conversion

It is recommended to install your environment in a [Python virtual environment using uv](https://docs.astral.sh/uv/reference/cli/#uv-venv), as AI Toolkit uses this internally.

The default Python version is 3.12 unless configured otherwise.

### Requirements installation

When AI Toolkit sets up a virtual environment, it installs three kinds of requirements in order:

- **Base requirements**: The fundamental requirements, including all packages.
- **Feature requirements**: Additional requirements for the recipe, installed after the base requirements.
- **Project requirements**: The `requirements.txt` file inside the project, allowing you to customize dependencies.

These files are hosted in the [olive-recipes repo](https://github.com/microsoft/olive-recipes/tree/main/.aitk/requirements).

> [!NOTE]
> The requirements files support [special commands](https://github.com/microsoft/olive-recipes/blob/main/.aitk/docs/guide/ReqCommands.md) that enrich their content. Before installing a requirements file, check for any special commands and handle them accordingly, then install it normally with `uv pip install -r xxx.txt`.

#### Example: Qualcomm NPU

For [Deepseek Qualcomm NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_qnn_config.json.config), `runtimeOverwrite.executeEp` is `CUDAExecutionProvider`, so the base requirements file is [NvidiaGPU](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU.txt). `executeRuntimeFeatures` is `AutoGptq`, so the feature requirements file is [AutoGptq](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU-AutoGptq.txt).

#### Example: AMD NPU

For [Deepseek AMD NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_vitis_ai_config.json.config), `runtimeOverwrite.executeEp` is `AMD/Quark_py3.10.17`, so the base requirements file is [AMD/Quark_py3.10.17](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/AMD/Quark_py3.10.17.txt). There are no feature requirements. Use Python 3.10 for this virtual environment.

## Set up the environment for model inference

The process is similar to [Set up the environment for model conversion](#set-up-the-environment-for-model-conversion).

> [!TIP]
> The same requirements file may also be used for conversion. You may only need to install `onnxruntime-windowsml` and `onnxruntime-genai-winml` from the file.

[WCR](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-WCR.txt) is the up-to-date requirements file for running models on all execution providers in AI Toolkit.

> [!NOTE]
> For LLM models on QNN, an arm64 Python environment provides better performance. A dedicated [requirements file](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-QNN_LLM.txt) is available for this configuration.
