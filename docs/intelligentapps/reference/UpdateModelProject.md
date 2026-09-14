---
ContentId: 0101cd66-36d2-407d-9d1b-472abcbcb00a
DateApproved: 06/03/2026
MetaDescription: Guidance on updating a model project in Foundry Toolkit Model Conversion tool.
---

# Update a model project in Model Conversion

The recipes inside Foundry Toolkit could be updated for quality improvements, feature updates etc. After you update the extension, if the recipe version inside Foundry Toolkit is different from the one in your local model project, you will see a "Need Update" notification appear.

This article describes the different ways to update a model project if this happens.

![Screenshot showing that a model needs an update](../images/modelconversion/need-update.png)

> [!NOTE]
> The Foundry Toolkit extension only contains the latest version of recipes to save size. Previous versions of the extension still contain the older recipes. Using one of them is one of the ways to handle this, as described below.

## Process for updating a model project

Generally, you have three options:

| Approach | Details |
|-|-|
| Automatic replace | Replace the contents of your model project with the latest one automatically. |
| Migrate changes | Create a new model project and migrate your changes from the old model project into it or vice versa. |
| Downgrade Foundry Toolkit | Downgrade Foundry Toolkit extension to continue using the previous version. |

### Automatic replace

This is recommended when you haven't modified anything manually. By clicking "Update", the contents of your model project will be replaced by the latest one automatically. The histories are not touched during the update.

### Migrate changes

This is recommended when you have changes. You first create a new model project with the same model id, and then you could either migrate your changes into the new project, or migrate the new project's contents into your existing one.

For the latter approach, after the migration, set the `version` in `model_project.config` to match the new one, so "Need Update" notification will go away. The latter approach is more complex, but it allows you to reuse the Olive cache when possible.

### Downgrade Foundry Toolkit

This approach is useful as a temporary workaround while you work on one of the other options because it will not allow you to use new recipes or new features.

## Impact on model history

After updating, histories from the previous version are grayed out because they're outdated.

![Screenshot showing that histories are outdated](../images/modelconversion/history-outdated.png)

The models and inference samples in histories are still valid to use. Or you could re-run the workflow to generate a new one. If the workflows are not changed much, it will be fast because previous results are cached.

The UX for showing the parameters may not work. In this case, you could check `olive_config.json` inside the history folder for your parameters.

## What the model project version means

When recipes in the [olive-recipes](https://github.com/microsoft/olive-recipes) are updated, the version will be increased. The recipes could be updated multiple times between two Foundry Toolkit releases. So when you see the version, you may notice that the numbers are not continuous.

For the same reason, an update could impact one, all, or none of the workflows — sometimes it's just an inference sample update without any workflow changes. So in general, we suggest using the converted model in existing history if it still works well after the update.
