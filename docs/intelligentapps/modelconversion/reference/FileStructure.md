# About File Structure
After creating the model project and run several times, you could see the file structure like this:

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

In the model_project_name folder, workflows for each model is stored in a separate folder.

- `requirements.txt`: list the dependencies required to run the workflow and the inference sample.
- `resnet_ptq_qnn.json`, `imagenet.py`: the json file used to convert the model by Olive. Some json needs `py` files for customization and some not.
- `README.md`: include model details such as the model's task, performance metrics, and usage instructions.
- `model_project.config`: contain project template settings. Some settings can be overridden to suit user needs.
- `inference_sample.ipynb`: sample to test the output model. This file will be copied into history folder so you could using different ipynb to compare models from different histories.

## Cache folder

This folder stores cache files generated during workflow execution. These cached results can help accelerate repeated runs of the workflow.

You can delete this folder to free up space if it's no longer needed.

## History folder

The timestamp in the `history` folder name indicates the run time like: `April 14, 2025 at 16:10:46`.

- `model`: model files.
- `model_config.json`: contains details about the model.
- `footprints.json`, `output_footprint.json`, `run_history.txt`: Olive output.
- `history.config`, `history.config.user`: History configurations used by Model Conversion.
- `inference_sample.ipynb`: sample to test the output model.
- `log.txt`: contain logs.
- `metrics.json`: contain evaluation result if evaluation is enabled.
- `olive_config.json`: the config used to run the conversion.

## About git

In the `.gitignore`, you could see that we keep everything except for cache folder and for history folder, we only keep two files.

When committing the folder, you could choose the history folders that you think are valuable to save.

When another user cloned the repo, these two files make sure he could re-run these histories to reproduce the conversion result.

```
__pycache__
/cache
/history/*/*
!/history/*/history.config
!/history/*/olive_config.json
```