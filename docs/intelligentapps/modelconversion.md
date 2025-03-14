---
ContentId:
DateApproved:
MetaDescription: Convert your models to ONNX format for use in AI Toolkit.
---

# Convert models to ONNX format

The AI Toolkit supports the [Open Neural Network Exchange](https://onnx.ai) (Short for: ONNX) format for running models locally. ONNX is an open standard for representing machine learning models, which defines a common set of operators and a file format that enables models to be used across different hardware platforms.

If you want to run models from other catalogs like Azure AI Foundry or Hugging Face in AI Toolkit, you need to convert them to ONNX format first.

This tutorial will guide you through the process of converting models from Hugging Face to ONNX format, and how to load them into the AI Toolkit.

## Set up the environment

To convert a model from HuggingFace or Azure AI Foundry,you will need [Model Builder](https://onnxruntime.ai/docs/genai/howto/build-model.html) tool.

Follow these steps for setup:

1. Make sure you have either [Anaconda](https://www.anaconda.com/download) or [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install) installed in your device.

2. Create a dedicated conda environment for model builder, and install necessary dependencies: `onnx`, `torch`, `onnxruntime_genai` and `transformers`:

    ```powershell
    conda create -n model_builder python==3.11 -y
    conda activate model_builder
    pip install onnx torch onnxruntime_genai==0.6.0 transformers
    ```

    > Note: For some latest models such as Phi-4-mini, you may need to install transformers from the Git development branch with all essential components for conversion:
        ```powershell
            pip install git+https://github.com/huggingface/transformers
        ```

## Access Hugging Face models

There are multiple ways to access hugging face model. In this documentation, we will use `huggingface_hub` CLI as an example to showcase how to manage a model repository.

> Note: Make sure you already have Python environment set up before proceeding.

To download models from Hugging Face, you need to:
1. [Install the CLI](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#getting-started): `pip install -U "huggingface_hub[cli]"`

2. Download model repository](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#download-an-entire-repository)

3. All files in the repository will be used in conversion.

## Create the directory structure

The AI Toolkit will load ONNX format models from its working directory:
* For Windows: `$HOME\.aitk\models`
* For unix-like systems (macOS): `%USERPROFILE%/.aitk/models`

To ensure your models are correctly loaded, you need to create the required 4-layer directories within AI Toolkit's working directory. For example:

   ```powershell
    mkdir C:\Users\Administrator\.aitk\models\microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32
   ```

In this example, the 4-layer directory structure is `microsoft\Phi-3.5-vision-instruct-onnx\cpu\phi3.5-cpu-int4-rtn-block-32`.

> [!TIP]
> **The name of 4-layer directory structure matters.** Name of each layer of directory would be used as different system parameter when processing. The structure would be identified as `$publisherName`\\`$modelName`\\`$runtime`\\`$displayName`. The `$displayName` would be the name shown in local model tree view on the top-left side of the extension, so please follow the directory structure and try to use different `displayName` for different models to avoid obfuscation.

## Migrate models to ONNX format

Execute the following command to convert your model to ONNX format:

```powershell
python -m onnxruntime_genai.models.builder -m $modelPath -p $precision -e $executionProvider -o $outputModelPath -c $cachePath --extra_options include_prompt_templates=1
```

> [!TIP]
> Typical pair of precision and execution provider are: `FP32 CPU`, `FP32 CUDA`, `FP16 CUDA`, `FP16 DML`, `INT4 CPU`, `INT4 CUDA`, `INT4 DML`.

Here is a complete example of script to convert a model to ONNX format:

```powershell
python -m onnxruntime_genai.models.builder -m C:\hfmodel\phi3 -p fp16 -e cpu -o C:\Users\Administrator\.aitk\models\microsoft\Phi-3-mini-4k-instruct\cpu\phi3-cpu-int4-rtn-block-32-acc-level-4 -c C:\temp --extra_options include_prompt_templates=1
```

You can also follow these two tutorials for more details on precision and execution provider:

- [Basic tutorial of precision](https://huggingface.co/docs/optimum/en/concept_guides/quantization)
- [Basic knowledge of executionProvider](https://onnxruntime.ai/docs/execution-providers)

## Load models in AI Toolkit

After conversion, move your ONNX model file into the newly created directory, and your ONNX format model will be automatically loaded by the AI Toolkit once activated.

You will be able to find the models in `MY MODELS` view. To use a model, double click onits name or open `TOOLS` > `Playground` and select the model from the dropdown list to start chatting with it.

> Note: AI toolkit delete operation on a manually added model is not supported. To delete the model, you need to remove the model directory.

## Supported models for conversion

The following table lists the models that are supported for conversion to ONNX format in AI Toolkit:

| Support Matrix | Supported now | Under development | On the roadmap |
| :------: | :---: | :---: | :---: |
| Model architectures | `DeepSeek`, `Gemma`, `Llama`, `Mistral`, `Phi(Language + Vision)`, `Qwen`, `Nemotron`, `Granite`, `AMD OLMo` | `Whisper` | `Stable diffusion` |