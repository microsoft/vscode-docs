
# Convert a Model with AI Toolkit for VS Code (Preview)

In this article :
- [Overview](#overview)
- [Prerequises](#prerequisites)
- [Convert a model](#convert-a-model)
- [See also](#see-also)

# Overview
Model conversion is an integrated development environment designed to help developers and AI engineers to convert, quantize, optimize and evaluate the pre-built machine learning models on your local windows platform. It offers a streamlined, end-to-end experience for models converted from sources like Hugging Face, optimizing them and enabling inference on local devices powered by NPUs, GPUs, and CPUs.

In this article, you'll learn how to:
- [Create a model project](#step-1-create-project)
- [Run workflow](#step-2--run-workflow)
- [View results](#step-3--view-results)
- [Use sample notebook for model inference](#step-4--use-sample-notebook-for-model-inference)
- [Sharing resutls](#step-5--export-and-share-with-others)

# Prerequisites
- VS Code must be installed. For more information, see [Download VS Code](https://code.visualstudio.com/download)
- AI Toolkit extension must be installed. For more information, see [Install AI Toolkit](https://learn.microsoft.com/en-us/windows/ai/toolkit/toolkit-getting-started?tabs=rest#install)

# Convert a Model
## Step 1: Create Project
Creating a project in model conversion is the first step toward converting, optimizing, quantizing and evaluating machine learning models.

### 1. Launch Model Conversion
Select `Models` on the primary sider bar. Click `Conversion`.

### 2. Start a New Project
Click on `New Model Project`.
![](./images/create_project_default.png)

### 3. Choose a Base Model
- `Hugging Face Model`: choose the base model with predefined recipes from the supported model list.
- Or `Model Template` : For advanced users. Model is not included in the base model, select empty template for your customized recipes.

![](./images/create_project_model_list.png)

### 4. Enter Project Details
Entering a unique Project Localtion and a Project Name. A new folder with the specified project name will be created in the location you selected to store the project files.

- Select or create a folder as model project folder.

![](./images/create_project_select_folder.png)

- Enter model project name. Press `Enter`.

![](./images/create_project_input_name.png)

> Note:
> - When first time you create a model project, it will take a while to setup environment.
> - **ReadMe Access**: A README file is included in each project. If you close it, you can reopen it via the workspace.
> ![](./images/create_project_readme.png)

### **Supported Models**
Model Conversion currently supports a growing list of models, including top Hugging Face models in PyTorch format.

#### LLM Models

| Model Name                             | Hugging Face Path                               |
|----------------------------------------|-------------------------------------------------|
| Qwen2.5 1.5B Instruct                  | `Qwen/Qwen2.5-1.5B-Instruct`                    |
| DeepSeek R1 Distill Qwen 1.5B          | `deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B`     |
| Meta LLaMA 3.2 1B Instruct             | `meta-llama/Llama-3.2-1B-Instruct`              |
| Phi-3.5 Mini Instruct                  | `Phi-3.5-mini-instruct`                         |

#### Non-LLM Models
| Model Name                             | Hugging Face Path                               |
|----------------------------------------|-------------------------------------------------|
| Intel BERT Base Uncased (MRPC)         | `Intel/bert-base-uncased-mrpc`                  |
| BERT Multilingual Cased                | `google-bert/bert-base-multilingual-cased`      |
| ViT Base Patch16-224                   | `google/vit-base-patch16-224`                   |
| ResNet-50                              | `resnet-50`                                     |
| CLIP ViT-B-32 (laion)                  | `laion/CLIP-ViT-B-32-laion2B-s34B-b79K`         |
| CLIP ViT Base Patch16                  | `clip-vit-base-patch16`                         |
| CLIP ViT Base Patch32                  | `clip-vit-base-patch32`                         |


### (Optional) Add Model into existing project
- If you already opened the model project, click `Models` -> `Conversion`. Click `Add models` on right pannel. Or you need to open the model project and then click `Add modle` on the right panel

    ![](./images/create_project_add_models.png)

- Choose a base model or template . Click `Add`.
- A folder contains new model files will be created in current project folder.

### (Optional) Create a new model project
- If you already opened the model project, click `Models` -> `Conversion`. On right panel, Click `New Project`.

    ![](./images/create_project_add_models.png)
- Alternatively, you can close model project and [create project](#step-1-create-project) from beginning.
Select or create a folder as model project folder.

    Enter model project name. Press `Enter`.

    ![](./images/create_project_select_folder.png)

    ![](./images/create_project_input_name.png)


## Step 2 : Run workflow
Running a workflow in model conversion is the core step that transform the pre-built ML model into an optimized and quantized onnx model.

### 1. Open Your Model Project
- Ensure that the model project is open. If it isn't, navigate to File -> Open Folder in VS Code to open the model project.

### 2. Review Workflow Configuration
- Navigate to primary sider bar `Models`-> `Conversion`
- Click the workflow template to view the conversion recipe.

    ![Run Panel](./images/Run.png)

    #### Conversion
    The workflow will always execute the conversion step, which transforms the model into ONNX format. This step cannot be disabled.

    #### Quantization
    In this section, you could configure the parameters for quantization.
    - **Activation Type**: this is the data type used to represent the intermediate outputs (activations) of each layer in the neural network.
    - **Weight Type**: this is the data type used to represent the learned parameters (weights) of the model.
    - **Quantization Dataset**: calibration dataset used for quantization.
        > Note:
        >
        > **Hugging Face Compliance Alerts**:
        > - During the quantization, we need the calibration datasets. You may be prompted to accept license terms before proceeding. If you missed the notification, the running process will be paused, waiting for your input. Please make sure notifications are enabled and that you accept the required licenses.
        > ![disclaimer](./images/run_disclaimer.png)
        > - If your workflow uses a dataset that requires license agreement approval on Hugging Face (e.g., ImageNet-1k), you’ll be prompted to accept the terms on the dataset page before proceeding. This is required for legal compliance.
        > 1. To get your Hugging Face Access Token, click button on poped out window.
        > ![token_1](./images/run_token_1.png)
        > 2. Click open.
        > ![token_2](./images/run_token_2.png)
        > 3. Get token on Hugging Face portal. Paste on the top window. Press `Enter`.
        > ![token_3](./images/run_token_3.png)

    - **Quantization Dataset Split**: dataset could have different splits like validation, train and test.
    - **Quantization Dataset Size**: the number of data used to quantize the model.

    For more information about activation and weight type, please see [Data type selection](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html#data-type-selection).

    You could also disable this section. In this case, the workflow will only convert the model to ONNX format but do not quantize the model.

    #### Evaluation
    In this section, you need to select the Execution Provider (EP) you want to use for evaluation, regardless of the platform on which the model was converted.
    - **Evaluate on**: the target device that you want to evaluate the model. Possible values are:
        - **Qualcomm NPU**: to use this, you need a compatible Qualcomm device.
        - **CPU**: any CPU could work.
    - **Evaluation Dataset**: dataset used for evaluation.
    - **Evaluation Dataset Split**: dataset could have different splits like validation, train and test.
    - **Evaluation Dataset Size**: the number of data used to evaluate the model.

    You could also disable this section. In this case, the workflow will only convert the model to ONNX format but do not evaluate the model.

### 3. Run the Workflow
- If the workflow configuration meet your needs, click `Run` to begin the job.
- A default job name will be generated using the workflow name and timestamp (e.g., `bert_qdq_2025-05-06_20-45-00`) for easy tracking.
- During the job running, you can `Cancel` the job by clicking on the status indicator or the three-dot menu under `Actions` in History board and select `Stop Running`.
-  **Hugging Face Compliance Alerts**: During the quantization, we need the calibration datasets. You may be prompted to accept license terms before proceeding. If you missed the notification, the running process will be paused, waiting for your input. Please make sure notifications are enabled and that you accept the required licenses.

> Note:
> - **Model conversion and quantization**: you can run workflow on any device expect for LLM models. The `Quantization` configuration is optimized for NPU only. It's recommaneded to uncheck this step if target system is not NPU.
> - **LLM model Quantization**: If you want to quantize the [LLM models](#llm-models), a Nvidia GPU is required.
>
>   If you want to quantize the model on another device with GPU, you can setup environment by yourselves, please refer [ManualConversionOnGPU](./reference/ManualConversionOnGPU.md). Please note that only "Quantization" step need the GPU. After quantization, you can evaluate the model on NPU or CPU.

> [!TIP]
> Tips for Re-evaluation
>
> After a model has been successfully converted, you could use the re-evaluate function to perform evaluation again without the model conversion.
> - Go to the History board and find the model run job.
> - Click the three-dot menu under `Actions` to `Re-evluate` the model.
> - You can choose the different EPs or datasets for re-evaluation
> ![Re-evaluate Panel](./images/Re-evaluate.png)

> [!TIP]
> Tips for failed job
>
> If your job is canceled or failed, you can click job name to adjust the workflow and run job again. To avoid accidental overwrites, each execution creates a new history folder with its own configuration and results.

## Step 3 : View results
The History Board in `Conversion` is your central dashboard for tracking, reviewing, and managing all workflow runs. Each time you run a model conversion and evaluation, a new entry is created in the History Board—ensuring full traceability and reproducibility.

- Find the workflow run that you want to review. Each run is listed with a status indicator (e.g. Succeeded, Cancelled)
- Click on the run name to view the conversion configurations
- Click on the `logs` under Status indicator to to view logs and detailed execution results
- Once the model converted successfully, you can view the evaluation results under Metrics. Metrics such as accuracy, latency and throughput are displayed alongside each run
![History](./images/history.png)

## Step 4 : Use sample notebook for model inference
- Go to the History board. Click the three-dot menu under `Actions`.

    Select `Inference in Samples` from the dropdown.

    ![Action](./images/historyaction.png)

- Choose the Python Environment
  - You'll be prompted to select a Python virtual environment.
The default runtime is: `C:\Users<your name>.aitk\bin\model_lab_runtime\Python-CPU-win32-x64-0.0.1`.
  - Note that the default runtime contains everything needed, otherwise, manually install the requirements.txt
- The sample will launch in a Jupyter Notebook. You can customize the input data or parameters to test different scenarios.

    > [!TIP]
    > - **Model Compatibility:** Ensure the converted model supports the specified EPs in the inference samples
    > - **Sample Location:** Inference samples are stored alongside the run artifacts in the history folder.

## Step 5 : Export and share with others
Go to the History board. Click `Export` to share the model project with others. This only copy the model project without history folder. If you want to share models with others, please select the corresponding jobs, This will copy the selected history folder conaining the model and its configuration.

# See Also
- [How to manually setup GPU conversion](./reference/ManualConversionOnGPU.md)
- [How to manually setup environment](./reference/SetupWithoutAITK.md)
- [How to customize model template](./reference/TemplateProject.md)
- [Conversion file structure](./reference/FileStructure.md)