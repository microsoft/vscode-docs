---
Order: 9
Area: advancedcontainers
TOCTitle: Set Docker Compose project name
PageTitle: Set Docker Compose project name
ContentId: 3071cf6e-1a93-498a-91e9-48f439c589b3
MetaDescription: Set Docker Compose project name
DateApproved: 3/30/2023
---
# Set Docker Compose project name

Visual Studio Code will respect the value of the [COMPOSE_PROJECT_NAME](https://docs.docker.com/compose/reference/envvars/#compose_project_name)  environment variable if set for the VS Code process or in a `.env` file in the root of the project.

For example, after shutting down all VS Code windows, you can start VS Code from the command line as follows:

```bash
# from bash
COMPOSE_PROJECT_NAME=foo code .
```

```PowerShell
# from PowerShell
$env:COMPOSE_PROJECT_NAME=foo
code .
```

Or add the following to a `.env` file in the root of the project (**not** in the `.devcontainer` folder):

```
COMPOSE_PROJECT_NAME=foo
```
