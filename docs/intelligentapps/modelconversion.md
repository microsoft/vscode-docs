---
ContentId: 2452fb1c-7636-44d3-a52d-00923844d384
DateApproved: 07/14/2025
MetaDescription: Model Conversion Quickstart in Foundry Toolkit.
---
# Convert a model with Foundry Toolkit for VS Code

Model conversion is an integrated development environment designed to help developers and AI engineers to convert, quantize, optimize and evaluate the pre-built machine learning models on your local Windows platform. It offers a streamlined, end-to-end experience for models converted from sources like Hugging Face, optimizing them and enabling inference on local devices powered by NPUs, GPUs, and CPUs.

## Prerequisites

- Install the latest version of [Visual Studio Code](/download).
- Install the Foundry Toolkit VS Code extension. For more information, see [install Foundry Toolkit](/docs/intelligentapps/overview.md#install-and-setup).

## Create project

Creating a project in model conversion is the first step toward converting, optimizing, quantizing and evaluating machine learning models.

1. Open the Foundry Toolkit view, and select **Models** > **Conversion** to launch model conversion

2. Start a new project by selecting **New Model Project**

    ![Screenshot that shows view for creating model project, including Primary Side Bar and create project button.](./images/modelconversion/create-project-default.png)

3. Choose a base model
    - `Hugging Face Model`: choose the base model with predefined recipes from the supported model list.
    - `Model Template` : if the model is not included in the base model, select an empty template for your customized recipes (advanced scenario).

    ![Screenshot that shows model list, such as bert, resnet, llama and so on.](./images/modelconversion/create-project-model-list.png)

4. Enter project details: a unique **Project Folder** and a **Project Name**.

    A new folder with the specified project name is created in the location you selected for storing the project files.

> [!NOTE]
> The first time you create a model project, it might take a while to set up the environment.
> It's OK that you don't complete the setup. You can choose to re-setup the environment when you are ready.
> ![Screenshot that shows re-setup.](./images/modelconversion/re-init.png)
>
> A `README.md` file is included in each project. If you close it, you can reopen it via the workspace.
> ![Screenshot that shows model readme.](./images/modelconversion/create-project-readme.png)

### Supported models

Model Conversion currently supports a growing list of models, including top Hugging Face models in PyTorch format. For detailed model list, refer: [Model List](https://github.com/microsoft/olive-recipes/blob/main/.aitk/docs/guide/ModelList.md)

### (Optional) Add model into existing project

1. Open the model project

1. Select **Models** > **Conversion**, and then select **Add Models** on the right panel.

    ![Screenshot that shows how to add model. It contains a button to add models.](./images/modelconversion/create-project-add-models.png)

1. Choose a base model or template, and then select **Add**.

    A folder containing the new model files is created in the current project folder.

### (Optional) Create a new model project

1. Open the model project

1. Select **Models** > **Conversion**, and then select **New Project** on the right panel.

    ![Screenshot that shows how to create a new project. It contains a button to create a new project.](./images/modelconversion/create-project-default.png)

1. Alternatively, close the current model project and [create a new project](#create-project) from the start.

### (Optional) Delete a model project

1. Open the model project and select **Models** > **Conversion**.

1. On the top-right view, select the ellipsis (**...**) and then **Delete** to delete the currently selected model project.

    ![Screenshot that shows how to delete a model project. It contains a button to open mean and detele a model project.](./images/modelconversion/delete-project.png)

### (Optional) Update a model project

After a Foundry Toolkit update, you might see a **Need Update** notification for your model projects.

![Screenshot showing that a model needs an update](./images/modelconversion/need-update.png)

It means some of the workflows are updated, and you could either:

- Select **Update** if you haven't manually modified the workflows.
- Create a new model project and migrate your changes from the old model project into it or vice versa.
- Restore Foundry Toolkit to the previous version so you could continue to use the workflows from that version.

For the converted models, if they are running well, you could still use them. Or you could re-run the workflow to generate a new one. If the workflows are not changed much, it will be fast because previous results are cached.

Learn more in [How to update a model project](/docs/intelligentapps/reference/UpdateModelProject.md).


## Run workflow

Running a workflow in model conversion is the core step that transform the pre-built ML model into an optimized and quantized ONNX model.

1. Select **File** > **Open Folder** in VS Code to open the model project folder.

2. Review the workflow configuration

    1. Select **Models** > **Conversion**
    1. Select the workflow template to view the conversion recipe.

    ![Screenshot that shows running a workflow. There is a workflow configuration section containing Conversion, Quantization and Evaluation.](./images/modelconversion/run.png)

    **Conversion**

    The workflow will always execute the conversion step, which transforms the model into ONNX format. This step cannot be disabled.

    **Quantization**

    This section enables you to configure the parameters for quantization.

    > [!Important]
    > **Hugging Face compliance alerts**: During the quantization, we need the calibration datasets. You may be prompted to accept license terms before proceeding. If you missed the notification, the running process will be paused, waiting for your input. Make sure notifications are **enabled** and that you accept the required licenses.
    > ![Screenshot that shows disclaimer.](./images/modelconversion/run-disclaimer.png)

    - **Activation Type**: this is the data type used to represent the intermediate outputs (activations) of each layer in the neural network.
    - **Weight Type**: this is the data type used to represent the learned parameters (weights) of the model.
    - **Quantization Dataset**: calibration dataset used for quantization.

      If your workflow uses a dataset that requires license agreement approval on Hugging Face (e.g., ImageNet-1k), you’ll be prompted to accept the terms on the dataset page before proceeding. This is required for legal compliance.

      1. Select the **HuggingFace Access Token** button to get your Hugging Face Access Token.

          ![Screenshot that shows input token step 1: start to get Hugging Face Access Token.](./images/modelconversion/run-token-1.png)
      2. Select **Open** to open the Hugging Face website.

          ![Screenshot that shows input token step 2: open Hugging Face websites.](./images/modelconversion/run-token-2.png)

      3. Get your token on Hugging Face portal and paste it Quick Pick. Press `kbstyle(Enter)`.

          ![Screenshot that shows input token step 3: input token on dropdown textbox.](./images/modelconversion/run-token-3.png)

    - **Quantization Dataset Split**: dataset could have different splits like validation, train and test.
    - **Quantization Dataset Size**: the number of data used to quantize the model.

    For more information about activation and weight type, see [Data type selection](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html#data-type-selection).

    You could also disable this section. In this case, the workflow will only convert the model to ONNX format but do not quantize the model.

    **Evaluation**

    In this section, you need to select the Execution Provider (EP) you want to use for evaluation, regardless of the platform on which the model was converted.
    - **Evaluate on**: the target device that you want to evaluate the model. Possible values are:
      - **Qualcomm NPU/GPU**: to use this, you need a compatible Qualcomm device.
      - **AMD NPU/GPU**: to use this, you need a device with a supported AMD NPU/GPU.
      - **Intel CPU/GPU/NPU**: to use this, you need a device with a supported Intel CPU/GPU/NPU.
      - **NVIDIA TRT for RTX**: to use this, you need a device with a Nvidia GPU that supports TensorRT for RTX.
      - **DirectML**: to use this, you need a device with a GPU that supports DirectML.
      - **CPU**: any CPU could work.
    - **Evaluation Dataset**: dataset used for evaluation.
    - **Evaluation Dataset Split**: dataset could have different splits like validation, train and test.
    - **Evaluation Dataset Size**: the number of data used to evaluate the model.

    You could also disable this section. In this case, the workflow will only convert the model to ONNX format but do not evaluate the model.

3. Run the workflow by selecting **Run**

    A default job name is generated using the workflow name and timestamp (e.g., `bert_qdq_2025-05-06_20-45-00`) for easy tracking.

    During the job running, you can **Cancel** the job by selecting the status indicator or the three-dot menu under **Action** in History board and select **Stop Running**.

    **Hugging Face compliance alerts**: During the quantization, we need the calibration datasets. You may be prompted to accept license terms before proceeding. If you missed the notification, the running process will be paused, waiting for your input. Make sure notifications are enabled and that you accept the required licenses.

4. (Optional) Run model conversion in the cloud

    Cloud Conversion enables you to run model conversion and quantization in the cloud, when your local machine doesn’t have enough compute or storage capacity. You need an Azure subscription to use Cloud Conversion.

    1. Select **Run with Cloud** from the dropdown in the top right.
        Note that the **Evaluation** section is disabled because the cloud environment doesn't have target processors for inference.

        ![Screenshot that shows Run with Cloud button.](./images/modelconversion/cloud-conversion-run.png)

    2. Foundry Toolkit first checks if Azure resources for Cloud Conversion are prepared. If needed, you are prompted for your Azure subscription and resource group for provisioning Azure resources.

        ![Screenshot that shows prompt for provisionning.](./images/modelconversion/provisioning.png)

    3. After provisioning is completed, the provisioning config is saved in `model_lab.workspace.provision.config` in your workspace root folder.
        This information is cached for reusing Azure resources and accelerating the cloud conversion process. If you want to use new resources, delete this file and run Cloud Conversion again.

    4. An Azure Container App (ACA) job is triggered to run Cloud Conversion. For a running job, you can:
        - Select the status link to navigate to the Azure ACA Job Execution History page.
        - Select **logs** to navigate to Azure Log Analytics.
        - Select the refresh button to fetch the current job status.

        ![Screenshot that shows prompt for provisionning.](./images/modelconversion/cloud-conversion-history.png)

> [!TIP]
> If you don’t have a GPU available for LLM model conversion, you can use **Run with Cloud**.
> The Run with Cloud option only supports model conversion and quantization. You need to download the converted model to your local machine for evaluation.
>
> Run with Cloud does not support model conversion using DirectML or NVIDIA TRT for RTX workflows.

> [!NOTE]
> The **Recommended** column will show the recommended workflow based on whether your device is ready to run the converted model or not. You can still choose the workflow that you prefer.
> **Model conversion and quantization**: you can run workflow on any device expect for LLM models. The **Quantization** configuration is optimized for NPU only. It's recommended to uncheck this step if the target system is not NPU.
>
> **LLM model quantization**: If you want to quantize the [LLM models](#llm-models), a Nvidia GPU is required.
>
> If you want to quantize the model on another device with GPU, you can setup environment by yourselves, refer [ManualConversionOnGPU](/docs/intelligentapps/reference/ManualConversionOnGPU.md). Note that only "Quantization" step need the GPU. After quantization, you can evaluate the model on NPU or CPU.

### Tips for re-evaluation

After a model has been successfully converted, you could use the re-evaluate function to perform evaluation again without the model conversion.

Go to the History board and find the model run job. Select the three-dot menu under **Action** to **Re-evaluate** the model.

You can choose the different EPs or datasets for re-evaluation

![Screenshot that shows re-evaluation. It contains configurations such as name, system and datasets settings.](./images/modelconversion/re-evaluate.png)

### Tips for failed jobs

If your job is canceled or failed, you can select job name to adjust the workflow and run job again. To avoid accidental overwrites, each execution creates a new history folder with its own configuration and results.

> [!NOTE]
> Some workflows may require that you log in to Hugging Face first. If your job has failed with output like `huggingface_hub.errors.LocalTokenNotFoundError: Token is required ('token=True'), but no token found. You need to provide a token or be logged in to Hugging Face with 'hf auth login' or 'huggingface_hub.login'`, navigate to <https://huggingface.co/settings/tokens> and follow the instructions to complete the log in process and then try again.
>
> If your re-evaluation has failed with output warning like `Microsoft Visual C++ Redistributable is not installed`, you need to manually install the following packages:
> 1. [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version)
> 2. (Optional for ARM64) Download from [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/). Also check `Desktop development with C++` workload during installation.

## View results

The History Board in **Conversion** is your central dashboard for tracking, reviewing, and managing all workflow runs. Each time you run a model conversion and evaluation, a new entry is created in the History Board—ensuring full traceability and reproducibility.

- Find the workflow run that you want to review. Each run is listed with a status indicator (e.g. Succeeded, Cancelled)
- Select the run name to view the conversion configurations
- Select the **logs** under Status indicator to view logs and detailed execution results
- Once the model converted successfully, you can view the evaluation results under Metrics. Metrics such as accuracy, latency and throughput are displayed alongside each run

  ![Screenshot that shows history, including name, time, parameters and so on.](./images/modelconversion/history.png)

- You can select the three-dot menu under **Action**, to interact with converted model.

  ![Screenshot that shows actions, including inference, copy model path and re-evaluate.](./images/modelconversion/historyaction.png)


### Copy converted model path

- Select **Copy model path** from the dropdown. The output converted model path like `c:/{workspace}/{model_project}/history/{workflow}/model/model.onnx` will be copied to your clipboard for your reference. For LLM models, the output folder will be copied instead.

### Use sample notebook for model inference

- Select **Inference in Sample** from the dropdown.
- Choose the Python environment
  - You'll be prompted to select a Python virtual environment.
The default runtime is: `C:\Users\{user_name}\.aitk\bin\model_lab_runtime\Python-WCR-win32-x64-3.12.9`.
  - Note that the default runtime contains everything needed, otherwise, manually install the requirements.txt
- The sample will launch in a Jupyter Notebook. You can customize the input data or parameters to test different scenarios.

> [!NOTE]
> For models that use Cloud Conversion, after the status turns **Succeeded**, select the cloud download icon to download the output model to your local machine.
> ![Screenshot that shows action, including icon for downloading model from cloud.](./images/modelconversion/cloud-download.png)
>
> To avoid overwriting any existing local files, such as config or history related files, only missing files are downloaded. If you want to download a clean copy, delete the local folder first, and then download again.

> [!TIP]
> **Model compatibility:** Ensure the converted model supports the specified EPs in the inference samples
>
> **Sample location:** Inference samples are stored alongside the run artifacts in the history folder.

### Export and share with others

Go to the History board. Select **Export** to share the model project with others. This copies the model project without history folder. If you want to share models with others, select the corresponding jobs. This copies the selected history folder containing the model and its configuration.

## Build with Windows ML CLI (preview)

In addition to the Olive-based conversion workflow, Foundry Toolkit also provides a streamlined **Build** flow powered by [Windows ML CLI](https://github.com/microsoft/winml-cli). Olive recipes focus on EP-driven optimization workflows, while Windows ML CLI provides a streamlined cross-EP developer workflow for Windows ML. Rather than manually assembling optimization recipes, you can use Windows ML CLI to convert, analyze, optimize, validate, and benchmark models through a simplified command-line experience on Windows PCs. Beyond converting models from Hugging Face, Windows ML CLI can also analyze, optimize, validate, and benchmark existing ONNX models directly on Windows PCs.

### Choose a Windows ML CLI base model

When you create a new model project (or add a model to an existing one), the **Choose a Base Model** page exposes a **Recommend Process** area powered by Windows ML CLI:

![Screenshot that shows the Recommend Process area with Hugging Face Hub and Local ONNX Files cards.](./images/modelconversion/winmlcli-recommend-process.png)

- **Hugging Face Hub**: provide a Hugging Face model ID (for example, `microsoft/resnet-50`), and Windows ML CLI will automatically download, convert, analyze, and optimize the model.
- **Local ONNX Files**: browse to an ONNX file on disk and let Windows ML CLI analyze and optimize it.

You can also pick a curated Hugging Face model that is already validated for Windows ML CLI. Open the **Provided By** filter and select **Windows ML CLI** to see the supported list.

![Screenshot that shows HuggingFace Models filtered by the Windows ML CLI provider.](./images/modelconversion/winmlcli-model-list.png)

> [!NOTE]
> Models generated through Windows ML CLI can run across all execution providers (EPs) supported by Windows ML. Supported EPs include:
>
> - QNN (NPU, GPU)
> - OpenVINO (CPU, NPU, GPU)
> - VitisAI (NPU)
> - NVIDIA TensorRT RTX (GPU)
> - DirectML (DML) (GPU)
> - CPU

> [!NOTE]
> For "bring your own model" scenarios using the **Hugging Face Hub** or **Local ONNX Files** templates, Windows ML CLI currently supports classic deep learning models only. LLM support is coming soon.

### Run the Build flow

After the project opens, the **Run Workflows** panel shows a **Build Flow** card for each selected Windows ML CLI model.

![Screenshot that shows the Build Flow card with Edit Config and Build buttons for a Hugging Face model.](./images/modelconversion/winmlcli-build-flow.png)

The behavior on first entry depends on how the model was added to the project.

#### Built-in models

Built-in models already include validated configurations for Windows ML CLI workflows. These curated models ship with prepared Build Config files optimized for Windows ML EPs. The Build Flow card opens directly in the **Configured** state — no auto-configuration runs. Select **Edit Config** to review the prepared recipe, then select **Build**.

#### Hugging Face models added by ID

Hugging Face models added by ID are automatically processed on first entry. The card transitions through these states:

- **Configuring**: Windows ML CLI inspects the model on Hugging Face and generates the build config.
- **Configured**: a configuration is ready.
- **Failed**: configuration could not be completed. The card shows the failure inline and exposes a **Re-config** button (placed to the left of **Edit Config**) so you can retry without leaving the workflow.

> [!NOTE]
> A **Failed** configuring state usually means the model could not be automatically mapped to a supported optimization or validation workflow. This may happen when:
>
> - the model architecture is not yet supported,
> - required model metadata is missing, or
> - the ONNX graph contains unsupported operators.

> [!NOTE]
> Auto-configuration only runs on first entry for Hugging Face models added by ID, or after you explicitly select **Re-config**. The toolkit does not retry a failed configuration on its own, so you can inspect the log and decide when to try again.

**Step 1: Generate the build config**

Windows ML CLI queries Hugging Face, auto-detects the task and model type, and generates Build Config JSON files automatically. During onboarding, Windows ML CLI generates three configuration variants:

- `config-noquant.json`
- `config-w8a16.json`
- `config-w8a8.json`

The primary difference between them is the quantization strategy:

- **No Quant** — full precision model.
- **W8A16** — 8-bit weights with 16-bit activations.
- **W8A8** — 8-bit weights with 8-bit activations for more aggressive compression and performance optimization.

**Step 2: Customize the config**

You can customize the workflow before running the build pipeline. Typical customization areas include task type, compile target, and precision details. By default, **Compile** is set to `null`. You can customize **Compile** with a target EP.

**Step 3: Run the build**

Selecting **Build** runs all four pipeline stages in sequence:

1. Export
2. Optimize
3. Quantize
4. Compile

The workflow reads the settings recorded in `config*.json`. After the build step, Windows ML CLI automatically generates a declarative `build_config.json` file that defines how the workflow runs end-to-end. You can inspect and customize it through **View Config**. This declarative configuration model makes it easy to integrate Windows ML CLI into CI/CD pipelines with reproducible and portable build workflows.

Windows ML CLI also generates an analyze report, which you can open through **View Analyze**. The analyze results provide detailed model compatibility insights, including supported operators, partially supported operators, and unsupported operators for Windows ML EPs. During analysis, Windows ML CLI automatically inspects the ONNX graph, detects optimization patterns, and generates recommended Windows ML optimization workflows.

#### Local ONNX models

For Local ONNX models, the Build workflow automatically analyzes the ONNX graph and generates a recommended Windows ML optimization workflow. Because the input is already an ONNX model, Windows ML CLI skips the **Export** stage and starts directly from model optimization. By default, the **Build** configuration also skips the **Quantize** and **Compile** stages — you can customize them later.

![Screenshot that shows the Build Flow card for a local ONNX model with just a Build button.](./images/modelconversion/winmlcli-local-onnx.png)

### Inspect Build, Evaluation, and Performance results

Each Build run produces an entry in the **Generated Flow History** table. From there you can:

- Select **View Config** to open the configuration file used for the run.
- Select **View Analysis** to open the EP compatibility analysis.
- Select **Performance** to launch a performance run against a chosen EP and view device, latency, and throughput results directly in the table.
- Select **Evaluation** to run a quality evaluation. Evaluation is only available for **built-in models**, which ship with a prepared evaluation dataset and metrics.

![Screenshot that shows the Generated Flow History table with View Config, View Analysis, Performance, and Evaluation actions.](./images/modelconversion/winmlcli-history.png)

## What you learned

In this article, you learned how to:

- Create a model conversion project in Foundry Toolkit for VS Code.
- Configure the conversion workflow, including quantization and evaluation settings.
- Run the conversion workflow to transform a pre-built model into an optimized ONNX model.
- View the results of the conversion, including metrics and logs.
- Use the sample notebook for model inference and testing.
- Export and share the model project with others.
- Re-evaluate a model using different execution providers or datasets.
- Handle failed jobs and adjust configurations for re-runs.
- Understand the supported models and their requirements for conversion and quantization.
- Build a Hugging Face or local ONNX model with the Windows ML CLI flow.

## See also

- [How to manually setup GPU conversion](/docs/intelligentapps/reference/ManualConversionOnGPU.md)
- [How to manually setup environment](/docs/intelligentapps/reference/SetupWithoutAITK.md)
- [How to customize model template](/docs/intelligentapps/reference/TemplateProject.md)
- [How to update a model project](/docs/intelligentapps/reference/UpdateModelProject.md)
- [Conversion file structure](/docs/intelligentapps/reference/FileStructure.md)