---
ContentId: 0101cd66-36d2-407d-9d1b-472abcbcb00a
DateApproved: 06/03/2026
MetaDescription: Model Conversion reference about how to update model project.
---

# How to update a model project

When a model project needs an update, it means that:

- We have updated the Olive json or inference sample in a way that is not compatible with the previous version.
- The config file version inside Foundry Toolkit is different from the one in your project.

## What should you do

You have three options:

- Replace your project with the latest project automatically.
- Create a new project and migrate your changes into it.
- Downgrade Foundry Toolkit to continue using the previous version.

### Replace your project with the latest project automatically

This is recommended when you haven't modified anything manually. It is an in-place update, so your project location is unchanged and the Olive cache may still be reusable.

### Create a new project and migrate your changes into it

This is recommended when you have changes. You could migrate your changes into the new project, or migrate the new project's changes into your existing one.

The reverse direction is more complex, but you may still be able to use the Olive cache.

### Downgrade Foundry Toolkit to continue using the previous version

This is a workaround, but it will not allow you to use new recipes or new features.

## About history

The model in history is still valid, and you could still use it.

The UX for showing the parameters may not work. In this case, you could check `olive_config.json` inside the history folder for your parameters.

## About version

When you see the version, you may notice that the numbers are not continuous. This is because Foundry Toolkit releases and recipe updates are two different processes.

The recipes could be updated multiple times between two Foundry Toolkit releases.
