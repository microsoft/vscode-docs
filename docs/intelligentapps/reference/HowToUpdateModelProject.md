---
ContentId: 0101cd66-36d2-407d-9d1b-472abcbcb00a
DateApproved: 06/03/2026
MetaDescription: Model Conversion reference about how to update model project.
---

# How to update model project

When the model project needs update, it means that

- We have updated the olive json or inference sample that is not compatible with previous version
- The config file version inside Foundry Toolkit is different from your project.

## What should you do

Basically you have 3 options

- Replace your project with latest project automatically
- Create a new project and migrate your changes into that project
- Downgrade Foundry Toolkit to continue use previous version

### Replace your project with latest project automatically

This is recommended when you didn't update anything manually. It is a in place update so your project location is unchanged and olive cache may be still reusable.

### Create a new project and migrate your changes into that project

This is recommended when you have changes. You could either migrate your changes to new project or vice versa.

The reverse direction is more complex but you may be still able to use olive cache.

### Downgrade Foundry Toolkit to continue use previous version

It is a workaround, but it will not allow you to use new recipes or new features.

## About History

The model in history is still valid and you could still use it.

The UX for showing the parameters may not working and in this case, you could check olive_config.json inside history folder for your parameters.

## About version

When you see the version, you may notice that they are not continuous. This is caused by Foundry Toolkit release and recipe update are two different processes.

The recipes could be updated multiple times between two Foundry Toolkit releases.
