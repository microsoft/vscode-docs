---
ContentId: 8493ea9e-061a-4519-b807-57bd320cc60c
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about setup environment.
---
# Setup model conversion environment manually
This article introduces how to manually set up Python environments for model conversion across different hardware targets, including CPU, QNN, AMD NPU, and Intel NPU.

We recommend installing your environment in a [Python virtual environment](https://docs.python.org/3/library/venv.html) or a [Conda environment](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html).

> Note: if you want to do inference on NPU devices with QNN EP, we recommend using a [Python virtual environment](https://docs.python.org/3/library/venv.html). The reason is because inference with some models might require the ARM version of Python, while Conda doesn't support creating an ARM version of Python virtual environments yet.

- CPU: [Setup CPU environment](#setup-cpu-environment)
- QNN: [Setup QNN environment](#setup-qnn-environment)
- AMD NPU: [Setup AMD NPU environment](#setup-amd-npu-environment)
- Intel NPU: [Setup Intel NPU environment](#setup-intel-npu-environment)

## Setup CPU environment
Tips: you can directly setup NPU environment such as [Setup QNN environment](#setup-qnn-environment). It will fallback to CPU EP when running inference on a model.

Alternatively, you can choose to setup a CPU environment.

Python version: 3.12.9
```
pip install requirements-CPU.txt
```

## Setup QNN environment
Python version: 3.12.9
```
pip install requirements-QNN.txt
```

## Setup AMD NPU environment
Python version: 3.10.9
```
pip install requirements-AMDNPU.txt
```

## Setup Intel NPU environment
Python version: 3.10.9
```
pip install requirements-IntelNPU.txt
```

## Install requirements for target project
Navigate to [model project folder](./FileStructure.md).
```
pip install requirements.txt
```
