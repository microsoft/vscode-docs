---
ContentId: 47979929-10b2-4e4d-acf3-00b32893ad1b
DateApproved: 1/9/2023
MetaDescription: Learn how to build machine learning applications in Azure Machine Learning using the {% data variables.product.prodname_vscode %} extension
MetaSocialImage: images/tutorial/python-social.png
---
# Azure Machine Learning in {% data variables.product.prodname_vscode_shortname %}

Azure Machine Learning is a cloud-based environment you can use to train, deploy, automate, manage, and track machine learning models. For more information on Azure Machine Learning, see [What is Azure Machine Learning?](https://learn.microsoft.com/azure/machine-learning/overview-what-is-azure-machine-learning)

The [Azure Machine Learning](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai) {% data variables.product.prodname_vscode_shortname %} extension lets you use the features you're used to in {% data variables.product.prodname_vscode %} for developing your machine learning applications.

![Azure Machine Learning {% data variables.product.prodname_vscode %} extension view](images/azure-machine-learning/azure-machine-learning-vscode-extension.png)

## Desktop or web

You can use Azure Machine Learning in {% data variables.product.prodname_vscode_shortname %} Desktop or [{% data variables.product.prodname_vscode_shortname %} for the Web](/docs/remote/vscode-web.md). {% data variables.product.prodname_vscode_shortname %} for the Web provides a free, zero-install {% data variables.product.prodname_vscode_shortname %} experience running entirely in your browser at [https://vscode.dev](https://vscode.dev). Check out the [guide on launching Azure Machine Learning](https://learn.microsoft.com/azure/machine-learning/how-to-launch-vs-code-remote?view=azureml-api-2&tabs=vscode-web) to learn more.

## Connect to remote compute instances

[Compute instances](https://learn.microsoft.com/azure/machine-learning/concept-compute-instance) are a managed cloud-based workstation for developing machine learning applications.

The Azure Machine Learning {% data variables.product.prodname_vscode_shortname %} extension makes it easy to connect to and access resources in compute instances in real time. For more information, see [connect to an Azure Machine Learning compute instance](https://learn.microsoft.com/azure/machine-learning/how-to-set-up-vs-code-remote?tabs=extension).

## Azure Machine Learning 2.0 CLI support (preview)

The Azure Machine Learning 2.0 CLI enables you to train and deploy models from the command line. Its features accelerate scaling data science up and out while tracking the model lifecycle.

When working with Azure Machine Learning specification files, the {% data variables.product.prodname_vscode_shortname %} extension provides support for the following features:

- Specification file authoring
- Language support
- Resource autocompletion

### Specification file authoring

Use the **Azure ML** command in the Command Palette (`kb(workbench.action.showCommands)`) or the Azure Machine Learning View in {% data variables.product.prodname_vscode_shortname %} to simplify the specification file authoring process.

![Azure Machine Learning YAML specification file authoring](images/azure-machine-learning/specification-file-authoring.gif)

### Language support

The Azure Machine Learning extension cross-references all values with resources in your default workspace. If the extension detects an incorrectly specified resource or missing property, an inline error is displayed.

![Azure Machine Learning specification file language support](images/azure-machine-learning/language-support.gif)

### Resource autocompletion

As you begin working with resources, you'll find that the Azure Machine Learning extension can inspect the specification files. The extension uses the default workspace you've specified to provide autocompletion support for resources in that workspace.

![Azure Machine Learning resource autocompletion](images/azure-machine-learning/resource-autocompletion.gif)

## Train machine learning models

In Azure Machine Learning, you can use popular frameworks for training machine learning models such as scikit-learn, PyTorch, TensorFlow, and many more. The extension makes it easy to submit and track the lifecycle of those models.

For more information, see the [train a machine learning model tutorial](https://learn.microsoft.com/azure/machine-learning/tutorial-train-deploy-image-classification-model-vscode).

## Manage resources

You can create and manage Azure Machine Learning resources directly from {% data variables.product.prodname_vscode_shortname %}. For more information, see [how to manage resources in {% data variables.product.prodname_vscode_shortname %}](https://learn.microsoft.com/azure/machine-learning/how-to-manage-resources-vscode).

## Remote Jupyter servers

{% data variables.product.prodname_vscode_shortname %} offers great support for development using Jupyter notebooks. For more information, see [Jupyter Notebooks in {% data variables.product.prodname_vscode_shortname %}](/docs/datascience/jupyter-notebooks.md).

The Azure Machine Learning leverages the strong Jupyter notebooks support in {% data variables.product.prodname_vscode_shortname %}. It makes connecting to a remote compute instance and using them as remote Jupyter servers seamless. For more information, see [Configure a compute instance as a remote notebook server](https://learn.microsoft.com/azure/machine-learning/how-to-set-up-vs-code-remote?tabs=extension).

## Git integration

By using the Azure Machine Learning {% data variables.product.prodname_vscode_shortname %} extension to connect to a remote compute instance, you'll be able to use {% data variables.product.prodname_vscode_shortname %}'s built-in Git support.

## Next steps

- [Set up the Azure Machine Learning extension](https://learn.microsoft.com/azure/machine-learning/how-to-setup-vs-code)
- [Interact with Azure Machine Learning (in the desktop or web)](https://learn.microsoft.com/azure/machine-learning/how-to-launch-vs-code-remote?view=azureml-api-2&tabs=vscode-web)
