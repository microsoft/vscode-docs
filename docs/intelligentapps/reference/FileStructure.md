---
ContentId: fea54c41-e5bb-49e2-89bd-518af096ba8e
DateApproved: 05/13/2025
MetaDescription: Model Conversion reference about project structure.
---

# Model conversion file structure
This article explains the file structure generated during model conversion workflows and the purpose of each folder and file, including cache handling, history tracking, inference and so on.

After creating the model project and running it several times, the file structure might look like this:

```
model_project_name/
├── model_lab.workspace.config
└── huggingface_microsoft_resnet-50_v1/
    ├── .gitignore
    ├── imagenet.py
    ├── inference_sample.ipynb
    ├── model_project.config
    ├── README.md
    ├── requirements.txt
    ├── resnet_ptq_qnn.json
    ├── cache/
    └── history/
        └── history_1(20250414_161046)/
            ├── model/
            ├── footprints.json
            ├── history.config
            ├── history.config.user
            ├── inference_sample.ipynb
            ├── log.txt
            ├── metrics.json
            ├── model_config.json
            ├── olive_config.json
            ├── output_footprint.json
            └── run_history.txt
        └── history_2/
        └── history_3/
```

In the `model_project_name` folder, workflows for each model are stored in a separate folder.

- `requirements.txt`: lists the dependencies required to run the workflow and the inference sample.
- `resnet_ptq_qnn.json`, `imagenet.py`: the JSON file used to convert the model by Olive. Some might require additional Python files for customization.
- `README.md`: describes model details such as the model's task, performance metrics, and usage instructions.
- `model_project.config`: contains project template settings. Some settings can be overridden to suit your specific requirements.
- `inference_sample.ipynb`: sample to test the output model. This file will be copied into the `history` folder, to enable using different Jupyter notebooks to compare models from different histories.

## Cache folder

The `cache` folder stores cache files that were generated during workflow execution. These cached results can help accelerate repeated runs of the workflow.

You can delete this folder to free up space if it's no longer needed.

## History folder

The timestamp in the `history` folder name indicates the run time, like: `April 14, 2025 at 16:10:46`.

- `model`: model files.
- `model_config.json`: contains details about the model.
- `footprints.json`, `output_footprint.json`, `run_history.txt`: Olive output.
- `history.config`, `history.config.user`: history configurations used by Model Conversion.
- `inference_sample.ipynb`: sample to test the output model.
- `log.txt`: contain logs.
- `metrics.json`: contain evaluation result if evaluation is enabled.
- `olive_config.json`: the config used to run the conversion.

## About git

By default, the `cache` and `history` folders are excluded from version control (`.gitignore`), except for the following two configuration files: `history.config` and `olive_config.json`

You might update the `.gitignore` file to include specific history folders that are worth saving.

When someone else clones the repo, these two files ensure that they can rerun these histories to reproduce the conversion result.

```
__pycache__
/cache
/history/*/*
!/history/*/history.config
!/history/*/olive_config.json
```