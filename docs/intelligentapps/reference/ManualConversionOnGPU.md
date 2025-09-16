---
ContentId: 47b2131d-2e68-46c6-a0aa-9c3586b5a2a9
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about manual model conversion for LLM models using GPU.
---
# Manual model conversion on GPU
This article introduces the manual workflow for converting LLM models using a local Nvidia GPU. It describes the required environment setup, execution steps, and how to run inference on a Windows Copilot+ PC with a Qualcomm NPU.

Conversion of LLM models requires a Nvidia GPU. If you want model lab to manage your local GPU, follow the steps in [Convert Model](/docs/intelligentapps/modelconversion.md#conversion). Otherwise, follow the steps in this article.

## Manual run model conversion on GPU
This workflow is configured using the `qnn_config.json` file and requires two separate Python environments.
- The first environment is used for model conversion with GPU acceleration and includes packages like onnxruntime-gpu and AutoGPTQ.
- The second environment is used for QNN optimization and includes packages like onnxruntime-qnn with specific dependencies.

### First environment setup
In a **Python 3.10** [x64 Python environment with Olive installed](https://github.com/microsoft/Olive/blob/main/examples/README.md#important), install the required packages:

```bash
# Install common dependencies
pip install -r requirements.txt

# Install ONNX Runtime GPU packages
pip install "onnxruntime-gpu>=1.21.0" "onnxruntime-genai-cuda>=0.6.0"

# AutoGPTQ: Install from source (stable package may be slow for weight packing)
# Disable CUDA extension build (not required)
# Linux
export BUILD_CUDA_EXT=0
# Windows
# set BUILD_CUDA_EXT=0

# Install AutoGPTQ from source
pip install --no-build-isolation git+https://github.com/PanQiWei/AutoGPTQ.git

# Please update CUDA version if needed
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

> ⚠️ Only set up the environment and install the packages. Do not run the `olive run` command at this point.

### Second environment setup
In a **Python 3.10** [x64 Python environment with Olive installed](https://github.com/microsoft/Olive/blob/main/examples/README.md#important), install the required packages:

```bash
# Install ONNX Runtime QNN
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
```

Replace `/path/to/qnn/env/bin` in `qnn_config.json` with the path to the directory containing the **second environment**'s Python executable.

### Run the config
Activate the **first environment** and run the workflow:

```bash
olive run --config qnn_config.json
```

After completing this command, the optimized model is saved in: `./model/model_name`.

> ⚠️ If optimization fails due to out of memory, please remove `calibration_providers` in config file.

> ⚠️ If optimization fails during context binary generation, rerun the command. The process will resume from the last completed step.


## Manual run inference samples
The optimized model can be used for inference using [ONNX Runtime QNN Execution Provider](https://onnxruntime.ai/docs/execution-providers/QNN-ExecutionProvider.html) and [ONNX Runtime GenAI](https://onnxruntime.ai/docs/genai/). Inference must be run on a **Windows Copilot+ PC with a Qualcomm NPU.**

### Install required packages on arm64 Python environment
Model compilation using QNN Execution Provider requires a Python environment with onnxruntime-qnn installed. In a separate Python environment with Olive installed, install the required packages:

```bash
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
pip install "onnxruntime-genai>=0.7.0rc2"
```

### Run interface sample
Execute the provided `inference_sample.ipynb` notebook. Select ipykernel to this **arm64** Python environment.

> ⚠️ If you get a `6033` error, replace `genai_config.json` in the `./model/model_name` folder.
