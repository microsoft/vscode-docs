# Setup environment
We recommend installing env in a [virtual environment](https://docs.python.org/3/library/venv.html) or a [conda environment](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html).

Note: if you want to do inference on NPU devices with QNN EP, we recommend use [virtual environment](https://docs.python.org/3/library/venv.html). It is because inference with some model may need `arm` version python, while conda has not supported creating an arm version python venv yet.

- CPU: [Setup CPU environment](#setup-cpu-environment)
- QNN: [Setup QNN environment](#setup-qnn-environment)
- AMD NPU: [Setup AMD NPU environment](#setup-amd-npu-environment)
- Intel NPU: [Setup Intel NPU environment](#setup-intel-npu-environment)

## Setup CPU environment
Tips: you can directly setup NPU environment such as [Setup QNN environment](#setup-qnn-environment). It will fallback to CPU EP when process.

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

# install requirements for target project
Navigate to [model project folder](./README.md#model-files).
```
pip install requirements.txt
```
