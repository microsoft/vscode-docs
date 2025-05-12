## Background
Conversion of LLM models requires a Nvidia GPU. If you want model lab to manage your local GPU, you can refer [convert model](../QuickStart.md#conversion). Otherwise, follow this document.

## Manual Run Model Conversion GPU
This workflow is configured using the `qnn_config.json` file. It requires two separate Python environments described below.

#### First Environment Setup
In an **Python 3.10** [x64 Python environment with Olive installed](https://github.com/microsoft/Olive/blob/main/examples/README.md#important), install the required packages:

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

#### Second Environment Setup
In an **Python 3.10** [x64 Python environment with Olive installed](https://github.com/microsoft/Olive/blob/main/examples/README.md#important), install the required packages:

```bash
# Install ONNX Runtime QNN
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
```

Replace `/path/to/qnn/env/bin` in `qnn_config.json` with the path to the directory containing the **second environment**'s Python executable.

#### **Run the Config**
Activate the **first environment** and run the workflow:

```bash
olive run --config qnn_config.json
```

✅ Optimized model saved in: `./model/model_name`

> ⚠️ If optimization fails due to out of memory, please remove `calibration_providers` in config file.

> ⚠️ If optimization fails during context binary generation, rerun the command. The process will resume from the last completed step.


## Manual Run inference samples
The optimized model can be used for inference using ONNX Runtime QNNExecutionProvider and ONNX Runtime GenAI. Inference must be run on a **Windows Copilot+ PC with a Qualcomm NPU.**

#### Install Required Packages on **arm64 Python** environment
```bash
pip install -r https://raw.githubusercontent.com/microsoft/onnxruntime/refs/heads/main/requirements.txt
pip install -U --pre --extra-index-url https://aiinfra.pkgs.visualstudio.com/PublicPackages/_packaging/ORT-Nightly/pypi/simple onnxruntime-qnn --no-deps
pip install "onnxruntime-genai>=0.7.0rc2"
```

#### **Run Interface Sample**
Execute the provided `inference_sample.ipynb` notebook. Select ipykernel to this **arm64** Python environment.

> ⚠️ If got 6033 error, replace `genai_config.json` in `./model/model_name` folder
