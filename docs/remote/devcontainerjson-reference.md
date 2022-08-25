---
Order: 13
Area: remote
TOCTitle: devcontainer.json
PageTitle: devcontainer.json reference
ContentId: 52eaec33-21c6-410c-8e10-1ee3658a854f
MetaDescription: devcontainer.json reference
DateApproved: 8/4/2022
---
# devcontainer.json reference

A `devcontainer.json` file in your project tells Visual Studio Code (and other services and tools that support the format) how to access (or create) a **development container** with a well-defined tool and runtime stack.

## Dev container specification

As mentioned in the main [Remote - Containers documentation](/docs/remote/containers.md), we're creating the **Development Containers Specification** to empower anyone in any tool to configure a consistent dev environment.

The devcontainer.json reference is [now hosted on the specification site](https://containers.dev/implementors/json_reference/). Here you may also review the [devcontainer.json schema](https://containers.dev/implementors/json_schema/).

You may also review the spec documents and latest proposals in the [devcontainers/spec](https://github.com/devcontainers/spec/tree/main/docs/specs) repository.

## Additional resources

[Create a development container](/docs/remote/create-dev-container.md) has more information on configuring a dev container, or you can use the **Remote-Containers: Add Development Container Configuration Files...** or **Codespaces: Add Development Container Configuration Files...** commands from the Command Palette (`kbstyle(F1)`) to add a wide variety of base configurations.

> **Tip:** If you've already built a container and connected to it, be sure to run **Remote-Containers: Rebuild Container** or **Codespaces: Rebuild Container** from the Command Palette (`kbstyle(F1)`) to pick up any changes you make.