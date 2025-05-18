---
ContentId: d40f8c19-a7a4-4d53-9303-b9cb128af591
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about manual model conversion.
---

# Convert models to ONNX format

The AI Toolkit supports the [Open Neural Network Exchange](https://onnx.ai) (ONNX) format for running models locally. ONNX is an open standard for representing machine learning models, defining a common set of operators and a file format that enables models to run across various hardware platforms.

To use models from other catalogs, such as Azure AI Foundry or Hugging Face, in the AI Toolkit, you must first convert them to ONNX format.

This tutorial guides you through converting Hugging Face models to ONNX format and loading them into the AI Toolkit.

## Set up the environment

To convert models from Hugging Face or Azure AI Foundry, you need the [Model Builder](https://onnxruntime.ai/docs/genai/howto/build-model.html) tool.

Follow these steps to set up your environment:

1. Ensure you have either [Anaconda](https://www.anaconda.com/download) or [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install) installed on your device.

2. Create a dedicated conda environment for Model Builder and install the necessary dependencies (`onnx`, `torch`, `onnxruntime_genai`, and `transformers`):

    ```powershell
    conda create -n model_builder python==3.11 -y
    conda activate model_builder
    pip install onnx torch onnxruntime_genai==0.6.0 transformers
    ```

    > Note: For certain newer models, such as Phi-4-mini, you may need to install the latest development version of transformers directly from GitHub:

    ```powershell
    pip install git+https://github.com/huggingface/transformers
    ```

## Access Hugging Face models

There are multiple ways to access Hugging Face models. In this tutorial, we use the `huggingface_hub` CLI as an example to demonstrate managing a model repository.

> Note: Ensure your Python environment is properly set up before proceeding.

To download models from Hugging Face:

1. [Install the CLI](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#getting-started):

    ```powershell
    pip install -U "huggingface_hub[cli]"
    ```

2. [Download the model repository](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#download-an-entire-repository).

3. All files in the downloaded repository will be used during conversion.

## Create the directory structure

The AI Toolkit loads ONNX models from its working directory:

* Windows: `%USERPROFILE%\.aitk\models`
* Unix-like systems (macOS): `$HOME/.aitk/models`

To ensure your models load correctly, create the required four-layer directory structure within the AI Toolkit's working directory. For example:

```powershell
mkdir C:\Users\Administrator\.aitk\models\microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32
```

In this example, the four-layer directory structure is `microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32`.

> [!IMPORTANT]
> The naming of the four-layer directory structure is important. Each directory layer corresponds with a specific system parameter: `$publisherName\$modelName\$runtime\$displayName`. The `$displayName` appears in the local model tree view at the top-left side of the extension. Use distinct `displayName` values for different models to avoid confusion.

## Convert models to ONNX format

Run the following command to convert your model to ONNX format:

```powershell
python -m onnxruntime_genai.models.builder -m $modelPath -p $precision -e $executionProvider -o $outputModelPath -c $cachePath --extra_options include_prompt_templates=1
```

> [!TIP]
> Common precision and execution provider combinations include: `FP32 CPU`, `FP32 CUDA`, `FP16 CUDA`, `FP16 DML`, `INT4 CPU`, `INT4 CUDA`, and `INT4 DML`.

Here is a complete example command for converting a model to ONNX format:

```powershell
python -m onnxruntime_genai.models.builder -m C:\hfmodel\phi3 -p fp16 -e cpu -o C:\Users\Administrator\.aitk\models\microsoft\Phi-3-mini-4k-instruct\cpu\phi3-cpu-int4-rtn-block-32-acc-level-4 -c C:\temp --extra_options include_prompt_templates=1
```

For more details on precision and execution providers, refer to these tutorials:

- [Precision basics](https://huggingface.co/docs/optimum/en/concept_guides/quantization)
- [Execution provider basics](https://onnxruntime.ai/docs/execution-providers)

## Load models into AI Toolkit

After conversion, move your ONNX model file into the newly created directory. The AI Toolkit automatically loads ONNX models from this directory upon activation.

You can find your models in the `MY MODELS` view. To use a model, double-click its name or open `TOOLS` > `Playground` and select the model from the dropdown list to start interacting with it.

> Note: The AI Toolkit does not support deleting manually added models directly. To remove a model, delete its directory manually.

## Supported models for conversion

The following table lists models supported for conversion to ONNX format in the AI Toolkit:

| Support Matrix | Supported now | Under development | On the roadmap |
| :------------: | :-----------: | :---------------: | :------------: |
| Model architectures | `DeepSeek`, `Gemma`, `Llama`, `Mistral`, `Phi (Language + Vision)`, `Qwen`, `Nemotron`, `Granite`, `AMD OLMo` | `Whisper` | `Stable Diffusion` |