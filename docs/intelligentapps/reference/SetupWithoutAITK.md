---
ContentId: 8493ea9e-061a-4519-b807-57bd320cc60c
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about setup environment.
---
# Setup environment manually

This article introduces how to manually set up Python environments for model conversion and model inference across different hardware targets.

## Setup environment for model conversion

We recommend installing your environment in a [Python virtual environment by uv](https://docs.astral.sh/uv/reference/cli/#uv-venv) as this is used internally by AI Toolkit.

The default Python version is 3.12 unless configured specially.

### Requirements installation

When AITK setups a venv, we install 3 kinds of requirements in order.

- Base requirements: the fundamental requirements including all packages
- Feature requirements: the additional requirements for the recipe that are installed after base
- Project requirements: the requirements.txt file inside project to allow user for customization

These files are hosted in the [olive-recipes repo](https://github.com/microsoft/olive-recipes/tree/main/.aitk/requirements).

> [!NOTE]
> We have [special commands](https://github.com/microsoft/olive-recipes/blob/main/.aitk/docs/guide/ReqCommands.md) to enrich the requirements file. So to install a requirements file, you should first check if there are any special commands and act acoordingly and then install it normally via `uv pip install -r xxx.txt`.

#### Example for Qualcomm NPU

For [Deepseek Qualcomm NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_qnn_config.json.config), `runtimeOverwrite.executeEp` is `CUDAExecutionProvider`, so the base requirements is [NvidiaGPU](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU.txt). `executeRuntimeFeatures` is `AutoGptq`, so the feature requirements is [AutoGptq](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-NvidiaGPU-AutoGptq.txt).

#### Example for AMD NPU

For [Deepseek AMD NPU](https://github.com/microsoft/olive-recipes/blob/main/deepseek-ai-DeepSeek-R1-Distill-Qwen-1.5B/aitk/deepseek_vitis_ai_config.json.config), `runtimeOverwrite.executeEp` is `AMD/Quark_py3.10.17`, so the base requirements is [AMD/Quark_py3.10.17](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/AMD/Quark_py3.10.17.txt). There is no feature requirements. Python 3.10 should be used for this venv.

## Setup environment for model inference

The process is similar to [Setup environment for model conversion](#setup-environment-for-model-conversion).

> [!TIP]
> The same requirements file may also be used for conversion. So you may be only need to install `onnxruntime-windowsml`, `onnxruntime-genai-winml` from the file.

[WCR](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-WCR.txt) is the up-to-date requirements for running models on all EPs in AITK.

> [!NOTE]
> For LLM on QNN, an arm64 python will have better performance. There is a [requirements](https://github.com/microsoft/olive-recipes/blob/main/.aitk/requirements/requirements-QNN_LLM.txt) for it.
